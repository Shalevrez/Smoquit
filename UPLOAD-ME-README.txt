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
     _redirects, _headers — all of it), not the folder. Not app/ — that is
     the source the bundle in assets/ is built from, and the site does not
     read it.
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

The translations live in app/src/i18n/he.js and end up inside the bundle, so
changing wording means a rebuild — unlike config.js or version.js. Note that
the ENGLISH STRING IS THE KEY: edit an English sentence and you must re-key
its Hebrew to match, or the sentence goes untranslated. The build checks
this for you and refuses to finish otherwise.

Anything stored in the database (trigger names, product names, country
codes) deliberately stays English, so switching language never rewrites
your history.


WHERE THE CODE LIVES, AND HOW TO CHANGE IT
------------------------------------------
The site is this folder. Cloudflare Pages serves it directly, with NO build
command set in the dashboard — leave it that way. index.html and assets/ are
generated, and they are committed on purpose, because that is what gets
served.

The source they are generated from is in app/:

    cd app
    npm install
    npm run build      # rewrites ../index.html and ../assets/
    npm test           # drives the app in a browser and checks it works
    npm run lint

`npm run build` is the only thing that should ever write to index.html or
assets/. It refuses to finish if the result is not deployable — see below.
EDIT app/src, RUN THE BUILD, AND COMMIT BOTH. Committing a change to app/src
without the rebuilt output leaves the live site on the old code, silently;
the version number in the corner is how you notice.

What the build will not touch: config.js, version.js, storage-health.js,
_headers, _redirects, sw.js, manifest.webmanifest and the icons. Those stay
plain files you edit and upload directly, with no rebuild — that is the
whole point of them, and the build checks afterwards that they are still
there and unchanged.

One file is the other way round: supabase-send-alerts.js IS generated by the
build, from app/edge/ and the app's own rules, and is committed so you can
paste it into Supabase. Treat it like index.html and assets/ — never edit
it, always commit it.

Three guards run as part of every build, and any of them failing stops it:

  scripts/check-output.mjs   The generated index.html still loads config.js,
                             storage-health.js and version.js, in that order,
                             in the body, BEFORE the module bundle. That
                             ordering is the only reason the app can read
                             your Supabase keys — the bundle is a module, so
                             it is deferred and runs last. Also checks the
                             language script that runs before the first
                             paint, and that the files above are untouched.

  scripts/check-edge.mjs     supabase-send-alerts.js still matches the code
                             it is built from. Without this you can change a
                             rule, ship it to the app, and leave everybody's
                             phone running the old one — silently, in the
                             one place nobody is looking.

  scripts/check-i18n.mjs     Every English string the app shows has a Hebrew
                             translation, and nothing in the dictionary has
                             gone orphaned. Because the English string IS the
                             translation key, editing English wording is also
                             a key change; this is what stops that from
                             quietly untranslating a sentence.

  eslint                     Mostly for one rule: a reference to a name that
                             does not exist. The bundler will happily ship
                             that and throw when somebody opens the screen.

TESTS
-----
`npm test` runs the app in a real browser against a stand-in for Supabase —
no test account, no network, and no chance of writing to anybody's real
history. It covers logging a cigarette, tagging it, correcting its time,
undo, the goal and settings forms, switching to Hebrew, and every tab
loading without throwing. It also walks the email-link paths that are
otherwise only reachable through an inbox: asking for a reset link, arriving
on one, and arriving on one that has expired.

tests/unit/ runs the date and migration logic directly, under several
timezones — that code was wrong in a way that was invisible in UTC and wrong
everywhere else, which is exactly the shape of bug a single-timezone suite
ships:

    for tz in UTC Asia/Jerusalem America/Los_Angeles Asia/Kolkata; do
      TZ=$tz npx playwright test tests/unit
    done


