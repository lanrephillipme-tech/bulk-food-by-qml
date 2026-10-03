import { handleApiRequest } from "../../lib/api-core.mjs";

const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Admin-Role, X-Admin-Api-Key, Payvessel-Http-Signature",
  "Access-Control-Allow-Methods": "GET,POST,PATCH,PUT,DELETE,OPTIONS"
};

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: ""
    };
  }

  const path = event.path.replace(/^\/\.netlify\/functions\/api/, "/api");
  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body || "", "base64").toString("utf8")
    : event.body || "";
  const body = parseBody(rawBody);

  try {
    const result = await handleApiRequest({
      method: event.httpMethod,
      path,
      query: event.queryStringParameters ?? {},
      body,
      headers: event.headers ?? {},
      rawBody
    });

    return {
      statusCode: result.statusCode,
      headers: corsHeaders,
      body: JSON.stringify(result.data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: error.message })
    };
  }
}

function parseBody(body) {
  if (!body) return {};
  try {
    return JSON.parse(body);
  } catch {
    return {};
  }
}
