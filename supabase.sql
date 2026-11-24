-- Run once in Supabase SQL editor
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  company text,
  country text,
  enquiry_type text,
  channel text,
  volume text,
  market text,
  message text,
  source text default 'website',
  status text default 'new'
);
alter table public.enquiries enable row level security;
-- service role key (server-side) bypasses RLS; no public policies needed.
