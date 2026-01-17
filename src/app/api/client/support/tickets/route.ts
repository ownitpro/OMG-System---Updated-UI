import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const createTicketSchema = z.object({
  subject: z.string().min(1),
  description: z.string().min(1),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),
  category: z.string().optional(),
});

// GET /api/client/support/tickets
// Returns all support tickets for the authenticated client
// Query params: ?status=OPEN (filters by status)
export async function GET(req: Request) {
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

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const tickets = await prisma.supportTicket.findMany({
    where: {
      userId: user.id,
      ...(status && { status: status as any }),
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      subject: true,
      description: true,
      status: true,
      priority: true,
      category: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return apiSuccess({ tickets });
}

// POST /api/client/support/tickets
// Creates a new support ticket
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
    const data = createTicketSchema.parse(body);

    const newTicket = await prisma.supportTicket.create({
      data: {
        userId: user.id,
        subject: data.subject,
        description: data.description,
        status: "OPEN",
        priority: data.priority,
        category: data.category,
      },
      select: {
        id: true,
        subject: true,
        description: true,
        status: true,
        priority: true,
        category: true,
        createdAt: true,
      },
    });

    return apiSuccess({ ticket: newTicket }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.errors);
    }
    throw error;
  }
}
