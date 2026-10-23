begin;
create table public.catalog_categories (
 id text primary key, name text not null, parent_id text references public.catalog_categories(id), level integer not null check(level between 0 and 2)
);
create table public.catalog_sources (id text primary key, url text not null, note text not null);
create table public.catalog_products (
 id text primary key, name text not null, category_id text not null references public.catalog_categories(id),
 description text not null default '', aliases jsonb not null default '[]', local_names jsonb not null default '[]',
 scientific_name text, tags jsonb not null default '[]', source_ids jsonb not null default '[]',
 status text not null default 'active' check(status in ('active','retired','merged')),
 merged_into text references public.catalog_products(id), reference_image jsonb, review_status text not null default 'pending',
 check(merged_into is null or merged_into <> id)
);
create index catalog_product_category on public.catalog_products(category_id,status);
create table public.catalog_sellers (
 id uuid primary key references auth.users(id), name text not null, business_types jsonb not null,
 location jsonb not null, verified boolean not null default false
);
create table public.catalog_listings (
 id uuid primary key default gen_random_uuid(), product_id text not null references public.catalog_products(id),
 seller_id uuid not null references public.catalog_sellers(id), seller_name text not null,
 variety text not null default '', breed text not null default '', brand text not null default '', grade text not null default '',
 form text not null, unit text not null, pack_quantity integer not null check(pack_quantity>0),
 minimum_order integer not null check(minimum_order>0), stock integer not null check(stock>=0),
 price_minor bigint not null check(price_minor>0 and price_minor<1000000000000000), currency text not null check(currency ~ '^[A-Z]{3}$'),
 net_quantity integer check(net_quantity>0), net_unit text check(net_unit in ('g','ml')),
 origin jsonb not null, location jsonb not null, habitat text, images jsonb not null,
 fulfillment jsonb not null, preorder boolean not null default false,
 status text not null default 'pending' check(status in ('pending','published','rejected','retired')),
 created_at timestamptz not null default now()
);
create index catalog_listing_product on public.catalog_listings(product_id,status);
create index catalog_listing_seller on public.catalog_listings(seller_id);
create table public.catalog_suggestions (
 id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id),
 name text not null, reason text not null, status text not null default 'pending', product_id text references public.catalog_products(id), created_at timestamptz not null default now()
);
create table public.catalog_orders (
 id uuid primary key default gen_random_uuid(), buyer_id uuid not null references auth.users(id), reference text not null,
 items jsonb not null, total_minor bigint not null check(total_minor>0), currency text not null,
 destination jsonb not null, fulfillment text not null,
 status text not null default 'awaiting_payment', created_at timestamptz not null default now(), unique(buyer_id,reference)
);
create table public.catalog_audit (
 id bigint generated always as identity primary key, actor_id uuid not null, action text not null,
 subject_id text not null, reason text not null, created_at timestamptz not null default now()
);
-- Direct client writes are denied. Service-role API calls must authenticate first.
alter table public.catalog_categories enable row level security;
alter table public.catalog_sources enable row level security;
alter table public.catalog_products enable row level security;
alter table public.catalog_sellers enable row level security;
alter table public.catalog_listings enable row level security;
alter table public.catalog_suggestions enable row level security;
alter table public.catalog_orders enable row level security;
alter table public.catalog_audit enable row level security;
create policy catalog_categories_read on public.catalog_categories for select using(true);
create policy catalog_sources_read on public.catalog_sources for select using(true);
create policy catalog_products_read on public.catalog_products for select using(status='active');
create policy catalog_listings_read on public.catalog_listings for select using(status='published' or seller_id=auth.uid());
create policy catalog_seller_owner on public.catalog_sellers for select using(id=auth.uid());
create policy catalog_suggestion_owner on public.catalog_suggestions for select using(owner_id=auth.uid());
create policy catalog_order_owner on public.catalog_orders for select using(buyer_id=auth.uid());

create function public.qml_catalog_checkout(p_buyer uuid,p_reference text,p_items jsonb,p_destination jsonb,p_fulfillment text)
returns jsonb language plpgsql security definer set search_path=public as $$
declare existing catalog_orders; offer catalog_listings; entry jsonb; qty integer; total bigint:=0;
 currency_code text; snapshot jsonb:='[]'; result catalog_orders;
