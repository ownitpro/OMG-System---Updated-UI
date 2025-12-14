// app/api/demo/svd/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const Payload = z.object({
  mode: z.enum(["personal", "business"]),
  leadId: z.string().optional(),
  meta: z.record(z.string(), z.any()).optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = Payload.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload", issues: parsed.error.flatten() }, { status: 400 });
    }

    const { mode, leadId, meta } = parsed.data;

    const demo = await prisma.demoRequest.create({
      data: {
        leadId: leadId ?? null,
        industry: mode === "personal" ? "Personal" : "Business",
        appSlug: "securevault-docs",
        answers: { source: "demo_svd", mode, ...meta },
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
    //     metadata: { demoRequestId: demo.id, app: "securevault-docs", mode },
    //   },
    // });

    return NextResponse.json({ ok: true, demoRequestId: demo.id }, { status: 200 });
  } catch (e) {
    console.error("[/api/demo/svd] error", e);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
