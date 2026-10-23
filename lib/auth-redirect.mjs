const productionAppUrl = "https://bulk-food-by-qml.onrender.com/app";

function isLocalHost(hostname) {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (host.includes(":")) return true;
  if (!host.includes(".") || /\.(localhost|local|internal|test|invalid)$/.test(host)) return true;
  const parts = host.split(".").map(Number);
  if (parts.length === 4 && parts.every(Number.isInteger)) {
    const [a, b] = parts;
    return a === 0 || a === 10 || a === 127 || a === 169 && b === 254
      || a === 172 && b >= 16 && b <= 31 || a === 192 && b === 168
      || a === 100 && b >= 64 && b <= 127 || a >= 224;
  }
  return false;
}

export function authRedirectUrl(env = process.env) {
  const production = env.NODE_ENV === "production" || env.RENDER === "true";
  for (const candidate of [env.AUTH_REDIRECT_URL, env.SUPABASE_AUTH_REDIRECT_URL, env.PUBLIC_APP_URL, productionAppUrl]) {
    if (!candidate) continue;
    try {
      const url = new URL(candidate);
      if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) continue;
      if (production && (url.protocol !== "https:" || isLocalHost(url.hostname))) continue;
      url.hash = "";
      return url.href;
    } catch {
      // Ignore malformed deployment values and use the next configured public URL.
    }
  }
  return productionAppUrl;
}

export function authEmailRedirectUrl(env = process.env) {
  return new URL("/auth/callback.html", authRedirectUrl(env)).href;
}
