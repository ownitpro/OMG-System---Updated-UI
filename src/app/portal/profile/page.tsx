import React from "react";
import Link from "next/link";
import { requireAuth } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { PortalProfileTabs } from "@/components/portal/portal-profile-tabs";
import { ArrowLeftIcon, UserCircleIcon } from "@heroicons/react/24/outline";

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

  // Determine portal base from user role
  const isAdmin = userWithMemberships.memberships.some(m => m.role === "ADMIN" || m.role === "STAFF");
  const portalBase = isAdmin ? "/portal/admin" : "/portal/client";

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0f172a]/95 backdrop-blur-xl sticky top-0 z-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href={portalBase}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Portal
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#47BD79]/20 flex items-center justify-center">
                <UserCircleIcon className="w-5 h-5 text-[#47BD79]" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Profile Settings</h1>
                <p className="text-sm text-white/50">Manage your account</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <PortalProfileTabs user={userWithMemberships} />
      </div>
    </div>
  );
}