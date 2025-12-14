import React from "react";
import { requireAuth } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { PortalBillingIndex } from "@/components/portal/portal-billing-index";

export const dynamic = 'force-dynamic';
export default async function PortalBillingPage() {
  await requireAuth();

  // Fetch billing data for the user's active organization
  const [invoices, subscriptions] = await Promise.all([
    prisma.invoice.findMany({
      where: {
        organization: {
          memberships: {
            some: {
              user: {
                // This would be filtered by the current user in a real app
              }
            }
          }
        }
      },
      include: {
        organization: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.subscription.findMany({
      where: {
        organization: {
          memberships: {
            some: {
              user: {
                // This would be filtered by the current user in a real app
              }
            }
          }
        }
      },
      include: {
        organization: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  // Calculate stats
  const stats = {
    totalInvoices: invoices.length,
    paidInvoices: invoices.filter(i => i.status === "PAID").length,
    unpaidInvoices: invoices.filter(i => i.status === "SENT").length,
    overdueInvoices: invoices.filter(i => i.status === "OVERDUE").length,
    totalAmount: invoices.reduce((sum, i) => sum + i.amount, 0),
    paidAmount: invoices.filter(i => i.status === "PAID").reduce((sum, i) => sum + i.amount, 0),
    activeSubscriptions: subscriptions.filter(s => s.status === "ACTIVE").length,
    trialSubscriptions: subscriptions.filter(s => s.status === "TRIAL").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your invoices and subscription
        </p>
      </div>

      <PortalBillingIndex 
        invoices={invoices} 
        subscriptions={subscriptions} 
        stats={stats} 
      />
    </div>
  );
}