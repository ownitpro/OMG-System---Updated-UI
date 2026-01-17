import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

// POST /api/admin/coupons/:id/duplicate
// Duplicates a coupon with a new code
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const { id } = await params;

  // Find the original coupon
  const originalCoupon = await prisma.coupon.findUnique({
    where: { id },
  });

  if (!originalCoupon) {
    return apiError("Coupon not found", 404);
  }

  // Generate a unique code for the duplicate
  let newCode = `${originalCoupon.code}_COPY`;
  let counter = 1;

  // Keep trying until we find a unique code
  while (await prisma.coupon.findUnique({ where: { code: newCode } })) {
    newCode = `${originalCoupon.code}_COPY${counter}`;
    counter++;
  }

  // Create the duplicate coupon
  const duplicatedCoupon = await prisma.coupon.create({
    data: {
      code: newCode,
      description: originalCoupon.description,
      type: originalCoupon.type,
      value: originalCoupon.value,
      maxUses: originalCoupon.maxUses,
      currentUses: 0, // Reset usage count
      minPurchase: originalCoupon.minPurchase,
      maxDiscount: originalCoupon.maxDiscount,
      startsAt: originalCoupon.startsAt,
      expiresAt: originalCoupon.expiresAt,
      isActive: false, // Start as inactive to prevent accidental use
      category: originalCoupon.category,
      appliesTo: originalCoupon.appliesTo,
      assignedTo: originalCoupon.assignedTo,
      firstTimeOnly: originalCoupon.firstTimeOnly,
      stackable: originalCoupon.stackable,
      stackGroup: originalCoupon.stackGroup,
      priority: originalCoupon.priority,
      totalSavings: 0, // Reset savings tracking
      note: originalCoupon.note ? `Duplicated from ${originalCoupon.code}. ${originalCoupon.note}` : `Duplicated from ${originalCoupon.code}`,
      organizationId: originalCoupon.organizationId,
      createdById: user.id,
    },
    select: {
      id: true,
      code: true,
      description: true,
      type: true,
      value: true,
      maxUses: true,
      currentUses: true,
      minPurchase: true,
      maxDiscount: true,
      startsAt: true,
      expiresAt: true,
      isActive: true,
      category: true,
      appliesTo: true,
      assignedTo: true,
      firstTimeOnly: true,
      stackable: true,
      stackGroup: true,
      priority: true,
      totalSavings: true,
      note: true,
      organizationId: true,
      organization: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      createdAt: true,
    },
  });

  return apiSuccess({ coupon: duplicatedCoupon }, 201);
}
