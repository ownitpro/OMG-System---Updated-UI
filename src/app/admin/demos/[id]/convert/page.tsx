import React from "react";
import { requireAdmin } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { ConvertToOrgWizard } from "@/components/admin/convert-to-org-wizard";

export default async function ConvertToOrgPage({ params }: { params: Promise<{ id: string }> }) {
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

  // Check if demo is already booked
  if (demo.bookedAt) {
    notFound(); // Or redirect to demo detail page
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Convert Demo to Organization</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create a new organization from this demo request
        </p>
      </div>

      <ConvertToOrgWizard demo={demo} />
    </div>
  );
}
