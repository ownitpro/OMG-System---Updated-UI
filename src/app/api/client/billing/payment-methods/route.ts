import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const addPaymentMethodSchema = z.object({
  stripePaymentMethodId: z.string().min(1),
  type: z.enum(["CARD", "BANK_ACCOUNT"]),
  last4: z.string().length(4),
  isDefault: z.boolean().default(false),
});

// GET /api/client/billing/payment-methods
// Returns all payment methods for the authenticated client
export async function GET() {
  const session = await auth();

  // 🔧 DEV MODE BYPASS: Use test client if no session in development
  let userEmail = session?.user?.email || null;
  if (!userEmail && process.env.NODE_ENV === 'development') {
    userEmail = 'client@testorg.com';
    console.log('[API DEV BYPASS] Using test client user');
  }

  if (!userEmail) {
    return apiError("Unauthorized", 401);
  }

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true, role: true },
  });

  if (!user || user.role !== "CLIENT") {
    return apiError("Forbidden", 403);
  }

  const paymentMethods = await prisma.paymentMethod.findMany({
    where: { userId: user.id },
    orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    select: {
      id: true,
      stripePaymentMethodId: true,
      type: true,
      last4: true,
      isDefault: true,
      createdAt: true,
    },
  });

  return apiSuccess({ paymentMethods });
}

// POST /api/client/billing/payment-methods
// Adds a new payment method for the authenticated client
export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return apiError("Unauthorized", 401);
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, role: true },
  });

  if (!user || user.role !== "CLIENT") {
    return apiError("Forbidden", 403);
  }

  try {
    const body = await req.json();
    const data = addPaymentMethodSchema.parse(body);

    // If this is set as default, unset any existing default
    if (data.isDefault) {
      await prisma.paymentMethod.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    const paymentMethod = await prisma.paymentMethod.create({
      data: {
        userId: user.id,
        stripePaymentMethodId: data.stripePaymentMethodId,
        type: data.type,
        last4: data.last4,
        isDefault: data.isDefault,
      },
      select: {
        id: true,
        stripePaymentMethodId: true,
        type: true,
        last4: true,
        isDefault: true,
        createdAt: true,
      },
    });

    return apiSuccess({ paymentMethod }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.errors);
    }
    throw error;
  }
}
