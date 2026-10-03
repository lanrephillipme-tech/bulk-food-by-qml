insert into profiles (id, full_name, email, phone, country, state, city, wallet_balance, qml_score, credit_limit, referral_code)
values
  ('11111111-1111-1111-1111-111111111111', 'Ada Okonkwo', 'ada@example.com', '+2348012345678', 'Nigeria', 'Lagos', 'Lagos', 42500, 720, 180000, 'QML-ADA-4821')
on conflict (id) do nothing;

insert into user_roles (profile_id, role, status)
values
  ('11111111-1111-1111-1111-111111111111', 'customer', 'active'),
  ('11111111-1111-1111-1111-111111111111', 'financier', 'active'),
  ('11111111-1111-1111-1111-111111111111', 'vendor', 'pending')
on conflict (profile_id, role) do nothing;

insert into vendors (id, business_name, owner_name, country, city, status, settlement_due)
values
  ('22222222-2222-2222-2222-222222222222', 'Adebayo Farms & Foods', 'Tunde Adebayo', 'Nigeria', 'Lagos', 'active', 2450000),
  ('33333333-3333-3333-3333-333333333333', 'Northern Fresh Market', 'Halima Musa', 'Nigeria', 'Abuja', 'pending', 970000)
on conflict (id) do nothing;

