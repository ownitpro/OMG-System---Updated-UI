// src/app/api/sales/lead/route.ts

import { NextRequest, NextResponse } from "next/server";
import { SalesLeadSchema } from "@/lib/validate/sales";
import { readUtmFromUrl } from "@/lib/utm";
import { sendSalesEmail } from "@/lib/sales/email";
import { postSlack } from "@/lib/sales/slack";
import { postCrm } from "@/lib/sales/crm";

function mode() {
  return (process.env.SALES_INTEGRATIONS_MODE || "off").toLowerCase();
}

function isLive() {
  return mode() === "live";
}

function isDry() {
  return mode() === "dryrun";
}

async function dispatchSalesLead(payload: any) {
  const m = mode();
  const tasks: Promise<any>[] = [];
  const doEmail = !!process.env.SALES_INBOX;
  const doSlack = !!process.env.SLACK_WEBHOOK_URL;
  const doCrm = !!process.env.CRM_WEBHOOK_URL;

  if (m === "off") return; // hard no‑op

  if (m === "dryrun") {
    console.info("[sales:dryrun]", JSON.stringify(payload, null, 2));
    return;
  }

  // live mode → best effort, each call guarded
  if (doEmail)
    tasks.push(sendSalesEmail(payload).catch((err) => console.warn("SES fail", err)));
  if (doSlack)
    tasks.push(postSlack(payload).catch((err) => console.warn("Slack fail", err)));
  if (doCrm)
    tasks.push(postCrm(payload).catch((err) => console.warn("CRM fail", err)));
  await Promise.all(tasks);
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const obj = Object.fromEntries(formData.entries());
  const parsed = SalesLeadSchema.safeParse(obj);

  if (!parsed.success)
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten() },
      { status: 400 }
    );

  const lead = parsed.data;
  // spam check: honeypot
  if (lead.website) return NextResponse.redirect(new URL("/sales/thanks", req.url));

  // UTM + basic request metadata
  const url = new URL(req.url);
  const utm = readUtmFromUrl(url);
  const meta = {
    ip: req.headers.get("x-forwarded-for") || "",
    ua: req.headers.get("user-agent") || "",
  };

  // Dispatch with safe fallbacks
  await dispatchSalesLead({ lead, utm, meta });

  return NextResponse.redirect(new URL("/sales/thanks", req.url));
}

