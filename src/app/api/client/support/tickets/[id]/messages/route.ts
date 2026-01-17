import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const createMessageSchema = z.object({
  content: z.string().min(1),
});

// GET /api/client/support/tickets/[id]/messages
// Returns all messages for a specific ticket
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  // 🔧 DEV MODE BYPASS: Use test client if no session in development
  let userEmail = session?.user?.email;
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

  // Verify the ticket belongs to the user
  const ticket = await prisma.supportTicket.findFirst({
    where: { id, userId: user.id },
  });

  if (!ticket) {
    return apiError("Ticket not found", 404);
  }

  const messages = await prisma.ticketMessage.findMany({
    where: { ticketId: id },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      content: true,
      isStaff: true,
      createdAt: true,
      authorId: true,
    },
  });

  return apiSuccess({ messages });
}

// POST /api/client/support/tickets/[id]/messages
// Adds a new message to a ticket
export async function POST(
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

  if (!user || user.role !== "CLIENT") {
    return apiError("Forbidden", 403);
  }

  const { id } = params;

  // Verify the ticket belongs to the user
  const ticket = await prisma.supportTicket.findFirst({
    where: { id, userId: user.id },
  });

  if (!ticket) {
    return apiError("Ticket not found", 404);
  }

  // Don't allow adding messages to closed tickets
  if (ticket.status === "CLOSED") {
    return apiError("Cannot add messages to closed tickets", 400);
  }

  try {
    const body = await req.json();
    const data = createMessageSchema.parse(body);

    const newMessage = await prisma.ticketMessage.create({
      data: {
        ticketId: id,
        authorId: user.id,
        content: data.content,
        isStaff: false,
      },
      select: {
        id: true,
        content: true,
        isStaff: true,
        createdAt: true,
        authorId: true,
      },
    });

    // Update ticket's updatedAt timestamp
    await prisma.supportTicket.update({
      where: { id },
      data: { updatedAt: new Date() },
    });

    return apiSuccess({ message: newMessage }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.errors);
    }
    throw error;
  }
}
