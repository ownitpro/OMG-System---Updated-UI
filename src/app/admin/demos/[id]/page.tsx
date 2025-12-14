import React from "react";
import { requireAdmin } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { DemoDetail } from "@/components/admin/demo-detail";

export const dynamic = 'force-dynamic';
export default async function DemoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;

  const demo = await prisma.demoRequest.findUnique({
    where: { id },
    include: {
      lead: true
    }
  });

  if (!demo) {
    notFound();
  }

  // Get related data for timeline
  const timeline = await prisma.auditLog.findMany({
    where: {
      OR: [
        { resourceType: "demo_request", resourceId: demo.id },
        { resourceType: "lead", resourceId: demo.leadId || "" }
      ]
    },
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } }
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Demo Request Details</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage demo request information
        </p>
      </div>

      <DemoDetail 
        demo={demo}
        timeline={timeline}
      />
    </div>
  );
}
