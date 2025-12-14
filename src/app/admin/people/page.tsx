import React from "react";
import { requireAuth } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { AdminPeopleIndex } from "@/components/admin/admin-people-index";

export const dynamic = 'force-dynamic';
export default async function AdminPeoplePage() {
  await requireAuth();

  // Fetch memberships with related data
  const memberships = await prisma.userMembership.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
          createdAt: true,
        },
      },
      organization: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
    orderBy: { joinedAt: "desc" },
  });

  // Calculate stats
  const stats = {
    totalMemberships: memberships.length,
    admins: memberships.filter(m => m.role === "ADMIN").length,
    staff: memberships.filter(m => m.role === "STAFF").length,
    clients: memberships.filter(m => m.role === "CLIENT").length,
    recent: memberships.filter(m => {
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return m.joinedAt > oneWeekAgo;
    }).length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">People</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage user memberships and roles across organizations
        </p>
      </div>

      <AdminPeopleIndex memberships={memberships} stats={stats} />
    </div>
  );
}
