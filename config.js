// ─────────────────────────────────────────────────────────────────────────
//  Smoquit CONFIG  —  EDIT THESE TWO LINES, THEN UPLOAD THE FOLDER.
//
//  Get both values from your Supabase project:
//    Supabase dashboard → Settings → API
//      • Project URL      → SUPABASE_URL
//      • anon public key  → SUPABASE_ANON_KEY
//
//  The anon key is meant to be public in a frontend — your data is protected
//  by Row-Level Security, not by hiding this key.
//
//  This file is plain JavaScript loaded by the browser at runtime, so you can
//  change it any time WITHOUT rebuilding the app.
//
//  VAPID_PUBLIC_KEY is only needed for notifications that reach a phone
//  while Smoquit is closed. Leave it empty and everything else works; the
//  switch in Settings simply says it cannot be turned on.
//
//  It is the PUBLIC half of a pair, and belongs in a frontend exactly as
//  the anon key does — it is what the browser hands the push service to say
//  which application a subscription is for. THE PRIVATE HALF NEVER GOES IN
//  THIS FILE, or in this repository at all: it lives as a secret on the
//  Edge Function, and anybody holding it can send notifications to your
//  users. Generate a pair with:
//
//      npx web-push generate-vapid-keys
//
//  See UPLOAD-ME-README.txt for where each half goes.
// ─────────────────────────────────────────────────────────────────────────
window.SMOQUIT_CONFIG = {
  SUPABASE_URL: "https://bzzdmxiykbrvwlyimagu.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6emRteGl5a2JydndseWltYWd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxMDY3MTgsImV4cCI6MjEwMzY4MjcxOH0.dPVXTj8MshX7uwWz3q1AxkWz6eg76jjIVYh_QSuOnBI",

  // Public half only. Empty is fine — see the note above.
  VAPID_PUBLIC_KEY: "",
};
