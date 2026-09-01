// ─────────────────────────────────────────────────────────────────────────
//  Turning the log into the numbers the Insights tab shows.
//
//  One thing here is easy to get subtly wrong, and used to be: a day with
//  no cigarettes has no entries, so it has no key, so it is invisible. The
//  old code counted "days tracked" as the number of days that had at least
//  one entry — which meant a perfect day did not count, the daily average
//  was divided by too small a number, and "best (lowest) day" could never
//  be zero however well you did.
//
//  So the day range comes from when tracking started, not from the keys
//  present, and every day in between with nothing in it counts as a real
//  zero. That makes the average slightly less flattering and the best day
//  frequently zero — both of which are true — and it makes smoke-free days
//  countable at all, which is the number people actually want.
// ─────────────────────────────────────────────────────────────────────────

import { SQ_LANG, sqLocale } from "../i18n/index.js";
import { dayKey, dayKeysBetween, todayKey } from "../lib/dates.js";
import { allEntries, countOn } from "./entries.js";
export function computeInsights(logs, meta) {
  // Deleted entries are still in the blob as tombstones — see
  // domain/entries.js — and must never be counted as cigarettes.
  const entries = allEntries(logs);
  const total = entries.length;
  const byHour = new Array(24).fill(0);
  const triggerCounts = {};
  entries.forEach((entry) => {
    byHour[new Date(entry.ts).getHours()]++;
    // "Unlogged" is what a skipped trigger is filed as. It is a real entry,
    // it just has nothing to say about why — so it counts in the total and
    // in the hour chart, but never as a trigger.
    if (entry.trigger && entry.trigger !== "Unlogged") {
      triggerCounts[entry.trigger] = (triggerCounts[entry.trigger] || 0) + 1;
    }
  });

  // Every calendar day since tracking began, including the ones with
  // nothing logged — those are the good days.
  const startedAt = trackingStartedAt(logs, meta);
  const trackedKeys = dayKeysBetween(startedAt, todayKey());
  const countsPerDay = trackedKeys.map((key) => countOn(logs, key));
  const days = Math.max(trackedKeys.length, 1);
  const avgPerDay = total / days;
  const bestDay = countsPerDay.length ? Math.min(...countsPerDay) : 0;
  const smokeFreeDays = countsPerDay.filter((count) => count === 0).length;

  const peakHour = byHour.indexOf(Math.max(...byHour));
  const peakHourLabel = total === 0 ? "—" : formatHour(peakHour);

  const topTriggers = Object.entries(triggerCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const last7 = [];
  for (let back = 6; back >= 0; back--) {
    const date = new Date();
    date.setDate(date.getDate() - back);
    const key = dayKey(date);
    last7.push({
      date: key,
      count: countOn(logs, key),
      label: date.toLocaleDateString(sqLocale(), { weekday: "narrow" }),
    });
  }

  return {
    total,
    byHour,
    peakHour,
    days,
    avgPerDay,
    bestDay,
    smokeFreeDays,
    peakHourLabel,
    topTriggers,
    last7,
  };
}

/**
 * An hour of the day, written the way the reader expects to see it: a
 * twelve-hour clock in English, a twenty-four hour one in Hebrew. Both the
 * sentence about the peak and the axis under the chart go through here, so
 * they can never disagree about what to call the same hour.
 */
export function formatHour(hour) {
  if (SQ_LANG === "he") return `${String(hour).padStart(2, "0")}:00`;
  const twelve = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${twelve}${hour >= 12 ? "pm" : "am"}`;
}

/**
 * When this person started tracking. Recorded in meta at migration time;
 * for an account that has not been through that yet, the earliest day with
 * entries is the best available answer.
 */
export function trackingStartedAt(logs, meta) {
  if (meta?.trackingStartedAt) return meta.trackingStartedAt;
  const keys = Object.keys(logs ?? {}).sort();
  return keys.length ? keys[0] : todayKey();
}
