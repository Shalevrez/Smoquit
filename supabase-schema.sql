-- ─────────────────────────────────────────────────────────────────────────
-- Smoquit database schema
-- Run this in your Supabase project: SQL Editor → New query → paste → Run.
--
-- Design goal: every user's data is visible and editable ONLY by that user.
-- This is enforced by the database itself (Row-Level Security), so even a
-- bug in the frontend cannot leak one person's data to another.
--
-- Safe to run as many times as you like. Postgres has no
-- "create policy if not exists", so each policy is dropped first — without
-- that, a second run fails on the first duplicate policy, and because the
-- SQL Editor runs the whole script as ONE transaction, everything before it
-- is rolled back too. That is how you end up with no table at all after a
-- run that looked like it only "complained a bit".
-- ─────────────────────────────────────────────────────────────────────────

create table if not exists public.user_data (
  user_id    uuid        not null references auth.users (id) on delete cascade,
  key        text        not null,           -- 'logs' | 'goal' | 'settings'
  value      jsonb       not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, key)
);

-- Turn on Row-Level Security. With RLS on and no policies, ALL access is
-- denied by default — we then open up only "your own rows".
alter table public.user_data enable row level security;

-- A user can read only their own rows.
drop policy if exists "read own data" on public.user_data;
create policy "read own data"
  on public.user_data for select
  using (auth.uid() = user_id);

-- A user can insert rows only for themselves.
drop policy if exists "insert own data" on public.user_data;
create policy "insert own data"
  on public.user_data for insert
  with check (auth.uid() = user_id);

-- A user can update only their own rows.
drop policy if exists "update own data" on public.user_data;
create policy "update own data"
  on public.user_data for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- A user can delete only their own rows.
