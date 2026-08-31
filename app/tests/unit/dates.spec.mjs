// ─────────────────────────────────────────────────────────────────────────
//  Day keys and the migration onto them.
//
//  Run under several timezones on purpose. The bug this replaces was
//  invisible in UTC and wrong everywhere else, which is exactly the shape
//  of bug a single-timezone test suite ships.
// ─────────────────────────────────────────────────────────────────────────
import { test, expect } from "@playwright/test";
import { dayKey, dayKeysBetween, startOfDay } from "../../src/lib/dates.js";
import { rebucketByLocalDay, earliestDay } from "../../src/lib/migrate.js";

const TZ = process.env.TZ ?? "(system)";

test(`[${TZ}] a day key is the local calendar date`, () => {
  const at = new Date(2026, 7, 31, 1, 30); // 31 August, 01:30 local
  expect(dayKey(at)).toBe("2026-08-31");
  expect(dayKey(at.getTime())).toBe("2026-08-31");
});

test(`[${TZ}] just before and just after local midnight are different days`, () => {
  expect(dayKey(new Date(2026, 7, 30, 23, 59, 59))).toBe("2026-08-30");
  expect(dayKey(new Date(2026, 7, 31, 0, 0, 0))).toBe("2026-08-31");
});

test(`[${TZ}] months and years are padded and roll over`, () => {
  expect(dayKey(new Date(2026, 0, 1, 12))).toBe("2026-01-01");
  expect(dayKey(new Date(2026, 11, 31, 23))).toBe("2026-12-31");
});

test(`[${TZ}] a range covers both ends`, () => {
  expect(dayKeysBetween("2026-08-29", "2026-09-01")).toEqual([
    "2026-08-29",
    "2026-08-30",
    "2026-08-31",
    "2026-09-01",
  ]);
  expect(dayKeysBetween("2026-08-31", "2026-08-31")).toEqual(["2026-08-31"]);
  expect(dayKeysBetween("2026-09-01", "2026-08-31")).toEqual([]);
});

test(`[${TZ}] a range walks calendar days, so a clock change still counts once`, () => {
  // Spans the European clock change on 25 October 2026, when one local day
  // is 23 or 25 hours long. Adding 86400000ms would skip or repeat a day.
  const keys = dayKeysBetween("2026-10-23", "2026-10-27");
  expect(keys).toEqual(["2026-10-23", "2026-10-24", "2026-10-25", "2026-10-26", "2026-10-27"]);
  expect(new Set(keys).size).toBe(keys.length);
});

test(`[${TZ}] startOfDay is local midnight`, () => {
  const noon = new Date(2026, 7, 31, 12, 34, 56, 789);
  const midnight = new Date(startOfDay(noon.getTime()));
  expect(midnight.getHours()).toBe(0);
  expect(midnight.getMinutes()).toBe(0);
  expect(dayKey(midnight)).toBe("2026-08-31");
});

// ── The migration ───────────────────────────────────────────────────────

/** A UTC-keyed blob, as the old code would have written it. */
function utcKeyed(entries) {
  const logs = {};
  for (const [ts, trigger] of entries) {
    const key = new Date(ts).toISOString().slice(0, 10);
    (logs[key] ??= []).push({ ts, trigger });
  }
  return logs;
}

test(`[${TZ}] re-bucketing files every entry under its own local day`, () => {
  const times = [
    new Date(2026, 7, 31, 0, 40).getTime(), // just after local midnight
    new Date(2026, 7, 31, 12, 0).getTime(),
    new Date(2026, 7, 31, 23, 20).getTime(), // just before the next one
  ];
  const { logs } = rebucketByLocalDay(utcKeyed(times.map((t) => [t, "Stress"])));

  expect(Object.keys(logs)).toEqual(["2026-08-31"]);
  expect(logs["2026-08-31"]).toHaveLength(3);
  for (const entry of logs["2026-08-31"]) expect(dayKey(entry.ts)).toBe("2026-08-31");
});

test(`[${TZ}] re-bucketing loses nothing and sorts each day`, () => {
  const before = utcKeyed([
    [new Date(2026, 7, 30, 22, 0).getTime(), "Social"],
    [new Date(2026, 7, 31, 1, 0).getTime(), "Craving"],
    [new Date(2026, 7, 31, 9, 0).getTime(), "Coffee"],
    [new Date(2026, 8, 1, 8, 0).getTime(), "Coffee"],
  ]);
  const { logs } = rebucketByLocalDay(before);

  const count = (blob) => Object.values(blob).flat().length;
  expect(count(logs)).toBe(count(before));
  for (const entries of Object.values(logs)) {
    const times = entries.map((e) => e.ts);
    expect(times).toEqual([...times].sort((a, b) => a - b));
  }
});

test(`[${TZ}] re-bucketing is idempotent`, () => {
  const once = rebucketByLocalDay(
    utcKeyed([
      [new Date(2026, 7, 31, 0, 40).getTime(), "Craving"],
      [new Date(2026, 7, 31, 23, 20).getTime(), "Social"],
    ]),
  );
  const twice = rebucketByLocalDay(once.logs);
  expect(twice.logs).toEqual(once.logs);
  expect(twice.moved).toBe(0);
});

test(`[${TZ}] an entry with no usable timestamp is kept, not dropped`, () => {
  const { logs } = rebucketByLocalDay({
    "2026-08-31": [{ trigger: "Stress" }, { ts: "nonsense", trigger: "Coffee" }],
  });
  expect(logs["2026-08-31"]).toHaveLength(2);
});

test(`[${TZ}] empty and missing input are handled`, () => {
  expect(rebucketByLocalDay({})).toEqual({ logs: {}, moved: 0 });
  expect(rebucketByLocalDay(undefined)).toEqual({ logs: {}, moved: 0 });
});

test(`[${TZ}] the earliest day is where tracking started`, () => {
  expect(earliestDay({ "2026-08-31": [], "2026-06-02": [], "2026-07-15": [] })).toBe("2026-06-02");
  expect(earliestDay({})).toBe(dayKey());
});
