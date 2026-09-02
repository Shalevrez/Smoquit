// ─────────────────────────────────────────────────────────────────────────
//  The two things everything else needs in order to read a log.
//
//  This file used to hold computeInsights(), which walked the whole log to
//  produce the numbers the Insights tab showed. Once domain/profile.js
//  existed there were two walks over the same days answering overlapping
//  questions — and, briefly, disagreeing about the money — so the counting
//  moved there and what is left here is the pair of helpers that everybody,
//  the profile included, has to agree on:
//
//    trackingStartedAt  where the record begins, which decides how many days
//                       "a day" is being divided by and therefore every
//                       average, streak and smoke-free count in the app.
//    formatHour         what to call an hour, which the sentence about a
//                       peak and the axis under the chart must never
//                       disagree about.
//
//  The hard-won bit, kept from the original and still true: the day range
//  comes from when tracking started, NOT from which days happen to have a
//  key. A day with no cigarettes has no entries, so it has no key, so it is
//  invisible — which used to mean a perfect day did not count, the daily
//  average was divided by too small a number, and the best day could never
//  be zero however well somebody did.
// ─────────────────────────────────────────────────────────────────────────

import { SQ_LANG } from "../i18n/index.js";
import { todayKey } from "../lib/dates.js";

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
