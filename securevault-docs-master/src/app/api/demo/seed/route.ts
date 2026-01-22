// src/app/api/demo/seed/route.ts
// Demo seed API route (App Router)

import { NextResponse } from "next/server";
import { businessOrg } from "@/demo/business";
import { personalOrg } from "@/demo/personal";

export async function GET(req: Request) {
  if (process.env.NEXT_PUBLIC_DEMO_MODE !== "1") {
    return NextResponse.json({ ok: false, error: "Demo mode disabled" }, { status: 403 });
  }

  const url = new URL(req.url);
  const kind = (url.searchParams.get("kind") as string) || "business";
  const org = kind === "personal" ? personalOrg : businessOrg;

  // Return the target href for client-side navigation
  const href = kind === "personal" ? "/demo/personal" : "/demo/business/overview";

  // Create response with cookies
  const response = NextResponse.json({ ok: true, org, href });

  // Set demo cookies
  response.cookies.set("svd_demo", "1", {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  response.cookies.set("svd_demo_org", org.id, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}

