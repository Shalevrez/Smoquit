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
   - This repo is connected to Cloudflare Pages. Merging into the production
     branch deploys the site — no manual upload needed.
   - Keeping ONE address: unlike Netlify, Cloudflare has no repo file for
     this. It is a dashboard setting — Workers & Pages → your project →
     Settings → Builds → Preview deployments → set to None. Do that once and
     no branch or pull request gets a side URL of its own; work reaches the
     live site by being merged.
   - Deploying by hand instead? Upload the CONTENTS of this folder
     (index.html, assets/, config.js, storage-health.js, version.js,
     _redirects, _headers — all of it), not the folder.
   - _redirects keeps deep links working on a single-page app, and _headers
     stops the browser caching the runtime files. Cloudflare Pages reads both
     natively, and so does Netlify — the syntax is identical — so moving
     again costs nothing.

AFTER IT'S LIVE — AND AFTER ANY MOVE TO A NEW ADDRESS:
   - In Supabase → Authentication → URL Configuration, set the Site URL to
     your live Cloudflare Pages URL (https://<project>.pages.dev, or your own
     domain if you have attached one), and put that same URL in Redirect URLs.
   - This is not optional after changing hosts. The app sends people back to
     window.location.origin after a social login, and Supabase refuses any
     origin that is not on that list — so "Continue with Google" will bounce
     you to the OLD address, or fail outright, until you update it.
   - The same list decides where Supabase's EMAILS land. See the next section
     — a Site URL left at its factory default is why a confirmation mail
     opens http://localhost:3000 and dead-ends there.


THE CONFIRMATION EMAIL THAT OPENS LOCALHOST
-------------------------------------------
Symptom: you create an account, an email arrives, you click the link, and the
browser lands on http://localhost:3000/?... — a page that does not exist.
The account is now half-made: it exists, it is unconfirmed, and signing in
says the email is not confirmed.

Nothing is broken in the app. Supabase decides where its own emails point,
and a brand-new project ships with Site URL set to http://localhost:3000
because that is where its authors assume you are developing. Until you change
it, every confirmation and reset link is addressed to a server on YOUR laptop.

You have two ways forward. Pick ONE.

  OPTION A — NO EMAIL AT ALL (simplest; what to do if you just want people
  signing up and using the app today)

    Supabase → Authentication → Sign In / Providers → Email
      → turn "Confirm email" OFF → Save.

    Creating an account now signs you straight in, with no email sent and
    nothing to click. The app already handles this: when Supabase hands back
    a session on sign-up, it opens the app instead of showing "check your
    email".

    The trade-off is that nobody proves they own the address they typed. For
    an app whose data is per-account and private, and which never emails
    anyone, that costs you very little — but a typo'd address becomes an
    account nobody can ever recover, because a reset link has nowhere to go.

    Note this does NOT switch off password reset. Reset emails are sent on
    demand and are unaffected by the "Confirm email" toggle — so do Option B
    as well if you want the "Forgot your password?" link to work.

  OPTION B — KEEP THE EMAIL, POINT IT AT THE LIVE SITE

    Supabase → Authentication → URL Configuration
      → Site URL:      https://<your-live-address>
      → Redirect URLs: the same https://<your-live-address>
      → Save.

    Use the exact address people actually visit — same scheme, same host, no
    trailing slash, and your own domain rather than the .pages.dev one if you
    have attached a domain. Supabase compares these literally.

    The app asks for that address by name on every sign-up and every reset,
    so once it is on the Redirect URLs list the links come back to the live
    site and sign the person in. An address that is NOT on the list is not an
    error — Supabase silently falls back to Site URL, which is exactly how
    you end up back at localhost. If a link still opens localhost after this,
    that list is what to re-read.

    Existing accounts stuck unconfirmed from before the fix: Supabase →
    Authentication → Users → the user → confirm them by hand, or delete the
    row and sign up again.


