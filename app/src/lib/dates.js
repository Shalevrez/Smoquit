// ─────────────────────────────────────────────────────────────────────────
//  Dates.
//
//  A day here is a LOCAL day. That sounds obvious and it was not always
//  true: this used to derive the key from toISOString(), which is UTC,
//  while everything around it — the timeline, the hour chart, the midnight
//  clamp when correcting a time, the weekday labels — worked in local time.
//
//  In Israel, at UTC+3, that filed a cigarette smoked at 01:00 under
//  yesterday and then drew it at hour 1 of today. "Cigarettes today" reset
//  at 03:00 rather than at midnight, and the seven-day chart paired a
//  UTC-keyed count with a local weekday letter.
//
//  Everything downstream — streaks, weekday patterns, any per-day target —
//  is wrong if this is wrong, so it is one function and only one function.
//
//  Nothing here imports anything, and that is deliberate. formatTime used to
//  live in this file and pulled i18n/index.js in with it, which pulled in
//  React and a call that touches `document` at import time — so importing a
//  date helper was enough to make the module unusable outside a browser. It
//  lives in i18n/format.js now. Keep this file answering only what is true
//  about a day; what to call it is somebody else's job.
// ─────────────────────────────────────────────────────────────────────────

const pad = (n) => String(n).padStart(2, "0");

/** The key a day's entries are stored under: YYYY-MM-DD, in local time. */
export function dayKey(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Today's key. */
export const todayKey = () => dayKey();

/**
 * Every day key from `from` to `to` inclusive, oldest first. Walks by
 * calendar date rather than by adding 24 hours, so the day a clock change
 * makes 23 or 25 hours long still counts once.
 */
export function dayKeysBetween(from, to) {
  const start = from instanceof Date ? new Date(from) : new Date(`${from}T00:00:00`);
  const end = to instanceof Date ? new Date(to) : new Date(`${to}T00:00:00`);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const keys = [];
  const cursor = new Date(start);
  while (cursor <= end) {
    keys.push(dayKey(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return keys;
}

/** Local midnight at the start of the day a timestamp falls in. */
export function startOfDay(ts) {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

/**
 * A wall-clock hour on the day a timestamp falls in, in local time.
 *
 * Deliberately setHours() rather than startOfDay(ts) + hour * 3600000. Twice
 * a year a local day is 23 or 25 hours long, and on those two days the
 * arithmetic version lands an hour away from the hour it names — which is
 * the same class of mistake as the UTC day key above, found the same way,
 * and invisible to anybody testing in a zone that does not change its
 * clocks.
 */
export function atHour(ts, hour) {
  const d = new Date(ts);
  d.setHours(hour, 0, 0, 0);
  return d.getTime();
}

/**
 * How far ahead of UTC a zone is at a given moment, in milliseconds.
 *
 * Derived from Intl rather than from a table, so it is right about summer
 * time, about the half-hour zones (India is +5:30, Nepal +5:45) and about
 * the fact that the answer changes twice a year. Nothing here guesses.
 *
 * This exists for one caller: something running outside the reader's
 * browser — a server, in UTC — that has to decide whether it is yet eight
 * in the evening WHERE THEY ARE. Adding this to a timestamp gives a number
 * whose UTC fields read as that person's local clock, which is exactly what
 * dayKey(), atHour() and hoursUntilHour() need, because all three only ever
 * compare a shifted value against another shifted value.
 */
export function zoneOffsetMs(timeZone, at = Date.now()) {
  const when = new Date(at);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(when);

  const field = (type) => Number(parts.find((part) => part.type === type)?.value);
  const local = Date.UTC(
    field("year"),
    field("month") - 1,
    field("day"),
    field("hour"),
    field("minute"),
    field("second"),
  );
  // The seconds are all Intl gives us, so compare like with like.
  return local - Math.floor(when.getTime() / 1000) * 1000;
}

/**
 * How many hours from now until the next time the clock reads `hour`.
 *
 * Circular, and that is the whole point: at 22:10, hour 23 is 50 minutes
 * away and hour 21 is 22 hours and change away, not minus one. A plain
 * subtraction gets the wrap backwards, which would make a peak window that
 * starts at 23:00 look imminent all morning and silent at the one moment it
 * matters.
 */
export function hoursUntilHour(ts, hour) {
  const d = new Date(ts);
  const now = d.getHours() + d.getMinutes() / 60;
  return (hour - now + 24) % 24;
}
