import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

// DELETE /api/client/billing/payment-methods/[id]
// Removes a payment method for the authenticated client
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
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

  const { id } = params;

  // Verify the payment method belongs to the user
  const paymentMethod = await prisma.paymentMethod.findFirst({
    where: { id, userId: user.id },
  });

  if (!paymentMethod) {
    return apiError("Payment method not found", 404);
  }

  // Prevent deletion of the default payment method if there are others
  if (paymentMethod.isDefault) {
    const otherMethods = await prisma.paymentMethod.count({
      where: { userId: user.id, id: { not: id } },
    });

    if (otherMethods > 0) {
      return apiError(
        "Cannot delete default payment method. Please set another method as default first.",
        400
      );
    }
  }

  await prisma.paymentMethod.delete({
    where: { id },
  });

  return apiSuccess({ message: "Payment method deleted successfully" });
}
