// ─────────────────────────────────────────────────────────────────────────
//  Cravings, and the swap offered for one.
//
//  The point of interest throughout: both outcomes are recorded. A count of
//  wins alone would be flattering and useless — what makes "seven of eleven
//  this week" worth reading is that the eleven is real.
// ─────────────────────────────────────────────────────────────────────────
import { test, expect } from "@playwright/test";

import {
  addCraving,
  heldEntriesOn,
  heldOn,
  summarise,
  WAVE_MS,
} from "../../src/domain/cravings.js";
import { swapForTrigger, TRIGGER_TO_CUE } from "../../src/data/habits.js";
import { TRIGGERS } from "../../src/data/triggers.js";
import { breathPhaseAt, BREATH_CYCLE_MS, BREATH_PHASES } from "../../src/data/breathing.js";

const at = (day, h, m = 0) => new Date(2026, 7, day, h, m).getTime();
const session = (day, h, outcome, trigger = "Stress") => ({
  ts: at(day, h),
  trigger,
  outcome,
  heldMs: 60000,
});

test("a session is filed under the local day it happened on", () => {
  // 00:30 — the hour that used to land in yesterday.
  const cravings = addCraving({}, session(31, 0, "held"));
  expect(Object.keys(cravings)).toEqual(["2026-08-31"]);
});

test("sessions within a day stay in order however they arrive", () => {
  let cravings = {};
  for (const hour of [18, 8, 12]) cravings = addCraving(cravings, session(31, hour, "held"));
  expect(cravings["2026-08-31"].map((s) => s.ts)).toEqual([at(31, 8), at(31, 12), at(31, 18)]);
});

test("adding does not disturb other days", () => {
  const before = { "2026-08-30": [session(30, 9, "smoked")] };
  const after = addCraving(before, session(31, 9, "held"));
  expect(after["2026-08-30"]).toEqual(before["2026-08-30"]);
  expect(before["2026-08-31"]).toBeUndefined();
});

test("only the ones ridden out are counted as ridden out", () => {
  const cravings = {
    "2026-08-31": [session(31, 8, "held"), session(31, 12, "smoked"), session(31, 18, "held")],
  };
  expect(heldOn(cravings, "2026-08-31")).toBe(2);
  expect(heldOn(cravings, "2026-08-30")).toBe(0);
  expect(heldOn({}, "2026-08-31")).toBe(0);
});

test("the timeline is handed the sessions themselves, in the order they happened", () => {
  const cravings = {
    "2026-08-31": [session(31, 8, "held"), session(31, 12, "smoked"), session(31, 18, "held")],
  };
  // The ones given in to are left out on purpose: those become a cigarette in
  // the log, and a timeline showing both would count the day twice.
  expect(heldEntriesOn(cravings, "2026-08-31").map((s) => s.ts)).toEqual([at(31, 8), at(31, 18)]);
  expect(heldEntriesOn(cravings, "2026-08-30")).toEqual([]);
  expect(heldEntriesOn({}, "2026-08-31")).toEqual([]);
  // The number on the screen is the length of the list under it, always.
  expect(heldOn(cravings, "2026-08-31")).toBe(heldEntriesOn(cravings, "2026-08-31").length);
});

test("a summary reports both halves, not just the good one", () => {
  const cravings = {
    "2026-08-30": [session(30, 9, "held"), session(30, 20, "smoked")],
    "2026-08-31": [session(31, 8, "held")],
  };
  expect(summarise(cravings, "2026-08-30", "2026-08-31")).toEqual({
    held: 2,
    faced: 3,
    rate: 2 / 3,
  });
});

test("no cravings is not a nought per cent success rate", () => {
  // The distinction matters on screen: "0%" reads as failure, and a week
  // with no urges at all is the opposite of that.
  expect(summarise({}, "2026-08-25", "2026-08-31")).toEqual({ held: 0, faced: 0, rate: null });
});

test("a summary counts only the window asked for", () => {
  const cravings = {
    "2026-08-24": [session(24, 9, "held")],
    "2026-08-31": [session(31, 9, "smoked")],
  };
  expect(summarise(cravings, "2026-08-30", "2026-08-31").faced).toBe(1);
});

test("the wave is five minutes", () => {
  expect(WAVE_MS).toBe(5 * 60 * 1000);
});

// ── The swap offered ────────────────────────────────────────────────────

test("every trigger has a decision recorded about its swap", () => {
  // A trigger with no entry at all would silently offer nothing, which is
  // indistinguishable from deliberately offering nothing.
  for (const trigger of TRIGGERS) {
    expect(Object.hasOwn(TRIGGER_TO_CUE, trigger)).toBe(true);
  }
});

test("a situational trigger gets a real routine to swap in", () => {
  for (const trigger of ["Coffee", "Stress", "After a meal", "Social", "Boredom"]) {
    const swap = swapForTrigger(trigger);
    expect(swap, `no swap found for ${trigger}`).toBeTruthy();
    expect(typeof swap.swap).toBe("string");
    expect(swap.swap.length).toBeGreaterThan(0);
  }
});

test("an urge that is not a situation has nothing to swap, and says so", () => {
  // "Craving" and "Habit" describe the wanting itself rather than something
  // that set it off, so there is no routine to replace.
  expect(swapForTrigger("Craving")).toBeNull();
  expect(swapForTrigger("Habit")).toBeNull();
  expect(swapForTrigger("something else entirely")).toBeNull();
});

// ── Breathing ───────────────────────────────────────────────────────────

test("the cycle is in for four, hold for four, out for six", () => {
  expect(BREATH_PHASES.map((p) => p.ms)).toEqual([4000, 4000, 6000]);
  expect(BREATH_CYCLE_MS).toBe(14000);
});

test("the phase follows the clock, and repeats", () => {
  const phaseAt = (ms) => breathPhaseAt(ms).key;
  expect(phaseAt(0)).toBe("in");
  expect(phaseAt(3999)).toBe("in");
  expect(phaseAt(4000)).toBe("hold");
  expect(phaseAt(7999)).toBe("hold");
  expect(phaseAt(8000)).toBe("out");
  expect(phaseAt(13999)).toBe("out");
  // Second time round, and much later.
  expect(phaseAt(14000)).toBe("in");
  expect(phaseAt(14000 * 21 + 5000)).toBe("hold");
});

test("the out-breath is the one that shrinks", () => {
  expect(breathPhaseAt(0).scale).toBe(1);
  expect(breathPhaseAt(9000).scale).toBeLessThan(1);
});
