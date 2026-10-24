import { readFileSync } from "node:fs";
import vm from "node:vm";
import test from "node:test";
import assert from "node:assert/strict";

const source = readFileSync(new URL("../apps/web/main.js", import.meta.url), "utf8");

function appContext() {
  const storage = new Map();
  const app = { innerHTML: "", scrollTo() {} };
  const context = vm.createContext({
    console: { warn() {}, log() {} }, URLSearchParams, Intl, AbortSignal,
    setTimeout() {}, clearTimeout() {}, queueMicrotask() {},
    localStorage: {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, String(value)),
      removeItem: (key) => storage.delete(key)
    },
    sessionStorage: {
      getItem: (key) => storage.get(`session:${key}`) ?? null,
      setItem: (key, value) => storage.set(`session:${key}`, String(value)),
      removeItem: (key) => storage.delete(`session:${key}`)
    },
    document: {
      querySelector: (selector) => selector === "#app" ? app : null,
      querySelectorAll: () => [],
      documentElement: { dataset: {}, style: {}, classList: { toggle() {} } },
      body: { scrollTop: 0, classList: { toggle() {} } }
    },
    location: { pathname: "/app", search: "", origin: "http://localhost:4000" },
    addEventListener() {}, scrollTo() {},
    fetch: async () => { throw new Error("Backend offline"); }
  });
  context.window = context;
  vm.runInContext(source, context);
  vm.runInContext("state.authComplete = true; state.onboardingComplete = true; window.showToast = () => {};", context);
  return { context, app, run: (code) => vm.runInContext(code, context) };
}

test("every registered customer and role screen renders", () => {
  const { run, app } = appContext();
  const registry = source.match(/function renderMobileApp\(\)[\s\S]*?const screens = \{([\s\S]*?)\n  \};/)[1];
  const screens = [...registry.matchAll(/^\s+(\w+):/gm)].map((match) => match[1]);
  for (const screen of screens) {
    assert.doesNotThrow(() => run(`state.screen = ${JSON.stringify(screen)}; renderMobileApp();`), screen);
    assert.ok(app.innerHTML.includes("<main"), `${screen} contains a screen`);
    assert.ok(!app.innerHTML.includes("NaN"), `${screen} contains valid numbers`);
  }
  console.log(`Rendered ${screens.length} registered screens`);
});

