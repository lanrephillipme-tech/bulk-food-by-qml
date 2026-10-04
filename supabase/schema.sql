create extension if not exists "pgcrypto";

do $$
begin
  create type role_name as enum ('customer', 'vendor', 'financier', 'logistics', 'corporate', 'admin', 'super_admin');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type role_status as enum ('active', 'pending', 'rejected', 'suspended');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type plan_status as enum ('active', 'delivery_eligible', 'delivered', 'completed', 'defaulted');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type delivery_status as enum ('available', 'accepted', 'picked_up', 'delivered', 'cancelled');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type approval_status as enum ('pending', 'approved', 'rejected', 'needs_review', 'suspended');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type wallet_owner_type as enum ('customer', 'vendor', 'financier', 'logistics', 'corporate', 'admin');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type transaction_status as enum ('pending', 'success', 'failed', 'reversed');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type order_status as enum ('draft', 'in_progress', 'delivery_eligible', 'dispatched', 'delivered', 'completed', 'cancelled', 'defaulted', 'delivery_proof_submitted');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type support_status as enum ('open', 'pending', 'review', 'resolved', 'closed');
exception
  when duplicate_object then null;
end $$;

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text unique,
  phone text unique,
  country text not null default 'Nigeria',
  state text,
  city text not null,
  wallet_balance numeric(14,2) not null default 0,
  qml_score integer not null default 500,
  credit_limit numeric(14,2) not null default 0,
  referral_code text unique not null,
  referred_by text,
  created_at timestamptz not null default now()
);

create table if not exists user_roles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  role role_name not null,
  status role_status not null default 'pending',
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  unique(profile_id, role)
);

create table if not exists vendors (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id),
  business_name text not null,
  owner_name text not null,
  country text not null,
  city text not null,
  status role_status not null default 'pending',
  settlement_due numeric(14,2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists food_packages (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid references vendors(id),
  title text not null,
  description text,
  country text not null,
  city text not null,
  category text not null,
  price numeric(14,2) not null,
  deposit_percent integer not null default 50,
  group_buy_slots integer not null default 0,
  group_buy_filled integer not null default 0,
  items jsonb not null default '[]',
  image_url text,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists food_plans (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id),
  package_id uuid references food_packages(id),
  title text not null,
  total_amount numeric(14,2) not null,
  paid_amount numeric(14,2) not null default 0,
  interval text not null default 'weekly',
  next_due_date date,
  status plan_status not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists financing_opportunities (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid references food_plans(id),
  customer_name text not null,
  package_title text not null,
  amount_needed numeric(14,2) not null,
  expected_return numeric(14,2) not null,
  duration_weeks integer not null,
  risk_rating text not null,
  qml_score integer not null,
  funded_percent integer not null default 0,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

create table if not exists deliveries (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid references food_plans(id),
  rider_name text not null default 'Unassigned',
  vehicle_type text not null,
  pickup text not null,
  dropoff text not null,
  payout numeric(14,2) not null,
  status delivery_status not null default 'available',
  created_at timestamptz not null default now()
);

create table if not exists role_applications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id),
  role role_name not null,
  referral_code text,
  status role_status not null default 'pending',
  payload jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid references vendors(id),
  title text not null,
  category text not null,
  price numeric(14,2) not null,
  unit text not null default 'unit',
  stock_quantity integer not null default 0,
  description text not null default '',
  photos jsonb not null default '[]',
  status approval_status not null default 'pending',
  ai_status text not null default 'needs_review',
  ai_score integer not null default 0,
  ai_checks jsonb not null default '[]',
  region text not null default 'global',
  delivery_rule text not null default 'Location-based delivery',
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists kyc_verifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  status approval_status not null default 'pending',
  verification_score integer not null default 0,
  nin_status text not null default 'missing',
  bvn_status text not null default 'missing',
  address_status text not null default 'missing',
  document_status text not null default 'missing',
  payload jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists wallets (
  id uuid primary key default gen_random_uuid(),
  owner_id text not null,
  owner_type wallet_owner_type not null default 'customer',
  label text not null,
  balance numeric(14,2) not null default 0,
  available_balance numeric(14,2) not null default 0,
  escrow_balance numeric(14,2) not null default 0,
  currency text not null default 'NGN',
  provider text not null default 'internal',
  provider_customer_id text,
  virtual_account_number text,
  virtual_bank_name text,
  status text not null default 'active',
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists payment_cards (
  id uuid primary key default gen_random_uuid(),
  wallet_id uuid references wallets(id),
  profile_id text not null,
  provider text not null default 'payvessel',
  provider_card_id text not null,
  status text not null default 'pending',
  masked_pan text not null default '',
  brand text not null default 'VISA',
  currency text not null default 'USD',
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists wallet_transactions (
  id uuid primary key default gen_random_uuid(),
  wallet_id uuid references wallets(id),
  type text not null,
  status transaction_status not null default 'pending',
  amount numeric(14,2) not null,
  description text not null default '',
  reference text unique not null default encode(gen_random_bytes(8), 'hex'),
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

do $$
begin
  alter table wallet_transactions add constraint wallet_transactions_nonzero_amount check (amount <> 0);
exception
  when duplicate_object then null;
end $$;

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id),
  package_id uuid references food_packages(id),
  title text not null,
  amount numeric(14,2) not null,
  paid_amount numeric(14,2) not null default 0,
  status order_status not null default 'in_progress',
  delivery_status text not null default 'not_eligible',
  payment_status text not null default 'unpaid',
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists support_tickets (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id),
  topic text not null,
  status support_status not null default 'open',
  priority text not null default 'medium',
  encrypted boolean not null default true,
  last_message text not null default '',
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists refunds (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id),
  profile_id uuid references profiles(id),
  amount numeric(14,2) not null default 0,
  reason text not null,
  status support_status not null default 'pending',
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists account_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id text not null,
  subject_type text not null,
  subject_id text not null,
  reason text not null,
  status support_status not null default 'review',
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id text not null,
  action text not null,
  entity_type text not null,
  entity_id text not null,
  severity text not null default 'info',
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

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

create table if not exists admin_policies (
  id uuid primary key default gen_random_uuid(),
  policy_key text unique not null,
  title text not null,
  payload jsonb not null default '{}',
  updated_by text,
  updated_at timestamptz not null default now()
);

create index if not exists products_status_idx on products(status);
create index if not exists products_vendor_idx on products(vendor_id);
create index if not exists wallets_owner_idx on wallets(owner_id, owner_type);
create index if not exists wallets_virtual_account_idx on wallets(virtual_account_number);
create index if not exists wallet_transactions_wallet_idx on wallet_transactions(wallet_id);
create unique index if not exists wallet_transactions_reference_idx on wallet_transactions(reference);
create index if not exists payment_cards_wallet_idx on payment_cards(wallet_id);
create index if not exists idx_device_push_tokens_profile_id on device_push_tokens(profile_id);
create index if not exists idx_device_push_tokens_status on device_push_tokens(status);
create index if not exists orders_profile_idx on orders(profile_id);
create index if not exists support_tickets_status_idx on support_tickets(status);
create index if not exists audit_logs_entity_idx on audit_logs(entity_type, entity_id);
