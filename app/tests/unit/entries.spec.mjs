// ─────────────────────────────────────────────────────────────────────────
//  Merging, and why deletions leave a mark.
//
//  The scenario worth keeping in mind throughout: a phone logs three
//  cigarettes with no signal while a laptop deletes one. Everything here is
//  about those two meeting without either losing what it knew.
// ─────────────────────────────────────────────────────────────────────────
import { test, expect } from "@playwright/test";
import {
  liveEntries,
  entriesOn,
  countOn,
  allEntries,
  markDeleted,
  mergeLogs,
  sweepTombstones,
  TOMBSTONE_DAYS,
} from "../../src/domain/entries.js";

const at = (h, m = 0) => new Date(2026, 7, 31, h, m).getTime();
const entry = (h, trigger = "Stress") => ({ ts: at(h), trigger });

test("a tombstone is not a cigarette", () => {
  const day = [entry(8), { ...entry(12), d: 1 }, entry(18)];
  expect(liveEntries(day)).toHaveLength(2);
  expect(countOn({ "2026-08-31": day }, "2026-08-31")).toBe(2);
  expect(entriesOn({ "2026-08-31": day }, "2026-08-31").map((e) => e.ts)).toEqual([at(8), at(18)]);
});

test("missing days and missing entries read as empty, not as a crash", () => {
  expect(liveEntries(undefined)).toEqual([]);
  expect(countOn({}, "2026-08-31")).toBe(0);
  expect(countOn(undefined, "2026-08-31")).toBe(0);
  expect(allEntries(undefined)).toEqual([]);
});

test("every entry, oldest first, tombstones excluded", () => {
  const logs = {
    "2026-08-30": [{ ts: at(20), trigger: "Social" }],
    "2026-08-31": [entry(18), { ...entry(12), d: 1 }, entry(8)],
  };
  const times = allEntries(logs).map((e) => e.ts);
  expect(times).toEqual([...times].sort((a, b) => a - b));
  expect(times).not.toContain(at(12));
});

test("deleting marks the entry the person actually pointed at", () => {
  // Index 1 of what is on screen, which is not index 1 of what is stored.
  const day = [entry(8), { ...entry(10), d: 1 }, entry(12), entry(18)];
  const after = markDeleted(day, 1);

  expect(after).toHaveLength(day.length);
  expect(after.find((e) => e.ts === at(12)).d).toBe(1);
  expect(after.find((e) => e.ts === at(8)).d).toBeUndefined();
  expect(after.find((e) => e.ts === at(18)).d).toBeUndefined();
});

test("deleting something that is not there changes nothing", () => {
  const day = [entry(8)];
  expect(markDeleted(day, 9)).toEqual(day);
  expect(markDeleted(undefined, 0)).toEqual([]);
});

// ── Merging ─────────────────────────────────────────────────────────────

test("a merge keeps what each side logged while apart", () => {
  const phone = { "2026-08-31": [entry(8), entry(12), entry(18)] };
  const laptop = { "2026-08-31": [entry(8), { ts: at(15), trigger: "Coffee" }] };

  const merged = mergeLogs(phone, laptop);
  expect(merged["2026-08-31"].map((e) => e.ts)).toEqual([at(8), at(12), at(15), at(18)]);
});

test("a deletion survives a merge instead of coming back", () => {
  // This is the whole reason tombstones exist: the laptop deleted the 12:00
  // one, the phone has never heard about it. A plain union resurrects it.
  const phone = { "2026-08-31": [entry(8), entry(12)] };
  const laptop = { "2026-08-31": [entry(8), { ...entry(12), d: 1, dAt: Date.now() }] };

  for (const merged of [mergeLogs(phone, laptop), mergeLogs(laptop, phone)]) {
    expect(liveEntries(merged["2026-08-31"]).map((e) => e.ts)).toEqual([at(8)]);
  }
});

test("a merge is order-independent and repeatable", () => {
  const a = { "2026-08-31": [entry(8), entry(18)] };
  const b = { "2026-08-31": [entry(12)], "2026-08-30": [{ ts: at(9), trigger: "Coffee" }] };

  const ab = mergeLogs(a, b);
  const ba = mergeLogs(b, a);
  expect(ab).toEqual(ba);
  expect(mergeLogs(ab, b)).toEqual(ab);
});

test("a merge takes a tagged trigger over an untagged one", () => {
  const untagged = { "2026-08-31": [{ ts: at(8) }] };
  const tagged = { "2026-08-31": [{ ts: at(8), trigger: "Coffee" }] };
  expect(mergeLogs(untagged, tagged)["2026-08-31"][0].trigger).toBe("Coffee");
  expect(mergeLogs(tagged, untagged)["2026-08-31"][0].trigger).toBe("Coffee");
});

test("a day recorded as clean stays clean through a merge", () => {
  const merged = mergeLogs({ "2026-08-31": [] }, {});
  expect(merged["2026-08-31"]).toEqual([]);
});

test("an entry with no timestamp cannot be merged and is not invented", () => {
  const merged = mergeLogs({ "2026-08-31": [{ trigger: "Stress" }] }, {});
  expect(merged["2026-08-31"]).toEqual([]);
});

// ── Sweeping ────────────────────────────────────────────────────────────

test("old deletions are swept, recent ones are kept", () => {
  const now = Date.now();
  const day = "2026-08-31";
  const logs = {
    [day]: [
      entry(8),
      { ...entry(10), d: 1, dAt: now - (TOMBSTONE_DAYS + 1) * 86400000 },
      { ...entry(12), d: 1, dAt: now - 86400000 },
    ],
  };
  const { logs: swept, dropped } = sweepTombstones(logs, now);
  expect(dropped).toBe(1);
  expect(swept[day].map((e) => e.ts)).toEqual([at(8), at(12)]);
});

test("sweeping never removes a live entry or a tracked day", () => {
  const logs = { "2026-08-31": [entry(8)], "2026-08-30": [] };
  const { logs: swept, dropped } = sweepTombstones(logs, Date.now());
  expect(dropped).toBe(0);
  expect(swept).toEqual(logs);
  expect(Object.keys(swept)).toContain("2026-08-30");
});
