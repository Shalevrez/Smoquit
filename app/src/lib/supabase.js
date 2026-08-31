// ─────────────────────────────────────────────────────────────────────────
//  The Supabase client.
//
//  The URL and key are NOT baked into this bundle. They are read from
//  window.SMOQUIT_CONFIG, which config.js sets at runtime — so they can be
//  changed by editing a file in the deployed folder, with no rebuild.
//
//  When they are missing the client is still constructed, against a dummy
//  URL, so that nothing downstream has to handle a null client. isConfigured
//  is what the app actually branches on, showing the "Almost there" screen
//  instead of a broken login form.
//
//  The anon key is meant to be public in a frontend. The data is protected
//  by row-level security in the database, not by hiding the key.
// ─────────────────────────────────────────────────────────────────────────

import { createClient } from "@supabase/supabase-js";
// Imported for its side effect, and it has to stay above createClient:
// detectSessionInUrl wipes the token out of the address on boot, and
// authLinks reads what the email link was carrying before that happens.
import "./authLinks.js";
const runtimeConfig = (typeof window !== "undefined" && window.SMOQUIT_CONFIG) || {};
export const SUPABASE_URL = runtimeConfig.SUPABASE_URL || undefined;
export const SUPABASE_ANON_KEY = runtimeConfig.SUPABASE_ANON_KEY || undefined;
export const notConfigured =
  !SUPABASE_URL ||
  !SUPABASE_ANON_KEY ||
  SUPABASE_URL.includes("YOUR-PROJECT") ||
  SUPABASE_ANON_KEY.includes("YOUR-ANON");
export const supabase = createClient(
  notConfigured ? "http://localhost" : SUPABASE_URL,
  notConfigured ? "public-anon-key" : SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
);
export const isConfigured = !notConfigured;
notConfigured &&
  console.warn("Supabase not configured. Edit config.js with your Project URL and anon key.");
