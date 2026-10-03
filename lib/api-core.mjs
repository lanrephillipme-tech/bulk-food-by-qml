import { createHmac, timingSafeEqual } from "node:crypto";
import { deliveries, opportunities, packages, plans, users, vendors } from "./seed-data.mjs";

const allowedRoles = new Set(["vendor", "financier", "logistics", "corporate"]);
const adminRoles = new Set(["admin", "super_admin"]);
const requiredStorageTables = [
  "profiles",
  "user_roles",
  "vendors",
  "food_packages",
  "food_plans",
  "products",
  "wallets",
  "wallet_transactions",
  "orders",
  "support_tickets",
  "refunds",
  "account_reports",
  "audit_logs",
  "role_applications"
];

const seedProducts = [
  { id: "prd_rice_25kg", vendor_id: "ven_001", title: "25kg Local Rice", category: "Grains", price: 42000, unit: "bag", stock_quantity: 86, status: "approved", ai_status: "auto_approved", ai_score: 94, photos: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80"], description: "Local rice supplied by verified stock with clean packaging and delivery handling.", created_at: "2026-08-19T08:00:00.000Z" },
  { id: "prd_tomato_basket", vendor_id: "ven_001", title: "Tomato Basket", category: "Fresh Produce", price: 24000, unit: "basket", stock_quantity: 12, status: "approved", ai_status: "auto_approved", ai_score: 91, photos: ["https://images.unsplash.com/photo-1546470427-e26264be0b0d?auto=format&fit=crop&w=900&q=80"], description: "Farm fresh tomato basket from Mile 12 Fresh Hub.", created_at: "2026-08-21T08:00:00.000Z" },
  { id: "prd_catfish_carton", vendor_id: "ven_002", title: "Smoked Catfish Carton", category: "Protein", price: 118000, unit: "carton", stock_quantity: 9, status: "pending", ai_status: "needs_review", ai_score: 78, photos: [], description: "Needs three clear images and cold-chain/vendor proof before marketplace placement.", created_at: "2026-08-21T10:00:00.000Z" }
];

const seedKyc = [
  { id: "kyc_ada", profile_id: "usr_ada", status: "in_review", verification_score: 72, nin_status: "submitted", bvn_status: "submitted", address_status: "verified", document_status: "needs_cv_or_income_proof" }
];

const seedWallets = [
  { id: "wal_usr_ada", owner_id: "usr_ada", owner_type: "customer", label: "Personal wallet", balance: 739999, available_balance: 739999, escrow_balance: 0, provider: "payvessel", provider_customer_id: "usr_ada", virtual_account_number: "53663632517", virtual_bank_name: "9Payment Service Bank" },
  { id: "wal_vendor_001", owner_id: "ven_001", owner_type: "vendor", label: "Vendor wallet", balance: 445000, available_balance: 245000, escrow_balance: 612000 },
  { id: "wal_financier_ada", owner_id: "usr_ada", owner_type: "financier", label: "Financier wallet", balance: 42100000, available_balance: 42100000, escrow_balance: 8200000 }
];

const seedTransactions = [
  { id: "txn_001", wallet_id: "wal_usr_ada", type: "deposit", status: "success", amount: 100000, description: "Wallet deposit", created_at: "2026-08-20T09:00:00.000Z" },
  { id: "txn_002", wallet_id: "wal_usr_ada", type: "plan_payment", status: "success", amount: -25000, description: "Monthly Family Food Pack contribution", created_at: "2026-08-21T09:30:00.000Z" }
];

const seedOrders = [
  { id: "ord_001", profile_id: "usr_ada", package_id: "pkg_family", title: "Monthly Family Food Pack", amount: 150000, paid_amount: 82000, status: "in_progress", delivery_status: "eligible", payment_status: "part_paid", created_at: "2026-08-19T11:00:00.000Z" }
];

const seedSupportTickets = [
  { id: "tic_001", profile_id: "usr_ada", topic: "Wallet funding check", status: "open", priority: "medium", encrypted: true, last_message: "Deposit receipt and wallet ledger available." },
  { id: "tic_002", profile_id: "usr_ada", topic: "Delivery address confirmation", status: "pending", priority: "low", encrypted: true, last_message: "Live location and address verification requested." }
];

const seedRefunds = [
  { id: "ref_001", order_id: "ord_001", profile_id: "usr_ada", amount: 0, reason: "Product unavailable review", status: "draft" }
];

const seedReports = [
  { id: "rep_001", reporter_id: "usr_ada", subject_type: "vendor", subject_id: "ven_002", reason: "Misleading listing", status: "review" }
];

const seedAuditLogs = [
  { id: "aud_001", actor_id: "system", action: "ai_approved_product", entity_type: "product", entity_id: "prd_rice_25kg", severity: "info", created_at: "2026-08-21T08:00:00.000Z" }
];

const tableFallbacks = {
  profiles: users,
  vendors,
  food_packages: packages,
  food_plans: plans,
  financing_opportunities: opportunities,
  deliveries,
  products: seedProducts,
  kyc_verifications: seedKyc,
  wallets: seedWallets,
  wallet_transactions: seedTransactions,
  orders: seedOrders,
  support_tickets: seedSupportTickets,
  refunds: seedRefunds,
  account_reports: seedReports,
  audit_logs: seedAuditLogs,
  role_applications: []
};

export async function handleApiRequest({ method, path, query = {}, body = {}, headers = {}, rawBody = "" }) {
  const db = createSupabaseClient();
  const normalizedPath = path.replace(/\/$/, "") || "/";

  if (normalizedPath === "/health") {
    return ok({ ok: true, service: "Bulk Food by QML API", database: db ? "supabase" : "seed", deployTarget: "render", modules: ["admin", "marketplace", "kyc", "wallets", "orders", "support", "roles"] });
  }

  if (normalizedPath === "/api/auth/signin" && method === "POST") return signIn(db, body);
  if (normalizedPath === "/api/auth/signup" && method === "POST") return signUp(db, body);
  if (normalizedPath === "/api/auth/provider" && method === "POST") return providerSignIn(db, body);
  if (normalizedPath === "/api/storage/status") return storageStatus(db);
  if (normalizedPath === "/api/readiness") return readinessStatus(db);
  if (normalizedPath === "/api/summary") return adminOverview(db);
  if (normalizedPath === "/api/admin/overview") return requireAdmin(headers, () => adminOverview(db));
  if (normalizedPath === "/api/admin/activity") return requireAdmin(headers, () => listRows(db, "audit_logs"));
  if (normalizedPath === "/api/admin/approvals") return requireAdmin(headers, () => approvalQueue(db));
  if (normalizedPath === "/api/admin/policies") return requireAdmin(headers, () => adminPolicies());
  if (normalizedPath === "/api/admin/wallet-reconciliation" && method === "GET") return requireAdmin(headers, () => walletReconciliation(db));
  if (normalizedPath === "/api/admin/wallet-reconciliation/actions" && method === "POST") return requireAdmin(headers, () => recordWalletReconciliationAction(db, body, headers));

  const approvalMatch = normalizedPath.match(/^\/api\/admin\/approvals\/([^/]+)$/);
  if (approvalMatch && method === "PATCH") return requireAdmin(headers, () => reviewApproval(db, approvalMatch[1], body));

  if (normalizedPath === "/api/users/usr_ada" || normalizedPath === "/api/users/me") return currentUser(db, headers);
  if (normalizedPath === "/api/packages") return packagesEndpoint(db, query);
  if (normalizedPath === "/api/plans") return listRows(db, "food_plans");
  if (normalizedPath === "/api/vendors") return listRows(db, "vendors");
  if (normalizedPath === "/api/financing-opportunities") return listRows(db, "financing_opportunities");
  if (normalizedPath === "/api/deliveries") return listRows(db, "deliveries");

  if (normalizedPath === "/api/products" && method === "GET") return productsEndpoint(db, query);
  if (normalizedPath === "/api/products" && method === "POST") return createProduct(db, body);

  if (normalizedPath === "/api/kyc" && method === "GET") return listRows(db, "kyc_verifications");
  if (normalizedPath === "/api/kyc" && method === "POST") return submitKyc(db, body);

  if (normalizedPath === "/api/wallets") return listRows(db, "wallets");
  if (normalizedPath === "/api/wallets/payvessel/account" && method === "POST") return createPayVesselVirtualAccount(db, body);
  if (normalizedPath === "/api/wallets/payvessel/card" && method === "POST") return createPayVesselCard(db, body);
  if (normalizedPath === "/api/wallets/payvessel/kyc" && method === "POST") return verifyPayVesselIdentity(db, body);
  if (normalizedPath === "/api/wallets/payvessel/webhook" && method === "POST") return handlePayVesselWebhook(db, body, headers, rawBody);
  if (normalizedPath === "/api/wallets/deposit" && method === "POST") return walletTransaction(db, { ...body, type: "deposit" });
  if (normalizedPath === "/api/wallets/transactions" && method === "POST") return walletTransaction(db, body);
  if (normalizedPath === "/api/wallets/transfer" && method === "POST") return walletTransfer(db, body);
  const walletMatch = normalizedPath.match(/^\/api\/wallets\/([^/]+)$/);
  if (walletMatch) return walletDetail(db, walletMatch[1]);
  if (normalizedPath === "/api/transactions") return listRows(db, "wallet_transactions");

  if (normalizedPath === "/api/orders" && method === "GET") return listRows(db, "orders");
  if (normalizedPath === "/api/orders" && method === "POST") return createOrder(db, body);
  const orderAction = normalizedPath.match(/^\/api\/orders\/([^/]+)\/(cancel|complete|delivery-proof)$/);
  if (orderAction && method === "POST") return updateOrderAction(db, orderAction[1], orderAction[2], body);

  if (normalizedPath === "/api/support/tickets" && method === "GET") return listRows(db, "support_tickets");
  if (normalizedPath === "/api/support/tickets" && method === "POST") return createSupportTicket(db, body);
  if (normalizedPath === "/api/refunds" && method === "GET") return listRows(db, "refunds");
  if (normalizedPath === "/api/refunds" && method === "POST") return createRefund(db, body);
  if (normalizedPath === "/api/reports" && method === "GET") return listRows(db, "account_reports");
  if (normalizedPath === "/api/reports" && method === "POST") return createReport(db, body);

  const dashboardMatch = normalizedPath.match(/^\/api\/dashboards\/(vendor|financier|logistics|corporate)$/);
  if (dashboardMatch) return roleDashboard(db, dashboardMatch[1]);

  if (normalizedPath === "/api/role-applications" && method === "POST") return createRoleApplication(db, body);

  return notFound("Not found");
}

async function adminOverview(db) {
  const [profiles, activePlans, vendorRows, products, openFunding, availableTrips, roleReviews, orders, wallets, refunds, reports, tickets, kyc] = await Promise.all([
    rows(db, "profiles"),
    rows(db, "food_plans"),
    rows(db, "vendors"),
    rows(db, "products"),
    rows(db, "financing_opportunities"),
    rows(db, "deliveries"),
    rows(db, "role_applications"),
    rows(db, "orders"),
    rows(db, "wallets"),
    rows(db, "refunds"),
    rows(db, "account_reports"),
    rows(db, "support_tickets"),
    rows(db, "kyc_verifications")
  ]);

  const pendingProducts = products.filter((item) => ["pending", "needs_review"].includes(item.status) || item.ai_status === "needs_review");
  return ok({
    users: profiles.length,
    activePlans: activePlans.filter((plan) => ["active", "delivery_eligible"].includes(plan.status)).length,
    vendors: vendorRows.length,
    products: products.length,
    financingOpen: openFunding.filter((item) => item.status !== "funded").reduce((sum, item) => sum + Number(item.amount_needed ?? item.amountNeeded ?? 0), 0),
    deliveriesAvailable: availableTrips.filter((delivery) => delivery.status === "available").length,
    pendingApprovals: pendingProducts.length + roleReviews.filter((item) => item.status === "pending").length + vendorRows.filter((vendor) => vendor.status === "pending").length,
    walletVolume: wallets.reduce((sum, wallet) => sum + Number(wallet.balance ?? wallet.wallet_balance ?? 0), 0),
    activeOrders: orders.filter((order) => !["completed", "cancelled"].includes(order.status)).length,
    supportOpen: tickets.filter((ticket) => !["closed", "resolved"].includes(ticket.status)).length,
    riskQueue: refunds.filter((item) => ["draft", "pending", "review"].includes(item.status)).length + reports.filter((item) => ["open", "review"].includes(item.status)).length,
    modules: {
      marketplace: { total: products.length, pending: pendingProducts.length },
      kyc: { pending: kyc.filter((item) => item.status !== "verified").length },
      wallets: { total: wallets.length },
      orders: { total: orders.length },
      support: { tickets: tickets.length, refunds: refunds.length, reports: reports.length }
    }
  });
}

async function signIn(db, body) {
  const identifier = String(body.identifier || body.email || body.phone || "").trim().toLowerCase();
  if (!identifier) return fail("Email or phone number is required", 400);
  if (supabaseAuthConfigured()) return supabaseSignIn(db, body, identifier);
  const user = await findProfileByIdentifier(db, identifier);
  if (!user) return fail("Account not found. Create an account first.", 404);
  return authResponse(db, user, "signin");
}

async function signUp(db, body) {
  const name = String(body.name || body.fullName || "").trim();
  const identifier = String(body.identifier || body.email || body.phone || "").trim();
  const role = allowedRoles.has(String(body.role || "").toLowerCase()) ? String(body.role).toLowerCase() : "customer";
  if (!name || !identifier) return fail("Full name and email or phone number are required", 400);
  if (supabaseAuthConfigured()) return supabaseSignUp(db, body, { name, identifier, role });

  const existing = await findProfileByIdentifier(db, identifier);
  const user = existing || await createProfile(db, { name, identifier, referralCode: body.referralCode });
  if (role !== "customer") await upsertRole(db, user.id, role, "pending", { source: "signup", referralCode: body.referralCode || null });
  return authResponse(db, user, "signup", role, existing ? 200 : 201);
}

async function providerSignIn(db, body) {
  const provider = String(body.provider || "provider").toLowerCase();
  if (supabaseAuthConfigured()) return supabaseProviderRedirect(provider);
  const name = String(body.name || `${provider} user`).trim();
  const identifier = String(body.email || `${provider}@qml.local`).trim();
  const existing = await findProfileByIdentifier(db, identifier);
  const user = existing || await createProfile(db, { name, identifier, referralCode: body.referralCode });
  return authResponse(db, user, provider);
}

async function supabaseSignIn(db, body, identifier) {
  const password = String(body.password || "");
  if (!password) return fail("Password is required", 400);
  try {
    const auth = await supabaseAuthRequest("/token?grant_type=password", {
      method: "POST",
      body: identifier.includes("@") ? { email: identifier, password } : { phone: identifier, password }
    });
    const authUser = auth.user;
    if (!authUser) return fail("Supabase Auth did not return a user", 502);
    let user = await profileForAuthUser(db, authUser);
    if (!user) {
      user = await createProfile(db, {
        id: authUser.id,
        name: authUser.user_metadata?.full_name || authUser.user_metadata?.name || identifier,
        identifier: authUser.email || authUser.phone || identifier,
        referralCode: authUser.user_metadata?.referral_code
      });
    }
    return authResponse(db, user, "supabase_password", "customer", 200, supabaseSession(auth, "supabase_password", "customer"));
  } catch (error) {
    return fail(error.message || "Supabase sign in failed", error.statusCode || 401);
  }
}

async function supabaseSignUp(db, body, { name, identifier, role }) {
  const password = String(body.password || "");
  if (password.length < 8) return fail("Password must be at least 8 characters", 400);
  try {
    const auth = await supabaseAuthRequest("/signup", {
      method: "POST",
      body: {
        ...(identifier.includes("@") ? { email: identifier } : { phone: identifier }),
        password,
        data: {
          full_name: name,
          name,
          role,
          referral_code: body.referralCode || null
        }
      }
    });
    const authUser = auth.user;
    if (!authUser) return fail("Supabase Auth did not return a user", 502);
    const existing = await profileForAuthUser(db, authUser) || await findProfileByIdentifier(db, identifier);
    const user = existing || await createProfile(db, { id: authUser.id, name, identifier, referralCode: body.referralCode });
    if (role !== "customer") await upsertRole(db, user.id, role, "pending", { source: "signup", referralCode: body.referralCode || null });
    const session = supabaseSession(auth, "supabase_signup", role);
    return authResponse(db, user, "supabase_signup", role, existing ? 200 : 201, session, {
      requiresConfirmation: !session.token,
      message: session.token ? "Account created" : "Check your email or phone to confirm your account before signing in."
    });
  } catch (error) {
    return fail(error.message || "Supabase sign up failed", error.statusCode || 400);
  }
}

function supabaseProviderRedirect(provider) {
  const allowed = new Set(["google", "apple"]);
  if (!allowed.has(provider)) return fail("Unsupported auth provider", 400);
  const redirectTo = process.env.AUTH_REDIRECT_URL || process.env.SUPABASE_AUTH_REDIRECT_URL || process.env.PUBLIC_APP_URL || "http://localhost:4000/app";
  const baseUrl = supabaseUrl();
  const authorizationUrl = `${baseUrl}/auth/v1/authorize?provider=${encodeURIComponent(provider)}&redirect_to=${encodeURIComponent(redirectTo)}`;
  return ok({
    provider,
    mode: "redirect",
    authorizationUrl,
    message: `Continue with ${provider} in the browser.`
  });
}

function supabaseSession(auth, authMethod, requestedRole) {
  const session = auth.session || auth;
  const accessToken = session?.access_token || "";
  const expiresAt = session?.expires_at
    ? new Date(Number(session.expires_at) * 1000).toISOString()
    : session?.expires_in
      ? new Date(Date.now() + Number(session.expires_in) * 1000).toISOString()
      : null;
  return {
    token: accessToken,
    refreshToken: session?.refresh_token || "",
    userId: auth.user?.id || session?.user?.id || "",
    authMethod,
    requestedRole,
    provider: "supabase",
    status: accessToken ? "active" : "pending_confirmation",
    expiresAt
  };
}

async function findProfileByIdentifier(db, identifier) {
  const normalized = String(identifier || "").trim().toLowerCase();
  if (!normalized) return null;
  if (!db) {
    return users.find((user) => [user.email, user.phone].some((value) => String(value || "").toLowerCase() === normalized)) || null;
  }
  const field = normalized.includes("@") ? "email" : "phone";
  const rows = await db.select("profiles", "*", `${field}=eq.${encodeURIComponent(identifier)}`, 1);
  return rows[0] || null;
}

async function findProfileById(db, id) {
  if (!id) return null;
  if (!db) return users.find((user) => user.id === id) || null;
  const rows = await db.select("profiles", "*", `id=eq.${encodeURIComponent(id)}`, 1);
  return rows[0] || null;
}

async function profileForAuthUser(db, authUser) {
  if (!authUser) return null;
  return await findProfileById(db, authUser.id)
    || await findProfileByIdentifier(db, authUser.email || authUser.phone || "");
}

async function createProfile(db, { id, name, identifier, referralCode }) {
  const referralSuffix = Date.now().toString().slice(-4);
  const profile = {
    ...(id ? { id } : {}),
    full_name: name,
    name,
    email: identifier.includes("@") ? identifier : null,
    phone: identifier.includes("@") ? null : identifier,
    country: "Nigeria",
    state: "Lagos",
    city: "Lagos",
    wallet_balance: 0,
    walletBalance: 0,
    qml_score: 500,
    qmlScore: 500,
    credit_limit: 0,
    creditLimit: 0,
    referral_code: `QML-${String(name).split(" ")[0]?.toUpperCase() || "USER"}-${referralSuffix}`,
    referralCode: `QML-${String(name).split(" ")[0]?.toUpperCase() || "USER"}-${referralSuffix}`,
    referred_by: referralCode || null,
    roles: { customer: "active" }
  };
  if (db) {
    const created = await db.insert("profiles", {
      ...(profile.id ? { id: profile.id } : {}),
      full_name: profile.full_name,
      email: profile.email,
      phone: profile.phone,
      country: profile.country,
      state: profile.state,
      city: profile.city,
      wallet_balance: profile.wallet_balance,
      qml_score: profile.qml_score,
      credit_limit: profile.credit_limit,
      referral_code: profile.referral_code,
      referred_by: profile.referred_by
    });
    const user = created[0];
    await upsertRole(db, user.id, "customer", "active", { source: "signup" });
    await db.insert("wallets", { owner_id: user.id, owner_type: "customer", label: "Personal wallet", balance: 0, available_balance: 0, escrow_balance: 0, provider: "internal", metadata: {} });
    return user;
  }
  const user = { id: id || `usr_${Date.now()}`, ...profile };
  users.unshift(user);
  seedWallets.unshift({ id: `wal_${Date.now()}`, owner_id: user.id, owner_type: "customer", label: "Personal wallet", balance: 0, available_balance: 0, escrow_balance: 0, provider: "internal" });
  return user;
}

async function upsertRole(db, profileId, role, status = "pending", payload = {}) {
  if (db) {
    if (status === "active") {
      return db.insert("user_roles", { profile_id: profileId, role, status, metadata: payload });
    }
    return db.insert("role_applications", { profile_id: profileId, role, status, referral_code: payload.referralCode || null, payload });
  }
  const user = users.find((item) => item.id === profileId);
  if (user) user.roles = { ...(user.roles || {}), [role]: status };
  return user;
}

async function authResponse(db, user, authMethod, requestedRole = "customer", statusCode = 200, sessionOverride = null, extra = {}) {
  const bundle = await userBundle(db, user);
  return ok({
    session: sessionOverride || {
      token: `dev_${user.id}_${Date.now()}`,
      userId: user.id,
      authMethod,
      requestedRole,
      provider: "preview",
      status: "active",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString()
    },
    ...bundle,
    ...extra
  }, statusCode);
}

async function userBundle(db, user) {
  if (!db) {
    const wallets = seedWallets.filter((wallet) => wallet.owner_id === user.id);
    const walletIds = new Set(wallets.map((wallet) => wallet.id));
    return { user, plans: plans.filter((plan) => (plan.user_id || plan.userId) === user.id), roles: user.roles || { customer: "active" }, kyc: seedKyc.find((item) => item.profile_id === user.id) || null, wallets, transactions: seedTransactions.filter((txn) => walletIds.has(txn.wallet_id)) };
  }
  const [userPlans, roles, kyc, wallets] = await Promise.all([
    db.select("food_plans", "*", `profile_id=eq.${user.id}`),
    db.select("user_roles", "*", `profile_id=eq.${user.id}`),
    db.select("kyc_verifications", "*", `profile_id=eq.${user.id}`),
    db.select("wallets", "*", `owner_id=eq.${user.id}`)
  ]);
  const walletIds = new Set(wallets.map((wallet) => wallet.id));
  const transactions = walletIds.size ? (await db.select("wallet_transactions", "*")).filter((txn) => walletIds.has(txn.wallet_id)) : [];
  return { user, plans: userPlans, roles, kyc: kyc[0] || null, wallets, transactions };
}

async function approvalQueue(db) {
  const [products, roleApplications, vendorRows, kyc] = await Promise.all([rows(db, "products"), rows(db, "role_applications"), rows(db, "vendors"), rows(db, "kyc_verifications")]);
  return ok([
    ...products.filter((item) => item.status !== "approved").map((item) => ({ ...item, type: "product" })),
    ...roleApplications.filter((item) => item.status === "pending").map((item) => ({ ...item, type: "role_application" })),
    ...vendorRows.filter((item) => item.status === "pending").map((item) => ({ ...item, type: "vendor" })),
    ...kyc.filter((item) => item.status !== "verified").map((item) => ({ ...item, type: "kyc" }))
  ]);
}

async function reviewApproval(db, id, body) {
  const status = body.status || body.decision || "approved";
  const table = body.type === "role_application" ? "role_applications" : body.type === "vendor" ? "vendors" : body.type === "kyc" ? "kyc_verifications" : "products";
  const payload = table === "products" ? { status, ai_status: status === "approved" ? "auto_approved" : "rejected", reviewed_at: new Date().toISOString() } : { status };
  const updated = db ? await db.update(table, id, payload) : updateFallback(table, id, payload);
  await writeAudit(db, body.actorId || "admin", "review_approval", table, id, status);
  return ok({ status, item: updated[0] || updated });
}

function adminPolicies() {
  return ok({
    kycTiers: [
      { range: "up_to_200k", requirement: "Verified email/phone, address, basic profile" },
      { range: "200k_to_500k", requirement: "NIN/BVN, bank or card, verified delivery address" },
      { range: "above_500k", requirement: "Full KYC, income/CV or employer proof, next of kin, admin risk review" }
    ],
    listingRules: ["Minimum 3 product/package/plan photos", "Vendor writeup required", "AI price and document validation", "Reject payment outside wallet messaging"],
    deliveryRules: ["Release after policy midpoint", "OTP and live location proof", "Delivery photo and recipient sign-off"]
  });
}

async function walletReconciliation(db) {
  const [wallets, transactions, audits, orders, refunds] = await Promise.all([
    rows(db, "wallets"),
    rows(db, "wallet_transactions"),
    rows(db, "audit_logs"),
    rows(db, "orders"),
    rows(db, "refunds")
  ]);

  const duplicateWebhookEvents = audits
    .filter((item) => item.action === "payvessel_webhook_duplicate")
    .map((item) => reconciliationAuditItem(item, "Duplicate PayVessel webhook"));
  const failedWalletLookups = audits
    .filter((item) => item.action === "payvessel_webhook_wallet_not_found")
    .map((item) => reconciliationAuditItem(item, "Webhook wallet lookup failed"));
  const recentActions = audits
    .filter((item) => item.action === "wallet_reconciliation_action")
    .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
    .slice(0, 10)
    .map(reconciliationActionItem);
  const escrowItems = wallets
    .filter((wallet) => Number(wallet.escrow_balance || 0) > 0)
    .map((wallet) => ({
      id: wallet.id,
      title: `${wallet.label || wallet.owner_type || "Wallet"} escrow`,
      meta: `${wallet.owner_type || "wallet"} ${wallet.owner_id} has ${formatAmount(wallet.escrow_balance)} in escrow`,
      amount: Number(wallet.escrow_balance || 0),
      status: "escrow_review",
      source: "wallet"
    }));
  const refundItems = refunds
    .filter((refund) => !["closed", "resolved", "settled"].includes(String(refund.status || "").toLowerCase()))
    .map((refund) => ({
      id: refund.id,
      title: "Refund settlement review",
      meta: `${refund.order_id || "order"} - ${refund.reason || "Refund request"}`,
      amount: Number(refund.amount || 0),
      status: refund.status || "pending",
      source: "refund"
    }));
  const orderItems = orders
    .filter((order) => ["delivery_proof_submitted", "cancelled", "delivered"].includes(String(order.status || "").toLowerCase()))
    .map((order) => ({
      id: order.id,
      title: "Order settlement review",
      meta: `${order.title} - paid ${formatAmount(order.paid_amount)} of ${formatAmount(order.amount)}`,
      amount: Number(order.paid_amount || 0),
      status: order.status,
      source: "order"
    }));
  const recentLedger = [...transactions]
    .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
    .slice(0, 12)
    .map((txn) => ({
      id: txn.id,
      title: txn.description || txn.type || "Wallet transaction",
      meta: `${txn.wallet_id} - ${txn.reference || "no reference"}`,
      amount: Number(txn.amount || 0),
      status: txn.status || "success",
      reference: txn.reference || ""
    }));

  const credits = transactions.filter((txn) => Number(txn.amount || 0) > 0).reduce((sum, txn) => sum + Number(txn.amount || 0), 0);
  const debits = transactions.filter((txn) => Number(txn.amount || 0) < 0).reduce((sum, txn) => sum + Math.abs(Number(txn.amount || 0)), 0);
  const settlementReview = [...escrowItems, ...refundItems, ...orderItems].slice(0, 20);

  return ok({
    generatedAt: new Date().toISOString(),
    totals: {
      wallets: wallets.length,
      transactions: transactions.length,
      credits,
      debits,
      duplicates: duplicateWebhookEvents.length,
      failedWalletLookups: failedWalletLookups.length,
      settlementReview: settlementReview.length,
      actions: recentActions.length
    },
    recentLedger,
    duplicateWebhookEvents,
    failedWalletLookups,
    settlementReview,
    recentActions
  });
}

async function recordWalletReconciliationAction(db, body, headers = {}) {
  const allowedActions = new Set(["acknowledge", "mark_reviewed", "request_investigation", "hold_settlement"]);
  const action = String(body.action || "mark_reviewed").trim().toLowerCase();
  if (!allowedActions.has(action)) return fail("Unsupported reconciliation action", 400);
  const itemType = String(body.itemType || "reconciliation").trim().toLowerCase();
  const itemId = String(body.itemId || body.reference || "").trim();
  if (!itemId) return fail("itemId or reference is required", 400);
  const actorId = body.actorId || headerValue(headers, "x-admin-actor") || "admin";
  const payload = {
    action,
    itemType,
    reference: body.reference || null,
    note: body.note || "",
    amount: body.amount === undefined ? null : Number(body.amount),
    status: body.status || "reviewed"
  };
  const audit = await writeAudit(db, actorId, "wallet_reconciliation_action", itemType, itemId, payload);
  return ok({ status: payload.status, action, itemType, itemId, audit: audit?.[0] || audit }, 201);
}

function reconciliationAuditItem(item, title) {
  const value = item.metadata?.value || item.metadata || {};
  const reference = typeof value === "string" ? value : value.reference || value.data?.reference || value.data?.transaction_ref || "";
  return {
    id: item.id,
    title,
    meta: `${reference || item.entity_id || "untracked"} - ${item.created_at || "recent"}`,
    status: item.action === "payvessel_webhook_duplicate" ? "duplicate" : "review",
    reference,
    createdAt: item.created_at || null
  };
}

function reconciliationActionItem(item) {
  const value = item.metadata?.value || item.metadata || {};
  return {
    id: item.id,
    title: `Reconciliation ${value.action || "action"}`,
    meta: `${item.entity_type || "item"} ${item.entity_id || ""} - ${value.note || "Admin review recorded"}`,
    status: value.status || "reviewed",
    reference: value.reference || "",
    createdAt: item.created_at || null
  };
}

function formatAmount(amount) {
  return `NGN ${Number(amount || 0).toLocaleString("en-NG", { maximumFractionDigits: 0 })}`;
}

async function currentUser(db, headers = {}) {
  if (!db) {
    const wallets = seedWallets.filter((wallet) => wallet.owner_id === "usr_ada");
    const walletIds = new Set(wallets.map((wallet) => wallet.id));
    return ok({ user: users[0], plans, roles: users[0].roles, kyc: seedKyc[0], wallets, transactions: seedTransactions.filter((txn) => walletIds.has(txn.wallet_id)) });
  }
  const authUser = await authUserFromHeaders(headers).catch(() => null);
  const user = authUser
    ? await profileForAuthUser(db, authUser)
    : (await db.select("profiles", "*", "email=eq.ada@example.com", 1))[0];
  if (!user) return notFound("User not found");
  const [userPlans, roles, kyc, wallets] = await Promise.all([
    db.select("food_plans", "*", `profile_id=eq.${user.id}`),
    db.select("user_roles", "*", `profile_id=eq.${user.id}`),
    db.select("kyc_verifications", "*", `profile_id=eq.${user.id}`),
    db.select("wallets", "*", `owner_id=eq.${user.id}`)
  ]);
  const walletIds = new Set(wallets.map((wallet) => wallet.id));
  const transactions = walletIds.size ? (await db.select("wallet_transactions", "*")).filter((txn) => walletIds.has(txn.wallet_id)) : [];
  return ok({ user, plans: userPlans, roles, kyc: kyc[0] || null, wallets, transactions });
}

async function packagesEndpoint(db, query) {
  const country = String(query.country ?? "").toLowerCase();
  const city = String(query.city ?? "").toLowerCase();
  const data = await rows(db, "food_packages");
  return ok(data.filter((item) => (!country || String(item.country).toLowerCase() === country) && (!city || String(item.city).toLowerCase() === city)));
}

async function productsEndpoint(db, query) {
  const data = await rows(db, "products");
  const status = query.status ? String(query.status) : "";
  const category = query.category ? String(query.category).toLowerCase() : "";
  return ok(data.filter((item) => (!status || item.status === status) && (!category || String(item.category).toLowerCase() === category)));
}

async function createProduct(db, body) {
  if (!body.title || !body.vendorId) return fail("Product title and vendorId are required", 400);
  const photos = Array.isArray(body.photos) ? body.photos : [];
  const ai = evaluateListing({ ...body, photos });
  const payload = {
    vendor_id: body.vendorId,
    title: body.title,
    category: body.category || "Local food",
    price: Number(body.price || 0),
    unit: body.unit || "unit",
    stock_quantity: Number(body.stockQuantity || body.stock_quantity || 0),
    description: body.description || body.vendorInfo || "",
    photos,
    status: ai.approved ? "approved" : "pending",
    ai_status: ai.approved ? "auto_approved" : "needs_review",
    ai_score: ai.score,
    ai_checks: ai.checks
  };
  const created = db ? await db.insert("products", payload) : insertFallback("products", payload);
  await writeAudit(db, "system", "ai_listing_review", "product", created[0]?.id || created.id, payload.ai_status);
  return ok({ product: created[0] || created, ai }, 201);
}

function evaluateListing(item) {
  const checks = [
    { key: "photos", passed: (item.photos || []).length >= 3, label: "Minimum 3 photos" },
    { key: "price", passed: Number(item.price || 0) > 0, label: "Valid price" },
    { key: "writeup", passed: String(item.description || item.vendorInfo || "").length >= 30, label: "Vendor writeup" },
    { key: "stock", passed: Number(item.stockQuantity || item.stock_quantity || 0) > 0, label: "Stock quantity" }
  ];
  const passed = checks.filter((check) => check.passed).length;
  const score = Math.round((passed / checks.length) * 100);
  return { approved: score >= 75, score, checks };
}

async function submitKyc(db, body) {
  if (!body.profileId) return fail("profileId is required", 400);
  const payload = {
    profile_id: body.profileId,
    status: body.status || "in_review",
    verification_score: calculateKycScore(body),
    nin_status: body.nin ? "submitted" : "missing",
    bvn_status: body.bvn ? "submitted" : "missing",
    address_status: body.address ? "submitted" : "missing",
    document_status: body.documents?.length ? "submitted" : "missing",
    payload: body
  };
  const created = db ? await db.insert("kyc_verifications", payload) : insertFallback("kyc_verifications", payload);
  return ok({ kyc: created[0] || created }, 201);
}

function calculateKycScore(body) {
  return ["nin", "bvn", "address", "bankAccount", "card", "nextOfKin", "documents"].reduce((score, key) => score + (body[key] ? 12 : 0), 28);
}

function envPresent(name) {
  const value = String(process.env[name] || "").trim();
  const lowered = value.toLowerCase();
  if (!value) return false;
  if (lowered.startsWith("your-") || lowered.includes("your-project") || lowered.includes("placeholder")) return false;
  if (lowered === "change-me" || lowered === "changeme" || lowered === "example") return false;
  return true;
}

function allEnv(names) {
  return names.every(envPresent);
}

function anyEnv(names) {
  return names.some(envPresent);
}

function supabaseUrl() {
  return String(process.env.SUPABASE_URL || "").replace(/\/$/, "");
}

function supabaseAuthConfigured() {
  return envPresent("SUPABASE_URL") && envPresent("SUPABASE_ANON_KEY");
}

function bearerToken(headers) {
  const header = String(headerValue(headers, "authorization") || "");
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || "";
}

function headerValue(headers, name) {
  const target = name.toLowerCase();
  const match = Object.entries(headers || {}).find(([key]) => key.toLowerCase() === target);
  return match?.[1];
}

function secureTextEquals(left, right) {
  const leftValue = String(left || "");
  const rightValue = String(right || "");
  if (!leftValue || !rightValue) return false;
  const leftBuffer = Buffer.from(leftValue);
  const rightBuffer = Buffer.from(rightValue);
  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
}

function payVesselConfigured() {
  return allEnv(["PAYVESSEL_API_KEY", "PAYVESSEL_API_SECRET", "PAYVESSEL_BUSINESS_ID"]);
}

async function supabaseAuthRequest(path, { method = "GET", body, token, useServiceRole = false } = {}) {
  if (!supabaseAuthConfigured()) throw Object.assign(new Error("Supabase Auth is not configured"), { statusCode: 503 });
  const key = useServiceRole && envPresent("SUPABASE_SERVICE_ROLE_KEY")
    ? process.env.SUPABASE_SERVICE_ROLE_KEY
    : process.env.SUPABASE_ANON_KEY;
  const response = await fetch(`${supabaseUrl()}/auth/v1${path}`, {
    method,
    headers: {
      apikey: key,
      Authorization: `Bearer ${token || key}`,
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.error_description || data.msg || data.message || `Supabase Auth failed: ${response.status}`;
    throw Object.assign(new Error(message), { statusCode: response.status });
  }
  return data;
}

async function authUserFromHeaders(headers) {
  const token = bearerToken(headers);
  if (!token || !supabaseAuthConfigured()) return null;
  return supabaseAuthRequest("/user", { token });
}

async function payVesselRequest(path, { method = "GET", body } = {}) {
  if (!payVesselConfigured()) return mockPayVesselResponse(path, body);
  const baseUrl = process.env.PAYVESSEL_BASE_URL || "https://api.payvessel.com";
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "api-key": process.env.PAYVESSEL_API_KEY,
      "api-secret": process.env.PAYVESSEL_API_SECRET,
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || `PayVessel request failed: ${response.status}`);
  return data;
}

function mockPayVesselResponse(path, body = {}) {
  if (path.includes("customerReservedAccount")) {
    return {
      status: true,
      service: "CREATE_VIRTUAL_ACCOUNT",
      business: body.businessid || "QML_SANDBOX",
      banks: [
        {
          bankCode: "120001",
          bankName: "9Payment Service Bank",
          accountNumber: String(5300000000 + Math.floor(Math.random() * 99999999)),
          accountName: body.name || "QML CUSTOMER",
          account_type: body.account_type || "STATIC",
          expire_date: null,
          trackingReference: `QMLPV${Date.now()}`
        }
      ]
    };
  }
  if (path.includes("cards")) {
    return { status: true, message: "Virtual card creation started", data: { id: `pv_card_${Date.now()}`, status: "PENDING", masked_pan: "", balance: body.amount || "10.00", currency: body.currency || "USD", brand: body.brand || "VISA" } };
  }
  if (path.includes("identity")) {
    return { status: true, message: "Identity verification successful", data: { provider: "payvessel", match: true } };
  }
  return { status: true, data: {} };
}

function normalizePayVesselAccount(provider, payload) {
  const account = provider?.banks?.[0] || provider?.data?.banks?.[0] || provider?.data || provider;
  return {
    bankCode: account?.bankCode || "120001",
    bankName: account?.bankName || "9Payment Service Bank",
    accountNumber: account?.accountNumber || account?.account_number || "5300000000",
    accountName: account?.accountName || payload.name,
    account_type: account?.account_type || payload.account_type,
    expire_date: account?.expire_date || null,
    trackingReference: account?.trackingReference || `QMLPV${Date.now()}`
  };
}

function verifyPayVesselWebhook(headers, rawBody) {
  if (!process.env.PAYVESSEL_API_SECRET) return { ok: true, message: "Webhook accepted in mock mode" };
  const signature = headers?.["http_payvessel_http_signature"] || headers?.["HTTP_PAYVESSEL_HTTP_SIGNATURE"] || headers?.["payvessel-http-signature"];
  if (!signature || !rawBody) return { ok: false, message: "Missing PayVessel signature" };
  const digest = createHmac("sha512", process.env.PAYVESSEL_API_SECRET).update(rawBody).digest("hex");
  const left = Buffer.from(String(signature), "hex");
  const right = Buffer.from(digest, "hex");
  if (left.length !== right.length) return { ok: false, message: "Invalid PayVessel signature" };
  return { ok: timingSafeEqual(left, right), message: "Invalid PayVessel signature" };
}

async function findWalletForPayVesselPayment(db, data) {
  const accountNumber = String(data.accountNumber || data.account_number || data.destination_account || "");
  const trackingReference = String(data.trackingReference || data.tracking_reference || "");
  const walletRows = await rows(db, "wallets");
  return walletRows.find((wallet) => (
    accountNumber && String(wallet.virtual_account_number || "") === accountNumber
  ) || (
    trackingReference && String(wallet.metadata?.trackingReference || "") === trackingReference
  ))?.id;
}

async function walletDetail(db, ownerId) {
  const wallets = await rows(db, "wallets");
  const transactions = await rows(db, "wallet_transactions");
  const owned = wallets.filter((wallet) => wallet.owner_id === ownerId || wallet.id === ownerId);
  const walletIds = new Set(owned.map((wallet) => wallet.id));
  return ok({ wallets: owned, transactions: transactions.filter((txn) => walletIds.has(txn.wallet_id)) });
}

async function findWalletById(db, walletId) {
  if (!walletId) return null;
  if (!db) return seedWallets.find((wallet) => wallet.id === walletId) || null;
  const walletRows = await db.select("wallets", "*", `id=eq.${encodeURIComponent(walletId)}`, 1);
  return walletRows[0] || null;
}

async function findTransactionByReference(db, reference) {
  const normalized = normalizeTransactionReference(reference);
  if (!normalized) return null;
  if (!db) return seedTransactions.find((txn) => String(txn.reference || "") === normalized) || null;
  const transactionRows = await db.select("wallet_transactions", "*", `reference=eq.${encodeURIComponent(normalized)}`, 1);
  return transactionRows[0] || null;
}

function normalizeTransactionReference(reference) {
  return String(reference || "").trim().slice(0, 120);
}

function makeTransactionReference(prefix, id) {
  const cleanedPrefix = String(prefix || "txn").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "txn";
  const cleanedId = String(id || "wallet").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").slice(-24) || "wallet";
  return `${cleanedPrefix}_${cleanedId}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function duplicateReferenceError(error) {
  const message = String(error?.message || error || "").toLowerCase();
  return message.includes("duplicate") || message.includes("23505") || (message.includes("wallet_transactions") && message.includes("reference"));
}

async function createPayVesselVirtualAccount(db, body) {
  if (!body.profileId || !body.email || !body.name || !body.phoneNumber) return fail("profileId, email, name, and phoneNumber are required", 400);
  const payload = {
    email: body.email,
    name: body.name,
    phoneNumber: body.phoneNumber,
    bankcode: body.bankcode || ["120001"],
    account_type: body.accountType || body.account_type || "STATIC",
    businessid: process.env.PAYVESSEL_BUSINESS_ID || body.businessId || "QML_SANDBOX",
    ...(body.bvn ? { bvn: body.bvn } : {}),
    ...(body.nin ? { nin: body.nin } : {})
  };
  const provider = await payVesselRequest("/pms/api/external/request/customerReservedAccount/", { method: "POST", body: payload });
  const account = normalizePayVesselAccount(provider, payload);
  const walletPayload = {
    owner_id: body.profileId,
    owner_type: body.ownerType || "customer",
    label: body.label || "Personal wallet",
    balance: 0,
    available_balance: 0,
    escrow_balance: 0,
    provider: "payvessel",
    provider_customer_id: body.profileId,
    virtual_account_number: account.accountNumber,
    virtual_bank_name: account.bankName,
    metadata: { provider, trackingReference: account.trackingReference }
  };
  const created = db ? await db.insert("wallets", walletPayload) : insertFallback("wallets", walletPayload);
  await writeAudit(db, "system", "payvessel_virtual_account_created", "wallet", created[0]?.id || created.id, account.accountNumber);
  return ok({ wallet: created[0] || created, account, providerMode: payVesselConfigured() ? "live" : "mock" }, 201);
}

async function createPayVesselCard(db, body) {
  if (!body.profileId || !body.walletId) return fail("profileId and walletId are required", 400);
  const payload = {
    customer_id: body.profileId,
    wallet_id: body.walletId,
    amount: String(body.amount || 10),
    currency: body.currency || "USD",
    brand: body.brand || "VISA",
    is_contactless: Boolean(body.isContactless)
  };
  const provider = await payVesselRequest("/pms/api/external/cards/create/", { method: "POST", body: payload });
  const card = provider?.data || {
    id: `pv_card_${Date.now()}`,
    status: "PENDING",
    masked_pan: "",
    balance: payload.amount,
    currency: payload.currency,
    brand: payload.brand
  };
  await writeAudit(db, "system", "payvessel_card_requested", "wallet", body.walletId, card.status);
  return ok({ card, providerMode: payVesselConfigured() ? "live" : "mock" }, 201);
}

async function verifyPayVesselIdentity(db, body) {
  if (!body.profileId || (!body.bvn && !body.nin)) return fail("profileId and BVN or NIN are required", 400);
  const endpoint = body.bvn ? "/pms/api/external/identity/bvn/basic/" : "/pms/api/external/identity/nin/basic/";
  const provider = await payVesselRequest(endpoint, { method: "POST", body: body.bvn ? { bvn: body.bvn } : { nin: body.nin } });
  const payload = {
    profile_id: body.profileId,
    status: provider?.status === false ? "needs_review" : "approved",
    verification_score: provider?.status === false ? 45 : 88,
    nin_status: body.nin ? "verified" : "missing",
    bvn_status: body.bvn ? "verified" : "missing",
    address_status: body.address ? "submitted" : "missing",
    document_status: body.documents?.length ? "submitted" : "provider_kyc",
    payload: { provider: "payvessel", providerResponse: provider }
  };
  const created = db ? await db.insert("kyc_verifications", payload) : insertFallback("kyc_verifications", payload);
  await writeAudit(db, "system", "payvessel_identity_verified", "kyc", created[0]?.id || created.id, payload.status);
  return ok({ kyc: created[0] || created, providerMode: payVesselConfigured() ? "live" : "mock" }, 201);
}

async function handlePayVesselWebhook(db, body, headers, rawBody) {
  const verification = verifyPayVesselWebhook(headers, rawBody);
  if (!verification.ok) return fail(verification.message, 401);
  const event = body.event || body.type || body?.data?.event;
  const data = body.data || body;
  const reference = data.transaction_ref || data.reference || data.trackingReference || `pv_${Date.now()}`;
  if (event === "transaction.success" || data.status === "success" || data.status === "SUCCESS") {
    const walletId = await findWalletForPayVesselPayment(db, data);
    if (!walletId) {
      await writeAudit(db, "payvessel", "payvessel_webhook_wallet_not_found", "wallet", "unmatched", { reference, event, data });
      return ok({ received: true, credited: false, reason: "wallet_not_found", reference });
    }
    const amount = Number(data.amount || data.settlement_amount || 0);
    const result = await walletTransaction(db, {
      walletId,
      amount,
      type: "payvessel_deposit",
      description: `PayVessel funding ${reference}`,
      reference,
      metadata: { provider: "payvessel", event, payload: data }
    });
    if (result.statusCode >= 400) return result;
    await writeAudit(db, "payvessel", result.data.duplicate ? "payvessel_webhook_duplicate" : "payvessel_webhook_credit", "wallet", walletId, reference);
    return ok({ received: true, credited: !result.data.duplicate, duplicate: Boolean(result.data.duplicate), reference, transaction: result.data.transaction });
  }
  await writeAudit(db, "payvessel", "payvessel_webhook_received", "webhook", reference, event || "unknown");
  return ok({ received: true, credited: false, event: event || "unknown", reference });
}

async function walletTransaction(db, body) {
  if (!body.walletId || body.amount === undefined || body.amount === null) return fail("walletId and amount are required", 400);
  const amount = Number(body.amount);
  if (!Number.isFinite(amount) || amount === 0) return fail("amount must be a non-zero number", 400);
  const wallet = await findWalletById(db, body.walletId);
  if (!wallet) return notFound("Wallet not found");
  const reference = normalizeTransactionReference(body.reference) || makeTransactionReference(body.type || "activity", body.walletId);
  const existing = await findTransactionByReference(db, reference);
  if (existing) return ok({ transaction: existing, duplicate: true, reference });
  const available = Number(wallet.available_balance ?? wallet.balance ?? 0);
  if (amount < 0 && body.allowOverdraft !== true && available + amount < 0) {
    return fail("Insufficient wallet balance", 409);
  }
  const txn = {
    wallet_id: body.walletId,
    type: body.type || "activity",
    status: body.status || "success",
    amount,
    description: body.description || "Wallet activity",
    reference,
    metadata: body.metadata || {}
  };
  let created;
  try {
    created = db ? await db.insert("wallet_transactions", txn) : insertFallback("wallet_transactions", txn);
  } catch (error) {
    if (duplicateReferenceError(error)) {
      const duplicate = await findTransactionByReference(db, reference);
      if (duplicate) return ok({ transaction: duplicate, duplicate: true, reference });
    }
    throw error;
  }
  if (db) await db.incrementWallet(body.walletId, amount);
  else incrementFallbackWallet(body.walletId, amount);
  return ok({ transaction: created[0] || created, duplicate: false, reference }, 201);
}

async function walletTransfer(db, body) {
  if (!body.fromWalletId || !body.toWalletId || !body.amount) return fail("fromWalletId, toWalletId, and amount are required", 400);
  const amount = Math.abs(Number(body.amount));
  if (!Number.isFinite(amount) || amount === 0) return fail("amount must be a non-zero number", 400);
  const [fromWallet, toWallet] = await Promise.all([findWalletById(db, body.fromWalletId), findWalletById(db, body.toWalletId)]);
  if (!fromWallet) return notFound("Source wallet not found");
  if (!toWallet) return notFound("Destination wallet not found");
  const available = Number(fromWallet.available_balance ?? fromWallet.balance ?? 0);
  if (available < amount) return fail("Insufficient wallet balance", 409);
  const transferReference = normalizeTransactionReference(body.reference) || makeTransactionReference("transfer", `${body.fromWalletId}_${body.toWalletId}`);
  const debit = await walletTransaction(db, { walletId: body.fromWalletId, amount: -amount, type: "transfer_out", description: body.description || "Wallet transfer", reference: `${transferReference}_debit`, metadata: { transferReference, toWalletId: body.toWalletId } });
  if (debit.statusCode >= 400) return debit;
  const credit = await walletTransaction(db, { walletId: body.toWalletId, amount, type: "transfer_in", description: body.description || "Wallet transfer", reference: `${transferReference}_credit`, metadata: { transferReference, fromWalletId: body.fromWalletId } });
  if (credit.statusCode >= 400) return credit;
  return ok({ debit: debit.data.transaction, credit: credit.data.transaction }, 201);
}

async function createOrder(db, body) {
  if (!body.profileId || !body.title || !body.amount) return fail("profileId, title, and amount are required", 400);
  const amount = Number(body.amount);
  const paidAmount = Number(body.paidAmount || 0);
  const payload = { profile_id: body.profileId, package_id: body.packageId || null, title: body.title, amount, paid_amount: paidAmount, status: "in_progress", delivery_status: paidAmount >= amount * 0.5 ? "eligible" : "not_eligible", payment_status: paidAmount >= amount ? "paid" : "part_paid", metadata: body.metadata || {} };
  const created = db ? await db.insert("orders", payload) : insertFallback("orders", payload);
  return ok({ order: created[0] || created }, 201);
}

async function updateOrderAction(db, id, action, body) {
  const statusMap = { cancel: "cancelled", complete: "completed", "delivery-proof": "delivery_proof_submitted" };
  const payload = { status: statusMap[action], metadata: body };
  const updated = db ? await db.update("orders", id, payload) : updateFallback("orders", id, payload);
  await writeAudit(db, body.actorId || "system", `order_${action}`, "order", id, payload.status);
  return ok({ order: updated[0] || updated });
}

async function createSupportTicket(db, body) {
  if (!body.profileId || !body.topic) return fail("profileId and topic are required", 400);
  const payload = { profile_id: body.profileId, topic: body.topic, status: "open", priority: body.priority || "medium", encrypted: true, last_message: body.message || "" };
  const created = db ? await db.insert("support_tickets", payload) : insertFallback("support_tickets", payload);
  return ok({ ticket: created[0] || created }, 201);
}

async function createRefund(db, body) {
  if (!body.profileId || !body.orderId) return fail("profileId and orderId are required", 400);
  const payload = { profile_id: body.profileId, order_id: body.orderId, amount: Number(body.amount || 0), reason: body.reason || "Refund request", status: "pending" };
  const created = db ? await db.insert("refunds", payload) : insertFallback("refunds", payload);
  return ok({ refund: created[0] || created }, 201);
}

async function createReport(db, body) {
  if (!body.reporterId || !body.subjectId) return fail("reporterId and subjectId are required", 400);
  const payload = { reporter_id: body.reporterId, subject_type: body.subjectType || "account", subject_id: body.subjectId, reason: body.reason || "Account report", status: "review" };
  const created = db ? await db.insert("account_reports", payload) : insertFallback("account_reports", payload);
  return ok({ report: created[0] || created }, 201);
}

async function roleDashboard(db, role) {
  const [walletRows, productRows, orderRows, financingRows, deliveryRows] = await Promise.all([rows(db, "wallets"), rows(db, "products"), rows(db, "orders"), rows(db, "financing_opportunities"), rows(db, "deliveries")]);
  const dashboards = {
    vendor: { metrics: { products: productRows.length, pendingOrders: orderRows.filter((item) => item.status === "in_progress").length, wallet: walletRows.find((wallet) => wallet.owner_type === "vendor")?.balance || 0 }, actions: ["create_product", "create_package", "manage_stock", "promos", "orders", "wallet", "analytics"] },
    financier: { metrics: { opportunities: financingRows.filter((item) => item.status !== "funded").length, financed: financingRows.reduce((sum, item) => sum + Number(item.amount_needed || item.amountNeeded || 0) * Number(item.funded_percent || item.fundedPercent || 0) / 100, 0), expectedReturn: financingRows.reduce((sum, item) => sum + Number(item.expected_return || item.expectedReturn || 0), 0) }, actions: ["finance_opportunity", "portfolio", "transactions", "wallet", "risk_rules"] },
    logistics: { metrics: { availableTrips: deliveryRows.filter((item) => item.status === "available").length, completed: deliveryRows.filter((item) => item.status === "delivered").length, payout: deliveryRows.reduce((sum, item) => sum + Number(item.payout || 0), 0) }, actions: ["accept_trip", "active_trip", "proof_upload", "earnings", "vehicle", "availability"] },
    corporate: { metrics: { staff: 4, activeOrders: orderRows.length, wallet: walletRows.find((wallet) => wallet.owner_type === "corporate")?.balance || 0 }, actions: ["staff_packs", "orders", "wallet", "payroll", "proximity_map", "sign_off"] }
  };
  return ok(dashboards[role]);
}

async function createRoleApplication(db, body) {
  if (!body.userId || !allowedRoles.has(body.role)) return fail("Invalid role application", 400);
  if (db) {
    const created = await db.insert("role_applications", { profile_id: body.userId, role: body.role, referral_code: body.referralCode ?? null, payload: body.payload ?? {} });
    return ok({ status: "pending", message: `${body.role} application submitted`, application: created[0] }, 201);
  }
  const user = users.find((item) => item.id === body.userId);
  if (!user) return notFound("User not found");
  user.roles[body.role] = "pending";
  return ok({ id: `role_${Date.now()}`, status: "pending", message: `${body.role} application submitted`, user }, 201);
}

function requireAdmin(headers, fn) {
  const role = headerValue(headers, "x-admin-role");
  if (!adminRoles.has(role)) return fail("Admin permission required", 403);
  if (envPresent("ADMIN_API_KEY") && !secureTextEquals(headerValue(headers, "x-admin-api-key"), process.env.ADMIN_API_KEY)) {
    return fail("Admin API key required", 403);
  }
  return fn();
}

async function listRows(db, table) {
  return ok(await rows(db, table));
}

async function rows(db, table) {
  if (db) return db.select(table, "*");
  return tableFallbacks[table] || [];
}

async function storageStatus(db) {
  if (!db) {
    return ok({
      mode: "seed",
      configured: false,
      ready: false,
      message: "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY to enable persistent storage.",
      requiredTables: requiredStorageTables
    });
  }

  const checks = [];
  for (const table of requiredStorageTables) {
    try {
      await db.select(table, "id", "", 1);
      checks.push({ table, ok: true });
    } catch (error) {
      checks.push({ table, ok: false, error: error.message });
    }
  }
  const ready = checks.every((check) => check.ok);
  return ok({ mode: "supabase", configured: true, ready, checks }, ready ? 200 : 503);
}

async function readinessStatus(db) {
  const storage = await storageStatus(db);
  const storageReady = storage.statusCode === 200 && storage.data.ready;
  const services = [
    {
      key: "supabase",
      label: "Supabase database",
      status: storageReady ? "ready" : db ? "needs_schema" : "missing",
      required: true,
      detail: storageReady ? "Configured and required tables responded." : db ? "Configured, but one or more required tables failed readiness checks." : "Set SUPABASE_URL plus SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY."
    },
    {
      key: "auth",
      label: "Production auth",
      status: supabaseAuthConfigured() ? "ready" : "prototype",
      required: true,
      detail: supabaseAuthConfigured() ? "Supabase Auth email/password routes and Bearer token user hydration are enabled." : "Set SUPABASE_URL and SUPABASE_ANON_KEY to enable Supabase Auth signup, signin, OAuth redirects, and Bearer token user hydration."
    },
    {
      key: "admin_guard",
      label: "Admin API guard",
      status: envPresent("ADMIN_API_KEY") ? "ready" : "prototype",
      required: true,
      detail: envPresent("ADMIN_API_KEY") ? "ADMIN_API_KEY is configured; protected admin APIs require it with an admin role header." : "Set ADMIN_API_KEY and replace the development role header with real admin JWT claims before production."
    },
    {
      key: "payvessel",
      label: "PayVessel",
      status: payVesselConfigured() ? "ready" : "mock",
      required: true,
      detail: payVesselConfigured() ? "API key, secret, and business id are configured; webhook signatures will be enforced." : "Set PAYVESSEL_API_KEY, PAYVESSEL_API_SECRET, and PAYVESSEL_BUSINESS_ID for live wallet funding."
    },
    {
      key: "maps",
      label: "Maps and proximity",
      status: anyEnv(["GOOGLE_MAPS_API_KEY", "MAPBOX_ACCESS_TOKEN"]) ? "ready" : "missing",
      required: true,
      detail: anyEnv(["GOOGLE_MAPS_API_KEY", "MAPBOX_ACCESS_TOKEN"]) ? "A maps provider key is configured." : "Set GOOGLE_MAPS_API_KEY or MAPBOX_ACCESS_TOKEN for live distance, routing, ETA, and nearby matching."
    },
    {
      key: "sms",
      label: "SMS and OTP",
      status: anyEnv(["TERMII_API_KEY", "TWILIO_ACCOUNT_SID", "AFRICASTALKING_API_KEY"]) ? "ready" : "missing",
      required: true,
      detail: anyEnv(["TERMII_API_KEY", "TWILIO_ACCOUNT_SID", "AFRICASTALKING_API_KEY"]) ? "An SMS provider is configured." : "Set Termii, Twilio, or Africa's Talking credentials for OTP and wallet alerts."
    },
    {
      key: "email",
      label: "Email notifications",
      status: anyEnv(["RESEND_API_KEY", "SENDGRID_API_KEY"]) ? "ready" : "missing",
      required: true,
      detail: anyEnv(["RESEND_API_KEY", "SENDGRID_API_KEY"]) ? "An email provider is configured." : "Set RESEND_API_KEY or SENDGRID_API_KEY for receipts, support, and account messages."
    },
    {
      key: "files",
      label: "File storage",
      status: storageReady || anyEnv(["CLOUDINARY_URL", "SUPABASE_STORAGE_BUCKET"]) ? "ready" : "missing",
      required: true,
      detail: storageReady || anyEnv(["CLOUDINARY_URL", "SUPABASE_STORAGE_BUCKET"]) ? "A storage path is available for uploads." : "Configure Supabase Storage or Cloudinary for product photos, KYC files, receipts, and proof uploads."
    },
    {
      key: "push",
      label: "Push notifications",
      status: anyEnv(["FCM_SERVER_KEY", "FIREBASE_PROJECT_ID"]) ? "ready" : "missing",
      required: false,
      detail: anyEnv(["FCM_SERVER_KEY", "FIREBASE_PROJECT_ID"]) ? "Firebase push configuration is present." : "Configure Firebase Cloud Messaging before mobile production notifications."
    },
    {
      key: "ai",
      label: "AI approval service",
      status: envPresent("OPENAI_API_KEY") ? "ready" : "missing",
      required: false,
      detail: envPresent("OPENAI_API_KEY") ? "OPENAI_API_KEY is configured for listing/risk review workflows." : "Set OPENAI_API_KEY for live product review, support classification, fraud summaries, and admin explanations."
    }
  ];
  const blockers = services.filter((service) => service.required && service.status !== "ready");
  return ok({
    launchReady: blockers.length === 0,
    generatedAt: new Date().toISOString(),
    mode: db ? "supabase" : "seed",
    services,
    blockers: blockers.map((service) => ({ key: service.key, label: service.label, status: service.status, detail: service.detail })),
    storage: storage.data
  });
}

function createSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!envPresent("SUPABASE_URL") || !(envPresent("SUPABASE_SERVICE_ROLE_KEY") || envPresent("SUPABASE_ANON_KEY"))) return null;

  const baseUrl = `${url.replace(/\/$/, "")}/rest/v1`;
  const headers = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=representation" };

  return {
    async select(table, columns = "*", filter = "", limit) {
      const params = [`select=${encodeURIComponent(columns)}`];
      if (filter) params.push(filter);
      if (limit) params.push(`limit=${limit}`);
      const response = await fetch(`${baseUrl}/${table}?${params.join("&")}`, { headers });
      if (!response.ok) throw new Error(await response.text());
      return response.json();
    },
    async insert(table, payload) {
      const response = await fetch(`${baseUrl}/${table}`, { method: "POST", headers, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error(await response.text());
      return response.json();
    },
    async update(table, id, payload) {
      const response = await fetch(`${baseUrl}/${table}?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", headers, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error(await response.text());
      return response.json();
    },
    async incrementWallet(walletId, amount) {
      const walletRows = await this.select("wallets", "balance,available_balance", `id=eq.${encodeURIComponent(walletId)}`, 1);
      const wallet = walletRows[0];
      if (!wallet) return [];
      return this.update("wallets", walletId, { balance: Number(wallet.balance || 0) + amount, available_balance: Number(wallet.available_balance || 0) + amount });
    }
  };
}

