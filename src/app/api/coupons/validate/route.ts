import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const validateCouponSchema = z.object({
  code: z.string().min(1),
  productId: z.string().optional(),
  subtotalCents: z.number().min(0),
});

// POST /api/coupons/validate
// Public endpoint to validate a coupon code for checkout (no auth required)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, productId, subtotalCents } = validateCouponSchema.parse(body);

    // Get session if available (for firstTimeOnly check)
    const session = await auth();

    // Find coupon by code
    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
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
        appliesTo: true,
        assignedTo: true,
        firstTimeOnly: true,
        stackable: true,
        stackGroup: true,
        priority: true,
      },
    });

    if (!coupon) {
      return apiSuccess({
        valid: false,
        message: "Invalid coupon code",
      });
    }

    const now = new Date();

    // Check if coupon is active
    if (!coupon.isActive) {
      return apiSuccess({
        valid: false,
        message: "This coupon is no longer active",
      });
    }

    // For public validation (no user logged in), only allow public coupons
    // Private/assigned coupons require authentication
    if (!coupon.isPublic && coupon.assignedTo) {
      return apiSuccess({
        valid: false,
        message: "This coupon requires you to be logged in",
      });
    }

    // Check if coupon has started
    if (coupon.startsAt && new Date(coupon.startsAt) > now) {
      return apiSuccess({
        valid: false,
        message: "This coupon is not yet active",
      });
    }

    // Check if coupon has expired
    if (coupon.expiresAt && new Date(coupon.expiresAt) < now) {
      return apiSuccess({
        valid: false,
        message: "This coupon has expired",
      });
    }

    // Check max redemptions
    if (coupon.maxUses && coupon.currentUses >= coupon.maxUses) {
      return apiSuccess({
        valid: false,
        message: "This coupon has reached its maximum redemptions",
      });
    }

    // Check minimum purchase
    if (coupon.minPurchase && subtotalCents < coupon.minPurchase) {
      const minPurchaseFormatted = (coupon.minPurchase / 100).toFixed(2);
      return apiSuccess({
        valid: false,
        message: `Minimum purchase of $${minPurchaseFormatted} required`,
      });
    }

    // Check product targeting
    if (coupon.appliesTo && productId) {
      try {
        const appliesTo = JSON.parse(coupon.appliesTo);
        if (appliesTo !== "all" && Array.isArray(appliesTo) && !appliesTo.includes(productId)) {
          return apiSuccess({
            valid: false,
            message: "This coupon does not apply to this product",
          });
        }
      } catch {
        // If JSON parsing fails, assume "all"
      }
    }

    // Check firstTimeOnly restriction
    // If enabled, user must have zero completed orders to use this coupon
    if (coupon.firstTimeOnly) {
      // If not logged in and coupon requires first-time check, require login
      if (!session?.user?.email) {
        return apiSuccess({
          valid: false,
          message: "Please log in to use this first-time customer coupon",
        });
      }

      // Get user ID from session
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      });

      if (user) {
        // Check if user has any completed orders
        const orderCount = await prisma.order.count({
          where: {
            userId: user.id,
            status: { in: ["COMPLETED", "DELIVERED", "PAID"] },
          },
        });

        if (orderCount > 0) {
          return apiSuccess({
            valid: false,
            message: "This coupon is only valid for first-time customers",
          });
        }
      }
    }

    // Calculate discount
    let discountCents: number;
    let percentOff: number;

    if (coupon.type === "PERCENTAGE") {
      percentOff = coupon.value;
      discountCents = Math.round((subtotalCents * coupon.value) / 100);
    } else {
      // FIXED_AMOUNT - value is already in cents
      discountCents = coupon.value;
      percentOff = Math.round((coupon.value / subtotalCents) * 100);
    }

    // Apply max discount cap if set
    if (coupon.maxDiscount && discountCents > coupon.maxDiscount) {
      discountCents = coupon.maxDiscount;
    }

    // Don't allow discount greater than subtotal
    if (discountCents > subtotalCents) {
      discountCents = subtotalCents;
    }

    const finalCents = subtotalCents - discountCents;

    return apiSuccess({
      valid: true,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        description: coupon.description,
        type: coupon.type,
        value: coupon.value,
        percentOff,
        stackable: coupon.stackable,
        stackGroup: coupon.stackGroup,
        priority: coupon.priority,
      },
      discountCents,
      finalCents,
      discountFormatted: `$${(discountCents / 100).toFixed(2)}`,
      message: "Coupon applied successfully!",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.issues);
    }
    console.error("Validate coupon error:", error);
    return apiError("Failed to validate coupon", 500);
  }
}
