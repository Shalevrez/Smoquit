// ─────────────────────────────────────────────────────────────────────────
//  Moving stored history onto local day keys.
//
//  Entries were filed under a UTC date while everything that read them
//  worked in local time (see lib/dates.js). Fixing the key without moving
//  the existing entries would silently reshuffle everyone's history — a
//  cigarette logged at 01:00 would stay in yesterday's bucket while the app
//  drew it in today's.
//
//  Every entry carries an absolute `ts`, so no information is missing: the
//  correct bucket can be recomputed from the entry itself. That makes this
//  lossless, and a no-op for anyone in a timezone near UTC.
//
//  It rewrites the one row that holds someone's entire history, so it is
//  written to be undoable and to fail safe:
//
//    • the old value is copied to its own row FIRST, so a bad outcome is
//      recoverable rather than merely regrettable;
//    • the schema version is only recorded after the rewrite is confirmed
//      landed, so a failed migration simply runs again next time instead of
//      marking itself done;
//    • it is held behind a single promise, because React's StrictMode runs
//      effects twice in development and two concurrent runs would race over
//      the backup.
//
//  The re-bucketing happens in whatever timezone the person is in NOW,
//  which may not be where they were when they logged. That is inherent to
//  "local day" — the alternative is storing an offset per entry, a much
//  larger change — and it is the right answer for the ordinary case.
// ─────────────────────────────────────────────────────────────────────────

import { sweepTombstones } from "../domain/entries.js";
import { dayKey } from "./dates.js";
import { saveKey } from "./storage.js";

export const SCHEMA_VERSION = 2;
export const BACKUP_KEY = "logs_backup_v1";

/** Re-files every entry under the local day its own timestamp falls in. */
export function rebucketByLocalDay(logs) {
  const next = {};
  let moved = 0;

  for (const [key, entries] of Object.entries(logs ?? {})) {
    for (const entry of entries ?? []) {
      // An entry with no usable timestamp cannot be placed, so it stays
      // where it is rather than being dropped or guessed at.
      const ts = Number(entry?.ts);
      const target = Number.isFinite(ts) ? dayKey(ts) : key;
      if (target !== key) moved += 1;
      (next[target] ??= []).push(entry);
    }
  }

  for (const entries of Object.values(next)) {
    entries.sort((a, b) => (Number(a?.ts) || 0) - (Number(b?.ts) || 0));
  }
  return { logs: next, moved };
}

/** The earliest day present, which is when tracking started. */
export function earliestDay(logs) {
  const keys = Object.keys(logs ?? {}).sort();
  return keys.length ? keys[0] : dayKey();
}

let inFlight = null;

/**
 * Brings one account's stored data up to SCHEMA_VERSION.
 *
 * @returns {Promise<{logs: object, meta: object}>} what to render. On
 *   failure this is the data exactly as it was found, with meta left
 *   unversioned so the next boot tries again.
 */
export function migrate(logs, meta) {
  inFlight ??= run(logs, meta).finally(() => {
    inFlight = null;
  });
  return inFlight;
}

async function run(logs, meta) {
  const version = Number(meta?.schemaVersion) || 1;
  if (version >= SCHEMA_VERSION) return { logs, meta };

  const { logs: rebucketed, moved } = rebucketByLocalDay(logs);
  // Deletions older than a month have long since reached every device.
  const { logs: swept, dropped } = sweepTombstones(rebucketed);
  const next = {
    ...meta,
    schemaVersion: SCHEMA_VERSION,
    migratedAt: new Date().toISOString(),
    // When tracking began, so that a day with no cigarettes can be counted
    // as a real zero rather than being invisible for having no entries.
    trackingStartedAt: meta?.trackingStartedAt ?? earliestDay(swept),
  };

  const hasHistory = Object.keys(logs ?? {}).length > 0;

  if (moved > 0 || dropped > 0) {
    if (!(await saveKey(BACKUP_KEY, logs))) {
      console.warn("migrate: could not save a backup, leaving the data alone");
      return { logs, meta };
    }
    if (!(await saveKey("logs", swept))) {
      console.warn("migrate: could not write the re-bucketed logs, leaving the data alone");
      return { logs, meta };
    }
    console.info(
      `migrate: moved ${moved} entr${moved === 1 ? "y" : "ies"} to their local day` +
        (dropped ? `, swept ${dropped} old deletion(s)` : ""),
    );
  }

  // Record the version last, and only if it sticks. An unversioned account
  // is safe — it just migrates again — whereas one marked done that never
  // finished is not.
  if (!(await saveKey("meta", next)) && hasHistory) {
    return { logs: moved > 0 || dropped > 0 ? swept : logs, meta };
  }
  return { logs: moved > 0 || dropped > 0 ? swept : logs, meta: next };
}

/** Test seam: forget any in-flight run. */
export function resetMigrationForTests() {
  inFlight = null;
}
