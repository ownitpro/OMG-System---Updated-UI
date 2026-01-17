import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

// GET /api/admin/coupons/stats
// Returns coupon statistics
export async function GET() {
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

  const now = new Date();
  const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  // Get all coupons for statistics
  const coupons = await prisma.coupon.findMany({
    select: {
      id: true,
      isActive: true,
      value: true,
      type: true,
      currentUses: true,
      startsAt: true,
      expiresAt: true,
      totalSavings: true,
    },
  });

  // Calculate statistics
  const totalCoupons = coupons.length;

  const activeCoupons = coupons.filter((c) => c.isActive).length;

  const totalRedemptions = coupons.reduce((sum, c) => sum + c.currentUses, 0);

  // Calculate average discount (only for percentage type)
  const percentageCoupons = coupons.filter((c) => c.type === "PERCENTAGE");
  const avgDiscount = percentageCoupons.length > 0
    ? Math.round(percentageCoupons.reduce((sum, c) => sum + c.value, 0) / percentageCoupons.length)
    : 0;

  // Total savings given
  const totalSavings = coupons.reduce((sum, c) => sum + c.totalSavings, 0);

  // Count expired coupons
  const expiredCoupons = coupons.filter(
    (c) => c.expiresAt && new Date(c.expiresAt) < now
  ).length;

  // Count expiring soon (within 7 days)
  const expiringSoon = coupons.filter((c) => {
    if (!c.expiresAt) return false;
    const expiresAt = new Date(c.expiresAt);
    return expiresAt > now && expiresAt <= sevenDaysFromNow;
  }).length;

  // Count scheduled (not yet started)
  const scheduledCoupons = coupons.filter(
    (c) => c.startsAt && new Date(c.startsAt) > now
  ).length;

  // Category breakdown
  const categoryBreakdown = await prisma.coupon.groupBy({
    by: ["category"],
    _count: {
      id: true,
    },
  });

  const categoryStats = categoryBreakdown.reduce((acc, item) => {
    acc[item.category] = item._count.id;
    return acc;
  }, {} as Record<string, number>);

  // Top performing coupons (by redemptions)
  const topCoupons = await prisma.coupon.findMany({
    where: { currentUses: { gt: 0 } },
    orderBy: { currentUses: "desc" },
    take: 5,
    select: {
      id: true,
      code: true,
      currentUses: true,
      totalSavings: true,
    },
  });

  return apiSuccess({
    totalCoupons,
    activeCoupons,
    totalRedemptions,
    avgDiscount,
    totalSavings,
    expiredCoupons,
    expiringSoon,
    scheduledCoupons,
    categoryStats,
    topCoupons,
  });
}
