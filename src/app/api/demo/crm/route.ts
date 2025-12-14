// app/api/demo/crm/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const Payload = z.object({
  industry: z.string().min(2),       // e.g., "Property Management (ON)"
  leadId: z.string().optional(),     // if you want to associate to a lead
  meta: z.record(z.string(), z.any()).optional() // optional extra context (UTM, source, etc.)
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = Payload.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload", issues: parsed.error.flatten() }, { status: 400 });
    }

    const { industry, leadId, meta } = parsed.data;

    const demo = await prisma.demoRequest.create({
      data: {
        leadId: leadId ?? null,
        industry,
        appSlug: "crm",
        answers: { source: "demo_crm", ...meta },
        bookedAt: new Date(),
      },
    });

    // AuditLog skipped - requires organizationId and userId which aren't available for public demo booking
    // await prisma.auditLog.create({
    //   data: {
    //     action: "DEMO_BOOKED",
    //     organizationId: "system", // TODO: create system organization
    //     userId: "system", // TODO: create system user
    //     resourceType: "demoRequest",
    //     resourceId: demo.id,
    //     metadata: { demoRequestId: demo.id, app: "crm", industry },
    //   },
    // });

    return NextResponse.json({ ok: true, demoRequestId: demo.id }, { status: 200 });
  } catch (e) {
    console.error("[/api/demo/crm] error", e);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
