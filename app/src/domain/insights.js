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
//  formatHour used to live here too, and took an import of i18n/index.js
//  with it — which took React, and a call that touches `document` at import
//  time. That made this module, and everything importing it, unusable
//  outside a browser. It is in i18n/format.js now; this file answers only
//  what is true.
//
//  The hard-won bit, kept from the original and still true: the day range
//  comes from when tracking started, NOT from which days happen to have a
//  key. A day with no cigarettes has no entries, so it has no key, so it is
//  invisible — which used to mean a perfect day did not count, the daily
//  average was divided by too small a number, and the best day could never
//  be zero however well somebody did.
// ─────────────────────────────────────────────────────────────────────────

import { todayKey } from "../lib/dates.js";

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
