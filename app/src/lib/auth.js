// ─────────────────────────────────────────────────────────────────────────
//  Signing in.
//
//  fetchEnabledProviders asks the Supabase project which social logins are
//  actually switched on, so the login screen can show a Google or Apple
//  button only when pressing it would work. Turning one on is done in the
//  Supabase dashboard and needs no rebuild here — see UPLOAD-ME-README.txt.
//
//  signInWithProvider sends people back to window.location.origin, which
//  Supabase will refuse unless that exact address is in the project's
//  redirect list. That is the usual cause of a social login bouncing to an
//  old address after a move.
// ─────────────────────────────────────────────────────────────────────────

import React from "react";
import { sqT } from "../i18n/index.js";
import { clearCache } from "./cache.js";
import { currentUserId } from "./storage.js";
import { SUPABASE_ANON_KEY, SUPABASE_URL, supabase } from "./supabase.js";
export function useAuth() {
  const [t, e] = React.useState(null),
    [r, n] = React.useState(false);
  return (
    React.useEffect(() => {
      supabase.auth.getSession().then(({ data }) => {
        e(data.session);
        n(true);
      });
      const { data } = supabase.auth.onAuthStateChange((i, o) => {
        e(o);
      });
      return () => data.subscription.unsubscribe();
    }, []),
    {
      session: t,
      user: t?.user ?? null,
      ready: r,
    }
  );
}
export async function signInWithPassword(email, password) {
  return supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
}
export async function signUpWithPassword(email, password) {
  return supabase.auth.signUp({
    email: email,
    password: password,
  });
}
export async function signInWithProvider(provider) {
  return supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: window.location.origin,
    },
  });
}
export async function signOut() {
  // Clear the local copy first, while the user id is still knowable. A
  // cache that outlives the session would show one person's history to
  // whoever signs in next on the same phone.
  clearCache(await currentUserId());
  return supabase.auth.signOut();
}
export async function fetchEnabledProviders() {
  var fallback = {
    google: true,
    apple: true,
  };
  try {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return fallback;
    var base = String(SUPABASE_URL).replace(/\/+$/, "");
    var res = await fetch(base + "/auth/v1/settings", {
      headers: {
        apikey: SUPABASE_ANON_KEY,
      },
    });
    if (!res.ok) return fallback;
    var json = await res.json();
    var ext = json && json.external;
    if (!ext || typeof ext != "object") return fallback;
    return {
      google: ext.google === true,
      apple: ext.apple === true,
    };
  } catch {
    return fallback;
  }
}
export function friendlyAuthError(msg) {
  var text = String(msg || "");
  if (/provider is not enabled|Unsupported provider/i.test(text))
    return sqT(
      "That sign-in option isn't switched on for this app yet. Use your email and password below.",
    );
  return text || sqT("Something went wrong.");
}
