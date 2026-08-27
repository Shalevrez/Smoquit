-- ─────────────────────────────────────────────────────────────────────────
-- Smoquit database schema
-- Run this ONCE in your Supabase project: SQL Editor → paste → Run.
--
-- Design goal: every user's data is visible and editable ONLY by that user.
-- This is enforced by the database itself (Row-Level Security), so even a
-- bug in the frontend cannot leak one person's data to another.
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
create policy "read own data"
  on public.user_data for select
  using (auth.uid() = user_id);

-- A user can insert rows only for themselves.
create policy "insert own data"
  on public.user_data for insert
  with check (auth.uid() = user_id);

-- A user can update only their own rows.
create policy "update own data"
  on public.user_data for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- A user can delete only their own rows.
create policy "delete own data"
  on public.user_data for delete
  using (auth.uid() = user_id);
