// ─────────────────────────────────────────────────────────────────────────
//  Entries, and what "deleted" means for one.
//
//  Undo removes an entry by marking it rather than by splicing it out. That
//  looks like extra work for nothing until two devices are involved:
//
//    Phone logs three cigarettes offline. Laptop, meanwhile, deletes one.
//    They meet. Merging is a union of both sides by timestamp — anything
//    else drops whichever device wrote second, which is the one thing this
//    app must never do to somebody's record. But a union brings the deleted
//    entry back, because "absent" and "never existed" are the same shape.
//
//  A tombstone is the difference. The entry stays, flagged, so a deletion
//  is something the merge can see and honour. They are swept up after a
//  month, by which time every device has long since caught up.
//
//  Everything that reads entries goes through liveEntries(). Counting a
//  tombstone as a cigarette would be worse than not deleting it at all.
// ─────────────────────────────────────────────────────────────────────────

import { dayKey } from "../lib/dates.js";

/** How long a deletion is remembered before being swept away. */
export const TOMBSTONE_DAYS = 30;

/** The entries of one day that are actually cigarettes. */
export const liveEntries = (entries) => (entries ?? []).filter((entry) => !entry?.d);

/** The entries logged on one day. */
export const entriesOn = (logs, key) => liveEntries(logs?.[key]);

/** How many cigarettes on one day. */
export const countOn = (logs, key) => entriesOn(logs, key).length;

/** Every live entry across every day, oldest first. */
export function allEntries(logs) {
  const all = [];
  for (const entries of Object.values(logs ?? {})) all.push(...liveEntries(entries));
  return all.sort((a, b) => (Number(a?.ts) || 0) - (Number(b?.ts) || 0));
}

/** Marks one entry deleted, keeping the record of the deletion. */
export function markDeleted(entries, index) {
  const live = liveEntries(entries);
  const target = live[index];
  if (!target) return entries ?? [];
  return (entries ?? []).map((entry) =>
    entry === target ? { ...entry, d: 1, dAt: Date.now() } : entry,
  );
}

/**
 * Combines two versions of the log.
 *
 * Union by timestamp, because both sides may hold writes the other never
 * saw. Where the same entry exists on both, a deletion wins over a
 * survival — a deletion is a decision somebody made, whereas the other side
 * has merely not heard about it yet — and otherwise the later edit wins.
 */
export function mergeLogs(mine, theirs) {
  const days = new Set([...Object.keys(mine ?? {}), ...Object.keys(theirs ?? {})]);
  const merged = {};

  for (const day of days) {
    const byTs = new Map();
    for (const entry of [...(mine?.[day] ?? []), ...(theirs?.[day] ?? [])]) {
      const ts = Number(entry?.ts);
      if (!Number.isFinite(ts)) continue;
      const existing = byTs.get(ts);
      byTs.set(ts, existing ? reconcile(existing, entry) : entry);
    }
    merged[day] = [...byTs.values()].sort((a, b) => a.ts - b.ts);
  }
  return merged;
}

function reconcile(a, b) {
  if (a.d && !b.d) return a;
  if (b.d && !a.d) return b;
  // Same entry, both live or both deleted: nothing to choose between them
  // beyond taking a trigger over a missing one.
  return b.trigger && !a.trigger ? b : a;
}

/** Drops tombstones old enough that every device has seen them. */
export function sweepTombstones(logs, now = Date.now()) {
  const cutoff = now - TOMBSTONE_DAYS * 24 * 60 * 60 * 1000;
  const swept = {};
  let dropped = 0;

  for (const [day, entries] of Object.entries(logs ?? {})) {
    const kept = (entries ?? []).filter((entry) => {
      if (!entry?.d) return true;
      // A tombstone with no time on it is dated by the entry it replaces.
      const at = Number(entry.dAt) || Number(entry.ts) || 0;
      if (at >= cutoff) return true;
      dropped += 1;
      return false;
    });
    // A day that only ever held deletions still counts as a day that was
    // tracked, so the empty array stays.
    swept[day] = kept;
  }
  return { logs: swept, dropped };
}

/** Where an entry belongs, given its time. */
export const dayOf = (entry) => dayKey(Number(entry?.ts));
