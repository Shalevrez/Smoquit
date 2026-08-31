// ─────────────────────────────────────────────────────────────────────────
//  A local copy of what is in the account.
//
//  Two things this buys, and they are the same thing from either end:
//
//    • The app opens instantly, and opens at all with no signal. Before
//      this, every screen waited on three round trips behind a loading
//      message, and a dead connection meant a red banner instead of an app.
//
//    • A cigarette can be logged in a stairwell. That is not a hypothetical
//      — it is most of them. The write goes to localStorage first and to
//      the network when there is one.
//
//  localStorage rather than IndexedDB: it is synchronous, which is what
//  makes the instant first paint possible, it is already used for the
//  language, and years of entries fit inside the few megabytes on offer.
//  If that ever stops being true, this file is the only one to replace.
//
//  Everything is namespaced by user id, so two accounts on one phone cannot
//  read each other's cache, and signing out of one leaves the other alone.
// ─────────────────────────────────────────────────────────────────────────

const PREFIX = "smoquit.cache";

const entryKey = (userId, key) => `${PREFIX}.${userId}.${key}`;

/**
 * Reads a cached value.
 *
 * Storage can throw rather than merely be empty — Safari in private mode,
 * a browser set to block site data — so every access is guarded and a
 * failure just means "no cache", never a broken app.
 */
export function readCache(userId, key) {
  if (!userId) return null;
  try {
    const raw = window.localStorage.getItem(entryKey(userId, key));
    return raw === null ? null : JSON.parse(raw);
  } catch {
    return null;
  }
}

/** @returns {boolean} whether it was actually stored. */
export function writeCache(userId, key, entry) {
  if (!userId) return false;
  try {
    window.localStorage.setItem(entryKey(userId, key), JSON.stringify(entry));
    return true;
  } catch (err) {
    // Out of quota, or storage refused outright. The app carries on against
    // the network; it is a cache, and a cache is allowed to be missing.
    console.warn("cache: could not store", key, err);
    return false;
  }
}

export function clearCache(userId) {
  if (!userId) return;
  try {
    const doomed = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const name = window.localStorage.key(i);
      if (name?.startsWith(`${PREFIX}.${userId}.`)) doomed.push(name);
    }
    for (const name of doomed) window.localStorage.removeItem(name);
  } catch {
    // Nothing to be done, and nothing worth breaking the sign-out over.
  }
}
