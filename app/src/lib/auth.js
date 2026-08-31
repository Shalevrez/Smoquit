// ─────────────────────────────────────────────────────────────────────────
//  Signing in.
//
//  fetchEnabledProviders asks the Supabase project which social logins are
//  actually switched on, so the login screen can show a Google or Apple
//  button only when pressing it would work. Turning one on is done in the
//  Supabase dashboard and needs no rebuild here — see UPLOAD-ME-README.txt.
//
//  Everything that leaves and comes back — a social login, a confirmation
//  email, a reset email — names this site's own origin as the way back, via
//  authRedirectTo() in authLinks.js. Supabase refuses an address that is not
//  in the project's redirect list, which is the usual cause of a login
//  bouncing to an old address after a move, and of a mailed link opening
//  localhost.
// ─────────────────────────────────────────────────────────────────────────

import React from "react";
import { sqT } from "../i18n/index.js";
import { authRedirectTo, setRecovering } from "./authLinks.js";
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
      const { data } = supabase.auth.onAuthStateChange((event, session) => {
        // Arriving on a reset link: signed in, but the app must not open yet.
        if (event === "PASSWORD_RECOVERY") setRecovering(true);
        e(session);
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
    options: {
      emailRedirectTo: authRedirectTo(),
    },
  });
}
export async function sendPasswordReset(email) {
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: authRedirectTo(),
  });
}
export async function setNewPassword(password) {
  return supabase.auth.updateUser({
    password: password,
  });
}
export async function signInWithProvider(provider) {
  return supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: authRedirectTo(),
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
  if (/email not confirmed/i.test(text))
    return sqT(
      "This account hasn't been confirmed yet. Open the confirmation link in the email we sent you.",
    );
  if (/expired|invalid.*(token|link)|token.*(expired|invalid)/i.test(text))
    return sqT(
      "That link didn't work — it may have expired or already been used. Ask for a new one.",
    );
  return text || sqT("Something went wrong.");
}