drop policy if exists "delete own data" on public.user_data;
create policy "delete own data"
  on public.user_data for delete
  using (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────
-- Table privileges. These are NOT the same thing as the policies above, and
-- missing them is its own separate failure:
--
--   • A policy decides WHICH ROWS you may touch. If a policy excludes a row,
--     a select simply does not return it — no error, just nothing.
--   • A grant decides whether you may touch the TABLE AT ALL. Without it the
--     database answers "permission denied for table user_data" (SQLSTATE
--     42501) and nothing works, however correct the policies are.
--
-- So: an error on reading, rather than an empty screen, points here.
-- Supabase usually adds these grants for you, but "usually" is not a plan —
-- granting explicitly is harmless when they already exist.
--
-- Only `authenticated` is granted. Signed-out visitors (`anon`) never need
-- the table, and the policies above still restrict signed-in users to their
-- own rows, so this grants no one access to anybody else's data.
-- ─────────────────────────────────────────────────────────────────────────
grant usage on schema public to authenticated;
grant select, insert, update, delete on table public.user_data to authenticated;

-- ─────────────────────────────────────────────────────────────────────────
-- PUSH NOTIFICATIONS  (only needed if you want alerts to reach a phone
-- while Smoquit is closed; everything else works without this)
--
-- WHY THIS IS NOT ANOTHER user_data KEY. Every other thing the app stores
-- is a row in user_data, and adding one costs nothing. Not this one. The
-- policies on user_data restrict every row to the person it belongs to,
-- which is exactly what you want for a smoking log — and exactly what a
-- sender cannot work with, because it has no session and must read the
-- endpoints of EVERY subscriber to know who to send to.
--
-- The two ways to force it into user_data are both bad: loosen the policy
-- that is holding the privacy promise up, or hand the sender a service-role
-- read over everybody's entire history in order to reach four fields. So:
-- a separate table, holding nothing but the address of a device and the
-- timezone it is in, read by the Edge Function with the service role.
--
-- Note there is NO select policy here at all. The browser writes its own
-- subscription and deletes it, and never needs to read the table back; the
-- app remembers what it last wrote in localStorage instead. Nothing that
-- runs on somebody's phone can enumerate anything.
-- ─────────────────────────────────────────────────────────────────────────

create table if not exists public.push_subscriptions (
  user_id    uuid        not null references auth.users (id) on delete cascade,
  -- The push service's address for one browser on one device. Part of the
  -- key, so a phone and a laptop are two subscriptions rather than one
  -- quietly replacing the other.
  endpoint   text        not null,
  p256dh     text        not null,
  auth       text        not null,
  -- An IANA zone, e.g. 'Asia/Jerusalem'. The sender runs in UTC and every
  -- day in this app is a LOCAL day, so without this it cannot tell whether
  -- it is yet eight in the evening for this person. Refreshed when the app
  -- notices it has changed, because people travel.
  tz         text        not null default 'UTC',
  -- Counted up when a send fails, so a dead endpoint stops being retried
  -- every quarter of an hour forever. Reset to 0 on re-subscribe.
  failures   int         not null default 0,
  created_at timestamptz not null default now(),
  primary key (user_id, endpoint)
);

alter table public.push_subscriptions enable row level security;

-- A person may register a device of their own.
drop policy if exists "insert own subscription" on public.push_subscriptions;
create policy "insert own subscription"
  on public.push_subscriptions for insert
  with check (auth.uid() = user_id);

-- …update it (the timezone, after they move; the failure count on retry)…
drop policy if exists "update own subscription" on public.push_subscriptions;
create policy "update own subscription"
  on public.push_subscriptions for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- …and turn it off again.
drop policy if exists "delete own subscription" on public.push_subscriptions;
create policy "delete own subscription"
  on public.push_subscriptions for delete
  using (auth.uid() = user_id);

-- Deliberately no select, for anybody. The sender uses the service role,
-- which bypasses row-level security by design; nothing else has any
-- business reading a list of devices.
grant insert, update, delete on table public.push_subscriptions to authenticated;

-- ─────────────────────────────────────────────────────────────────────────
-- THE SCHEDULE
--
-- Every fifteen minutes rather than hourly, and that is not caution. The
-- reminder hour somebody picks is a whole number, but timezones are not all
-- whole hours away from each other — India is +5:30 and Nepal is +5:45 — so
-- an hourly job would reach half of Asia at the wrong time or not at all.
--
-- Run this ONLY after deploying the send-alerts function. Fill in the two
-- values first; both are on Supabase → Settings → API and Edge Functions.
-- ─────────────────────────────────────────────────────────────────────────

-- create extension if not exists pg_cron;
-- create extension if not exists pg_net;
--
-- select cron.schedule(
--   'smoquit-send-alerts',
--   '*/15 * * * *',
--   $$
--     select net.http_post(
--       url     := 'https://<YOUR-PROJECT-REF>.supabase.co/functions/v1/send-alerts',
--       headers := jsonb_build_object(
--         'Content-Type',      'application/json',
--         'Authorization',     'Bearer <YOUR-SERVICE-ROLE-KEY>',
--         'x-smoquit-secret',  '<THE SAME VALUE AS THE SEND_ALERTS_SECRET FUNCTION SECRET>'
--       ),
--       body    := '{}'::jsonb
--     );
--   $$
-- );
--
-- To stop it again:   select cron.unschedule('smoquit-send-alerts');
-- To see what it did: select * from cron.job_run_details order by start_time desc limit 20;

-- ─────────────────────────────────────────────────────────────────────────
-- DID IT WORK?
--
-- Run the block below afterwards, in a new query. It checks all three things
-- that have to be true, and prints one row per check with a plain yes/no.
-- Every row must say 'OK'. Copy the output if you need to ask for help — it
-- is the whole picture in four lines.
-- ─────────────────────────────────────────────────────────────────────────
-- select 'table exists' as check,
--        case when to_regclass('public.user_data') is not null
--             then 'OK' else 'MISSING — the create table did not run' end as result
-- union all
-- select 'rls enabled',
--        case when (select relrowsecurity from pg_class
--                   where oid = 'public.user_data'::regclass)
--             then 'OK' else 'OFF — your data would be readable by anyone' end
-- union all
-- select 'policies (need 4)',
--        case when (select count(*) from pg_policies
--                   where schemaname='public' and tablename='user_data') = 4
--             then 'OK' else 'ONLY ' || (select count(*) from pg_policies
--                   where schemaname='public' and tablename='user_data') || ' OF 4' end
-- union all
-- select 'grants to authenticated (need 4)',
--        case when (select count(*) from information_schema.role_table_grants
--                   where table_schema='public' and table_name='user_data'
--                     and grantee='authenticated'
--                     and privilege_type in ('SELECT','INSERT','UPDATE','DELETE')) = 4
--             then 'OK' else 'MISSING — this is what causes "permission denied"' end
-- union all
-- select 'push table (only if you want phone notifications)',
--        case when to_regclass('public.push_subscriptions') is not null
--             then 'OK' else 'not set up — everything else still works' end;
