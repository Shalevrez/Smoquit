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

import { supabase } from "./supabase.js";
export async function currentUserId() {
  var user;
  const { data } = await supabase.auth.getUser();
  return ((user = data?.user) == null ? undefined : user.id) || null;
}
export async function loadKey(key, fallback) {
  try {
    const userId = await currentUserId();
    if (!userId) return fallback;
    const { data, error } = await supabase
      .from("user_data")
      .select("value")
      .eq("user_id", userId)
      .eq("key", key)
      .maybeSingle();
    if (error) throw error;
    return data ? data.value : fallback;
  } catch (err) {
    return (
      console.error("loadKey failed", key, err),
      window.SMOQUIT_STORAGE_ERROR && window.SMOQUIT_STORAGE_ERROR("load", key, err),
      fallback
    );
  }
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
    window.SMOQUIT_STORAGE_ERROR && window.SMOQUIT_STORAGE_ERROR("save", key, err);
    return false;
  }
}
export async function deleteAllData() {
  const userId = await currentUserId();
  userId && (await supabase.from("user_data").delete().eq("user_id", userId));
}
