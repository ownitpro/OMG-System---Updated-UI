import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

// GET /api/client/coupons
// Returns coupons specifically assigned to the current user
export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return apiError("Unauthorized", 401);
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return apiError("User not found", 404);
  }

  const now = new Date();

  // Get all active coupons
  const coupons = await prisma.coupon.findMany({
    where: {
      isActive: true,
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      code: true,
      description: true,
      type: true,
      value: true,
      category: true,
      minPurchase: true,
      maxDiscount: true,
      maxUses: true,
      currentUses: true,
      startsAt: true,
      expiresAt: true,
      assignedTo: true,
      firstTimeOnly: true,
    },
  });

  // Filter for coupons assigned to this user (specifically or via "all")
  const assignedCoupons = coupons.filter((coupon) => {
    // Check if started
    if (coupon.startsAt && new Date(coupon.startsAt) > now) {
      return false;
    }
    // Check if expired
    if (coupon.expiresAt && new Date(coupon.expiresAt) < now) {
      return false;
    }
    // Check if maxed out
    if (coupon.maxUses && coupon.currentUses >= coupon.maxUses) {
      return false;
    }

    // Check assignment
    // If no assignedTo, coupon is not targeted - don't show in banner
    if (!coupon.assignedTo) return false;

    try {
      const assigned = JSON.parse(coupon.assignedTo);

      // "all" means all clients should see this coupon
      if (assigned === "all") {
        return true;
      }

      // Array of specific user IDs
      if (Array.isArray(assigned) && assigned.includes(user.id)) {
        return true;
      }

      return false;
    } catch {
      return false;
    }
  });

  // Format for client consumption
  const formattedCoupons = assignedCoupons.map((c) => ({
    id: c.id,
    code: c.code,
    description: c.description,
    type: c.type,
    value: c.value,
    category: c.category,
    minPurchase: c.minPurchase,
    maxDiscount: c.maxDiscount,
    expiresAt: c.expiresAt,
    firstTimeOnly: c.firstTimeOnly,
  }));

  return apiSuccess({
    coupons: formattedCoupons,
    total: formattedCoupons.length,
  });
}
