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
--             then 'OK' else 'MISSING — this is what causes "permission denied"' end;
