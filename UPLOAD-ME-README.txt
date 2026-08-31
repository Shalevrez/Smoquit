SMOQUIT — READY TO UPLOAD
=========================

Keys are already filled in (config.js has your Project URL and anon key).
Two things still need doing:

1. RUN THE DATABASE SETUP (once)
   - In your Supabase project: SQL Editor → New query
   - Paste the contents of supabase-schema.sql → Run
   - This creates the per-user table + security rules.
   - It is safe to run twice; if you already did this, skip it.

2. UPLOAD
   - Upload the CONTENTS of this folder to Cloudflare Pages
     (index.html, assets/, config.js, _redirects — all of it).

AFTER IT'S LIVE:
   - In Supabase → Authentication → URL Configuration, set the Site URL
     to your Cloudflare URL, so Google/Apple login redirects work.
   - To enable Google/Apple sign-in: Supabase → Authentication → Providers.
     (Email/password works with no extra setup.)

NOTE ON THE KEY:
   The anon key in config.js is meant to be public in a frontend. Your data
   is protected by Row-Level Security (step 1), not by hiding this key.
   Never put the service_role key in this file — it bypasses those rules.

You can edit config.js and re-upload any time — no rebuild needed.
