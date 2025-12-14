import { NextResponse } from "next/server";

type AppTarget = {
  id: string;
  name: string;
  url: string;
};

const TARGETS: AppTarget[] = [
  { id: "svd", name: "SecureVault Docs (SVD)", url: "http://localhost:3001" },
  { id: "omg-crm", name: "OMG-CRM", url: "http://localhost:3002" },
  { id: "omg-leads", name: "OMG-Leads", url: "http://localhost:3003" },
  { id: "omg-ai-mastery", name: "OMG-AI-Mastery", url: "http://localhost:3004" },
  { id: "omg-iq", name: "OMG-IQ", url: "http://localhost:3005" },
];

async function ping(url: string, timeoutMs = 1500) {
  const controller = new AbortController();
  const started = Date.now();
  const t = setTimeout(() => controller.abort(), timeoutMs);

  try {
    // Prefer a lightweight endpoint if your apps have it:
    // `${url}/api/health` (recommended). For now, root ping works in dev.
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    });

    const ms = Date.now() - started;
    return { ok: res.ok, status: res.status, ms };
  } catch (e) {
    const ms = Date.now() - started;
    return { ok: false, status: 0, ms };
  } finally {
    clearTimeout(t);
  }
}

export async function GET() {
  const results = await Promise.all(
    TARGETS.map(async (t) => {
      const r = await ping(t.url);
      return {
        ...t,
        online: r.ok,
        status: r.status,
        ms: r.ms,
      };
    })
  );

  return NextResponse.json(
    {
      updatedAt: new Date().toISOString(),
      results,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}