RIDING OUT A CRAVING
--------------------
"I want one right now" on the Today tab opens a five-minute timer, a
breathing pattern, the reason you wrote for yourself on the Goal tab, and —
once you say what set it off — something to do instead. Both ways out are
always there, and giving in is not a dead end: "I smoked one anyway" records
the craving and then hands over to the normal logging flow with the trigger
already chosen, so you are never asked the same question twice.

Both outcomes are stored, not just the wins. A count of wins alone would be
flattering and useless; what makes a number worth reading is that the total
it came out of is real.

This lives in a fourth row in the database, under the key `cravings`. No
schema change was needed — user_data is a key/value table, so a new key is
just a new row, and supabase-schema.sql is unchanged.

If nothing is chosen and the sheet is simply closed, nothing is recorded.
We do not know what happened, and guessing would put invented wins into a
number whose whole value is that it is true.

WHEN THE APP SPEAKS FIRST
-------------------------
The app knows when your hardest stretch of the day is coming, that you have
not answered for today yet, and that you are four days into a clean run. It
used to say none of it unless you went looking. Now one card can appear at
the top of the screen, above whichever tab you are on.

Four things it will say, each with its own switch under Settings -> Nudges:

  * you have gone over the daily target you set yourself,
  * a streak, a personal best, or another pack's worth of money saved,
  * your heaviest three hours are about an hour away,
  * nothing has been logged today, at an hour you choose (8pm by default).

Only ever one at a time, worst first. A stack of these is a notification
centre, and a notification centre is somewhere people go to dismiss things.

These appear inside the app with no setup at all. They can ALSO reach your
phone while Smoquit is closed, and that part does need setting up once —
see NOTIFICATIONS ON YOUR PHONE below. Either way it is the same engine
deciding what to say, so the two can never tell you different things.

Two rules it follows that are worth knowing, because both were easy to get
wrong and both would have been the kind of bug that gets the whole feature
switched off:

  * A day you marked "I haven't smoked today" is an ANSWER, not an empty
    day. It is stored as an empty list rather than as a missing one, and the
    evening reminder can tell the difference. Nagging somebody on their best
    day would be the worst thing this feature could do.

  * A milestone is only ever offered to somebody with something in their
    log. Days nobody opened the app count as smoke-free days on purpose --
    that is what lets a perfect day count without being announced -- but it
    means an account that signed up and never came back has a "run" going
    that nothing can vouch for. It is not congratulated for it.

What has already been said is remembered in a fifth row, under the key
`alerts`, so the same thing is not said twice and not on two devices. Again
no schema change: user_data is key/value, so a new key is a new row.


NOTIFICATIONS ON YOUR PHONE
---------------------------
Optional. Skip all of this and the app works exactly as before, with the
cards appearing when you open it. Set it up and the timed ones — the evening
reminder, and the heads-up before your heaviest stretch — arrive while
Smoquit is closed.

