import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const updateTimeEntrySchema = z.object({
  project: z.string().min(1).optional(),
  description: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional().nullable(), // Can be set to null to resume running
  billable: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

// PATCH /api/client/time-entries/[id]
// Updates a time entry (e.g., stopping a timer)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
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

  const { id } = await params;

  // Verify entry belongs to user
  const existing = await prisma.timeEntry.findFirst({
    where: { id, userId: user.id },
  });

  if (!existing) {
    return apiError("Time entry not found", 404);
  }

  try {
    const body = await req.json();
    const data = updateTimeEntrySchema.parse(body);

    // Build update data object
    const updateData: any = {};

    if (data.project !== undefined) {
      updateData.project = data.project;
    }
    if (data.description !== undefined) {
      updateData.description = data.description;
    }
    if (data.startTime !== undefined) {
      updateData.startTime = new Date(data.startTime);
    }
    if (data.endTime !== undefined) {
      updateData.endTime = data.endTime ? new Date(data.endTime) : null;
    }
    if (data.billable !== undefined) {
      updateData.billable = data.billable;
    }
    if (data.tags !== undefined) {
      updateData.tags = data.tags;
    }

    // Recalculate duration if start or end time changed
    if (data.startTime !== undefined || data.endTime !== undefined) {
      const startTime = data.startTime
        ? new Date(data.startTime)
        : existing.startTime;
      const endTime = data.endTime
        ? new Date(data.endTime)
        : existing.endTime;

      if (endTime) {
        const start = startTime.getTime();
        const end = endTime.getTime();
        updateData.duration = Math.round((end - start) / 60000);
      } else {
        updateData.duration = null; // Running entry
      }
    }

    // If no fields to update, just return existing
    if (Object.keys(updateData).length === 0) {
      return apiSuccess({ entry: existing });
    }

    const updated = await prisma.timeEntry.update({
      where: { id },
      data: updateData,
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

    return apiSuccess({ entry: updated });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.errors);
    }
    console.error('[API Error] Time entry update failed:', error);
    throw error;
  }
}

// DELETE /api/client/time-entries/[id]
// Deletes a time entry
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
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

  const { id } = await params;

  // Verify entry belongs to user
  const existing = await prisma.timeEntry.findFirst({
    where: { id, userId: user.id },
  });

  if (!existing) {
    return apiError("Time entry not found", 404);
  }

  await prisma.timeEntry.delete({
    where: { id },
  });

  return apiSuccess({ message: "Time entry deleted successfully" });
}
