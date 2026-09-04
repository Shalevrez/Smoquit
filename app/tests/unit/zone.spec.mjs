// ─────────────────────────────────────────────────────────────────────────
//  Would a server in UTC reach the same verdict as the phone in the pocket?
//
//  That is the only question worth asking about the push side, and it is
//  the one that cannot be answered by reading the code: the whole app is
//  written in local time, the sender is not, and every function involved
//  looks correct on its own. So these tests run the SAME inputs twice —
//  once the way the browser does it, once the way the Edge Function will —
//  and insist the two agree.
//
//  If this file ever goes red, somebody's reminder is arriving at the wrong
//  hour, and by construction it will be somebody who is not in UTC, which
//  means it will not be whoever is looking at the failure.
// ─────────────────────────────────────────────────────────────────────────
import { test, expect } from "@playwright/test";

import { dueAlerts } from "../../src/domain/alerts.js";
import { buildProfile } from "../../src/domain/profile.js";
import { inZone } from "../../src/domain/zone.js";
import { atHour, hoursUntilHour, zoneOffsetMs } from "../../src/lib/dates.js";

const TZ = process.env.TZ ?? "(system)";

// Every offset shape that exists, including the two that break naive
// arithmetic: a half-hour zone, a quarter-hour zone, and the far ends.
/**
 * The day key in a zone, derived straight from Intl.
 *
 * Deliberately NOT dayKey() — that reads the runner's own zone, and these
 * tests have to mean the same thing whatever zone the runner is in. This is
 * the independent answer the shifted pipeline is checked against.
 */
const keyIn = (tz, ts) => new Intl.DateTimeFormat("en-CA", { timeZone: tz }).format(new Date(ts));

/** A real instant that is `hour` o'clock in `tz` on 31 August 2026. */
const localOn = (tz, day, hour) => {
  const guess = Date.parse(
    `2026-08-${String(day).padStart(2, "0")}T${String(hour).padStart(2, "0")}:00:00Z`,
  );
  return guess - zoneOffsetMs(tz, guess);
};

const ZONES = [
  "UTC",
  "Asia/Jerusalem",
  "America/Los_Angeles",
  "Asia/Kolkata", // +5:30
  "Asia/Kathmandu", // +5:45
  "Pacific/Kiritimati", // +14
  "Pacific/Pago_Pago", // −11
];

test(`[${TZ}] the offset is read from the calendar, not guessed`, () => {
  const summer = Date.parse("2026-07-15T12:00:00Z");
  const winter = Date.parse("2026-01-15T12:00:00Z");

  expect(zoneOffsetMs("UTC", summer)).toBe(0);
  expect(zoneOffsetMs("Asia/Kolkata", summer)).toBe(5.5 * 3600000);
  expect(zoneOffsetMs("Asia/Kathmandu", summer)).toBe(5.75 * 3600000);
  expect(zoneOffsetMs("Pacific/Kiritimati", summer)).toBe(14 * 3600000);
  expect(zoneOffsetMs("Pacific/Pago_Pago", summer)).toBe(-11 * 3600000);

  // The same zone, two answers, because that is what summer time is. A
  // fixed table would get one of these wrong for half the year.
  expect(zoneOffsetMs("Europe/London", winter)).toBe(0);
  expect(zoneOffsetMs("Europe/London", summer)).toBe(1 * 3600000);
});

test(`[${TZ}] a shifted moment reads as that person's wall clock`, () => {
  // 21:30 UTC is already tomorrow in Jerusalem and still yesterday
  // afternoon in California. Both have to come out right.
  const at = Date.parse("2026-08-31T21:30:00Z");

  // getHours(), not getUTCHours(): inZone hands back a moment meant to be
  // read in the HOST's zone, whatever that is.
  expect(new Date(inZone({ tz: "Asia/Jerusalem", now: at }).now).getHours()).toBe(0);
  expect(new Date(inZone({ tz: "America/Los_Angeles", now: at }).now).getHours()).toBe(14);
});

test(`[${TZ}] the three clock helpers only ever compare shifted with shifted`, () => {
  // This is the property the whole design rests on. dayKey, atHour and
  // hoursUntilHour are written in local time; feeding them a shifted moment
  // is only legitimate because none of them reaches for the real present.
  const at = Date.parse("2026-08-31T16:30:00Z");
  const shifted = inZone({ tz: "Asia/Kolkata", now: at }).now; // 22:00 in Kolkata

  expect(hoursUntilHour(shifted, 23)).toBeCloseTo(1, 5);
  expect(atHour(shifted, 22)).toBeLessThanOrEqual(shifted);
  expect(atHour(shifted, 23)).toBeGreaterThan(shifted);
});