async function writeAudit(db, actorId, action, entityType, entityId, metadata) {
  const payload = { actor_id: actorId, action, entity_type: entityType, entity_id: entityId, metadata: { value: metadata } };
  if (db) return db.insert("audit_logs", payload);
  return insertFallback("audit_logs", payload);
}

function insertFallback(table, payload) {
  const collection = tableFallbacks[table] || [];
  const row = { id: `${table.slice(0, 4)}_${Date.now()}`, created_at: new Date().toISOString(), ...payload };
  collection.unshift(row);
  tableFallbacks[table] = collection;
  return row;
}

function updateFallback(table, id, payload) {
  const collection = tableFallbacks[table] || [];
  const index = collection.findIndex((item) => item.id === id);
  if (index < 0) return { id, ...payload };
  collection[index] = { ...collection[index], ...payload };
  return collection[index];
}

function incrementFallbackWallet(walletId, amount) {
  const wallet = seedWallets.find((item) => item.id === walletId);
  if (!wallet) return;
  wallet.balance = Number(wallet.balance || 0) + amount;
  wallet.available_balance = Number(wallet.available_balance || 0) + amount;
}

function ok(data, statusCode = 200) {
  return { statusCode, data };
}

function fail(message, statusCode = 400) {
  return { statusCode, data: { error: message } };
}

function notFound(message) {
  return fail(message, 404);
}
