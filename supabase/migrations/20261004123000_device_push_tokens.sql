create table if not exists device_push_tokens (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete set null,
  token text not null unique,
  platform text not null default 'unknown',
  device_name text,
  project_id text,
  status text not null default 'active',
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_device_push_tokens_profile_id on device_push_tokens(profile_id);
create index if not exists idx_device_push_tokens_status on device_push_tokens(status);
