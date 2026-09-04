// ─────────────────────────────────────────────────────────────────────────
//  Reading somebody's record from outside their timezone.
//
//  Everything in this app is filed by LOCAL day, and the profile reads the
//  clock off every entry — byHour, peakWindow, the hour the day's first one
//  lands in. In a browser that is free: the browser already is where the
//  person is. On a server deciding whether to push, it is the whole problem.
//  A server runs in UTC, so getHours() on somebody's cigarette in Jerusalem
//  answers three hours early, and the "your heavy stretch is coming up"
//  alert would land mid-morning.
//
//  The fix is one shift, applied once, at the edge: move every timestamp
//  and `now` by the difference between the reader's offset and the host's,
//  and every local field downstream reads as the reader's clock. It works
//  because nothing in the pipeline compares a timestamp to the real present
//  — dayKey, atHour and hoursUntilHour only ever compare shifted against
//  shifted, and the day KEYS are already local strings the client wrote, so
//  they line up untouched.
//
//  Note the host's own offset is subtracted rather than assumed away. A
//  Supabase Edge Function runs in UTC, so it would cancel to nothing and
//  the simpler version would work — right up until it is run somewhere
//  else, including the machine of whoever is running the tests. A hidden
//  "this only works in UTC" is the same shape of bug this file exists to
//  fix, so it is not worth saving one subtraction.
//
//  WHY NOT A DIGEST. The obvious cheaper design is to have the app write
//  the handful of facts the server needs — peak window, streak, totals —
//  and let the server skip the profile entirely. It is cheaper and it is
//  wrong, for one reason that only shows up in the field: a digest is
//  written when the app is OPEN, and the person worth pushing to is the one
//  who has not opened it. Three quiet days and their "current smoke-free
//  run" is three days stale — so the milestone is wrong, the reminder is
//  wrong, and both are wrong in the direction of flattering somebody about
//  a record nobody checked. Recomputing costs one pass over a blob small
//  enough to fit in a jsonb column, and it is always true.
//
//  ONE HONEST LIMIT. The offset is taken once, for the moment being judged.
//  Entries recorded on the other side of a clock change are therefore
//  filed an hour out in the hour histogram — two days a year, one hour, in
//  a fortnight-wide average. That is invisible at this resolution and the
//  alternative is a per-entry Intl lookup on every row. Anything that has
//  to be exact about a past day reads the day KEY, which is unaffected.
// ─────────────────────────────────────────────────────────────────────────

import { zoneOffsetMs } from "../lib/dates.js";

/** Every timestamp in a day-keyed blob, moved by the same offset. */
function shiftDays(byDay, offset) {
  const shifted = {};
  for (const [day, rows] of Object.entries(byDay ?? {})) {
    shifted[day] = (rows ?? []).map((row) =>
      Number.isFinite(Number(row?.ts)) ? { ...row, ts: Number(row.ts) + offset } : row,
    );
  }
  return shifted;
}

/**
 * One person's record, rewritten so that a UTC reader sees their local
 * clock.
 *
 * @param {object} input
 * @param {string} input.tz        an IANA zone, e.g. "Asia/Jerusalem"
 * @param {object} input.logs      day key → entries
 * @param {object} input.cravings  day key → craving sessions
 * @param {number} input.now       the real moment being judged
 * @returns {{logs: object, cravings: object, now: number, offset: number}}
 *   ready to hand straight to buildProfile() and dueAlerts()
 */
export function inZone({ tz, logs, cravings, now = Date.now() }) {
  // An unknown or missing zone is not worth throwing over: UTC is a wrong
  // answer for most people but a working one for all of them, and a person
  // whose subscription predates the column still gets their reminder. An
  // exception here would take down the rest of the batch with it.
  let theirs = 0;
  try {
    theirs = zoneOffsetMs(tz || "UTC", now);
  } catch {
    theirs = 0;
  }

  // Whatever zone this process happens to be in, taken out again. Zero on a
  // UTC server, which is where this runs in production.
  const hosts = -new Date(now).getTimezoneOffset() * 60000;
  const offset = theirs - hosts;

  return {
    offset,
    now: now + offset,
    logs: shiftDays(logs, offset),
    cravings: shiftDays(cravings, offset),
  };
}
