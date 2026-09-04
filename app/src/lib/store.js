// ─────────────────────────────────────────────────────────────────────────
//  Reading and writing, without needing the network to be there.
//
//  The shape is cache-first with a queue behind it:
//
//    read   local copy, immediately and synchronously → render → ask the
//           server in the background → reconcile.
//    write  local copy, immediately → mark it pending → try to send it →
//           clear the flag when it lands.
//
//  Anything still pending is retried when the browser says it is online
//  again, and on the next start. So a cigarette logged with no signal is
//  logged, full stop; it reaches the account when there is an account to
//  reach.
//
//  RECONCILING IS A MERGE, NOT A REPLACEMENT. The obvious approach — newest
//  write wins — quietly destroys data the moment somebody uses two devices:
//  log on a phone with no signal, open a laptop, and the phone's entries
//  disappear on its next sync. For an app whose whole promise is an honest
//  record, that is the worst available bug. Entries are unioned by
//  timestamp instead, which is safe because an entry is immutable once
//  written and a deletion leaves a tombstone behind (see domain/entries.js).
//
//  Settings, the goal and meta are single small objects with no history to
//  lose, so those do take the newest write.
// ─────────────────────────────────────────────────────────────────────────

import { mergeAlerts } from "../domain/alerts.js";
import { mergeFeedback } from "../domain/coach.js";
import { mergeCravings } from "../domain/cravings.js";
import { mergeLogs } from "../domain/entries.js";
import { mergeExperiments } from "../domain/experiments.js";
import { readCache, writeCache } from "./cache.js";
import { currentUserId, loadRow, saveKey } from "./storage.js";

/**
 * Rows that accumulate, and how to combine two versions of one.
 *
 * A row not named here is a single small object with no history to lose —
 * the goal, the settings, the migration meta — and takes the newest write.
 * Everything listed is something a person added to over time on whichever
 * device was in their hand, so replacing it wholesale loses whatever the
 * other one recorded while it was offline. Each merge lives beside the data
 * it understands; this is only the register of which key gets which.
 */
const MERGERS = {
  logs: mergeLogs,
  cravings: mergeCravings,
  habits: mergeExperiments,
  tipFeedback: mergeFeedback,
  // Note this one runs the opposite way round to the line above it. A tip
  // verdict is an opinion, so the newer statement wins; a record of an alert
  // having been shown is evidence, so the EARLIER one does. mergeAlerts says
  // why at more length.
  alerts: mergeAlerts,
};

let userId = null;
const pending = new Map(); // key -> the value still owed to the server

export async function openStore() {
  userId = await currentUserId();
  return userId;
}

/** Test seam: forget the signed-in user and anything queued. */
export function resetStore() {
  userId = null;
  pending.clear();
}

/** What the local copy says, right now, with no waiting. */
export function cached(key, fallback = null) {
  const entry = readCache(userId, key);
  if (!entry) return fallback;
  if (entry.pending) pending.set(key, entry.value);
  return entry.value ?? fallback;
}

/**
 * Asks the server for a row and reconciles it with what is held locally.
 *
 * @returns {Promise<{value: any, ok: boolean}>} ok is false when the server
 *   could not be reached, in which case value is whatever we already had.
 */
export async function refresh(key, fallback = null) {
  const local = readCache(userId, key);
  const { value: remote, ok } = await loadRow(key);

  if (!ok) return { value: local?.value ?? fallback, ok: false };
  if (remote === null || remote === undefined) {
    // Nothing on the server. If we are holding an unsent write, it is the
    // only copy there is — keep it and let the queue deliver it.
    return { value: local?.pending ? local.value : fallback, ok: true };
  }

  if (!local?.pending) {
    store(key, remote, false);
    return { value: remote, ok: true };
  }

  const merge = MERGERS[key];
  const merged = merge ? merge(local.value, remote) : local.value;
  store(key, merged, true);
  return { value: merged, ok: true };
}

/**
 * Writes a value. Local first, so it is never lost; the network is best
 * effort and retried.
 */
export function write(key, value) {
  store(key, value, true);
  pending.set(key, value);
  void flush();
  return value;
}

/** Sends everything still owed to the server. */
export async function flush() {
  if (!userId || pending.size === 0) return;
  for (const [key, value] of [...pending.entries()]) {
    // Send what the queue holds now: a newer write may have replaced it
    // while an earlier attempt was in flight.
    const owed = pending.get(key);
    if (owed !== value) continue;
    if (await saveKey(key, owed)) {
      // Only clear it if nothing arrived in the meantime.
      if (pending.get(key) === owed) {
        pending.delete(key);
        store(key, owed, false);
      }
    }
  }
}

/** Whether anything is still waiting to reach the account. */
export const hasUnsent = () => pending.size > 0;

function store(key, value, isPending) {
  writeCache(userId, key, { value, pending: isPending, at: Date.now() });
}

/** Retries the queue when the connection comes back, and when we return. */
export function watchConnection() {
  const retry = () => void flush();
  window.addEventListener("online", retry);
  document.addEventListener("visibilitychange", retry);
  return () => {
    window.removeEventListener("online", retry);
    document.removeEventListener("visibilitychange", retry);
  };
}
