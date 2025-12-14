import React from "react";
import { requireAdmin } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { AdminDemosIndex } from "@/components/admin/admin-demos-index";

export const dynamic = 'force-dynamic';
export default async function AdminDemosPage() {
  await requireAdmin();

  // Fetch demo requests with related data
  const demos = await prisma.demoRequest.findMany({
    include: {
      lead: true
    },
    orderBy: { createdAt: "desc" }
  });

  // Get summary stats
  const stats = await Promise.all([
    prisma.demoRequest.count(),
    prisma.demoRequest.count({
      where: { bookedAt: { not: null } }
    }),
    prisma.demoRequest.count({
      where: { 
        bookedAt: null,
        createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      }
    }),
    prisma.demoRequest.count({
      where: { appSlug: "crm" }
    }),
    prisma.demoRequest.count({
      where: { appSlug: "securevault-docs" }
    })
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Demo Requests</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage demo requests and convert them to organizations
        </p>
      </div>

      <AdminDemosIndex 
        demos={demos}
        stats={{
          total: stats[0],
          booked: stats[1],
          recent: stats[2],
          crm: stats[3],
          securevault: stats[4]
        }}
      />
    </div>
  );
}