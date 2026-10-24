import assert from "node:assert/strict";
import { test } from "node:test";
import { authEmailRedirectUrl, authRedirectUrl } from "../lib/auth-redirect.mjs";

const callback = "https://bulk-food-by-qml.onrender.com/auth/callback.html";

test("production never falls back to a local email callback", () => {
  for (const host of ["localhost", "127.0.0.1", "192.168.1.15", "10.0.0.2", "172.16.4.5", "[::1]", "[::ffff:127.0.0.1]", "dev.local", "0x7f000001"]) {
    assert.equal(authEmailRedirectUrl({ NODE_ENV: "production", AUTH_REDIRECT_URL: `https://${host}:4000/app` }), callback);
  }
});

test("configured public origin is used for the email callback", () => {
  assert.equal(authEmailRedirectUrl({ NODE_ENV: "production", AUTH_REDIRECT_URL: "https://food.example.com/app" }), "https://food.example.com/auth/callback.html");
  assert.equal(authEmailRedirectUrl({ RENDER: "true", AUTH_REDIRECT_URL: "http://localhost:4000/app", PUBLIC_APP_URL: "https://food.example.com/app" }), "https://food.example.com/auth/callback.html");
});

test("malformed, credential-bearing and non-HTTPS production values are ignored", () => {
  for (const url of ["not a URL", "javascript:alert(1)", "https://user:password@example.com/app", "http://example.com/app"]) {
    assert.equal(authEmailRedirectUrl({ NODE_ENV: "production", AUTH_REDIRECT_URL: url }), callback);
  }
  assert.equal(authEmailRedirectUrl({}), callback);
});

test("an explicit callback URL is not appended to itself", () => {
  assert.equal(authEmailRedirectUrl({ NODE_ENV: "production", AUTH_REDIRECT_URL: callback }), callback);
});

test("explicit local development remains supported", () => {
  assert.equal(authEmailRedirectUrl({ NODE_ENV: "development", AUTH_REDIRECT_URL: "http://localhost:4000/app" }), "http://localhost:4000/auth/callback.html");
  assert.equal(authRedirectUrl({ NODE_ENV: "production", AUTH_REDIRECT_URL: "https://example.com/app#secret" }), "https://example.com/app");
});

test("signup and recovery send redirect_to; password update forwards the user token", async (t) => {
  const { handleApiRequest } = await import("../lib/api-core.mjs");
  const saved = { ...process.env };
  t.after(() => { process.env = saved; });
  process.env.NODE_ENV = "production";
  process.env.SUPABASE_URL = "https://qml-test.supabase.co";
  process.env.SUPABASE_ANON_KEY = "test-anon";
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  process.env.AUTH_REDIRECT_URL = "http://192.168.1.2:4000/app";
  delete process.env.PUBLIC_APP_URL;
  delete process.env.SUPABASE_AUTH_REDIRECT_URL;
  const calls = [];
  t.mock.method(globalThis, "fetch", async (url, options) => {
    calls.push({ url: new URL(url), options });
    return new Response(JSON.stringify({ message: "test provider rejection" }), { status: 400, headers: { "Content-Type": "application/json" } });
  });

  await handleApiRequest({ method: "POST", path: "/api/auth/signup", body: { name: "Test", identifier: "test@example.com", password: "test-password" } });
  assert.equal(calls[0].url.pathname, "/auth/v1/signup");
  assert.equal(calls[0].url.searchParams.get("redirect_to"), callback);
  await handleApiRequest({ method: "POST", path: "/api/auth/password-reset", body: { identifier: "test@example.com" } });
  assert.equal(calls[1].url.pathname, "/auth/v1/recover");
  assert.equal(calls[1].url.searchParams.get("redirect_to"), callback);

  const unauthenticated = await handleApiRequest({ method: "POST", path: "/api/auth/password-update", body: { password: "new-password" } });
  assert.equal(unauthenticated.statusCode, 401);
  assert.equal(calls.length, 2);
  const invalid = await handleApiRequest({ method: "POST", path: "/api/auth/password-update", headers: { authorization: "Bearer test-session" }, body: { password: "short" } });
  assert.equal(invalid.statusCode, 400);
  assert.equal(calls.length, 2);
  const rejected = await handleApiRequest({ method: "POST", path: "/api/auth/password-update", headers: { authorization: "Bearer test-session" }, body: { password: "new-password" } });
  assert.equal(rejected.statusCode, 400);
  assert.equal(calls[2].options.headers.Authorization, "Bearer test-session");
  assert.equal(calls[2].options.method, "PUT");
  assert.equal(calls[2].url.pathname, "/auth/v1/user");

  t.mock.method(globalThis, "fetch", async () => new Response(JSON.stringify({ id: "verified-test-user" }), { status: 200 }));
  const accepted = await handleApiRequest({ method: "POST", path: "/api/auth/password-update", headers: { authorization: "Bearer test-session" }, body: { password: "new-password" } });
  assert.equal(accepted.statusCode, 200);
});

