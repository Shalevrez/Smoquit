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
-- Did it work? Run this afterwards — it should return four rows
-- (read / insert / update / delete own data). No rows, or an error saying
-- the relation does not exist, means the script above did not take effect.
-- ─────────────────────────────────────────────────────────────────────────
-- select policyname, cmd from pg_policies
-- where schemaname = 'public' and tablename = 'user_data'
-- order by policyname;
