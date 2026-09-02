// ─────────────────────────────────────────────────────────────────────────
//  What the cigarettes you did not smoke were worth.
//
//  The same three lines of arithmetic were written out in three places —
//  the today screen, the goal screen, and once more for the tips — and two
//  of them disagreed. The goal screen totalled over the days that had a key
//  in the log, which quietly skips every day nobody opened the app; those
//  are the days with nothing on them, so it was leaving out the best ones
//  and under-reporting somebody's own saving. Everything else in this app
//  counts a tracked day as a real day whether or not it has a key.
//
//  So it is one function now, and it takes the days to count rather than
//  inventing them, because who decides which days are tracked is a question
//  with exactly one answer and it lives in the profile.
//
//  A price per pack is per twenty. That is a real assumption and a wrong
//  one for some products, but the settings screen asks for a pack price
//  rather than a unit price, and inventing a pack size per brand would be
//  a worse guess than the one everybody already understands.
// ─────────────────────────────────────────────────────────────────────────

import { countOn } from "./entries.js";

/** Cigarettes in the pack the price is quoted for. */
export const PER_PACK = 20;

/** A sensible price when nothing has been saved yet, in whatever currency. */
export const DEFAULT_PACK_PRICE = 13;

export const pricePerCigarette = (settings) =>
  (settings?.pricePerPack ?? DEFAULT_PACK_PRICE) / PER_PACK;

/**
 * The cigarettes not smoked on one day, against the old usual day.
 * Never negative: a bad day costs money, but it does not un-save what
 * earlier days saved, and a running total that went backwards would be
 * read as a punishment rather than a fact.
 */
export const avoidedOn = (count, baseline) => Math.max(0, (baseline ?? 0) - count);

/**
 * Cigarettes avoided and what they were worth, over the days given.
 *
 * @returns {{avoided: number|null, saved: number|null, perDay: number|null}}
 *   all null when there is no baseline, because without one there is
 *   nothing to have saved against and a zero would read as a failure.
 */
export function savedOver(logs, keys, goal, settings) {
  if (!goal?.baseline) return { avoided: null, saved: null, perDay: null };
  let avoided = 0;
  for (const key of keys) avoided += avoidedOn(countOn(logs, key), goal.baseline);
  const saved = avoided * pricePerCigarette(settings);
  return { avoided, saved, perDay: keys.length ? saved / keys.length : null };
}
