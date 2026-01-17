import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const updateSessionSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  scheduledAt: z.string().datetime().optional(),
  durationMinutes: z.number().int().positive().optional(),
  status: z.enum(["SCHEDULED", "COMPLETED", "CANCELLED"]).optional(),
  meetingLink: z.string().url().optional(),
  notes: z.string().optional(),
});

// PATCH /api/client/sessions/[id]
// Updates a strategy session
export async function PATCH(
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

  // Verify the session belongs to the user
  const existingSession = await prisma.strategySession.findFirst({
    where: { id, userId: user.id },
  });

  if (!existingSession) {
    return apiError("Session not found", 404);
  }

  try {
    const body = await req.json();
    const data = updateSessionSchema.parse(body);

    const updatedSession = await prisma.strategySession.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.scheduledAt && { scheduledAt: new Date(data.scheduledAt) }),
        ...(data.durationMinutes && { durationMinutes: data.durationMinutes }),
        ...(data.status && { status: data.status }),
        ...(data.meetingLink !== undefined && { meetingLink: data.meetingLink }),
        ...(data.notes !== undefined && { notes: data.notes }),
      },
      select: {
        id: true,
        title: true,
        description: true,
        scheduledAt: true,
        durationMinutes: true,
        status: true,
        meetingLink: true,
        notes: true,
        updatedAt: true,
      },
    });

    return apiSuccess({ session: updatedSession });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.errors);
    }
    throw error;
  }
}

// DELETE /api/client/sessions/[id]
// Cancels a strategy session
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

  if (!user || user.role !== "CLIENT") {
    return apiError("Forbidden", 403);
  }

  const { id } = params;

  // Verify the session belongs to the user
  const existingSession = await prisma.strategySession.findFirst({
    where: { id, userId: user.id },
  });

  if (!existingSession) {
    return apiError("Session not found", 404);
  }

  // Mark as cancelled instead of deleting
  await prisma.strategySession.update({
    where: { id },
    data: { status: "CANCELLED" },
  });

  return apiSuccess({ message: "Session cancelled successfully" });
}
