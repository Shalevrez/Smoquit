Smoquit — READY TO DEPLOY
=========================

Keys are already filled in (config.js has your Project URL and anon key).
Two things still need doing:

1. RUN THE DATABASE SETUP
   - In your Supabase project: SQL Editor → New query
   - Paste the contents of supabase-schema.sql → Run
   - This creates the per-user table + security rules.
   - It is safe to run again at any time, and re-running is the first thing
     to try if saving stops working.
   - CHECK THAT IT ACTUALLY TOOK. The SQL Editor runs the whole script as one
     transaction, so a single error rolls back everything — including the
     table — and it is easy to miss. Run this afterwards; it should return
     four rows:

        select policyname, cmd from pg_policies
        where schemaname = 'public' and tablename = 'user_data';

     No rows, or an error about "relation ... does not exist", means the
     setup did not take. Run supabase-schema.sql again and read the output.

2. DEPLOY
   - This repo is connected to Netlify (project "smoquit"). Merging into the
     production branch deploys the site — no manual upload needed.
   - There is ONE address. netlify.toml cancels pull-request previews and
     per-branch deploys, so no deploy-preview-N-- or branch-name sub-domain
     is ever created. Work reaches the live site by being merged, not by
     getting a side link of its own.
   - Deploying by hand instead? Upload the CONTENTS of this folder
     (index.html, assets/, config.js, storage-health.js, _redirects — all of
     it), not the folder.
   - _redirects is what keeps deep links working on a single-page app.
     Netlify reads it natively; so does Cloudflare Pages if you ever move.

AFTER IT'S LIVE:
   - In Supabase → Authentication → URL Configuration, set the Site URL
     to your live Netlify URL, so Google/Apple login redirects work.
   - Email/password sign-in works with no extra setup.


ENABLING "CONTINUE WITH GOOGLE"
-------------------------------
The login page only shows a social sign-in button once that provider is
actually turned on in Supabase. If the Google button is missing, Google is
still switched off — that is exactly what this error means if you ever see it:

   {"code":400,"error_code":"validation_failed",
    "msg":"Unsupported provider: provider is not enabled"}

Turning it on is done in the dashboards, not in this code:

 a) Google Cloud Console → APIs & Services → Credentials
      → Create Credentials → OAuth client ID → type "Web application".
    Under "Authorised redirect URIs" add EXACTLY this callback:

        https://bzzdmxiykbrvwlyimagu.supabase.co/auth/v1/callback

    Copy the Client ID and Client Secret it gives you.
    (You will also need an OAuth consent screen; "External" is fine.)

 b) Supabase → Authentication → Providers → Google
      → toggle "Enable Sign in with Google" ON
      → paste the Client ID and Client Secret → Save.

 c) Supabase → Authentication → URL Configuration
      → Site URL:      your live Netlify URL
                       (default: https://smoquit.netlify.app — use your own
                        domain instead if you've attached one)
      → Redirect URLs: add that same one URL, and nothing else.
    Without this, Google sends people back to the wrong address after login.
    Since there are no preview sub-domains, no wildcard entry is needed —
    one address to allow, which is also one less thing to get wrong.

Reload the app — "Continue with Google" appears on its own, no rebuild needed.
The same steps work for Apple under Authentication → Providers → Apple.


IF YOUR DATA ISN'T SAVING
-------------------------
Signing in works, you log a few cigarettes, you come back later and it is all
gone. That is almost always step 1 above: the user_data table is missing, so
every write is rejected by the database.

The app now says so out loud. When a read or write fails, a red banner appears
across the top of the screen naming the cause and the fix — that is
storage-health.js, and it is why that file has to be uploaded along with the
rest. Previously these failures went only to the browser console, so the app
looked like it was working right up until you reloaded it.

To confirm the diagnosis yourself: open the site, press F12 → Console, and
look for "saveKey failed". The error next to it is the database's own words.
"Could not find the table 'public.user_data'" means run supabase-schema.sql.

Also worth checking, if the banner never appears but data still looks wrong:
Supabase → Authentication → Users, and confirm you are signing in as the
account you think you are. Data is stored per user id, so signing up a second
time with a different address gives you a second, empty account.


NOTE ON THE KEY:
   The anon key in config.js is meant to be public in a frontend. Your data
   is protected by Row-Level Security (step 1), not by hiding this key.
   Never put the service_role key in this file — it bypasses those rules.

You can edit config.js and re-upload any time — no rebuild needed.