It is one-off, it is free on Supabase's free tier, and it is four steps.

  STEP 1 — RUN THE UPDATED supabase-schema.sql
    Same as the first time: SQL Editor -> New query -> paste -> Run. It is
    safe to run again; it adds a push_subscriptions table and leaves
    everything else alone.

  STEP 2 — MAKE A KEY PAIR
    On any machine with Node:

        npx web-push generate-vapid-keys

    You get a public key and a private key.

    The PUBLIC one goes in config.js, next to the Supabase keys. It belongs
    in a frontend, exactly as the anon key does.

    The PRIVATE one NEVER goes in config.js, in this folder, or in git.
    Anybody holding it can send notifications to your users. It goes in
    step 3 as a function secret and nowhere else.

  STEP 3 — DEPLOY THE SENDER
    Supabase -> Edge Functions -> Create function, name it exactly
    `send-alerts`. Open the editor, delete what is there, and paste the
    WHOLE of supabase-send-alerts.js from this folder. Deploy.

    Then in that function's Secrets, add:

        VAPID_PUBLIC_KEY     the public key from step 2
        VAPID_PRIVATE_KEY    the private key from step 2
        VAPID_SUBJECT        mailto:your-email@example.com
        SEND_ALERTS_SECRET   any long random string you invent

    SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are already there; Supabase
    provides them to every function.

    supabase-send-alerts.js is GENERATED — do not edit it here or in the
    dashboard. It is built from app/edge/send-alerts.js plus the same rules
    the app itself uses, and `npm run build` regenerates it. The build fails
    if you change a rule and forget, because otherwise the app would get the
    new behaviour and your users' phones would quietly keep the old.

  STEP 4 — PUT IT ON A SCHEDULE
    The bottom of supabase-schema.sql has the cron command, commented out.
    Fill in your project ref, your service role key and the same
    SEND_ALERTS_SECRET you invented, then run it.

    Every fifteen minutes, not every hour. The hour someone picks is a whole
    number but timezones are not — India is +5:30, Nepal is +5:45 — so an
    hourly job reaches a lot of people at the wrong time or not at all.

  THEN, ON A PHONE
    Open the site, go to Settings -> Nudges, and turn on "Send them to my
    phone". The browser asks for permission at that moment and at no other
    — the app never asks on its own, because a prompt nobody invited is
    answered with Block, and Block is close to permanent.

ON AN IPHONE, ADD IT TO THE HOME SCREEN FIRST
    Apple only delivers web push to a site that has been added to the Home
    Screen. Until then Safari gives the page no push machinery at all, and
    the switch cannot work. The app detects this and shows the instructions
    rather than failing silently — but it is worth knowing, because it is
    the single most common reason for "I turned it on and nothing happens".

WHY A SEPARATE TABLE, AND NOT ANOTHER user_data KEY
    Everything else the app stores is a row in user_data, and adding one
    costs nothing. Not this. The policies on user_data restrict every row to
    the person it belongs to — which is the whole privacy promise, and
    exactly what a sender cannot work with, because it has no login and must
    read every subscriber's address to know who to send to. The two ways to
    force it in are to weaken that policy, or to hand the sender read access
    to everybody's entire smoking history in order to reach four fields.
    So: a separate table holding a device address and a timezone, and
    nothing else. Note it grants the browser no read access at all.

IF NOTHING ARRIVES
    In order, these are the things that are actually wrong:

      * On an iPhone, it is not on the Home Screen. See above.
      * VAPID_PUBLIC_KEY in config.js does not match the one in the
        function's secrets. They must be the same pair.
      * The cron job is not running. Check it with:
            select * from cron.job_run_details order by start_time desc limit 20;
      * The function is erroring. Supabase -> Edge Functions -> send-alerts
        -> Logs. It answers with a count of what it did:
            {"sent":3,"quiet":41,"gone":0,"failed":0}
        "quiet" is the normal case and means there was nothing worth saying.
      * The reminder already went out. It is deliberately said once: the
        app and the sender share one record of what has been said, so you do
        not get it twice. Look in user_data under the key `alerts`.


WORKING WITHOUT A SIGNAL
------------------------
The app keeps a copy of your data in the browser, so it opens instantly and
keeps working when the connection does not. A cigarette logged in a
stairwell is logged; it reaches your account when there is a connection to
reach it with, and until then it sits in a queue that is retried when the
browser comes back online and again on the next start.

Two consequences worth knowing:

  • The red storage banner no longer appears for an ordinary dropped
    connection — only for a failure you can actually do something about (a
    missing table, a missing grant, a rejected token). That is deliberate.
    A banner that cries wolf every time somebody walks into a lift is a
    banner nobody reads when the database really is misconfigured.

  • Undo marks an entry deleted rather than erasing it, and the mark is
    cleared out after a month. This matters only if you use two devices:
    when they sync, entries are combined rather than one side overwriting
    the other, and without the mark a deletion made on one device would be
    undone by the other simply not knowing about it yet.

The local copy is per account and is cleared when you sign out or use
"Delete all my data", so a shared phone never shows one person's history to
the next.


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
