// ─────────────────────────────────────────────────────────────────────────
//  A habit swap, measured.
//
//  The number this produces is the only thing telling somebody whether the
//  thing they changed was worth changing, so the tests here are mostly
//  about it being honest: the baseline must not drift, a stopped experiment
//  must stop counting, three good days must not be reported as a success,
//  and a swap must never quietly come out well because the comparison moved.
// ─────────────────────────────────────────────────────────────────────────
import { test, expect } from "@playwright/test";

import {
  activeExperiments,
  experimentProgress,
  mergeExperiments,
  MIN_DAYS_TO_JUDGE,
  newId,
  pastExperiments,
  startExperiment,
  stopExperiment,
  suggestExperiments,
  TRIAL_DAYS,
} from "../../src/domain/experiments.js";
import { buildProfile } from "../../src/domain/profile.js";
import { dayKey } from "../../src/lib/dates.js";

const NOW = new Date(2026, 7, 31, 12, 0).getTime();
const at = (day, hour) => new Date(2026, 7, day, hour).getTime();
const key = (day) => dayKey(new Date(2026, 7, day));

/** `{ 28: [4, "Coffee"] }` → four Coffee cigarettes on the 28th. */
const logsFrom = (spec) =>
  Object.fromEntries(
    Object.entries(spec).map(([d, [n, trigger]]) => [
      key(Number(d)),
      Array.from({ length: n }, (_, i) => ({ ts: at(Number(d), 8 + (i % 12)), trigger })),
    ]),
  );

const running = (startedAt, baselinePerDay, trigger = "Coffee") => ({
  id: newId(trigger, startedAt),
  trigger,
  cue: "Morning coffee",
  swap: "Drink it standing at a window.",
  startedAt,
  endedAt: null,
  baselinePerDay,
});

const profileOf = (spec) =>
  buildProfile({ logs: logsFrom(spec), meta: { trackingStartedAt: key(25) }, now: NOW });

test("what is suggested is what the log says costs the most", () => {
  const profile = profileOf({ 29: [6, "Coffee"], 30: [2, "Social"] });
  const suggestions = suggestExperiments(profile, {});
  expect(suggestions[0]).toMatchObject({ trigger: "Coffee", cue: "Morning coffee" });
  expect(suggestions[0].perDay).toBeCloseTo(6 / 7);
  expect(suggestions[0].swap).toBeTruthy();
});

test("an urge with no situation behind it is not offered a swap", () => {
  // Craving and Habit describe the wanting, not a moment that can be
  // rearranged. Offering "swap your routine" for those would be filler.
  const profile = profileOf({ 29: [8, "Craving"], 30: [6, "Habit"] });
  expect(suggestExperiments(profile, {})).toEqual([]);
});

test("a cue already being worked on is not suggested again", () => {
  const profile = profileOf({ 29: [6, "Coffee"], 30: [4, "Stress"] });
  const habits = startExperiment({}, suggestExperiments(profile, {})[0], key(30));
  expect(suggestExperiments(profile, habits).map((one) => one.trigger)).toEqual(["Stress"]);
});

test("the baseline is photographed when it starts and never moves again", () => {
  // The trap this is here to stop: recomputing "before" as the fortnight up
  // to today, so the comparison slides into the experiment and every swap
  // drifts towards "no change".
  const habits = startExperiment(
    {},
    { trigger: "Coffee", cue: "Morning coffee", swap: "…", perDay: 3 },
    key(28),
  );
  const experiment = habits[newId("Coffee", key(28))];
  expect(experiment.baselinePerDay).toBe(3);

  const heavier = { ...logsFrom({ 29: [9, "Coffee"], 30: [9, "Coffee"] }) };
  expect(experimentProgress(experiment, heavier, NOW).baselinePerDay).toBe(3);
});

test("starting the same swap twice on the same day changes nothing", () => {
  const candidate = { trigger: "Coffee", cue: "Morning coffee", swap: "…", perDay: 3 };
  const once = startExperiment({}, candidate, key(30));
  expect(startExperiment(once, candidate, key(30))).toEqual(once);
  expect(activeExperiments(once)).toHaveLength(1);
});

