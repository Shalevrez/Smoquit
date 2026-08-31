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
// ─────────────────────────────────────────────────────────────────────────

import { sqLocale } from "../i18n/index.js";

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

export const formatTime = (ts) =>
  new Date(ts).toLocaleTimeString(sqLocale(), {
    hour: "numeric",
    minute: "2-digit",
  });
