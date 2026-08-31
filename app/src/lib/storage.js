// ─────────────────────────────────────────────────────────────────────────
//  Reading and writing a person's data.
//
//  Everything lives in one table of (user_id, key, value) rows — three per
//  person: logs, goal and settings. Row-level security in the database
//  restricts every row to its own user, so a bug up here cannot show one
//  person another's data.
//
//  Nothing is stored for a signed-out visitor: both calls simply do nothing
//  without a user id.
//
//  saveKey reports whether the write landed. It used to swallow everything
//  and return undefined, so no caller could tell a failed write from a
//  successful one — fine when the only thing above it was a click handler,
//  not fine for anything that has to write in a safe order.
//
//  When a read or write fails, window.SMOQUIT_STORAGE_ERROR puts a banner
//  across the top of the screen naming the cause and printing the database's
//  own error code. That lives in storage-health.js, a runtime file at the
//  root, because the failure it reports is usually that the database was
//  never set up — in which case saying so out loud beats failing silently
//  and looking fine until the next reload.
// ─────────────────────────────────────────────────────────────────────────

import { clearCache } from "./cache.js";
import { supabase } from "./supabase.js";

/**
 * Puts the red banner across the top of the screen — but only for failures
 * a person can do something about.
 *
 * A dropped connection is not one of them. The app keeps working offline
 * now: the write is in the queue and will land. Shouting about it would
 * train people to ignore the banner, and the banner's whole job is to be
 * believed when the database really is misconfigured.
 */
function reportStorageError(kind, key, err) {
  if (isOffline(err)) return;
  window.SMOQUIT_STORAGE_ERROR && window.SMOQUIT_STORAGE_ERROR(kind, key, err);
}

/** Does this failure look like "no network" rather than "no permission"? */
export function isOffline(err) {
  if (typeof navigator !== "undefined" && navigator.onLine === false) return true;
  // supabase-js surfaces a failed fetch as a TypeError with no Postgres
  // code; a real database refusal always carries one.
  const code = err?.code ?? "";
  if (code) return code === "" || /fetch|network/i.test(String(err?.message ?? ""));
  return /failed to fetch|networkerror|load failed/i.test(String(err?.message ?? ""));
}
export async function currentUserId() {
  var user;
  const { data } = await supabase.auth.getUser();
  return ((user = data?.user) == null ? undefined : user.id) || null;
}
/**
 * Reads one row.
 *
 * Returns the value and when the server last changed it — the timestamp is
 * what lets a caller tell a stale local copy from a fresh one — plus
 * whether the read actually reached the database. Being offline is not the
 * same as having no data, and the two used to be indistinguishable here.
 *
 * @returns {Promise<{value: any, updatedAt: string|null, ok: boolean}>}
 */
export async function loadRow(key) {
  try {
    const userId = await currentUserId();
    if (!userId) return { value: null, updatedAt: null, ok: false };
    const { data, error } = await supabase
      .from("user_data")
      .select("value, updated_at")
      .eq("user_id", userId)
      .eq("key", key)
      .maybeSingle();
    if (error) throw error;
    return { value: data ? data.value : null, updatedAt: data?.updated_at ?? null, ok: true };
  } catch (err) {
    console.error("loadKey failed", key, err);
    reportStorageError("load", key, err);
    return { value: null, updatedAt: null, ok: false };
  }
}

export async function loadKey(key, fallback) {
  const { value } = await loadRow(key);
  return value === null || value === undefined ? fallback : value;
}

/** @returns {Promise<boolean>} whether the write actually landed. */
export async function saveKey(key, value) {
  try {
    const userId = await currentUserId();
    // Signed out: nothing to write to, and nothing went wrong.
    if (!userId) return false;
    const { error } = await supabase.from("user_data").upsert(
      {
        user_id: userId,
        key,
        value,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,key" },
    );
    if (error) throw error;
    return true;
  } catch (err) {
    console.error("saveKey failed", key, err);
    reportStorageError("save", key, err);
    return false;
  }
}
export async function deleteAllData() {
  const userId = await currentUserId();
  if (!userId) return;
  await supabase.from("user_data").delete().eq("user_id", userId);
  // "Delete all my data" has to mean the copy on this device too.
  clearCache(userId);
}
