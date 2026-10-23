create table if not exists public.welcome_email_outbox (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  status text not null default 'pending' check (status in ('pending', 'sent', 'failed')),
  attempts integer not null default 0 check (attempts >= 0),
  provider_email_id text,
  last_error text,
  created_at timestamptz not null default now(),
  sent_at timestamptz,
  unique (auth_user_id)
);

alter table public.welcome_email_outbox enable row level security;

create or replace function public.enqueue_qml_welcome_email()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if old.email_confirmed_at is null
     and new.email_confirmed_at is not null
     and new.email is not null then
    insert into public.welcome_email_outbox (auth_user_id, email, full_name)
    values (
      new.id,
      new.email,
      coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name')
    )
    on conflict (auth_user_id) do nothing;
  end if;
  return new;
end;
$$;

drop trigger if exists qml_enqueue_welcome_email on auth.users;
create trigger qml_enqueue_welcome_email
after update of email_confirmed_at on auth.users
for each row execute function public.enqueue_qml_welcome_email();
