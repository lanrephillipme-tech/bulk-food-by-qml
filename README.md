# Bulk Food by QML

Bulk Food by QML is a multi-sided grocery, food-basket, wallet, delivery, and food-financing platform. The goal is to help people, especially households that cannot always afford balanced food in one payment, buy groceries, create planned food baskets, save small-small, join group buys, and receive verified delivery from nearby vendors.

The app supports customers, vendors, financiers, logistics partners, corporate buyers, admins, and super admins.

## What We Have Built

### Customer Mobile App

- Swipeable splash/onboarding experience.
- Sign in/sign up entry points, including Google and Apple UI options.
- Role-aware signup flow for customer, vendor, financier, logistics, and corporate users.
- Home screen with product/package rails, promo cards, notifications, support, profile avatar, cart and wishlist counts.
- Shop screen with groceries, farm produce, African/local food items, fruits, perishables, non-perishables, plans, packages, discounts, and group-buy options.
- Location-aware marketplace logic so products can vary by user region.
- Product/package detail screens with image gallery, vendor information, price, quantity, reviews, comments, ratings, similar products, promo products, and add-to-cart.
- Cart, checkout, shipping, payment, success, error, cancel, refund, and receipt flows.
- Personal wallet home with deposit, transfer, add card, auto-debit, transaction history, invoices, receipts, and balance hide/show eye icon.
- Wishlist and cart count updates.
- Private encrypted-style vendor/customer delivery chat UI, with warnings not to pay outside the app wallet.
- Product review flow where users can rate, comment, and read reviews.
- Notification/updates screen for product updates, comments, messages, delivery, order movement, payments, and profit generation.
- Support flow with support tickets, call/chat options, refund request, and report account.
- Referral, rewards, loyalty, leaderboard, diligent payer, and early payer reward screens.
- Live location/proximity matching prototype.
- Biometric settings prototype.
- Dark theme support and fixes for low-contrast screens.

### Custom Basket and QML Plans

- Active QML plan carousel.
- Custom food basket creation from profile/home/plans.
- Foodstuff selection with visible quantity and price.
- Basket duration selection: 1 month, 2 months, or 3 months.
- Payment plan dropdown: daily, weekly, monthly, quarterly, pay twice, pay once, or outright 5% discount.
- Vendor price competition panel to compare nearby vendor quotes for the same basket.
- Custom basket history showing selected food items, vendor, duration, payment option, and quoted price.
- Buy/share plan for family and friends.
- Share flow where a user enters recipient username/QML ID, quantity, delivery address, and delivery type.
- Share receipts include tracking ID for bike delivery or driver details for van/truck delivery.

### Vendor Role

- Vendor dashboard with sales, wallet, products, pending orders, stock, promos, delivery, and analytics.
- Product creation flow with title, category, price, stock, writeup, documents, and minimum 3 product images.
- Package/plan creation flow with multiple images, local food combinations, payment options, discounts, and package type.
- Stock management and low-stock updates.
- Promo/pricing management.
- Order movement flow from preparing to dispatch to completed.
- Vendor wallet, escrow, settlement, withdrawal request, and activity ledger.

### Financier Role

- Financier dashboard with available capital, financed plans, expected returns, average risk, transactions, and profit.
- Nearby food-financing opportunities.
- Fund opportunity flow.
- Portfolio view for financed plans.
- Finance transaction sign-off.
- Financier wallet and ledger.
- Risk/requirements view.

### Logistics Role

- Logistics dashboard with nearby trips, payout, completed trips, closest job, vehicle, revenue, and delivery proof.
- Accept trip flow.
- Trip detail and delivery movement.
- Vehicle profile and capacity setup.
- Availability/radius settings.
- Delivery proof with recipient, notes, and uploaded proof.
- Logistics wallet, pending payout, weekly deductions, and earnings history.

### Corporate Role

- Corporate dashboard for staff packs, payroll deductions, wallet funding, delivery addresses, and sign-off.
- Corporate wallet funding.
- Payroll deduction approval.
- Staff pack/order tracking prototype.

### Admin and Super Admin

- Super admin dashboard at `/admin`.
- Admin navigation for Overview, Control Center, AI Approvals, Users & KYC, Marketplace, Vendors, Financiers, Logistics, Wallets, Orders, Support, Refunds, Reports, Policies, and Audit.
- Admin operating system overview cards.
- Full user account access workspace with selectable users.
- Admin can inspect user profile, contact, QML ID, roles, KYC level, credit score, wallet balance, wallet ledger, addresses, payment cards/banks, orders, plans, support tickets, account reports, group buys, and activity timeline.
- Admin risk action to flag an account for review.
- Account summary export action prototype.
- AI merchant upload approval queue.
- Marketplace listing control and ranking policies.
- Refund queue and refund rules.
- Account report/safety queue.
- Support ticket resolution controls.
- Admin audit trail and system events.
- Provider readiness panel for PayVessel, Supabase, Google/Apple auth, and AI approval service.

