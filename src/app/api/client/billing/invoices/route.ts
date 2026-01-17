import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";
import { getAuthenticatedClientUser } from "@/lib/auth-helpers";

// GET /api/client/billing/invoices
// Returns all invoices for the authenticated client
// Query params: ?status=PAID|PENDING|FAILED
export async function GET(req: Request) {
  // Use helper with dev bypass
  const user = await getAuthenticatedClientUser();

  if (!user) {
    return apiError("Unauthorized - Please login", 401);
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const invoices = await prisma.invoice.findMany({
    where: {
      userId: user.id,
      ...(status && { status: status as any }),
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      stripeInvoiceId: true,
      invoiceNumber: true,
      amount: true,
      currency: true,
      status: true,
      dueDate: true,
      paidAt: true,
      description: true,
      createdAt: true,
    },
  });

  return apiSuccess({ invoices });
}
