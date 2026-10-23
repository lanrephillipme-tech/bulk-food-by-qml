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
  assert.match(app.innerHTML, /Create customer account/);
  run(`state.authComplete = false;`);
  run(`selectSignupRole("vendor");`);
  assert.match(app.innerHTML, /Create vendor account/);
});

test("confirmation screen safely displays the pending email and resend action", () => {
  const { run, app } = appContext();
  run(`state.authScreen = "confirmEmail"; state.pendingConfirmationEmail = "<img src=x onerror=alert(1)>@example.com"; renderAuthScreen();`);
  assert.match(app.innerHTML, /Resend activation email/);
  assert.match(app.innerHTML, /&lt;img src=x onerror=alert\(1\)&gt;@example\.com/);
  assert.doesNotMatch(app.innerHTML, /<img src=x/);
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