## Backend and API Work

The backend is dependency-light and previewable locally.

- Local API/server: `apps/api/server.mjs`
- Shared API core: `lib/api-core.mjs`
- Netlify Function API: `netlify/functions/api.mjs`
- Seed data: `lib/seed-data.mjs`
- Supabase schema and seed: `supabase/schema.sql`, `supabase/seed.sql`
- Supabase row-level security policies: `supabase/rls.sql`
- OpenAPI/Swagger contract: `openapi.yaml`

Implemented API areas include health checks, summary, admin overview, approvals, products, packages, users, wallets, deposits, transfers, PayVessel adapter routes, orders, cancellation, support tickets, refunds, reports, role applications, and role dashboards.

## Apps

- `apps/web` - Main mobile web app and super-admin dashboard.
- `apps/api` - Local preview server for web app and API.
- `netlify/functions` - Serverless backend API.
- `supabase` - Database schema and starter seed data.
- Mobile app repo: `https://github.com/lanrephillipme-tech/bulk-food-by-qml-mobile`.
- `apps/admin` - React admin source for future dashboard expansion.

## Run Locally

```bash
npm run dev
```

Local URLs:

- Mobile app: `http://localhost:4000/app`
- Super admin: `http://localhost:4000/admin`
- Health check: `http://localhost:4000/health`
- Storage readiness: `http://localhost:4000/api/storage/status`
- Launch readiness: `http://localhost:4000/api/readiness`

Validate syntax:

```bash
npm run check
```

Build/readiness check:

```bash
npm run build
```

The current deployable preview is the dependency-light web/API app served by `apps/api/server.mjs`.
The standalone Expo/native mobile app lives in its own repository and points to this backend URL.
The separate `apps/admin` package needs its npm dependencies installed before its own build/dev
commands can run.

## Key API Endpoints

- `GET /health`
- `GET /api/summary`
- `GET /api/storage/status`
- `GET /api/readiness`
- `POST /api/auth/signin`
- `POST /api/auth/signup`
- `POST /api/auth/provider`
- `GET /api/admin/overview`
- `GET /api/admin/approvals`
- `PATCH /api/admin/approvals/:id`
- `GET /api/admin/wallet-reconciliation`
- `POST /api/admin/wallet-reconciliation/actions`
- `GET /api/packages?country=Nigeria&city=Lagos`
- `GET /api/products`
- `POST /api/products`
- `GET /api/users/usr_ada`
- `GET /api/wallets`
- `GET /api/wallets/:ownerOrWalletId`
- `POST /api/wallets/deposit`
- `POST /api/wallets/transfer`
- `POST /api/wallets/payvessel/account`
- `POST /api/wallets/payvessel/card`
- `POST /api/wallets/payvessel/kyc`
- `POST /api/wallets/payvessel/webhook`
- `GET /api/orders`
- `POST /api/orders`
- `POST /api/orders/:id/cancel`
- `GET /api/support/tickets`
- `POST /api/support/tickets`
- `POST /api/refunds`
- `POST /api/reports`
- `GET /api/dashboards/vendor`
- `GET /api/dashboards/financier`
- `GET /api/dashboards/logistics`
- `GET /api/dashboards/corporate`
- `POST /api/role-applications`

## Swagger / OpenAPI

The API contract is documented in `openapi.yaml`.

Open it with Swagger Editor, Redoc, Postman, Insomnia, Stoplight, or any OpenAPI-compatible tool.

## PayVessel Wallet Direction

The plan is to use PayVessel for regulated wallet infrastructure:

- Virtual account generation
- Card generation
- KYC checks
- Webhooks for funding/payment events
- Wallet funding confirmation

QML should still keep its own internal ledger, order rules, escrow rules, refunds, settlement rules, payout rules, receipts, and admin audit logs as the source of truth.

Wallet ledger writes require non-zero amounts and use `reference` as an idempotency
key. Duplicate PayVessel webhook references return the existing transaction and
do not credit the wallet twice. Debit and transfer calls reject insufficient
available balance with `409`.

Admins can inspect wallet reconciliation at `GET /api/admin/wallet-reconciliation`.
It returns ledger totals, recent wallet transactions, duplicate PayVessel webhook
events, unmatched wallet lookup events, and escrow/refund/order settlement review
items for the admin Wallets and Audit screens.

