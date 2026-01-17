import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

// GET /api/admin/analytics/dashboard
// Returns key metrics and statistics for the admin dashboard
export async function GET(req: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return apiError("Unauthorized", 401);
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, role: true },
  });

  if (!user || (user.role !== "ADMIN" && user.role !== "OWNER")) {
    return apiError("Forbidden - Admin access required", 403);
  }

  // Get current date for time-based queries
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const firstDayOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastDayOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  // Total users count
  const totalUsers = await prisma.user.count();

  // Users by role
  const usersByRole = await prisma.user.groupBy({
    by: ["role"],
    _count: true,
  });

  // Active subscriptions
  const activeSubscriptions = await prisma.subscription.count({
    where: { status: "ACTIVE" },
  });

  // Total revenue from completed orders
  const completedOrders = await prisma.order.findMany({
    where: { status: "COMPLETED" },
    select: { amount: true },
  });
  const totalRevenue = completedOrders.reduce((sum, order) => sum + order.amount, 0);

  // Revenue this month
  const thisMonthOrders = await prisma.order.findMany({
    where: {
      status: "COMPLETED",
      createdAt: { gte: firstDayOfMonth },
    },
    select: { amount: true },
  });
  const thisMonthRevenue = thisMonthOrders.reduce((sum, order) => sum + order.amount, 0);

  // Revenue last month
  const lastMonthOrders = await prisma.order.findMany({
    where: {
      status: "COMPLETED",
      createdAt: {
        gte: firstDayOfLastMonth,
        lte: lastDayOfLastMonth,
      },
    },
    select: { amount: true },
  });
  const lastMonthRevenue = lastMonthOrders.reduce((sum, order) => sum + order.amount, 0);

  // Calculate revenue growth percentage
  const revenueGrowth = lastMonthRevenue > 0
    ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
    : 0;

  // Open support tickets
  const openTickets = await prisma.supportTicket.count({
    where: {
      status: { in: ["OPEN", "IN_PROGRESS"] },
    },
  });

  // Recent orders
  const recentOrders = await prisma.order.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      orderNumber: true,
      customerName: true,
      customerEmail: true,
      product: true,
      amount: true,
      currency: true,
      status: true,
      createdAt: true,
      organization: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  // New users this month
  const newUsersThisMonth = await prisma.user.count({
    where: {
      createdAt: { gte: firstDayOfMonth },
    },
  });

  // Pending invoices
  const pendingInvoices = await prisma.invoice.count({
    where: { status: "PENDING" },
  });

  // Total invoiced amount (pending)
  const pendingInvoicesList = await prisma.invoice.findMany({
    where: { status: "PENDING" },
    select: { amount: true },
  });
  const pendingInvoicesAmount = pendingInvoicesList.reduce(
    (sum, invoice) => sum + invoice.amount,
    0
  );

  // Recent activity - strategy sessions
  const upcomingSessions = await prisma.strategySession.count({
    where: {
      scheduledAt: { gte: now },
      status: "SCHEDULED",
    },
  });

  return apiSuccess({
    overview: {
      totalUsers,
      activeSubscriptions,
      totalRevenue,
      openTickets,
    },
    revenue: {
      thisMonth: thisMonthRevenue,
      lastMonth: lastMonthRevenue,
      growth: Math.round(revenueGrowth * 100) / 100,
    },
    users: {
      total: totalUsers,
      byRole: usersByRole.reduce((acc, item) => {
        acc[item.role] = item._count;
        return acc;
      }, {} as Record<string, number>),
      newThisMonth: newUsersThisMonth,
    },
    invoices: {
      pending: pendingInvoices,
      pendingAmount: pendingInvoicesAmount,
    },
    sessions: {
      upcoming: upcomingSessions,
    },
    recentOrders,
  });
}