FORGOT YOUR PASSWORD
--------------------
The sign-in screen has a "Forgot your password?" link under the Sign in
button. It asks for an address, Supabase mails a one-time link, and following
the link opens a "Choose a new password" screen instead of the app — the
password is changed there, and then the app opens.

This one genuinely needs email; there is no way to reset a password without
it. So it needs the Site URL / Redirect URLs of Option B above even if you
chose Option A for sign-up. Without it the reset link points at localhost
and the password can never be changed.

The reply is deliberately the same whether or not the address has an account
("if that address has an account, a reset link is on its way") — that is
what stops the form being used to find out who has signed up. Supabase links
expire in an hour and work once; a stale one now says so on screen rather
than showing a blank sign-in form.


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
      → Site URL:      your live Cloudflare Pages URL
                       (https://<project>.pages.dev — use your own domain
                        instead if you've attached one)
      → Redirect URLs: add that same one URL, and nothing else.
    Without this, Google sends people back to the wrong address after login.
    With preview deployments turned off there are no side sub-domains, so no
    wildcard entry is needed — one address to allow, which is also one less
    thing to get wrong.

Reload the app — "Continue with Google" appears on its own, no rebuild needed.
The same steps work for Apple under Authentication → Providers → Apple.


ENGLISH AND HEBREW
------------------
The app ships in two languages. Which one you get is decided in this order:

  1. the language saved in YOUR account (Settings → שפה / Language),
  2. failing that, the last choice made in this browser,
  3. failing that, the browser's own language — Hebrew for a Hebrew browser,
     English for everything else.

Because the choice lives in the same per-user settings row as your country
and pack price, it follows the account: sign in on a new phone and the app
comes back up in the language you picked, with no setting to find again.
Hebrew also flips the whole page to right-to-left, including the storage
error banner.

There is a language switch at the bottom of the sign-in screen too — that
one is remembered in the browser only, since nobody is signed in yet.

The translations live in the built bundle under assets/, not in a runtime
file, so changing wording means a rebuild — unlike config.js or version.js.
Anything stored in the database (trigger names, product names, country
codes) deliberately stays English, so switching language never rewrites
your history.


BUMP THE VERSION NUMBER BEFORE EVERY UPLOAD
-------------------------------------------
version.js holds two lines — the version and the build date — and shows them
in the bottom-left corner of every screen:

    var VERSION = "1.0.0";
    var BUILT   = "2026-08-31";

Raise the version and set the date before you deploy. Third number for a fix,
second for a new feature, first for a rewrite. No rebuild needed; it is a
plain runtime file like config.js.

This is how you tell whether a deploy actually landed. Open the live site and
read the corner: if it still says the old number, you are looking at the old
build — Cloudflare has not finished the deploy yet, or your browser is
holding a cached copy (Ctrl+Shift+R / Cmd+Shift+R clears that). Without it,
"I uploaded it but nothing changed" is a guess. You can also type SMOQUIT_VERSION in the browser
console to read it back.


IF YOUR DATA ISN'T SAVING
-------------------------
Signing in works, you log a few cigarettes, you come back later and it is all
gone. That is almost always step 1 above: the user_data table is missing, so
every write is rejected by the database.

The app now says so out loud. When a read or write fails, a red banner appears
across the top of the screen naming the cause and the fix, with the database's
own error code printed underneath it in small type. Read that code — the
sentence is a best guess, the code is the fact:

  PGRST205  The table does not exist. supabase-schema.sql never ran, or it
            rolled back. Run it.
  42501     "permission denied for table user_data". The table exists, but
            this app is not allowed to touch it — a missing GRANT. Note that
            row-level security never causes this on a read: a policy that
            excludes a row returns nothing at all, silently. An ERROR on a
            read means the grant, not the policy. Re-run the current
            supabase-schema.sql, which grants explicitly.
  PGRST301  The login token was rejected. Sign out and back in; if that does
            not fix it, Supabase's Site URL does not match the address you
            are actually on.

That banner is storage-health.js, which is why it has to be uploaded with the
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
