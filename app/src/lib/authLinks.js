// ─────────────────────────────────────────────────────────────────────────
//  Email links: where they come back to, and what they arrive carrying.
//
//  Every link Supabase mails out — confirm your account, reset your password
//  — opens a URL that Supabase decides, not this code. Say nothing and it
//  uses the project's Site URL, which starts life as http://localhost:3000:
//  the mail arrives, the link opens nothing, and the account is left half
//  created. Naming the live origin on every request is what stops that.
//
//  Supabase only honours an origin listed under Authentication → URL
//  Configuration → Redirect URLs; anything else is quietly ignored and Site
//  URL used instead. So this is half the fix — the other half is a dashboard
//  setting, written down in UPLOAD-ME-README.txt.
//
//  This module is also where the incoming link is read. supabase-js takes
//  the token out of the URL and wipes it on boot (detectSessionInUrl), so
//  anything else the link carries — which kind it was, or why it failed —
//  has to be copied down first. That is why lib/supabase.js imports this
//  file before it builds the client.
// ─────────────────────────────────────────────────────────────────────────

import React from "react";

export function authRedirectTo() {
  try {
    return window.location.origin;
  } catch {
    return undefined;
  }
}

function readBootHash() {
  try {
    const hash = String(window.location.hash || "");
    return hash.charAt(0) === "#" ? hash.slice(1) : hash;
  } catch {
    return "";
  }
}

function readBootQuery() {
  try {
    return String(window.location.search || "").replace(/^\?/, "");
  } catch {
    return "";
  }
}

// Supabase puts these in the fragment on an implicit-flow link and in the
// query string on some errors, so both are worth reading.
const bootHash = readBootHash();
const bootQuery = readBootQuery();

function bootParam(name) {
  try {
    return (
      new URLSearchParams(bootHash).get(name) || new URLSearchParams(bootQuery).get(name) || ""
    );
  } catch {
    return "";
  }
}

// A link that sat in an inbox too long comes back as error_code=otp_expired.
// Unnoticed, the page just shows a blank sign-in form, which reads as
// "nothing happened" rather than "that link is stale".
export const bootLinkError =
  bootParam("error_description") || bootParam("error_code") || bootParam("error");

// A password-reset link signs its visitor in and then wants a new password.
// It is the one moment where being signed in should NOT open the app, so it
// gets a flag of its own rather than riding on the session.
let recovering = bootParam("type") === "recovery";
const listeners = new Set();

export function setRecovering(next) {
  if (recovering === next) return;
  recovering = next;
  listeners.forEach((notify) => notify());
}

export function useRecovering() {
  const [, bump] = React.useState(0);
  React.useEffect(() => {
    const notify = () => bump((n) => n + 1);
    listeners.add(notify);
    return () => listeners.delete(notify);
  }, []);
  return recovering;
}
