create or replace function public.qml_is_admin()
returns boolean
language sql
stable
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'super_admin'), false)
    or coalesce((auth.jwt() -> 'user_metadata' ->> 'role') in ('admin', 'super_admin'), false);
$$;

alter table profiles enable row level security;
alter table user_roles enable row level security;
alter table vendors enable row level security;
alter table food_packages enable row level security;
alter table food_plans enable row level security;
alter table financing_opportunities enable row level security;
alter table deliveries enable row level security;
alter table role_applications enable row level security;
alter table products enable row level security;
alter table kyc_verifications enable row level security;
alter table wallets enable row level security;
alter table payment_cards enable row level security;
alter table wallet_transactions enable row level security;
alter table orders enable row level security;
alter table support_tickets enable row level security;
alter table refunds enable row level security;
alter table account_reports enable row level security;
alter table audit_logs enable row level security;
alter table admin_policies enable row level security;

drop policy if exists profiles_owner_select on profiles;
create policy profiles_owner_select on profiles
  for select using (id = auth.uid() or public.qml_is_admin());

drop policy if exists profiles_owner_insert on profiles;
create policy profiles_owner_insert on profiles
  for insert with check (id = auth.uid() or public.qml_is_admin());

drop policy if exists profiles_owner_update on profiles;
create policy profiles_owner_update on profiles
  for update using (id = auth.uid() or public.qml_is_admin())
  with check (id = auth.uid() or public.qml_is_admin());

drop policy if exists user_roles_owner_select on user_roles;
create policy user_roles_owner_select on user_roles
  for select using (profile_id = auth.uid() or public.qml_is_admin());

drop policy if exists user_roles_admin_write on user_roles;
create policy user_roles_admin_write on user_roles
  for all using (public.qml_is_admin())
  with check (public.qml_is_admin());

drop policy if exists vendors_public_select on vendors;
create policy vendors_public_select on vendors
  for select using (status = 'active' or profile_id = auth.uid() or public.qml_is_admin());

drop policy if exists vendors_owner_update on vendors;
create policy vendors_owner_update on vendors
  for update using (profile_id = auth.uid() or public.qml_is_admin())
  with check (profile_id = auth.uid() or public.qml_is_admin());

drop policy if exists food_packages_public_select on food_packages;
create policy food_packages_public_select on food_packages
  for select using (status = 'active' or public.qml_is_admin());

drop policy if exists food_packages_vendor_write on food_packages;
create policy food_packages_vendor_write on food_packages
  for all using (
    public.qml_is_admin()
    or exists (
      select 1 from vendors
      where vendors.id = food_packages.vendor_id
        and vendors.profile_id = auth.uid()
    )
  )
  with check (
    public.qml_is_admin()
    or exists (
      select 1 from vendors
      where vendors.id = food_packages.vendor_id
        and vendors.profile_id = auth.uid()
    )
  );

drop policy if exists food_plans_owner_access on food_plans;
create policy food_plans_owner_access on food_plans
  for all using (profile_id = auth.uid() or public.qml_is_admin())
  with check (profile_id = auth.uid() or public.qml_is_admin());

drop policy if exists financing_opportunities_read on financing_opportunities;
create policy financing_opportunities_read on financing_opportunities
  for select using (true);

drop policy if exists deliveries_read on deliveries;
create policy deliveries_read on deliveries
  for select using (true);

drop policy if exists role_applications_owner_access on role_applications;
create policy role_applications_owner_access on role_applications
  for all using (profile_id = auth.uid() or public.qml_is_admin())
  with check (profile_id = auth.uid() or public.qml_is_admin());

drop policy if exists products_public_select on products;
create policy products_public_select on products
  for select using (status = 'approved' or public.qml_is_admin());

drop policy if exists products_vendor_write on products;
create policy products_vendor_write on products
  for all using (
    public.qml_is_admin()
    or exists (
      select 1 from vendors
      where vendors.id = products.vendor_id
        and vendors.profile_id = auth.uid()
    )
  )
  with check (
    public.qml_is_admin()
    or exists (
      select 1 from vendors
      where vendors.id = products.vendor_id
        and vendors.profile_id = auth.uid()
    )
  );

drop policy if exists kyc_owner_access on kyc_verifications;
create policy kyc_owner_access on kyc_verifications
  for all using (profile_id = auth.uid() or public.qml_is_admin())
  with check (profile_id = auth.uid() or public.qml_is_admin());

drop policy if exists wallets_owner_select on wallets;
create policy wallets_owner_select on wallets
  for select using (
    public.qml_is_admin()
    or owner_id = auth.uid()::text
    or exists (
      select 1 from vendors
      where vendors.id::text = wallets.owner_id
        and vendors.profile_id = auth.uid()
    )
  );

drop policy if exists wallets_admin_write on wallets;
create policy wallets_admin_write on wallets
  for all using (public.qml_is_admin())
  with check (public.qml_is_admin());

drop policy if exists payment_cards_owner_select on payment_cards;
create policy payment_cards_owner_select on payment_cards
  for select using (profile_id = auth.uid()::text or public.qml_is_admin());

drop policy if exists payment_cards_admin_write on payment_cards;
create policy payment_cards_admin_write on payment_cards
  for all using (public.qml_is_admin())
  with check (public.qml_is_admin());

drop policy if exists wallet_transactions_owner_select on wallet_transactions;
create policy wallet_transactions_owner_select on wallet_transactions
  for select using (
    public.qml_is_admin()
    or exists (
      select 1 from wallets
      left join vendors on vendors.id::text = wallets.owner_id
      where wallets.id = wallet_transactions.wallet_id
        and (
          wallets.owner_id = auth.uid()::text
          or vendors.profile_id = auth.uid()
        )
    )
  );

drop policy if exists wallet_transactions_admin_write on wallet_transactions;
create policy wallet_transactions_admin_write on wallet_transactions
  for all using (public.qml_is_admin())
  with check (public.qml_is_admin());

drop policy if exists orders_owner_access on orders;
create policy orders_owner_access on orders
  for all using (profile_id = auth.uid() or public.qml_is_admin())
  with check (profile_id = auth.uid() or public.qml_is_admin());

drop policy if exists support_tickets_owner_access on support_tickets;
create policy support_tickets_owner_access on support_tickets
  for all using (profile_id = auth.uid() or public.qml_is_admin())
  with check (profile_id = auth.uid() or public.qml_is_admin());

drop policy if exists refunds_owner_access on refunds;
create policy refunds_owner_access on refunds
  for all using (profile_id = auth.uid() or public.qml_is_admin())
  with check (profile_id = auth.uid() or public.qml_is_admin());

drop policy if exists account_reports_owner_access on account_reports;
create policy account_reports_owner_access on account_reports
  for all using (reporter_id = auth.uid()::text or public.qml_is_admin())
  with check (reporter_id = auth.uid()::text or public.qml_is_admin());

drop policy if exists audit_logs_admin_select on audit_logs;
create policy audit_logs_admin_select on audit_logs
  for select using (public.qml_is_admin());

drop policy if exists admin_policies_admin_access on admin_policies;
create policy admin_policies_admin_access on admin_policies
  for all using (public.qml_is_admin())
  with check (public.qml_is_admin());