insert into food_packages (id, vendor_id, title, description, country, city, category, price, deposit_percent, group_buy_slots, group_buy_filled, items, image_url)
values
  ('44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'Monthly Family Food Pack', 'Rice, oil, beans, tomato, and chicken cuts for the month.', 'Nigeria', 'Lagos', 'Family', 150000, 50, 0, 0, '["25kg rice","5L groundnut oil","Beans","Tomato basket","Chicken cuts"]', 'https://images.unsplash.com/photo-1542838132-92c53300491e'),
  ('55555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222', '1 Bag Rice Group Buy', 'Four users split one full bag at wholesale price.', 'Nigeria', 'Lagos', 'Group Buy', 80000, 100, 4, 2, '["50kg rice split into 4 equal shares"]', 'https://images.unsplash.com/photo-1586201375761-83865001e31c'),
  ('66666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333', 'Festive Bulk Celebration Pack', 'Bulk festive food package for families and teams.', 'Nigeria', 'Abuja', 'Festive', 300000, 50, 6, 4, '["Rice","Oil","Turkey","Spices","Drinks","Vegetables"]', 'https://images.unsplash.com/photo-1543353071-10c8ba85a904')
on conflict (id) do nothing;

insert into food_plans (id, profile_id, package_id, title, total_amount, paid_amount, interval, next_due_date, status)
values
  ('77777777-7777-7777-7777-777777777777', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', 'Monthly Family Food Pack', 150000, 82000, 'weekly', '2026-08-22', 'delivery_eligible')
on conflict (id) do nothing;

insert into financing_opportunities (customer_name, package_title, amount_needed, expected_return, duration_weeks, risk_rating, qml_score, funded_percent)
values
  ('Ada Okonkwo', 'Monthly Family Food Pack', 68000, 8500, 8, 'Low', 720, 35),
  ('Bright Ventures Staff Cooperative', 'Corporate Staff Food Distribution', 1500000, 180000, 12, 'Medium', 680, 62);

insert into deliveries (rider_name, vehicle_type, pickup, dropoff, payout, status)
values
  ('Unassigned', 'van', 'Adebayo Farms, Mile 12', 'Lekki Phase 1', 8500, 'available'),
  ('Ibrahim Sani', 'bike', 'Mainland Grain Depot', 'Yaba', 3200, 'accepted');

insert into products (id, vendor_id, title, category, price, unit, stock_quantity, description, photos, status, ai_status, ai_score, ai_checks, region, delivery_rule)
values
  ('88888888-8888-8888-8888-888888888888', '22222222-2222-2222-2222-222222222222', '25kg Local Rice', 'Grains', 42000, 'bag', 86, 'Local rice supplied by verified stock with clean packaging and delivery handling.', '["https://images.unsplash.com/photo-1586201375761-83865001e31c"]', 'approved', 'auto_approved', 94, '[{"label":"Minimum 3 photos","passed":true},{"label":"Valid price","passed":true}]', 'nigeria', 'Pantry staple - standard delivery'),
  ('99999999-9999-9999-9999-999999999999', '22222222-2222-2222-2222-222222222222', 'Tomato Basket', 'Fresh Produce', 24000, 'basket', 12, 'Farm fresh tomato basket from Mile 12 Fresh Hub.', '["https://images.unsplash.com/photo-1546470427-e26264be0b0d"]', 'approved', 'auto_approved', 91, '[{"label":"Fresh produce","passed":true}]', 'nigeria', 'Perishable - same day delivery'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333333', 'Smoked Catfish Carton', 'Protein', 118000, 'carton', 9, 'Needs three clear images and cold-chain/vendor proof before marketplace placement.', '[]', 'pending', 'needs_review', 78, '[{"label":"Minimum 3 photos","passed":false},{"label":"Cold chain proof","passed":false}]', 'nigeria', 'Cold-chain proof required'),
  ('19191919-1919-1919-1919-191919191919', '22222222-2222-2222-2222-222222222222', 'Ugu Vegetable Bundle', 'Same-day Perishables', 8500, 'bundle', 40, 'Fresh ugu leaves for healthy soups, delivered from nearby markets the same day.', '["https://images.unsplash.com/photo-1576045057995-568f588f82fb"]', 'approved', 'auto_approved', 96, '[{"label":"Same day delivery","passed":true}]', 'nigeria', 'Perishable - same day or few hours delivery'),
  ('20202020-2020-2020-2020-202020202020', '22222222-2222-2222-2222-222222222222', 'Balanced Diet Family Basket', 'Healthy Meals', 185000, 'basket', 18, 'Rice, beans, fruits, vegetables, oil, and protein planned for a healthy home budget.', '["https://images.unsplash.com/photo-1490645935967-10de6ba17061"]', 'approved', 'auto_approved', 95, '[{"label":"Balanced diet","passed":true}]', 'global', 'Mixed basket - perishables delivered same day'),
  ('21212121-2121-2121-2121-212121212121', '33333333-3333-3333-3333-333333333333', 'Europe Weekly Pantry Saver', 'European Pantry', 120000, 'bundle', 22, 'Pasta, potatoes, oats, dairy, canned fish, and vegetables for Europe-based homes.', '["https://images.unsplash.com/photo-1556761223-4c4282c73f77"]', 'approved', 'auto_approved', 92, '[{"label":"Location match","passed":true}]', 'europe', 'Perishables in basket require same-day delivery')
on conflict (id) do nothing;

insert into kyc_verifications (id, profile_id, status, verification_score, nin_status, bvn_status, address_status, document_status, payload)
values
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'needs_review', 72, 'submitted', 'submitted', 'verified', 'needs_cv_or_income_proof', '{"nextOfKin":"pending","education":"submitted"}')
on conflict (id) do nothing;

insert into wallets (id, owner_id, owner_type, label, balance, available_balance, escrow_balance, provider, provider_customer_id, virtual_account_number, virtual_bank_name, metadata)
values
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111', 'customer', 'Personal wallet', 739999, 739999, 0, 'payvessel', '11111111-1111-1111-1111-111111111111', '53663632517', '9Payment Service Bank', '{"trackingReference":"QMLPV-SEED-ADA"}'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '22222222-2222-2222-2222-222222222222', 'vendor', 'Vendor wallet', 445000, 245000, 612000, 'internal', null, null, null, '{}'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '11111111-1111-1111-1111-111111111111', 'financier', 'Financier wallet', 42100000, 42100000, 8200000, 'internal', null, null, null, '{}')
on conflict (id) do nothing;

insert into wallet_transactions (id, wallet_id, type, status, amount, description)
values
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'deposit', 'success', 100000, 'Wallet deposit'),
  ('10101010-1010-1010-1010-101010101010', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'plan_payment', 'success', -25000, 'Monthly Family Food Pack contribution')
on conflict (id) do nothing;

insert into orders (id, profile_id, package_id, title, amount, paid_amount, status, delivery_status, payment_status)
values
  ('12121212-1212-1212-1212-121212121212', '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', 'Monthly Family Food Pack', 150000, 82000, 'in_progress', 'eligible', 'part_paid')
on conflict (id) do nothing;

insert into support_tickets (id, profile_id, topic, status, priority, encrypted, last_message)
values
  ('13131313-1313-1313-1313-131313131313', '11111111-1111-1111-1111-111111111111', 'Wallet funding check', 'open', 'medium', true, 'Deposit receipt and wallet ledger available.'),
  ('14141414-1414-1414-1414-141414141414', '11111111-1111-1111-1111-111111111111', 'Delivery address confirmation', 'pending', 'low', true, 'Live location and address verification requested.')
on conflict (id) do nothing;

insert into refunds (id, order_id, profile_id, amount, reason, status)
values
  ('15151515-1515-1515-1515-151515151515', '12121212-1212-1212-1212-121212121212', '11111111-1111-1111-1111-111111111111', 0, 'Product unavailable review', 'review')
on conflict (id) do nothing;

insert into account_reports (id, reporter_id, subject_type, subject_id, reason, status)
values
  ('16161616-1616-1616-1616-161616161616', '11111111-1111-1111-1111-111111111111', 'vendor', '33333333-3333-3333-3333-333333333333', 'Misleading listing', 'review')
on conflict (id) do nothing;

insert into audit_logs (id, actor_id, action, entity_type, entity_id, severity, metadata)
values
  ('17171717-1717-1717-1717-171717171717', 'system', 'ai_approved_product', 'product', '88888888-8888-8888-8888-888888888888', 'info', '{"score":94}'),
  ('18181818-1818-1818-1818-181818181818', 'admin', 'risk_queue_opened', 'refund', '15151515-1515-1515-1515-151515151515', 'warning', '{"reason":"refund review"}')
on conflict (id) do nothing;

insert into admin_policies (policy_key, title, payload)
values
  ('kyc_tiers', 'KYC value requirements', '{"up_to_200k":"Verified phone/email and address","200k_to_500k":"NIN/BVN plus bank or card","above_500k":"Full KYC, income/CV, next of kin, admin risk review"}'),
  ('listing_rules', 'AI listing approval rules', '{"minimum_photos":3,"vendor_writeup":true,"price_check":true,"payment_outside_wallet_warning":true}'),
  ('delivery_release', 'Delivery eligibility and proof', '{"midpoint_percent":50,"otp":true,"delivery_photo":true,"recipient_signoff":true}')
on conflict (policy_key) do nothing;
