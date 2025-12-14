// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

/**
 * ENV you should set:
 *   INTERNAL_ORG_SLUG=omgsystems       // your internal org slug (Organization.slug)
 * Optionally:
 *   CONTACT_SOURCE_LABEL=website-contact
 */

const Payload = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional().default(""),
  phone: z.string().optional().default(""),
  industry: z.string().min(2),
  budget: z.string().min(1),
  timeline: z.string().min(1),
  message: z.string().min(5),
  casl: z.union([z.string(), z.literal(true)]), // checkbox returns "on" or true
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
        // phone: data.phone || null, // phone field doesn't exist in Lead model
        source: process.env.CONTACT_SOURCE_LABEL || "website-contact",
        // notes field doesn't exist in Lead model - store in DemoRequest instead
      },
    });

    // 2) Snapshot a DemoRequest (so SDRs see context immediately)
    const demo = await prisma.demoRequest.create({
      data: {
        appSlug: "crm", // Default to CRM for contact form
        leadId: lead.id,
        industry: data.industry,
        answers: {
          budget: data.budget,
          timeline: data.timeline,
          message: data.message,
          casl: typeof data.casl === "string" ? "Express" : "Express",
        },
      },
    });

    // 3) Notify internal team (all ADMIN/OWNER in INTERNAL_ORG_SLUG)
    const internalOrgSlug = process.env.INTERNAL_ORG_SLUG || "omgsystems";
    const internalOrg = await prisma.organization.findUnique({
      where: { slug: internalOrgSlug },
      select: { id: true, memberships: { select: { role: true, userId: true } } },
    });

    if (internalOrg) {
      const adminUserIds = internalOrg.memberships
        .filter((m: any) => m.role === "ADMIN") // OWNER role doesn't exist
        .map((m: any) => m.userId);

      // Notification system commented out - Notification model doesn't exist
      // if (adminUserIds.length) {
      //   await prisma.notification.createMany({
      //     data: adminUserIds.map((userId: any) => ({
      //       userId,
      //       title: "New website inquiry",
      //       body: `Lead: ${lead.contact} (${lead.email}) — ${data.industry}. Budget: ${data.budget}. Timeline: ${data.timeline}.`,
      //       href: `/admin/leads/${lead.id}`, // adjust to your internal route
      //     })),
      //   });
      // }
    }

    // 4) AuditLog skipped - requires organizationId and userId which aren't available for public contact form
    // TODO: Create system user for public form submissions or handle differently

    return NextResponse.json({ ok: true, leadId: lead.id, demoRequestId: demo.id }, { status: 200 });
  } catch (err) {
    console.error("[/api/contact] error", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
