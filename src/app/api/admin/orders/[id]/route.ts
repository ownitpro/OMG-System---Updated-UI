import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const updateOrderSchema = z.object({
  status: z.enum(["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"]).optional(),
  amount: z.number().positive().optional(),
  notes: z.string().optional(),
});

// GET /api/admin/orders/[id]
// Returns details for a specific order
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
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

  const { id } = params;

  const order = await prisma.order.findUnique({
    where: { id },
    select: {
      id: true,
      orderNumber: true,
      customerName: true,
      customerEmail: true,
      product: true,
      amount: true,
      currency: true,
      status: true,
      notes: true,
      organizationId: true,
      organization: {
        select: {
          id: true,
          name: true,
          slug: true,
          email: true,
          phone: true,
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

  if (!order) {
    return apiError("Order not found", 404);
  }

  return apiSuccess({ order });
}

// PATCH /api/admin/orders/[id]
// Updates an order's status or details
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
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

  const { id } = params;

  // Check if order exists
  const existingOrder = await prisma.order.findUnique({
    where: { id },
  });

  if (!existingOrder) {
    return apiError("Order not found", 404);
  }

  try {
    const body = await req.json();
    const data = updateOrderSchema.parse(body);

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        ...(data.status && { status: data.status }),
        ...(data.amount && { amount: data.amount }),
        ...(data.notes !== undefined && { notes: data.notes }),
      },
      select: {
        id: true,
        orderNumber: true,
        customerName: true,
        customerEmail: true,
        product: true,
        amount: true,
        currency: true,
        status: true,
        notes: true,
        organizationId: true,
        organization: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        updatedAt: true,
      },
    });

    return apiSuccess({ order: updatedOrder });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.errors);
    }
    throw error;
  }
}

// DELETE /api/admin/orders/[id]
// Deletes an order
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
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

  const { id } = params;

  // Check if order exists
  const existingOrder = await prisma.order.findUnique({
    where: { id },
  });

  if (!existingOrder) {
    return apiError("Order not found", 404);
  }

  // Only allow deletion of cancelled or pending orders
  if (existingOrder.status === "COMPLETED" || existingOrder.status === "PROCESSING") {
    return apiError("Cannot delete completed or processing orders", 400);
  }

  await prisma.order.delete({
    where: { id },
  });

  return apiSuccess({ message: "Order deleted successfully" });
}
