// app/api/contact-sales/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

/**
 * Contact Sales API endpoint
 * Handles sales inquiries from /contact-sales page
 * Stores lead with product interest information
 */

const Payload = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  company: z.string().optional().default(""),
  industry: z.string().min(1),
  product: z.string().optional().default("Not Sure"),
  message: z.string().optional().default(""),
  source: z.string().optional().default("contact-sales"),
  timestamp: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = Payload.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // 1) Create Lead
    const lead = await prisma.lead.create({
      data: {
        orgName: data.company || null,
        contact: data.name,
        email: data.email,
        source: data.source || "contact-sales",
      },
    });

    // 2) Create DemoRequest with product interest
    const appSlug = getAppSlugFromProduct(data.product);

    const demo = await prisma.demoRequest.create({
      data: {
        appSlug: appSlug,
        leadId: lead.id,
        industry: data.industry,
        answers: {
          product: data.product,
          phone: data.phone,
          message: data.message,
          source: data.source,
          timestamp: data.timestamp || new Date().toISOString(),
        },
      },
    });

    // 3) Log for debugging
    console.log(`[/api/contact-sales] New lead: ${lead.contact} (${lead.email}) - ${data.industry} - ${data.product}`);

    return NextResponse.json(
      {
        ok: true,
        leadId: lead.id,
        demoRequestId: demo.id,
        message: "Sales inquiry received successfully"
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[/api/contact-sales] error", err);
    return NextResponse.json(
      { error: "Failed to process your request. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * Map product selection to app slug for DemoRequest
 */
function getAppSlugFromProduct(product: string): string {
  const productMapping: Record<string, string> = {
    "AI Agents": "ai-agents",
    "Smart Automations": "automations",
    "Workflow Builder": "workflow-builder",
    "CRM": "crm",
    "Lead Flow Engine": "leadflow",
    "SecureVault Docs": "securevault-docs",
    "Content Engine": "content-engine",
    "Industry IQ": "industry-iq",
    "Custom Apps": "custom-apps",
    "Analytics & Reporting": "analytics",
    "Not Sure": "general",
  };

  return productMapping[product] || "general";
}
