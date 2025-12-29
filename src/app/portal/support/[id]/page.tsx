import React from "react";
import { requireAuth } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { PortalTicketDetailTabs } from "@/components/portal/portal-ticket-detail-tabs";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = 'force-dynamic';
export default async function PortalTicketDetailPage({ params }: PageProps) {
  await requireAuth();
  const { id } = await params;

  const ticket = await prisma.ticket.findUnique({
    where: {
      id,
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
    }
  });

  if (!ticket) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 space-y-6">
      <PortalTicketDetailTabs ticket={ticket} />
    </div>
  );
}