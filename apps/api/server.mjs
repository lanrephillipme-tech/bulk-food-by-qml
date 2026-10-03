import { createReadStream, existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { handleApiRequest } from "../../lib/api-core.mjs";

loadEnvFile();

const port = Number(process.env.PORT ?? 4000);
const webRoot = normalize(join(process.cwd(), "apps", "web"));

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://${req.headers.host || "localhost"}`);
  const pathname = url.pathname;
  const query = Object.fromEntries(url.searchParams.entries());

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Admin-Role, X-Admin-Api-Key, Payvessel-Http-Signature");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (pathname === "/health" || pathname.startsWith("/api/")) {
    try {
      const result = await handleApiRequest({
        method: req.method ?? "GET",
        path: pathname,
        query,
        ...(await readBody(req)),
        headers: req.headers
      });
      json(res, result.data, result.statusCode);
    } catch (error) {
      json(res, { error: error.message }, 500);
    }
    return;
  }

  serveStatic(pathname, res);
});

server.listen(port, () => {
  console.log(`Bulk Food by QML running on http://localhost:${port}`);
  console.log(`Mobile app: http://localhost:${port}/app`);
  console.log(`Super admin: http://localhost:${port}/admin`);
});

async function readBody(req) {
  if (req.method === "GET" || req.method === "HEAD") return { body: {}, rawBody: "" };
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      try {
        resolve({ body: raw ? JSON.parse(raw) : {}, rawBody: raw });
      } catch {
        resolve({ body: {}, rawBody: raw });
      }
    });
  });
}

function json(res, payload, status = 200) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload, null, 2));
}

async function serveStatic(pathname, res) {
  const requestedPath = pathname === "/" || pathname === "/admin" || pathname === "/app"
    ? "index.html"
    : pathname.replace(/^\/+/, "");
  const filePath = normalize(join(webRoot, requestedPath));
  const safePath = filePath.startsWith(webRoot) ? filePath : join(webRoot, "index.html");
  const resolvedPath = existsSync(safePath) ? safePath : join(webRoot, "index.html");
  const ext = extname(resolvedPath);

  if (reqMethodIsHeadNotAvailableHack()) {
    res.writeHead(200, { "Content-Type": mimeTypes[ext] ?? "application/octet-stream" });
    res.end();
    return;
  }

  try {
    res.writeHead(200, { "Content-Type": mimeTypes[ext] ?? "application/octet-stream" });
    createReadStream(resolvedPath).pipe(res);
  } catch {
    const fallback = await readFile(join(webRoot, "index.html"));
    res.writeHead(200, { "Content-Type": mimeTypes[".html"] });
    res.end(fallback);
  }
}

function reqMethodIsHeadNotAvailableHack() {
  return false;
}

function loadEnvFile() {
  const envPath = join(process.cwd(), ".env");
  if (!existsSync(envPath)) return;
  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^['"]|['"]$/g, "");
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
}
