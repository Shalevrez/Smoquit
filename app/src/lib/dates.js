// ─────────────────────────────────────────────────────────────────────────
//  Dates.
//
//  todayKey is the key a day's entries are stored under.
// ─────────────────────────────────────────────────────────────────────────

import { sqLocale } from "../i18n/index.js";
export const todayKey = () => new Date().toISOString().slice(0, 10);
export const formatTime = (ts) =>
  new Date(ts).toLocaleTimeString(sqLocale(), {
    hour: "numeric",
    minute: "2-digit",
  });
