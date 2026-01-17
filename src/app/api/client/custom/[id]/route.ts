import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const updateCustomProjectSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  type: z.string().min(1).optional(),
  status: z.enum(["PLANNING", "IN_PROGRESS", "REVIEW", "COMPLETED", "ON_HOLD"]).optional(),
  startDate: z.string().optional(),
  targetEndDate: z.string().optional(),
  completedAt: z.string().optional(),
  progress: z.number().int().min(0).max(100).optional(),
  milestones: z.string().optional(),
  deliverables: z.string().optional(),
  nextDeliverable: z.string().optional(),
  assignedTeam: z.string().optional(),
  estimatedHours: z.number().int().positive().optional(),
  actualHours: z.number().int().min(0).optional(),
  budget: z.number().positive().optional(),
  spent: z.number().min(0).optional(),
  repositoryUrl: z.string().url().optional(),
  documentationUrl: z.string().url().optional(),
  notes: z.string().optional(),
});

// PATCH /api/client/custom/[id]
// Updates a custom project
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

  // Verify project belongs to user
  const existing = await prisma.customProject.findFirst({
    where: { id, userId: user.id },
  });

  if (!existing) {
    return apiError("Custom project not found", 404);
  }

  try {
    const body = await req.json();
    const data = updateCustomProjectSchema.parse(body);

    // Build update data object
    const updateData: any = {};

    if (data.name !== undefined && data.name.trim() !== "") {
      updateData.name = data.name;
    }
    if (data.description !== undefined) {
      updateData.description = data.description;
    }
    if (data.type !== undefined && data.type.trim() !== "") {
      updateData.type = data.type;
    }
    if (data.status !== undefined) {
      updateData.status = data.status;
    }
    if (data.startDate !== undefined) {
      updateData.startDate = new Date(data.startDate);
    }
    if (data.targetEndDate !== undefined) {
      updateData.targetEndDate = new Date(data.targetEndDate);
    }
    if (data.completedAt !== undefined) {
      updateData.completedAt = new Date(data.completedAt);
    }
    if (data.progress !== undefined) {
      updateData.progress = data.progress;
    }
    if (data.milestones !== undefined) {
      updateData.milestones = data.milestones;
    }
    if (data.deliverables !== undefined) {
      updateData.deliverables = data.deliverables;
    }
    if (data.nextDeliverable !== undefined) {
      updateData.nextDeliverable = data.nextDeliverable;
    }
    if (data.assignedTeam !== undefined) {
      updateData.assignedTeam = data.assignedTeam;
    }
    if (data.estimatedHours !== undefined) {
      updateData.estimatedHours = data.estimatedHours;
    }
    if (data.actualHours !== undefined) {
      updateData.actualHours = data.actualHours;
    }
    if (data.budget !== undefined) {
      updateData.budget = data.budget;
    }
    if (data.spent !== undefined) {
      updateData.spent = data.spent;
    }
    if (data.repositoryUrl !== undefined) {
      updateData.repositoryUrl = data.repositoryUrl;
    }
    if (data.documentationUrl !== undefined) {
      updateData.documentationUrl = data.documentationUrl;
    }
    if (data.notes !== undefined) {
      updateData.notes = data.notes;
    }

    // If no fields to update, just return the existing project
    if (Object.keys(updateData).length === 0) {
      return apiSuccess({ project: existing });
    }

    const updated = await prisma.customProject.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        description: true,
        type: true,
        status: true,
        startDate: true,
        targetEndDate: true,
        completedAt: true,
        progress: true,
        milestones: true,
        deliverables: true,
        nextDeliverable: true,
        assignedTeam: true,
        estimatedHours: true,
        actualHours: true,
        budget: true,
        spent: true,
        repositoryUrl: true,
        documentationUrl: true,
        notes: true,
        updatedAt: true,
      },
    });

    return apiSuccess({ project: updated });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.errors);
    }
    console.error('[API Error] Custom project update failed:', error);
    throw error;
  }
}

// DELETE /api/client/custom/[id]
// Deletes a custom project
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

  // Verify project belongs to user
  const existing = await prisma.customProject.findFirst({
    where: { id, userId: user.id },
  });

  if (!existing) {
    return apiError("Custom project not found", 404);
  }

  await prisma.customProject.delete({
    where: { id },
  });

  return apiSuccess({ message: "Custom project deleted successfully" });
}
