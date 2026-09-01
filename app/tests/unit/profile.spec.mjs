// ─────────────────────────────────────────────────────────────────────────
//  The behaviour profile.
//
//  Everything the tips and habits screens now say about somebody is derived
//  here, so the things worth pinning down are the ones that would make the
//  app tell a person something untrue about themselves: a deleted cigarette
//  counted anyway, a skipped trigger promoted into a cause, a thin week
//  presented as a pattern, or a fortnight compared against a fortnight of
//  invented zeroes.
// ─────────────────────────────────────────────────────────────────────────
import { test, expect } from "@playwright/test";

import { buildProfile, MIN_ENTRIES, partOfDay, WINDOW_DAYS } from "../../src/domain/profile.js";
import { dayKey } from "../../src/lib/dates.js";

// Fixed, and mid-month so no window slides off the end of August.
const NOW = new Date(2026, 7, 31, 12, 0).getTime();
const at = (day, hour, minute = 0) => new Date(2026, 7, day, hour, minute).getTime();
const key = (day) => dayKey(new Date(2026, 7, day));

/** `{ 25: [[8, "Coffee"], …] }` → a log the app would have written. */
const logsFrom = (spec) =>
  Object.fromEntries(
    Object.entries(spec).map(([day, entries]) => [
      key(Number(day)),
      entries.map(([hour, trigger, extra]) => ({ ts: at(Number(day), hour), trigger, ...extra })),
    ]),
  );

/** The same trigger, n times, at consecutive hours. */
const many = (n, trigger, from = 8) =>
  Array.from({ length: n }, (_, i) => [from + (i % 12), trigger]);

const profileOf = (logs, rest = {}) =>
  buildProfile({ logs, meta: { trackingStartedAt: key(25) }, now: NOW, ...rest });

test("the trigger costing the most lately is the one at the top", () => {
  const profile = profileOf(
    logsFrom({
      29: [...many(3, "Coffee"), [20, "Social"]],
      30: [...many(2, "Coffee"), [21, "Stress"]],
    }),
  );
  expect(profile.triggerRank[0]).toMatchObject({ trigger: "Coffee", count: 5 });
  expect(profile.triggerRank.map((rank) => rank.trigger)).not.toContain("Boredom");
});

test("a skipped trigger is a cigarette, and never a cause", () => {
  // The whole difference between the total and the ranking. "Unlogged" is a
  // real cigarette that declined to say why, and reading it as a reason
  // would invent the app's most confident claim out of a shrug.
  const profile = profileOf(
    logsFrom({
      30: [
        [9, "Unlogged"],
        [10, "Unlogged"],
        [11, "Coffee"],
        [12, "Coffee"],
      ],
    }),
  );
  expect(profile.totalEntries).toBe(4);
  expect(profile.recent.total).toBe(4);
  expect(profile.triggerRank.map((rank) => rank.trigger)).toEqual(["Coffee"]);
  expect(profile.triggerRank[0].count).toBe(2);
});

test("an undone cigarette is not counted anywhere", () => {
  const profile = profileOf(
    logsFrom({
      30: [
        [9, "Coffee"],
        [10, "Coffee", { d: 1, dAt: at(30, 10) }],
      ],
    }),
  );
  expect(profile.totalEntries).toBe(1);
  expect(profile.triggerRank[0].count).toBe(1);
});

test("too little logged is not a pattern", () => {
  const thin = profileOf(logsFrom({ 30: [[9, "Coffee"]] }));
  expect(thin.totalEntries).toBeLessThan(MIN_ENTRIES);
  expect(thin.enoughData).toBe(false);

  const enough = profileOf(logsFrom({ 29: many(3, "Coffee"), 30: many(3, "Stress") }));
  expect(enough.enoughData).toBe(true);
});

test("an empty account produces a profile rather than an exception", () => {
  const profile = buildProfile({ now: NOW });
  expect(profile.enoughData).toBe(false);
  expect(profile.triggerRank).toEqual([]);
  expect(profile.cravings.rate).toBeNull();
  expect(profile.firstOfDayHour).toBeNull();
});

test("the fortnight is compared against the fortnight before it", () => {
  // Eight a day two weeks ago, two a day since. Anything that quietly
  // compared "lately" against the whole record would blunt that in half.
  const spec = {};
  for (let day = 4; day <= 17; day++) spec[day] = many(8, "Coffee");
  for (let day = 18; day <= 31; day++) spec[day] = many(2, "Coffee");

  const profile = buildProfile({
    logs: logsFrom(spec),
    meta: { trackingStartedAt: key(4) },
    now: NOW,
  });
  expect(profile.recent.days).toBe(WINDOW_DAYS);
  expect(profile.previous.days).toBe(WINDOW_DAYS);
  expect(profile.recent.perDay).toBe(2);
  expect(profile.previous.perDay).toBe(8);
  expect(profile.trend).toBe(-1);
  expect(profile.triggerRank[0].trend).toBe(-1);
});

