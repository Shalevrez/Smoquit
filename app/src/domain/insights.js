// ─────────────────────────────────────────────────────────────────────────
//  Turning the log into the numbers the Insights tab shows.
// ─────────────────────────────────────────────────────────────────────────

import { SQ_LANG, sqLocale } from "../i18n/index.js";
export function computeInsights(logs) {
  const entries = [];
  Object.values(logs).forEach((day) => day.forEach((entry) => entries.push(entry)));

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

  const daysWithEntries = Object.keys(logs).filter((key) => logs[key].length > 0);
  const days = Math.max(daysWithEntries.length, 1);
  const avgPerDay = total / days;
  const countsPerDay = daysWithEntries.map((key) => logs[key].length);
  const bestDay = countsPerDay.length ? Math.min(...countsPerDay) : 0;

  const peakHour = byHour.indexOf(Math.max(...byHour));
  const peakHourLabel =
    total === 0
      ? "—"
      : SQ_LANG === "he"
        ? `${String(peakHour).padStart(2, "0")}:00`
        : `${peakHour === 0 ? 12 : peakHour > 12 ? peakHour - 12 : peakHour}${peakHour >= 12 ? "pm" : "am"}`;

  const topTriggers = Object.entries(triggerCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const last7 = [];
  for (let back = 6; back >= 0; back--) {
    const date = new Date();
    date.setDate(date.getDate() - back);
    const key = date.toISOString().slice(0, 10);
    last7.push({
      date: key,
      count: (logs[key] || []).length,
      label: date.toLocaleDateString(sqLocale(), { weekday: "narrow" }),
    });
  }

  return { total, byHour, days, avgPerDay, bestDay, peakHourLabel, topTriggers, last7 };
}