test("a few good days is not a result yet", () => {
  const experiment = running(key(30), 4); // the 30th and the 31st
  const progress = experimentProgress(experiment, {}, NOW);
  expect(progress.daysIn).toBeLessThan(MIN_DAYS_TO_JUDGE);
  expect(progress.verdict).toBe("early");
});

test("a quarter down is working, a quarter up is not, and the edges are the edges", () => {
  // Four days at four a day before. Twelve since is exactly −25%, twenty is
  // exactly +25%, and both boundaries count as movement.
  const since = (n) =>
    logsFrom({ 28: [n, "Coffee"], 29: [0, "Coffee"], 30: [0, "Coffee"], 31: [0, "Coffee"] });
  expect(experimentProgress(running(key(28), 4), since(12), NOW)).toMatchObject({
    daysIn: 4,
    verdict: "working",
    changePct: -0.25,
  });
  expect(experimentProgress(running(key(28), 4), since(20), NOW).verdict).toBe("worse");

  // Five days at 3.2 a day against a baseline of four: a fifth down, which
  // is inside the deadband and so is not yet anything.
  const fiveDays = logsFrom({ 27: [16, "Coffee"] });
  expect(experimentProgress(running(key(27), 4), fiveDays, NOW)).toMatchObject({
    daysIn: 5,
    verdict: "no-change",
  });
});

test("only the cue being worked on is counted", () => {
  const logs = logsFrom({ 28: [8, "Stress"] });
  const progress = experimentProgress(running(key(28), 4), logs, NOW);
  expect(progress.since).toBe(0);
  expect(progress.cleanDays).toBe(4);
  expect(progress.verdict).toBe("working");
});

test("an undone cigarette does not count against a swap", () => {
  const logs = {
    [key(29)]: [
      { ts: at(29, 9), trigger: "Coffee" },
      { ts: at(29, 10), trigger: "Coffee", d: 1, dAt: at(29, 10) },
    ],
  };
  expect(experimentProgress(running(key(28), 4), logs, NOW).since).toBe(1);
});

test("a stopped experiment stops counting on the day it stopped", () => {
  const stopped = stopExperiment(
    { [newId("Coffee", key(28))]: running(key(28), 4) },
    newId("Coffee", key(28)),
    key(29),
  );
  const experiment = stopped[newId("Coffee", key(28))];
  expect(experiment.endedAt).toBe(key(29));
  expect(activeExperiments(stopped)).toEqual([]);
  expect(pastExperiments(stopped)).toHaveLength(1);

  // Two cigarettes on the 30th, after it ended: outside the window.
  const logs = logsFrom({ 28: [2, "Coffee"], 30: [2, "Coffee"] });
  const progress = experimentProgress(experiment, logs, NOW);
  expect(progress.daysIn).toBe(2);
  expect(progress.since).toBe(2);
});

test("stopping one that is already stopped leaves it alone", () => {
  const id = newId("Coffee", key(28));
  const once = stopExperiment({ [id]: running(key(28), 4) }, id, key(29));
  expect(stopExperiment(once, id, key(30))).toEqual(once);
  expect(stopExperiment({}, id, key(30))).toEqual({});
});

test("a swap started from nothing and smoked through is not an improvement", () => {
  // Nothing to be a percentage of, so there is no percentage — and it is
  // certainly not a win.
  const logs = logsFrom({ 28: [4, "Coffee"] });
  const progress = experimentProgress(running(key(28), 0), logs, NOW);
  expect(progress.changePct).toBeNull();
  expect(progress.verdict).toBe("worse");
});

test("a week is a week", () => {
  const progress = experimentProgress(running(key(28), 4), {}, NOW);
  expect(progress.daysLeft).toBe(TRIAL_DAYS - progress.daysIn);
});

test("two devices' experiments meet without losing a decision", () => {
  const id = newId("Coffee", key(28));
  const phone = { [id]: running(key(28), 4) };
  const laptop = stopExperiment(phone, id, key(30));
  // Whichever way round they arrive, the stop is the thing somebody chose.
  expect(mergeExperiments(phone, laptop)[id].endedAt).toBe(key(30));
  expect(mergeExperiments(laptop, phone)[id].endedAt).toBe(key(30));

  const other = { [newId("Stress", key(29))]: running(key(29), 2, "Stress") };
  expect(Object.keys(mergeExperiments(phone, other))).toHaveLength(2);
});
