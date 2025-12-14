import React from "react";
import { requireAdmin } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { AdminOrdersIndex } from "@/components/admin/admin-orders-index";

export const dynamic = 'force-dynamic';
export default async function AdminOrdersPage() {
  await requireAdmin();

  // Fetch orders with related data
  const orders = await prisma.order.findMany({
    include: {
      user: { select: { name: true, email: true } },
      organization: { select: { name: true, slug: true } },
      items: {
        include: {
          product: { select: { name: true, category: true } }
        }
      },
      invoices: { select: { id: true, number: true, status: true } }
    },
    orderBy: { createdAt: "desc" }
  });

  // Get summary stats
  const stats = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.count({ where: { status: "COMPLETED" } }),
    prisma.order.count({ where: { status: "CANCELLED" } }),
    prisma.order.aggregate({
      _sum: { total: true },
      where: { status: "COMPLETED" }
    })
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage customer orders and payments
        </p>
      </div>

      <AdminOrdersIndex 
        orders={orders}
        stats={{
          total: stats[0],
          pending: stats[1],
          completed: stats[2],
          cancelled: stats[3],
          totalRevenue: stats[4]._sum.total || 0
        }}
      />
    </div>
  );
}
