SMOQUIT — READY TO UPLOAD
=========================

Before it works, do TWO things:

1. RUN THE DATABASE SETUP (once)
   - In your Supabase project: SQL Editor → New query
   - Paste the contents of supabase-schema.sql (from the source project) → Run
   - This creates the per-user table + security rules.
   (If you already did this earlier, skip it.)

2. ADD YOUR KEYS
   - Open config.js in this folder with any text editor.
   - Replace the two placeholder lines with your real values from
     Supabase → Settings → API:
        SUPABASE_URL       = your Project URL
        SUPABASE_ANON_KEY  = your anon public key
   - Save.

THEN UPLOAD:
   - Upload the CONTENTS of this folder to Cloudflare Pages
     (index.html, assets/, config.js, _redirects — all of it).

AFTER IT'S LIVE:
   - In Supabase → Authentication → URL Configuration, set the Site URL
     to your Cloudflare URL, so Google/Apple login redirects work.
   - To enable Google/Apple sign-in: Supabase → Authentication → Providers.
     (Email/password works with no extra setup.)

You can edit config.js and re-upload any time — no rebuild needed.