test("a fortnight with nothing behind it is compared against nothing", () => {
  // Not against zero. A new account is not somebody who has just relapsed.
  const profile = profileOf(logsFrom({ 29: many(3, "Coffee"), 30: many(3, "Coffee") }));
  expect(profile.previous).toBeNull();
  expect(profile.trend).toBeNull();
  expect(profile.triggerRank[0].prevPerDay).toBeNull();
});

test("a change too small to mean anything is not a direction", () => {
  const spec = {};
  for (let day = 4; day <= 17; day++) spec[day] = many(10, "Coffee");
  for (let day = 18; day <= 31; day++) spec[day] = many(9, "Coffee");
  const profile = buildProfile({
    logs: logsFrom(spec),
    meta: { trackingStartedAt: key(4) },
    now: NOW,
  });
  expect(profile.trend).toBe(0);
});

test("the day's first cigarette is the earliest one, not the first written down", () => {
  // Backdating writes an entry into a day that has already been read, and
  // nothing re-sorts a day on the way out.
  const logs = {
    [key(29)]: [
      { ts: at(29, 14), trigger: "Stress" },
      { ts: at(29, 7), trigger: "Coffee" },
    ],
    [key(30)]: [
      { ts: at(30, 15), trigger: "Stress" },
      { ts: at(30, 7), trigger: "Coffee" },
    ],
    [key(31)]: [
      { ts: at(31, 16), trigger: "Stress" },
      { ts: at(31, 7), trigger: "Coffee" },
    ],
  };
  expect(profileOf(logs).firstOfDayHour).toBe(7);
});

test("the quarters of the day cover the clock, and night wraps midnight", () => {
  expect(partOfDay(23)).toBe("night");
  expect(partOfDay(2)).toBe("night");
  expect(partOfDay(4)).toBe("night");
  expect(partOfDay(5)).toBe("morning");
  expect(partOfDay(12)).toBe("afternoon");
  expect(partOfDay(17)).toBe("evening");
  for (let hour = 0; hour < 24; hour++) expect(partOfDay(hour)).toBeTruthy();
});

test("a smoke-free run counts the days nobody opened the app", () => {
  // The days with no key at all are the good ones. Counting only the days
  // that were explicitly marked clean makes a perfect week invisible.
  const profile = buildProfile({
    logs: logsFrom({ 25: many(3, "Coffee") }),
    meta: { trackingStartedAt: key(25) },
    now: NOW,
  });
  expect(profile.days).toBe(7);
  expect(profile.streak.currentSmokeFree).toBe(6);
  expect(profile.streak.longestSmokeFree).toBe(6);
});

test("cravings are counted both ways, and per trigger", () => {
  const craving = (day, hour, outcome, trigger) => ({
    ts: at(day, hour),
    trigger,
    outcome,
    heldMs: 60000,
  });
  const profile = profileOf(logsFrom({ 30: many(6, "Stress") }), {
    cravings: {
      [key(30)]: [
        craving(30, 9, "held", "Stress"),
        craving(30, 12, "smoked", "Stress"),
        craving(30, 18, "held", "Coffee"),
      ],
    },
  });
  expect(profile.cravings).toMatchObject({ held: 2, faced: 3 });
  expect(profile.cravings.byTrigger.Stress).toMatchObject({ held: 1, faced: 2, rate: 0.5 });
  expect(profile.cravings.byTrigger.Coffee.rate).toBe(1);
});

test("never having been tested is not a nought per cent", () => {
  expect(profileOf(logsFrom({ 30: many(6, "Coffee") })).cravings.rate).toBeNull();
});

test("the target is measured against the days it was actually meant for", () => {
  const profile = profileOf(logsFrom({ 29: many(9, "Coffee"), 30: many(2, "Coffee") }), {
    goal: { target: 5, baseline: 20 },
  });
  // Seven tracked days: one over target, six at or under it (the empty ones
  // included — a day with nothing on it meets any target there is).
  expect(profile.target).toMatchObject({ target: 5, daysMet: 6, daysMissed: 1 });
  expect(profile.money.avoided).toBeGreaterThan(0);
});