Use `POST /api/admin/wallet-reconciliation/actions` to record admin decisions such
as acknowledging a duplicate webhook or marking a settlement item reviewed. This
records an audit entry only; it does not release escrow, reverse funds, or settle
money automatically.

Environment variables:

- `PAYVESSEL_API_KEY`
- `PAYVESSEL_API_SECRET`
- `PAYVESSEL_BUSINESS_ID`
- `PAYVESSEL_BASE_URL` optional, defaults to `https://api.payvessel.com`

Admin API routes require an admin role header in the current development API:

```text
X-Admin-Role: super_admin
```

When `ADMIN_API_KEY` is configured, protected admin API routes also require:

```text
X-Admin-Api-Key: <your-admin-api-key>
```

Replace the role-header development guard with real authenticated admin JWT/session checks before production.

Auth routes use the local development bridge when Supabase Auth is not configured,
and switch to Supabase Auth when real `SUPABASE_URL` and `SUPABASE_ANON_KEY`
values are present:

- `POST /api/auth/signin` signs in with Supabase email/phone + password in production mode.
- `POST /api/auth/signup` creates a Supabase Auth user, profile, active customer role, and wallet.
- `POST /api/auth/provider` returns a Supabase OAuth redirect URL for Google/Apple in production mode.
- `GET /api/users/me` hydrates the current profile from a Supabase Bearer token.

Before public production, finish OTP/provider dashboard setup, redirect URLs, JWT
claim mapping, admin role claims, and row-level security policies.

## External APIs To Use

Most QML logic should stay in this backend. External APIs should only power regulated infrastructure or specialist services:

- PayVessel for wallets, virtual accounts, cards, KYC, and payment webhooks.
- Supabase for production database, auth tables, storage, and row-level security.
- Google Maps or Mapbox for live location, distance matrix, routing, ETA, and proximity matching.
- Termii, Twilio, or Africa's Talking for SMS/OTP.
- SendGrid, Resend, or similar for email.
- Firebase Cloud Messaging for push notifications.
- Supabase Storage or Cloudinary for product photos, KYC files, profile photos, receipts, and delivery proof.
- OpenAI API for AI product approval, image/writeup review, support classification, fraud summaries, and admin risk explanations.

## Supabase

Create a Supabase project, then run:

1. `supabase/schema.sql`
2. `supabase/seed.sql`
3. `supabase/rls.sql`

Set these environment variables in Netlify or Render:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_ANON_KEY`
- `AUTH_REDIRECT_URL`
- `PUBLIC_APP_URL`

For local development, copy `.env.example` to `.env` and fill in the Supabase values.
The local Node server loads `.env` automatically. Without those keys, the app uses
local seed data so the UI remains previewable.

Use this endpoint to confirm whether persistent storage is ready:

```bash
curl http://localhost:4000/api/storage/status
```

Use this endpoint to see the full go-live checklist without exposing secret values:

```bash
curl http://localhost:4000/api/readiness
```

It reports Supabase, production auth, PayVessel, maps/proximity, SMS/OTP, email,
file storage, push notifications, and AI approval configuration. The admin
Policies screen reads this endpoint for the Provider Readiness panel.

## Netlify

This project is ready for Netlify using `netlify.toml`.

- Publish directory: `apps/web`
- Functions directory: `netlify/functions`
- API redirect: `/api/*` to Netlify Functions

## Render

This repository includes `render.yaml` for a Node web service.

- Build command: `npm install --workspaces=false`
- Start command: `npm run dev:api`
- Health check: `/health`

Add Supabase and PayVessel environment variables in Render before production use.

Additional production environment variables are listed in `.env.example` for
auth providers, maps, SMS, email, push notifications, file storage, and AI review.

## Git Status Note

The project files are saved in:

```text
C:\Users\MY PC\Documents\Bulk Food by QML
```

A push attempt to:

```text
https://github.com/lanrephillipme-tech/bulk-food-by-qml.git
```

was blocked because the computer was authenticated as `vidal-pay`, while the repository belongs to `lanrephillipme-tech`.

GitHub returned a `403 Permission denied` error. To push successfully, grant the authenticated GitHub account write access or log in as the repository owner.

## Remaining Production Work

- Connect frontend screens to real Supabase records instead of prototype/local state.
- Add real authentication and role-based authorization.
- Add protected admin permissions and audit logging.
- Implement real PayVessel webhook verification.
- Add production KYC document upload and storage.
- Add real maps/live location integration.
- Add notification delivery for SMS, email, and push.
- Add test coverage for core API flows.
- Add production security review for wallet, KYC, admin, and role dashboards.