test(`[${TZ}] the sender agrees with the app, in every zone`, () => {
  // The real test. One person's fortnight in a given zone, judged the way
  // the Edge Function will judge it, checked against what the clock on
  // their own wall actually says.
  for (const tz of ZONES) {
    // 20:05 where they are — just past the default reminder hour — on a day
    // with nothing logged.
    const realNow = localOn(tz, 31, 20) + 5 * 60000;

    // A fortnight of entries at 09:00 local, stored as real instants under
    // the local day they happened on, exactly as the app would file them.
    const logs = {};
    for (let day = 18; day <= 30; day++) {
      const ts = localOn(tz, day, 9);
      logs[keyIn(tz, ts)] = [{ ts, trigger: "Habit" }];
    }

    const shifted = inZone({ tz, logs, cravings: {}, now: realNow });
    const profile = buildProfile({
      logs: shifted.logs,
      meta: { trackingStartedAt: keyIn(tz, localOn(tz, 18, 9)) },
      now: shifted.now,
    });
    const found = dueAlerts({
      profile,
      logs: shifted.logs,
      cravings: shifted.cravings,
      seen: {},
      now: shifted.now,
    });

    expect(
      found.map((a) => a.kind),
      `${tz}: expected an evening reminder`,
    ).toContain("reminder");
    // Filed under THEIR today, which is the independent Intl answer.
    expect(found.find((a) => a.kind === "reminder").id).toBe(`reminder:${keyIn(tz, realNow)}`);
    // And the 09:00-local entries read back as 09:00, not as some UTC hour.
    expect(profile.byHour[9], `${tz}: entries should land at 09:00 local`).toBeGreaterThan(0);
  }
});

test(`[${TZ}] an hour too early is silent in every zone`, () => {
  // The failure this guards against is not "no alert" — it is an alert at
  // the wrong hour, which is indistinguishable from a working feature until
  // somebody's phone buzzes at four in the morning.
  for (const tz of ZONES) {
    const realNow = localOn(tz, 31, 19);

    const logs = {};
    for (let day = 18; day <= 30; day++) {
      const ts = localOn(tz, day, 9);
      logs[keyIn(tz, ts)] = [{ ts, trigger: "Habit" }];
    }

    const shifted = inZone({ tz, logs, cravings: {}, now: realNow });
    const profile = buildProfile({
      logs: shifted.logs,
      meta: { trackingStartedAt: keyIn(tz, localOn(tz, 18, 9)) },
      now: shifted.now,
    });
    const found = dueAlerts({ profile, logs: shifted.logs, seen: {}, now: shifted.now });

    expect(
      found.map((a) => a.kind),
      `${tz}: 19:00 is too early`,
    ).not.toContain("reminder");
  }
});

test(`[${TZ}] shifting leaves the day keys and everything else alone`, () => {
  const logs = { "2026-08-30": [{ ts: 1000, trigger: "Coffee" }] };
  const shifted = inZone({ tz: "Asia/Jerusalem", logs, cravings: {}, now: 0 });
  expect(shifted.offset).not.toBe(Number.NaN);

  expect(Object.keys(shifted.logs)).toEqual(["2026-08-30"]);
  expect(shifted.logs["2026-08-30"][0].trigger).toBe("Coffee");
  expect(shifted.logs["2026-08-30"][0].ts).toBe(1000 + shifted.offset);
});

test(`[${TZ}] a rubbish zone falls back to UTC rather than throwing`, () => {
  // A subscription written before the column existed, or a browser that
  // reports something Intl has never heard of. UTC is the wrong hour for
  // most people and a working one for all of them; an exception here would
  // take down the whole run for everybody else in the batch.
  const utc = inZone({ tz: "UTC", logs: {}, cravings: {}, now: 5000 });
  for (const tz of [undefined, "", "Mars/Olympus_Mons"]) {
    const shifted = inZone({ tz, logs: {}, cravings: {}, now: 5000 });
    expect(shifted.offset).toBe(utc.offset);
    expect(shifted.now).toBe(utc.now);
  }
});

test(`[${TZ}] a tombstoned entry survives the shift as a tombstone`, () => {
  const logs = { "2026-08-30": [{ ts: 1000, trigger: "Coffee", d: 1, dAt: 2000 }] };
  const shifted = inZone({ tz: "UTC", logs, cravings: {}, now: 0 });
  expect(shifted.logs["2026-08-30"][0]).toMatchObject({ d: 1, dAt: 2000 });
});
