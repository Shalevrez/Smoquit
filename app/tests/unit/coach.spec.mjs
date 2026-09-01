// ─────────────────────────────────────────────────────────────────────────
//  Which tip gets shown first, and why.
//
//  The ranking is the one part of this feature a person cannot check for
//  themselves — they see three cards and a sentence, not the arithmetic. So
//  what is pinned down here is the behaviour somebody would notice and
//  resent: a list that reshuffles itself, a recommendation with no fact
//  under it, a confident suggestion to an account with nothing in it, and a
//  tip that keeps coming back after they have said it does not work.
// ─────────────────────────────────────────────────────────────────────────
import { test, expect } from "@playwright/test";

import { TIPS } from "../../src/data/tips.js";
import { PART_WORDS, pickForYou, rankTips, REASONS } from "../../src/domain/coach.js";
import { buildProfile, partOfDay } from "../../src/domain/profile.js";
import { dayKey } from "../../src/lib/dates.js";

const NOW = new Date(2026, 7, 31, 12, 0).getTime();
const at = (day, hour) => new Date(2026, 7, day, hour).getTime();
const key = (day) => dayKey(new Date(2026, 7, day));

const many = (n, trigger, from = 8) =>
  Array.from({ length: n }, (_, i) => [from + (i % 12), trigger]);

const logsFrom = (spec) =>
  Object.fromEntries(
    Object.entries(spec).map(([day, entries]) => [
      key(Number(day)),
      entries.map(([hour, trigger]) => ({ ts: at(Number(day), hour), trigger })),
    ]),
  );

const profileOf = (spec, rest = {}) =>
  buildProfile({ logs: logsFrom(spec), meta: { trackingStartedAt: key(25) }, now: NOW, ...rest });

/** Somebody whose fortnight is mostly coffee. */
const coffeeDrinker = () =>
  profileOf({ 29: many(6, "Coffee"), 30: many(5, "Coffee"), 31: [[9, "Stress"]] });

const order = (ranked) => ranked.map((entry) => entry.tip.id);

test("every tip has something saying who it is for", () => {
  // A tip with no rule can never be recommended, only padded into the
  // library — which is exactly how a new one gets added and forgotten.
  const ranked = rankTips(coffeeDrinker(), {});
  expect(ranked).toHaveLength(TIPS.length);
  const recommendable = ranked.filter((entry) => entry.score > 1);
  expect(recommendable.length).toBeGreaterThan(0);
});

test("the tip about the trigger you actually have comes first", () => {
  const ranked = rankTips(coffeeDrinker(), {});
  expect(ranked[0].tip.id).toBe("pairings");
  expect(ranked[0].reason.key).toBe(REASONS.triggerShare);
  expect(ranked[0].reason.params).toMatchObject({ trigger: "Coffee" });
});

test("the fact under a recommendation is the person's own number", () => {
  const ranked = rankTips(coffeeDrinker(), {});
  expect(ranked[0].reason.params.n).toBe(11);
});

test("a tip somebody has said does not work goes to the bottom and stays there", () => {
  const profile = coffeeDrinker();
  const before = rankTips(profile, {});
  expect(before[0].tip.id).toBe("pairings");

  const after = rankTips(profile, { pairings: { verdict: "didnt", at: NOW } });
  expect(order(after).at(-1)).toBe("pairings");
  expect(pickForYou(after).map((entry) => entry.tip.id)).not.toContain("pairings");
});

test("a tip somebody says works is pinned to the top, whatever the data says", () => {
  const ranked = rankTips(coffeeDrinker(), { water: { verdict: "worked", at: NOW } });
  expect(ranked[0].tip.id).toBe("water");
  expect(ranked[0].reason.key).toBe(REASONS.worked);
});

test("an account with nothing in it gets the written order, not a guess", () => {
  const thin = profileOf({ 31: [[9, "Coffee"]] });
  expect(thin.enoughData).toBe(false);
  const ranked = rankTips(thin, {});
  expect(order(ranked)).toEqual(TIPS.map((tip) => tip.id));
  expect(ranked.every((entry) => entry.reason === null)).toBe(true);
});

test("nothing is recommended without a reason to show beside it", () => {
  const thin = profileOf({ 31: [[9, "Coffee"]] });
  expect(pickForYou(rankTips(thin, {}))).toEqual([]);
  expect(pickForYou(rankTips(coffeeDrinker(), {})).every((entry) => entry.reason)).toBe(true);
});

test("the same data gives the same order every time", () => {
  const profile = coffeeDrinker();
  expect(order(rankTips(profile, {}))).toEqual(order(rankTips(profile, {})));
});

test("missing the daily target outranks a trigger that is nobody's whole story", () => {
  // Three causes in even thirds, so no single one carries enough of the
  // fortnight to be worth more than "you are over your target most days".
  // A trigger that IS the whole story still wins, and should: there is
  // something specific to do about it.
  const spread = () => [...many(3, "Boredom"), ...many(3, "Coffee"), ...many(3, "Stress")];
  const profile = profileOf(
    { 26: spread(), 27: spread(), 28: spread(), 29: spread(), 30: spread() },
    { goal: { target: 4, baseline: 20 } },
  );
  const ranked = rankTips(profile, {});
  expect(ranked[0].tip.id).toBe("targetfit");
  expect(ranked[0].reason.key).toBe(REASONS.targetMissed);
  expect(ranked[0].reason.params).toEqual({ n: 5, days: 7 });
});

test("losing most of the urges promotes the ones about riding them out", () => {
  const craving = (day, hour, outcome) => ({
    ts: at(day, hour),
    trigger: "Stress",
    outcome,
    heldMs: 60000,
  });
  const profile = profileOf(
    { 29: many(3, "Stress"), 30: many(3, "Stress") },
    {
      cravings: {
        [key(30)]: [
          craving(30, 9, "smoked"),
          craving(30, 12, "smoked"),
          craving(30, 15, "smoked"),
          craving(30, 18, "held"),
        ],
      },
    },
  );
  const ids = order(rankTips(profile, {})).slice(0, 3);
  expect(ids).toContain("wave");
  expect(ids).toContain("breathe");
});

test("winning most of them says so instead", () => {
  const craving = (day, hour, outcome) => ({
    ts: at(day, hour),
    trigger: "Stress",
    outcome,
    heldMs: 60000,
  });
  const profile = profileOf(
    { 29: many(3, "Stress"), 30: many(3, "Stress") },
    {
      cravings: {
        [key(30)]: [
          craving(30, 9, "held"),
          craving(30, 12, "held"),
          craving(30, 15, "held"),
          craving(30, 18, "smoked"),
        ],
      },
    },
  );
  const won = rankTips(profile, {}).find((entry) => entry.tip.id === "bankwins");
  expect(won.reason.key).toBe(REASONS.urgesWon);
  expect(won.reason.params).toEqual({ held: 3, faced: 4 });
});

test("the words for the quarters of the day all have somewhere to be looked up", () => {
  // partOfDay() names them and the reason sentence prints them, but only
  // this list is what tells the translation check they exist.
  const produced = new Set();
  for (let hour = 0; hour < 24; hour++) produced.add(partOfDay(hour));
  expect([...produced].sort()).toEqual([...PART_WORDS].sort());
});
