import React from "react";
import { requireAuth } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { PortalProfileTabs } from "@/components/portal/portal-profile-tabs";

export const dynamic = 'force-dynamic';
export default async function PortalProfilePage() {
  const user = await requireAuth();

  // Fetch user with memberships
  const userWithMemberships = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      memberships: {
        include: {
          organization: {
            select: {
              name: true,
              slug: true
            }
          }
        }
      }
    }
  });

  if (!userWithMemberships) {
    throw new Error("User not found");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>

      <PortalProfileTabs user={userWithMemberships} />
    </div>
  );
}