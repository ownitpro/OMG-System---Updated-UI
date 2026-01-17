import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const updateCouponSchema = z.object({
  code: z.string().min(1).max(50).optional(),
  description: z.string().optional().nullable(),
  type: z.enum(["PERCENTAGE", "FIXED_AMOUNT"]).optional(),
  value: z.number().min(0).optional(),
  maxUses: z.number().int().positive().optional().nullable(),
  currentUses: z.number().int().min(0).optional(),
  minPurchase: z.number().min(0).optional().nullable(),
  maxDiscount: z.number().min(0).optional().nullable(),
  startsAt: z.string().datetime().optional().nullable(),
  expiresAt: z.string().datetime().optional().nullable(),
  isActive: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  category: z.enum(["PROMO", "PARTNER", "LOYALTY", "SEASONAL", "REFERRAL", "OTHER"]).optional(),
  appliesTo: z.string().optional().nullable(),
  assignedTo: z.string().optional().nullable(),
  firstTimeOnly: z.boolean().optional(),
  stackable: z.boolean().optional(),
  stackGroup: z.string().optional().nullable(),
  priority: z.number().int().optional(),
  totalSavings: z.number().min(0).optional(),
  note: z.string().optional().nullable(),
});

// GET /api/admin/coupons/:id
// Returns a single coupon by ID
export async function GET(
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

  const coupon = await prisma.coupon.findUnique({
    where: { id },
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
      isPublic: true,
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
      createdById: true,
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!coupon) {
    return apiError("Coupon not found", 404);
  }

  return apiSuccess({ coupon });
}

// PATCH /api/admin/coupons/:id
// Updates a coupon
export async function PATCH(
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

  // Check if coupon exists
  const existingCoupon = await prisma.coupon.findUnique({
    where: { id },
  });

  if (!existingCoupon) {
    return apiError("Coupon not found", 404);
  }

  try {
    const body = await req.json();
    const data = updateCouponSchema.parse(body);

    // If code is being changed, check if it already exists
    if (data.code && data.code.toUpperCase() !== existingCoupon.code) {
      const codeExists = await prisma.coupon.findUnique({
        where: { code: data.code.toUpperCase() },
      });
      if (codeExists) {
        return apiError("Coupon code already exists", 400);
      }
    }

    const updatedCoupon = await prisma.coupon.update({
      where: { id },
      data: {
        ...(data.code && { code: data.code.toUpperCase() }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.type && { type: data.type }),
        ...(data.value !== undefined && { value: data.value }),
        ...(data.maxUses !== undefined && { maxUses: data.maxUses }),
        ...(data.currentUses !== undefined && { currentUses: data.currentUses }),
        ...(data.minPurchase !== undefined && { minPurchase: data.minPurchase }),
        ...(data.maxDiscount !== undefined && { maxDiscount: data.maxDiscount }),
        ...(data.startsAt !== undefined && { startsAt: data.startsAt ? new Date(data.startsAt) : null }),
        ...(data.expiresAt !== undefined && { expiresAt: data.expiresAt ? new Date(data.expiresAt) : null }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
        ...(data.isPublic !== undefined && { isPublic: data.isPublic }),
        ...(data.category && { category: data.category }),
        ...(data.appliesTo !== undefined && { appliesTo: data.appliesTo }),
        ...(data.assignedTo !== undefined && { assignedTo: data.assignedTo }),
        ...(data.firstTimeOnly !== undefined && { firstTimeOnly: data.firstTimeOnly }),
        ...(data.stackable !== undefined && { stackable: data.stackable }),
        ...(data.stackGroup !== undefined && { stackGroup: data.stackGroup }),
        ...(data.priority !== undefined && { priority: data.priority }),
        ...(data.totalSavings !== undefined && { totalSavings: data.totalSavings }),
        ...(data.note !== undefined && { note: data.note }),
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
        isPublic: true,
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
        updatedAt: true,
      },
    });

    return apiSuccess({ coupon: updatedCoupon });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.issues);
    }
    console.error("Update coupon error:", error);
    throw error;
  }
}

// DELETE /api/admin/coupons/:id
// Deletes a coupon
export async function DELETE(
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

  // Check if coupon exists
  const existingCoupon = await prisma.coupon.findUnique({
    where: { id },
  });

  if (!existingCoupon) {
    return apiError("Coupon not found", 404);
  }

  await prisma.coupon.delete({
    where: { id },
  });

  return apiSuccess({ message: "Coupon deleted successfully" });
}
