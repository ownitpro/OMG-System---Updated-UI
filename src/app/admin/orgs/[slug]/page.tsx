import React from "react";
import { requireAdmin } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { OrgDetailTabs } from "@/components/admin/org-detail-tabs";

export const dynamic = 'force-dynamic';
export default async function OrgDetailPage({ params }: { params: { slug: string } }) {
  await requireAdmin();

  const organization = await prisma.organization.findUnique({
    where: { slug: params.slug },
    include: {
      memberships: {
        include: {
          user: { select: { id: true, name: true, email: true, createdAt: true } }
        }
      },
      projects: {
        include: {
          user: { select: { name: true } }
        },
        orderBy: { createdAt: "desc" }
      },
      invoices: {
        orderBy: { createdAt: "desc" }
      },
      tickets: {
        include: {
          user: { select: { name: true } }
        },
        orderBy: { createdAt: "desc" }
      },
      attachments: {
        orderBy: { createdAt: "desc" }
      },
      secureDocs: {
        orderBy: { createdAt: "desc" }
      },
      _count: {
        select: {
          projects: true,
          invoices: true,
          tickets: true,
          memberships: true,
          attachments: true,
          secureDocs: true
        }
      }
    }
  });

  if (!organization) {
    notFound();
  }

  // Get additional stats
  const [
    activeProjects,
    unpaidInvoices,
    openTickets,
    recentActivity
  ] = await Promise.all([
    prisma.project.count({
      where: {
        organizationId: organization.id,
        status: { in: ["PLANNING", "IN_PROGRESS", "REVIEW"] }
      }
    }),
    prisma.invoice.count({
      where: {
        organizationId: organization.id,
        status: { in: ["SENT", "OVERDUE"] }
      }
    }),
    prisma.ticket.count({
      where: {
        organizationId: organization.id,
        status: { in: ["OPEN", "IN_PROGRESS"] }
      }
    }),
    prisma.auditLog.findMany({
      where: { organizationId: organization.id },
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true } }
      }
    })
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{organization.name}</h1>
        <p className="mt-1 text-sm text-gray-500">
          Organization details and management
        </p>
      </div>

      <OrgDetailTabs
        organization={organization}
        stats={{
          activeProjects,
          unpaidInvoices,
          openTickets
        }}
        recentActivity={recentActivity}
      />
    </div>
  );
}