-- OKLUT chatbot — optional persistence schema (Supabase)
-- Run this in the Supabase SQL editor if you enable chat persistence.
-- Chat remains fully functional without these tables.

create table if not exists public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.chat_messages (
  id bigint generated always as identity primary key,
  session_id uuid not null references public.chat_sessions (id) on delete cascade,
  sender text not null check (sender in ('user', 'assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists chat_messages_session_idx
  on public.chat_messages (session_id, created_at);

-- Row Level Security: anonymous sessions and the session owner can read; writers insert.
alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;

create policy "sessions readable by owner or anonymous"
  on public.chat_sessions for select
  using (auth.uid() = user_id or user_id is null);

create policy "sessions insertable by anyone"
  on public.chat_sessions for insert
  with check (auth.uid() = user_id or user_id is null);

create policy "messages readable by session owner or anonymous"
  on public.chat_messages for select
  using (
    exists (
      select 1 from public.chat_sessions s
      where s.id = session_id and (s.user_id = auth.uid() or s.user_id is null)
    )
  );

create policy "messages insertable by session owner or anonymous"
  on public.chat_messages for insert
  with check (
    exists (
      select 1 from public.chat_sessions s
      where s.id = session_id and (s.user_id = auth.uid() or s.user_id is null)
    )
  );