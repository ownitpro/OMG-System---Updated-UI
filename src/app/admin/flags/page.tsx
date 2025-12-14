import React from "react";
import { requireAuth } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { AdminFeatureFlagsIndex } from "@/components/admin/admin-feature-flags-index";

export const dynamic = 'force-dynamic';
export default async function AdminFeatureFlagsPage() {
  await requireAuth();

  // Fetch feature flags with related data
  const featureFlags = await prisma.featureFlag.findMany({
    include: {
      organization: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
    orderBy: { key: "asc" },
  });

  // Calculate stats
  const stats = {
    totalFlags: featureFlags.length,
    enabled: featureFlags.filter(f => f.isEnabled).length,
    disabled: featureFlags.filter(f => !f.isEnabled).length,
    globalFlags: featureFlags.filter(f => f.isGlobal).length,
    orgScopedFlags: featureFlags.filter(f => !f.isGlobal).length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Feature Flags</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage feature flags and their organization-specific overrides
        </p>
      </div>

      <AdminFeatureFlagsIndex featureFlags={featureFlags} stats={stats} />
    </div>
  );
}
