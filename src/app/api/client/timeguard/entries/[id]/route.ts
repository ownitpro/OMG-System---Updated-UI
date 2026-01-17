import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const updateEntrySchema = z.object({
  project: z.string().min(1).optional(),
  description: z.string().optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
  billable: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

// PATCH /api/client/timeguard/entries/[id]
// Updates a time entry (e.g., stop timer, edit details)
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

  // Verify the entry belongs to the user
  const existingEntry = await prisma.timeEntry.findFirst({
    where: { id, userId: user.id },
  });

  if (!existingEntry) {
    return apiError("Time entry not found", 404);
  }

  try {
    const body = await req.json();
    const data = updateEntrySchema.parse(body);

    // Calculate duration if times are being updated
    let duration: number | undefined;
    const startTime = data.startTime
      ? new Date(data.startTime)
      : existingEntry.startTime;
    const endTime = data.endTime
      ? new Date(data.endTime)
      : existingEntry.endTime;

    if (endTime) {
      duration = Math.round((endTime.getTime() - startTime.getTime()) / 1000 / 60); // minutes
    }

    const updatedEntry = await prisma.timeEntry.update({
      where: { id },
      data: {
        ...(data.project && { project: data.project }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.startTime && { startTime: new Date(data.startTime) }),
        ...(data.endTime !== undefined && {
          endTime: data.endTime ? new Date(data.endTime) : null,
        }),
        ...(duration !== undefined && { duration }),
        ...(data.billable !== undefined && { billable: data.billable }),
        ...(data.tags && { tags: data.tags }),
      },
      select: {
        id: true,
        project: true,
        description: true,
        startTime: true,
        endTime: true,
        duration: true,
        billable: true,
        tags: true,
        createdAt: true,
      },
    });

    return apiSuccess({ entry: updatedEntry });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.errors);
    }
    throw error;
  }
}

// DELETE /api/client/timeguard/entries/[id]
// Deletes a time entry
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

  // Verify the entry belongs to the user
  const existingEntry = await prisma.timeEntry.findFirst({
    where: { id, userId: user.id },
  });

  if (!existingEntry) {
    return apiError("Time entry not found", 404);
  }

  await prisma.timeEntry.delete({
    where: { id },
  });

  return apiSuccess({ message: "Time entry deleted successfully" });
}
