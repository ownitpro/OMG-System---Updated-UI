import React from "react";
import { requireAdmin } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { AdminInvoicesIndex } from "@/components/admin/admin-invoices-index";

export const dynamic = 'force-dynamic';
export default async function AdminInvoicesPage() {
  await requireAdmin();

  // Fetch invoices with related data
  const invoices = await prisma.invoice.findMany({
    include: {
      organization: { select: { name: true, slug: true } },
      order: { 
        select: { 
          id: true, 
          user: { select: { name: true, email: true } }
        } 
      }
    },
    orderBy: { createdAt: "desc" }
  });

  // Get summary stats
  const stats = await Promise.all([
    prisma.invoice.count(),
    prisma.invoice.count({ where: { status: "DRAFT" } }),
    prisma.invoice.count({ where: { status: "SENT" } }),
    prisma.invoice.count({ where: { status: "PAID" } }),
    prisma.invoice.count({ where: { status: "OVERDUE" } }),
    prisma.invoice.aggregate({
      _sum: { amount: true },
      where: { status: "PAID" }
    }),
    prisma.invoice.aggregate({
      _sum: { amount: true },
      where: { status: { in: ["SENT", "OVERDUE"] } }
    })
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage invoices and billing
        </p>
      </div>

      <AdminInvoicesIndex 
        invoices={invoices}
        stats={{
          total: stats[0],
          draft: stats[1],
          sent: stats[2],
          paid: stats[3],
          overdue: stats[4],
          totalPaid: stats[5]._sum.amount || 0,
          totalOutstanding: stats[6]._sum.amount || 0
        }}
      />
    </div>
  );
}