test("email signup stays pending for OTP and rejects a session when Supabase confirmation is disabled", async (t) => {
  const { handleApiRequest } = await import("../lib/api-core.mjs");
  const saved = { ...process.env };
  t.after(() => { process.env = saved; });
  process.env.NODE_ENV = "test";
  process.env.SUPABASE_URL = "https://qml-test.supabase.co";
  process.env.SUPABASE_ANON_KEY = "test-anon";
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  delete process.env.AUTH_REDIRECT_URL;
  delete process.env.PUBLIC_APP_URL;
  delete process.env.SUPABASE_AUTH_REDIRECT_URL;

  const authResponses = [
    { id: "top-level-user", email: "top@example.com", user_metadata: { full_name: "Top User" } },
    { user: { id: "wrapped-user", email: "wrapped@example.com" }, access_token: "session-token", refresh_token: "refresh-token", expires_in: 3600, token_type: "bearer" }
  ];
  t.mock.method(globalThis, "fetch", async (input, options = {}) => {
    const url = new URL(input);
    if (url.pathname === "/auth/v1/signup") {
      return new Response(JSON.stringify(authResponses.shift()), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    if (url.pathname.endsWith("/profiles") && options.method === "POST") {
      const profile = JSON.parse(options.body);
      return new Response(JSON.stringify([{ ...profile, created_at: new Date().toISOString() }]), { status: 201, headers: { "Content-Type": "application/json" } });
    }
    if (url.pathname.endsWith("/profiles") && options.method !== "POST") {
      return new Response("[]", { status: 200, headers: { "Content-Type": "application/json" } });
    }
    if (options.method === "POST") {
      return new Response(JSON.stringify([{ id: "test-row" }]), { status: 201, headers: { "Content-Type": "application/json" } });
    }
    return new Response("[]", { status: 200, headers: { "Content-Type": "application/json" } });
  });

  const pending = await handleApiRequest({
    method: "POST",
    path: "/api/auth/signup",
    body: { name: "Top User", identifier: "top@example.com", password: "test-password" }
  });
  assert.equal(pending.statusCode, 201);
  assert.equal(pending.data.user.id, "top-level-user");
  assert.equal(pending.data.session.userId, "top-level-user");
  assert.equal(pending.data.session.status, "pending_confirmation");
  assert.equal(pending.data.requiresConfirmation, true);

  const active = await handleApiRequest({
    method: "POST",
    path: "/api/auth/signup",
    body: { name: "Wrapped User", identifier: "wrapped@example.com", password: "test-password" }
  });
  assert.equal(active.statusCode, 503);
  assert.match(active.data.error, /Enable email confirmations/);
});

test("email signup OTP verifies with Supabase and returns a usable session", async (t) => {
  const { handleApiRequest } = await import("../lib/api-core.mjs");
  const saved = { ...process.env };
  t.after(() => { process.env = saved; });
  process.env.NODE_ENV = "test";
  process.env.SUPABASE_URL = "https://qml-test.supabase.co";
  process.env.SUPABASE_ANON_KEY = "test-anon";
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  const calls = [];
  const profiles = [];
  const authUser = { id: "otp-verified-user", email: "otp@example.com", user_metadata: { full_name: "OTP User", role: "vendor" } };
  t.mock.method(globalThis, "fetch", async (input, options = {}) => {
    const url = new URL(input);
    calls.push({ url, options });
    if (url.pathname === "/auth/v1/signup") {
      return new Response(JSON.stringify({ user: authUser }), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    if (url.pathname === "/auth/v1/verify") {
      return new Response(JSON.stringify({
        access_token: "verified-access-token",
        refresh_token: "verified-refresh-token",
        expires_in: 3600,
        user: authUser
      }), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    if (url.pathname.startsWith("/rest/v1/")) {
      if (url.pathname === "/rest/v1/profiles" && options.method === "POST") {
        const profile = JSON.parse(options.body);
        profiles.push(profile);
        return new Response(JSON.stringify([profile]), { status: 201, headers: { "Content-Type": "application/json" } });
      }
      if (url.pathname === "/rest/v1/profiles") {
        const id = url.searchParams.get("id")?.replace(/^eq\./, "");
        const email = url.searchParams.get("email")?.replace(/^eq\./, "");
        const rows = profiles.filter((profile) => (!id || profile.id === id) && (!email || profile.email === email));
        return new Response(JSON.stringify(rows), { status: 200, headers: { "Content-Type": "application/json" } });
      }
      if (options.method === "POST") {
        const value = JSON.parse(options.body);
        return new Response(JSON.stringify([{ id: value.id || "mock-row", ...value }]), { status: 201, headers: { "Content-Type": "application/json" } });
      }
      return new Response("[]", { status: 200, headers: { "Content-Type": "application/json" } });
    }
    return new Response("{}", { status: 200, headers: { "Content-Type": "application/json" } });
  });

  const invalid = await handleApiRequest({ method: "POST", path: "/api/auth/verify-email-otp", body: { email: "otp@example.com", token: "12" } });
  assert.equal(invalid.statusCode, 400);
  assert.equal(calls.length, 0);

  const signup = await handleApiRequest({
    method: "POST",
    path: "/api/auth/signup",
    body: { name: "OTP User", identifier: "otp@example.com", password: "test-password", role: "vendor" }
  });
  assert.equal(signup.statusCode, 201);
  assert.equal(signup.data.requiresConfirmation, true);

  const verified = await handleApiRequest({ method: "POST", path: "/api/auth/verify-email-otp", body: { email: "OTP@example.com", token: "042819", role: "vendor" } });
  assert.equal(verified.statusCode, 200);
  assert.equal(verified.data.emailConfirmed, true);
  assert.equal(verified.data.session.token, "verified-access-token");
  assert.equal(verified.data.session.refreshToken, "verified-refresh-token");
  assert.equal(verified.data.session.requestedRole, "vendor");
  const verifyCall = calls.find((call) => call.url.pathname === "/auth/v1/verify");
  assert.ok(verifyCall);
  assert.deepEqual(JSON.parse(verifyCall.options.body), { type: "email", email: "otp@example.com", token: "042819" });
});

test("social provider URLs preserve the QML callback and signup context", async (t) => {
  const { handleApiRequest } = await import("../lib/api-core.mjs");
  const saved = { ...process.env };
  t.after(() => { process.env = saved; });
  process.env.NODE_ENV = "production";
  process.env.SUPABASE_URL = "https://qml-test.supabase.co";
  process.env.SUPABASE_ANON_KEY = "test-anon";
  process.env.AUTH_REDIRECT_URL = callback;

  const web = await handleApiRequest({
    method: "POST",
    path: "/api/auth/provider",
    body: { provider: "google", client: "web", mode: "signup", role: "vendor", referralCode: "QML-123", codeChallenge: "a".repeat(43) }
  });
  const webUrl = new URL(web.data.authorizationUrl);
  assert.equal(web.statusCode, 200);
  assert.equal(webUrl.searchParams.get("provider"), "google");
  assert.equal(webUrl.searchParams.get("code_challenge"), "a".repeat(43));
  assert.equal(webUrl.searchParams.get("code_challenge_method"), "s256");
  assert.equal(webUrl.searchParams.get("response_type"), "code");
  const webRedirect = new URL(webUrl.searchParams.get("redirect_to"));
  assert.equal(webRedirect.origin, "https://bulk-food-by-qml.onrender.com");
  assert.equal(webRedirect.pathname, "/auth/callback.html");
  assert.equal(webRedirect.searchParams.get("flow"), "social");
  assert.equal(webRedirect.searchParams.get("mode"), "signup");
  assert.equal(webRedirect.searchParams.get("role"), "vendor");
  assert.equal(webRedirect.searchParams.get("referralCode"), "QML-123");

  const mobile = await handleApiRequest({
    method: "POST",
    path: "/api/auth/provider",
    body: { provider: "apple", client: "mobile", mode: "signin", codeChallenge: "b".repeat(43) }
  });
  const mobileUrl = new URL(mobile.data.authorizationUrl);
  assert.equal(mobileUrl.searchParams.get("redirect_to"), "bulkfoodqml://auth/callback?flow=social&mode=signin&role=customer");
  assert.equal(mobileUrl.searchParams.get("code_challenge"), "b".repeat(43));
});

test("social callback exchanges PKCE code, validates Supabase user, and creates a pending business role", async (t) => {
  const { handleApiRequest } = await import("../lib/api-core.mjs");
  const saved = { ...process.env };
  t.after(() => { process.env = saved; });
  process.env.SUPABASE_URL = "https://qml-test.supabase.co";
  process.env.SUPABASE_ANON_KEY = "test-anon";
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  const writes = [];
  const authCalls = [];
  t.mock.method(globalThis, "fetch", async (input, options = {}) => {
    const url = new URL(input);
    authCalls.push({ url, options });
    if (url.pathname === "/auth/v1/token") {
      assert.equal(url.searchParams.get("grant_type"), "pkce");
      assert.deepEqual(JSON.parse(options.body), { auth_code: "oauth-code", code_verifier: "v".repeat(64) });
      return new Response(JSON.stringify({ access_token: "verified-access-token", refresh_token: "refresh-token", expires_in: 3600 }), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    if (url.pathname === "/auth/v1/user") {
      assert.equal(options.headers.Authorization, "Bearer verified-access-token");
      return new Response(JSON.stringify({
        id: "oauth-user-1",
        email: "farmer@example.com",
        user_metadata: { full_name: "Amina Farmer" },
        app_metadata: { provider: "google" }
      }), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    if (url.pathname.endsWith("/profiles") && options.method === "GET") {
      return new Response("[]", { status: 200, headers: { "Content-Type": "application/json" } });
    }
    if (options.method === "POST") {
      const rows = JSON.parse(options.body);
      writes.push({ table: url.pathname.split("/").at(-1), rows });
      return new Response(JSON.stringify([{ ...rows, created_at: new Date().toISOString() }]), { status: 201, headers: { "Content-Type": "application/json" } });
    }
    return new Response("[]", { status: 200, headers: { "Content-Type": "application/json" } });
  });

  const result = await handleApiRequest({
    method: "POST",
    path: "/api/auth/provider/complete",
    body: { code: "oauth-code", codeVerifier: "v".repeat(64), mode: "signup", role: "vendor" }
  });
  assert.equal(result.statusCode, 201);
  assert.equal(result.data.user.id, "oauth-user-1");
  assert.equal(result.data.user.email, "farmer@example.com");
  assert.equal(result.data.session.token, "verified-access-token");
  assert.equal(result.data.session.refreshToken, "refresh-token");
  assert.equal(authCalls[0].url.pathname, "/auth/v1/token");
  assert.equal(authCalls[1].options.headers.Authorization, "Bearer verified-access-token");
  assert.equal(writes.find((write) => write.table === "role_applications").rows.role, "vendor");
  assert.equal(writes.find((write) => write.table === "role_applications").rows.status, "pending");
});

test("resend confirmation forwards the safe callback and returns a non-enumerating response", async (t) => {
  const { handleApiRequest } = await import("../lib/api-core.mjs");
  const saved = { ...process.env };
  t.after(() => { process.env = saved; });
  process.env.SUPABASE_URL = "https://qml-test.supabase.co";
  process.env.SUPABASE_ANON_KEY = "test-anon";
  process.env.NODE_ENV = "production";
  process.env.AUTH_REDIRECT_URL = callback;
  const calls = [];
  t.mock.method(globalThis, "fetch", async (input, options = {}) => {
    calls.push({ url: new URL(input), options });
    return new Response("{}", { status: 200, headers: { "Content-Type": "application/json" } });
  });

  const invalid = await handleApiRequest({ method: "POST", path: "/api/auth/resend-confirmation", body: { email: "not-an-email" } });
  assert.equal(invalid.statusCode, 400);
  assert.equal(calls.length, 0);
  const result = await handleApiRequest({ method: "POST", path: "/api/auth/resend-confirmation", body: { email: "person@example.com" } });
  assert.equal(result.statusCode, 200);
  assert.match(result.data.message, /If this address has a pending signup/);
  assert.equal(calls[0].url.pathname, "/auth/v1/resend");
  const resendBody = JSON.parse(calls[0].options.body);
  assert.equal(resendBody.type, "signup");
  assert.equal(resendBody.email, "person@example.com");
  assert.equal(resendBody.options.emailRedirectTo, callback);
});

test("welcome webhook verifies its secret and sends a branded, idempotent Resend email", async (t) => {
  const { handleApiRequest } = await import("../lib/api-core.mjs");
  const saved = { ...process.env };
  t.after(() => { process.env = saved; });
  process.env.SUPABASE_URL = "https://qml-test.supabase.co";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service";
  process.env.SUPABASE_ANON_KEY = "test-anon";
  process.env.RESEND_API_KEY = "test-resend";
  process.env.RESEND_FROM_EMAIL = "QML Foods <hello@example.com>";
  process.env.SUPABASE_WELCOME_WEBHOOK_SECRET = "test-webhook-secret";
  const calls = [];
  t.mock.method(globalThis, "fetch", async (input, options = {}) => {
    const url = new URL(input);
    calls.push({ url, options });
    if (url.hostname === "api.resend.com") {
      return new Response(JSON.stringify({ id: "resend-message-1" }), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    return new Response("[]", { status: 200, headers: { "Content-Type": "application/json" } });
  });

  const event = { type: "INSERT", schema: "public", table: "welcome_email_outbox", record: { id: "outbox-1", email: "person@example.com", full_name: "Ayo User", status: "pending", attempts: 0 } };
  const denied = await handleApiRequest({ method: "POST", path: "/api/webhooks/supabase/welcome-email", body: event, headers: { "x-qml-webhook-secret": "wrong" } });
  assert.equal(denied.statusCode, 401);
  assert.equal(calls.length, 0);

  const accepted = await handleApiRequest({ method: "POST", path: "/api/webhooks/supabase/welcome-email", body: event, headers: { "x-qml-webhook-secret": "test-webhook-secret" } });
  assert.equal(accepted.statusCode, 200);
  assert.equal(accepted.data.sent, true);
  const resend = calls.find((call) => call.url.hostname === "api.resend.com");
  assert.equal(resend.options.headers["Idempotency-Key"], "qml-welcome-outbox-1");
  const email = JSON.parse(resend.options.body);
  assert.equal(email.to[0], "person@example.com");
  assert.match(email.html, /Welcome, Ayo/);
  assert.match(email.html, /QML Foods/);
  assert.ok(calls.some((call) => call.options.method === "PATCH"));
});
