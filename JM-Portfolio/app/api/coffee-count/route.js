import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const SHEET_URL = process.env.GOOGLE_SHEET_WEBAPP_URL;
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const KEY = "portfolio:coffee-count";

function response(body, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
  });
}

async function redis(command) {
  const res = await fetch(REDIS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Storage error ${res.status}`);
  const payload = await res.json();
  if (payload.error) throw new Error(payload.error);
  return payload.result;
}

async function sheet(method) {
  const options =
    method === "GET"
      ? { method: "GET", cache: "no-store" }
      : {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({ action: "increment" }),
          cache: "no-store",
        };
  const res = await fetch(SHEET_URL, options);
  if (!res.ok) throw new Error(`Sheet storage error ${res.status}`);
  const data = await res.json();
  const count = Number(data.count);
  if (!Number.isSafeInteger(count) || count < 0)
    throw new Error("Invalid count from storage");
  return count;
}

async function handle(method) {
  try {
    if (REDIS_URL && REDIS_TOKEN) {
      const result = await redis(
        method === "POST" ? ["INCR", KEY] : ["GET", KEY],
      );
      const count = result === null ? 0 : Number(result);
      if (!Number.isSafeInteger(count) || count < 0)
        throw new Error("Invalid storage count");
      return response({ count });
    }
    if (SHEET_URL) return response({ count: await sheet(method) });
    return response(
      {
        error:
          "Persistent coffee counter storage is not configured. Set Upstash Redis or GOOGLE_SHEET_WEBAPP_URL in Vercel.",
      },
      503,
    );
  } catch (error) {
    console.error("Coffee counter storage failed:", error);
    return response(
      { error: "Unable to save or retrieve the coffee count." },
      503,
    );
  }
}

export async function GET() {
  return handle("GET");
}
export async function POST() {
  return handle("POST");
}
