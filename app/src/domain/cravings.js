// ─────────────────────────────────────────────────────────────────────────
//  Cravings, as distinct from cigarettes.
//
//  The app could only ever record failure. Every button was an admission —
//  "I smoked one" — and the moment a person most needed it, standing
//  outside deciding, there was nothing here at all. The tips tab has been
//  saying "ride the 5-minute wave" and "reward the skips" the whole time
//  without the app offering a wave to ride or rewarding a single skip.
//
//  A craving session records both outcomes. Only counting the wins would
//  make the number flattering and useless; "you rode out seven of eleven
//  this week" is a real fact about a real week, and it is the one that
//  tells somebody the wave is survivable.
//
//  Stored under its own key rather than inside logs. The logs blob is
//  rewritten in full on every single write, and cravings are the more
//  frequent event — there are more urges than cigarettes — so folding them
//  in would roughly double the churn on the largest row for no benefit.
// ─────────────────────────────────────────────────────────────────────────

import { dayKey, dayKeysBetween, todayKey } from "../lib/dates.js";

/** How long the wave is said to take. Three to five minutes, rounded up. */
export const WAVE_MS = 5 * 60 * 1000;

/** @typedef {{ts: number, trigger: string|null, outcome: "held"|"smoked", heldMs: number}} Craving */

/** Records one finished session under the local day it happened on. */
export function addCraving(cravings, session) {
  const key = dayKey(session.ts);
  const day = [...(cravings?.[key] ?? []), session];
  day.sort((a, b) => (Number(a?.ts) || 0) - (Number(b?.ts) || 0));
  return { ...cravings, [key]: day };
}

const on = (cravings, key) => cravings?.[key] ?? [];

/** How many urges were ridden out on one day. */
export const heldOn = (cravings, key) =>
  on(cravings, key).filter((c) => c.outcome === "held").length;

/**
 * Held, faced, and the share of one from the other, over a window of days.
 * `rate` is null rather than 0 when there is nothing to divide — no
 * cravings is not a 0% success rate.
 */
export function summarise(cravings, from, to = todayKey()) {
  let held = 0;
  let faced = 0;
  for (const key of dayKeysBetween(from, to)) {
    for (const session of on(cravings, key)) {
      faced += 1;
      if (session.outcome === "held") held += 1;
    }
  }
  return { held, faced, rate: faced === 0 ? null : held / faced };
}

/**
 * Two devices' craving logs, combined.
 *
 * The same argument as domain/entries.js makes for cigarettes: newest-write-
 * wins would drop whatever the other device recorded while it was offline,
 * and these are the rows that say somebody stood outside and did not smoke.
 * A session is immutable and identified by when it happened, so a union by
 * timestamp is both safe and enough — there is no edit to reconcile and no
 * deletion to honour, because a craving cannot be undone.
 */
export function mergeCravings(mine, theirs) {
  const days = new Set([...Object.keys(mine ?? {}), ...Object.keys(theirs ?? {})]);
  const merged = {};

  for (const day of days) {
    const byTs = new Map();
    for (const session of [...(mine?.[day] ?? []), ...(theirs?.[day] ?? [])]) {
      const ts = Number(session?.ts);
      if (!Number.isFinite(ts)) continue;
      if (!byTs.has(ts)) byTs.set(ts, session);
    }
    merged[day] = [...byTs.values()].sort((a, b) => a.ts - b.ts);
  }
  return merged;
}
