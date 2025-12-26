import React from "react";
import { requireAuth } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { PortalSupportIndex } from "@/components/portal/portal-support-index";

export const dynamic = 'force-dynamic';
export default async function PortalSupportPage() {
  await requireAuth();

  // Fetch support tickets for the user's active organization
  const tickets = await prisma.ticket.findMany({
    where: {
      organization: {
        memberships: {
          some: {
            userId: (await requireAuth()).id
          }
        }
      }
    },
    include: {
      organization: {
        select: {
          name: true,
          slug: true
        }
      },
      user: {
        select: {
          name: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Support</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your support tickets and get help when you need it
        </p>
      </div>

      <PortalSupportIndex tickets={tickets} />
    </div>
  );
}