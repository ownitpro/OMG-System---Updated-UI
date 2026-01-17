import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const createOrderSchema = z.object({
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  product: z.string().min(1),
  amount: z.number().positive(),
  currency: z.string().default("CAD"),
  status: z.enum(["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"]).default("PENDING"),
  notes: z.string().optional(),
  organizationId: z.string(),
});

// GET /api/admin/orders
// Returns all orders with optional filtering
// Query params: ?status=PENDING&organizationId=xyz&search=product
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

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const organizationId = searchParams.get("organizationId");
  const search = searchParams.get("search");

  const orders = await prisma.order.findMany({
    where: {
      ...(status && { status: status as any }),
      ...(organizationId && { organizationId }),
      ...(search && {
        OR: [
          { product: { contains: search, mode: "insensitive" } },
          { customerName: { contains: search, mode: "insensitive" } },
          { customerEmail: { contains: search, mode: "insensitive" } },
          { orderNumber: { contains: search, mode: "insensitive" } },
        ],
      }),
    },
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
      notes: true,
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

  // Calculate total revenue
  const totalRevenue = orders
    .filter((order) => order.status === "COMPLETED")
    .reduce((sum, order) => sum + order.amount, 0);

  return apiSuccess({
    orders,
    total: orders.length,
    totalRevenue,
  });
}

// POST /api/admin/orders
// Creates a new order
export async function POST(req: Request) {
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

  try {
    const body = await req.json();
    const data = createOrderSchema.parse(body);

    // Verify the organization exists
    const organization = await prisma.organization.findUnique({
      where: { id: data.organizationId },
    });

    if (!organization) {
      return apiError("Organization not found", 404);
    }

    // Generate order number
    const orderCount = await prisma.order.count();
    const orderNumber = `ORD-${new Date().getFullYear()}-${String(orderCount + 1).padStart(4, "0")}`;

    const newOrder = await prisma.order.create({
      data: {
        orderNumber,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        product: data.product,
        amount: data.amount,
        currency: data.currency,
        status: data.status,
        notes: data.notes,
        organizationId: data.organizationId,
        createdById: user.id,
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
        createdAt: true,
      },
    });

    return apiSuccess({ order: newOrder }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.errors);
    }
    throw error;
  }
}