begin
 if jsonb_array_length(p_items) not between 1 and 40 then raise exception 'Invalid basket'; end if;
 if p_fulfillment not in ('pickup','delivery') then raise exception 'Invalid fulfillment'; end if;
 perform pg_advisory_xact_lock(hashtextextended(p_buyer::text||p_reference,0));
 select * into existing from catalog_orders where buyer_id=p_buyer and reference=p_reference;
 if found then return to_jsonb(existing); end if;
 if (select count(*) from jsonb_array_elements(p_items)) <> (select count(distinct x->>'id') from jsonb_array_elements(p_items) x) then raise exception 'Duplicate offer'; end if;
 -- Stable locking order avoids deadlocks across overlapping baskets.
 for entry in select value from jsonb_array_elements(p_items) order by value->>'id' loop
  select * into offer from catalog_listings where id=(entry->>'id')::uuid for update;
  if not found or offer.status<>'published' then raise exception 'Offer unavailable'; end if;
  if not exists(select 1 from catalog_sellers where id=offer.seller_id and verified) then raise exception 'Seller not verified'; end if;
  if not exists(select 1 from catalog_products where id=offer.product_id and status='active') then raise exception 'Product unavailable'; end if;
  qty:=(entry->>'quantity')::integer;
  if qty<offer.minimum_order or qty>offer.stock then raise exception 'Stock or minimum order changed'; end if;
  if (entry->>'price_minor')::bigint<>offer.price_minor then raise exception 'Price changed'; end if;
  if currency_code is not null and currency_code<>offer.currency then raise exception 'Separate orders by currency'; end if;
  currency_code:=offer.currency;
  if p_fulfillment='pickup' and not coalesce((offer.fulfillment->>'pickup')::boolean,false) then raise exception 'Pickup unavailable'; end if;
  if p_fulfillment='delivery' then
   -- Shipping needs an independently priced, verified service before it can reserve stock.
   raise exception 'Delivery checkout requires a verified shipping quote; use pickup';
  end if;
  total:=total+offer.price_minor*qty;
  snapshot:=snapshot||jsonb_build_array(to_jsonb(offer)||jsonb_build_object('quantity',qty,'price_minor',offer.price_minor::text));
 end loop;
 -- A quote does not reserve inventory or collect payment. Payment capture must revalidate
 -- and decrement stock atomically in the future payment integration.
 insert into catalog_orders(buyer_id,reference,items,total_minor,currency,destination,fulfillment,status)
 values(p_buyer,p_reference,snapshot,total,currency_code,p_destination,p_fulfillment,'quoted') returning * into result;
 return to_jsonb(result)||jsonb_build_object('total_minor',result.total_minor::text,'payment_available',false);
end $$;
revoke all on function public.qml_catalog_checkout(uuid,text,jsonb,jsonb,text) from public,anon,authenticated;
grant execute on function public.qml_catalog_checkout(uuid,text,jsonb,jsonb,text) to service_role;

create function public.qml_catalog_review(p_actor uuid,p_action text,p_id text,p_target text,p_reason text)
returns jsonb language plpgsql security definer set search_path=public as $$
declare affected integer;
begin
 if not exists(select 1 from auth.users where id=p_actor and raw_app_meta_data->>'role' in ('admin','super_admin')) then raise exception 'Admin required'; end if;
 if p_action='publish' then
  update catalog_listings set status='published' where id=p_id::uuid and exists(select 1 from catalog_sellers where id=seller_id and verified);
 elsif p_action='reject' then update catalog_listings set status='rejected' where id=p_id::uuid;
 elsif p_action='retire' then update catalog_products set status='retired' where id=p_id;
 elsif p_action='merge' then
  if p_id=p_target or not exists(select 1 from catalog_products where id=p_target and status='active') then raise exception 'Invalid target'; end if;
  update catalog_products set status='merged',merged_into=p_target where id=p_id and status='active';
  -- Keep historical order snapshots. Repoint current listings only.
  update catalog_listings set product_id=p_target,status='pending' where product_id=p_id;
 elsif p_action='approve-suggestion' then
  if not exists(select 1 from catalog_products where id=p_target and status='active') then raise exception 'Create or select a reviewed product first'; end if;
  update catalog_suggestions set status='approved',product_id=p_target where id=p_id::uuid;
 else raise exception 'Unsupported action'; end if;
 get diagnostics affected=row_count;
 insert into catalog_audit(actor_id,action,subject_id,reason) values(p_actor,p_action,p_id,p_reason);
 return jsonb_build_object('action',p_action,'affected',affected);
end $$;
revoke all on function public.qml_catalog_review(uuid,text,text,text,text) from public,anon,authenticated;
grant execute on function public.qml_catalog_review(uuid,text,text,text,text) to service_role;
commit;
