// src/app/api/demo/personal/shares/route.ts
// Personal demo shares API (in-memory store)

import { NextResponse } from "next/server";

let memory = [
  {
    id: "s1",
    name: "Tax Pack",
    url: "/viewer/demo/tax-pack",
    pin: "1234",
    expiry: new Date(Date.now() + 3 * 86400e3).toISOString(),
    created: new Date().toISOString(),
  },
  {
    id: "s2",
    name: "ID for Bank",
    url: "/viewer/demo/id",
    created: new Date(Date.now() - 2 * 86400e3).toISOString(),
  },
];

export async function GET() {
  return NextResponse.json(memory);
}

export async function POST() {
  const n = {
    id: `s${Date.now()}`,
    name: "New Share",
    url: "/viewer/demo/new",
    created: new Date().toISOString(),
  };
  memory = [n, ...memory];
  return NextResponse.json(n);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  memory = memory.filter((x) => x.id !== id);
  return NextResponse.json({ ok: true });
}

