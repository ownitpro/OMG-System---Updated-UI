import React from "react";
import { requireAuth } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { TicketDetailTabs } from "@/components/admin/ticket-detail-tabs";

interface TicketDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = 'force-dynamic';
export default async function TicketDetailPage({ params }: TicketDetailPageProps) {
  await requireAuth();
  const { id } = await params;

  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      organization: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });

  if (!ticket) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900">Ticket not found</h1>
        <p className="mt-2 text-gray-600">The ticket you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div>
      <TicketDetailTabs ticket={ticket} />
    </div>
  );
}
