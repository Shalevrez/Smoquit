// ─────────────────────────────────────────────────────────────────────────
//  Turning numbers into something a person reads.
//
//  These two used to live where they were first needed — formatTime in
//  lib/dates.js, formatHour in domain/insights.js — and each one dragged an
//  import of i18n/index.js in behind it. That was invisible and free right
//  up until something outside a browser had to read this code: i18n/index.js
//  imports React and calls sqApplyLangToDocument() at the bottom of the
//  file, so merely IMPORTING lib/dates.js touched `document`. In Deno that
//  throws during the import, before a line of our own code runs.
//
//  The layering was already the right shape and only the placement was
//  wrong. domain/ and lib/ answer what is true; this file answers what to
//  call it. Keeping the two apart is what lets a server run the same rules
//  as the app without pretending to have a language or a page.
//
//  Both go through the reader's language, which is why they belong together
//  and why nothing else may re-derive an hour or a time of its own — the
//  sentence about a peak, the axis under the chart, the reminder picker in
//  settings and the push notification all have to call the same hour by the
//  same name.
// ─────────────────────────────────────────────────────────────────────────

import { SQ_LANG, sqLocale } from "./index.js";

/**
 * An hour of the day: a twelve-hour clock in English, a twenty-four hour
 * one in Hebrew.
 */
export function formatHour(hour) {
  if (SQ_LANG === "he") return `${String(hour).padStart(2, "0")}:00`;
  const twelve = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${twelve}${hour >= 12 ? "pm" : "am"}`;
}

/** A moment, as a clock time in the reader's locale. */
export const formatTime = (ts) =>
  new Date(ts).toLocaleTimeString(sqLocale(), {
    hour: "numeric",
    minute: "2-digit",
  });