test("signup uses a compact role selector and updates role requirements", () => {
  const { run, app } = appContext();
  run(`state.authScreen = "signup"; renderAuthScreen();`);
  assert.match(app.innerHTML, /<select id="signupRole" class="auth-select"/);
  assert.match(app.innerHTML, /continueWithProvider\('apple'.*?<svg viewBox="0 0 384 512"/s);
  assert.match(app.innerHTML, /Create customer account/);
  assert.equal((app.innerHTML.match(/class="auth-logo-image"/g) || []).length, 1);
  assert.match(app.innerHTML, /<img class="auth-logo-image" src="\/qml-logo-flat\.png" alt="QML logo"/);
  assert.match(app.innerHTML, /<strong class="auth-wordmark">QML Foods<\/strong>/);
  assert.doesNotMatch(app.innerHTML, /signup-requirement-card/);
  run(`state.authComplete = false;`);
  run(`selectSignupRole("vendor");`);
  assert.match(app.innerHTML, /Create vendor account/);
  assert.match(app.innerHTML, /signup-requirement-dismiss/);
  assert.match(app.innerHTML, /aria-live="polite" aria-atomic="true"/);
  assert.match(app.innerHTML, /Can create products, packages, plans, promos, stock/);
  run(`hideSignupRoleInfo();`);
  assert.doesNotMatch(app.innerHTML, /signup-requirement-card/);
});

test("new-account onboarding contains no fake OTP and cannot enter without an authenticated session", () => {
  const { run, app } = appContext();
  run(`state.authComplete = true; state.authSession = { status: "active" }; state.onboardingStep = 3; renderOnboarding();`);
  assert.match(app.innerHTML, /Step 3 of 3/);
  assert.match(app.innerHTML, /Create transaction PIN/);
  assert.doesNotMatch(app.innerHTML, /Enter the 6 digit code|value="1"/);
  run(`window.completeOnboarding();`);
  assert.equal(run("state.authComplete"), false);
  assert.equal(run("state.authScreen"), "signin");
  run(`state.authComplete = true; state.authSession = { token: "verified-session" }; state.onboardingStep = 3; window.completeOnboarding();`);
  assert.equal(run("state.onboardingComplete"), true);
  assert.equal(run("state.screen"), "home");
});

test("boot clears a persisted authenticated flag without a session token", async () => {
  const { run, context } = appContext();
  run(`state.authComplete = true; state.authSession = null; state.onboardingComplete = true;`);
  context.fetch = async () => { throw new Error("No backend"); };
  await run(`boot()`);
  assert.equal(run("state.authComplete"), false);
  assert.equal(run("state.authScreen"), "signin");
  assert.equal(run(`localStorage.getItem("qmlAuthComplete")`), null);
});

test("email OTP confirmation shows six empty inputs and safely displays the pending email", () => {
  const { run, app } = appContext();
  run(`state.authScreen = "confirmEmail"; state.pendingConfirmationEmail = "<img src=x onerror=alert(1)>@example.com"; renderAuthScreen();`);
  assert.match(app.innerHTML, /Resend code/);
  assert.match(app.innerHTML, /onclick="verifySignupOtp\(\)"/);
  assert.equal((app.innerHTML.match(/class="signup-otp-input"/g) || []).length, 6);
  assert.doesNotMatch(app.innerHTML, /value="1"/);
  assert.match(app.innerHTML, /&lt;img src=x onerror=alert\(1\)&gt;@example\.com/);
  assert.doesNotMatch(app.innerHTML, /<img src=x/);
});

test("password recovery requests a reset link and successful sign-in renders home", async () => {
  const { context, run, app } = appContext();
  context.document.querySelector = (selector) => selector === "#recoveryEmail"
    ? { value: "person@example.com" }
    : selector === "#app" ? app : null;
  const requests = [];
  context.fetch = async (url, options) => {
    const path = new URL(url, "http://localhost:4000").pathname;
    requests.push({ path, body: JSON.parse(options.body) });
    const payload = path === "/api/auth/signin"
      ? { user: { id: "customer-1", name: "A User" }, session: { token: "session-token" }, roles: [] }
      : { message: "If the account exists, a secure reset link has been sent." };
    return { ok: true, json: async () => payload };
  };

  run(`state.authScreen = "forgot"; renderAuthScreen();`);
  assert.match(app.innerHTML, /id="recoveryEmail"/);
  assert.match(app.innerHTML, /requestPasswordReset\(\)/);
  await run(`window.requestPasswordReset()`);
  assert.deepEqual(requests[0], { path: "/api/auth/password-reset", body: { identifier: "person@example.com" } });
  assert.match(app.innerHTML, /Check your email/);
  assert.match(app.innerHTML, /Back to sign in/);

  await run(`window.finishAuth()`);
  assert.deepEqual(requests[1], { path: "/api/auth/signin", body: { identifier: "ada@example.com", password: "" } });
  assert.match(app.innerHTML, /Home/);
});

test("signup confirmation response routes the web app to the activation screen", () => {
  const { run } = appContext();
  run(`state.pendingConfirmationEmail = "new@example.com"; handleAuthContinuation({requiresConfirmation: true, session: {status: "pending_confirmation"}});`);
  assert.equal(run("state.authScreen"), "confirmEmail");
  assert.equal(run("sessionStorage.getItem('qmlPendingConfirmationEmail')"), "new@example.com");
});

test("order lines preserve chosen unit, vendor, price and cart quantity", () => {
  const { run } = appContext();
  const result = JSON.parse(run(`
    const item = { ...marketplaceProducts()[0], kind: "product" };
    state.selectedProductUnits[item.id] = "10kg";
    state.selectedVendorOffers[item.id] = { index: 2 };
    state.cartQuantities[item.id] = 3;
    JSON.stringify({line: cartOrderLine(item), total: cartTotal([item]), offer: selectedVendorOfferForItem(item)});
  `));
  assert.equal(result.line.quantity, 3);
  assert.equal(result.line.unit, "10kg");
  assert.equal(result.line.vendor, result.offer.vendor);
  assert.equal(result.total, result.line.price * 3);
});

test("cart child button keyboard events do not open product review", () => {
  const { run, context } = appContext();
  let opened = false;
  context.openItemDetail = () => { opened = true; };
  context.event = { key: "Enter", target: {}, currentTarget: {}, preventDefault() {} };
  run("cardKeyOpen(event, 'test')");
  assert.equal(opened, false);
  context.event.target = context.event.currentTarget;
  run("cardKeyOpen(event, 'test')");
  assert.equal(opened, true);
});

test("backend failure still renders the app", async () => {
  const { run, app } = appContext();
  await run("boot()");
  assert.ok(app.innerHTML.includes("<main"));
});

test("clearing search resets query and restores the search screen", () => {
  const { run, app } = appContext();
  run(`state.screen = "search"; state.searchQuery = "no-match-food-123"; clearSearchQuery();`);
  assert.equal(run("state.searchQuery"), "");
  assert.equal(run("localStorage.getItem('qmlSearchQuery') || ''"), "");
  assert.ok(app.innerHTML.includes("<main"));
  assert.ok(!app.innerHTML.includes("no-match-food-123"));
});

test("failed checkout keeps cart and wallet unchanged", async () => {
  const { run } = appContext();
  run(`state.cart = [marketplaceProducts()[0].id]; state.screen = "payment";`);
  const before = run("JSON.stringify({cart: state.cart, wallet: state.userWallet, orders: state.orderHistory})");
  await run("confirmPayment()");
  assert.equal(run("JSON.stringify({cart: state.cart, wallet: state.userWallet, orders: state.orderHistory})"), before);
  assert.equal(run("state.screen"), "payment");
});
