import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const updateProjectSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  type: z.string().min(1).optional(),
  status: z.enum(["PLANNING", "IN_PROGRESS", "REVIEW", "COMPLETED", "ON_HOLD"]).optional(),
  startDate: z.string().datetime().optional(),
  targetEndDate: z.string().datetime().optional(),
  completedAt: z.string().datetime().optional(),
  progress: z.number().int().min(0).max(100).optional(),
  milestones: z.string().optional(),
  deliverables: z.string().optional(),
  nextDeliverable: z.string().optional(),
  assignedTeam: z.string().optional(),
  estimatedHours: z.number().int().positive().optional(),
  actualHours: z.number().int().nonnegative().optional(),
  budget: z.number().positive().optional(),
  spent: z.number().nonnegative().optional(),
  repositoryUrl: z.string().url().optional(),
  documentationUrl: z.string().url().optional(),
});

// PATCH /api/client/custom/projects/[id]
// Updates a custom project
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

  // Verify project belongs to user
  const existing = await prisma.customProject.findFirst({
    where: { id, userId: user.id },
  });

  if (!existing) {
    return apiError("Project not found", 404);
  }

  try {
    const body = await req.json();
    const data = updateProjectSchema.parse(body);

    const updated = await prisma.customProject.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.type && { type: data.type }),
        ...(data.status && { status: data.status }),
        ...(data.startDate !== undefined && {
          startDate: data.startDate ? new Date(data.startDate) : null,
        }),
        ...(data.targetEndDate !== undefined && {
          targetEndDate: data.targetEndDate ? new Date(data.targetEndDate) : null,
        }),
        ...(data.completedAt !== undefined && {
          completedAt: data.completedAt ? new Date(data.completedAt) : null,
        }),
        ...(data.progress !== undefined && { progress: data.progress }),
        ...(data.milestones !== undefined && { milestones: data.milestones }),
        ...(data.deliverables !== undefined && { deliverables: data.deliverables }),
        ...(data.nextDeliverable !== undefined && { nextDeliverable: data.nextDeliverable }),
        ...(data.assignedTeam !== undefined && { assignedTeam: data.assignedTeam }),
        ...(data.estimatedHours !== undefined && { estimatedHours: data.estimatedHours }),
        ...(data.actualHours !== undefined && { actualHours: data.actualHours }),
        ...(data.budget !== undefined && { budget: data.budget }),
        ...(data.spent !== undefined && { spent: data.spent }),
        ...(data.repositoryUrl !== undefined && { repositoryUrl: data.repositoryUrl }),
        ...(data.documentationUrl !== undefined && { documentationUrl: data.documentationUrl }),
      },
      select: {
        id: true,
        name: true,
        status: true,
        progress: true,
        estimatedHours: true,
        actualHours: true,
        budget: true,
        spent: true,
        currency: true,
        nextDeliverable: true,
        updatedAt: true,
      },
    });

    return apiSuccess({ project: updated });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.errors);
    }
    throw error;
  }
}

// DELETE /api/client/custom/projects/[id]
// Deletes a custom project
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

  // Verify project belongs to user
  const existing = await prisma.customProject.findFirst({
    where: { id, userId: user.id },
  });

  if (!existing) {
    return apiError("Project not found", 404);
  }

  await prisma.customProject.delete({
    where: { id },
  });

  return apiSuccess({ message: "Project deleted successfully" });
}
