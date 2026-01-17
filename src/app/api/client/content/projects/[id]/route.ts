import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const updateProjectSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  type: z.string().min(1).optional(),
  status: z.enum(["DRAFT", "IN_PROGRESS", "REVIEW", "PUBLISHED"]).optional(),
  dueDate: z.string().datetime().optional(),
  publishedAt: z.string().datetime().optional(),
  assignedTo: z.string().optional(),
  wordCount: z.number().int().positive().optional(),
  targetKeywords: z.string().optional(),
  draftUrl: z.string().url().optional(),
  finalUrl: z.string().url().optional(),
});

// PATCH /api/client/content/projects/[id]
// Updates a content project
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
  const existing = await prisma.contentProject.findFirst({
    where: { id, userId: user.id },
  });

  if (!existing) {
    return apiError("Project not found", 404);
  }

  try {
    const body = await req.json();
    const data = updateProjectSchema.parse(body);

    const updated = await prisma.contentProject.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.type && { type: data.type }),
        ...(data.status && { status: data.status }),
        ...(data.dueDate !== undefined && {
          dueDate: data.dueDate ? new Date(data.dueDate) : null,
        }),
        ...(data.publishedAt !== undefined && {
          publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
        }),
        ...(data.assignedTo !== undefined && { assignedTo: data.assignedTo }),
        ...(data.wordCount !== undefined && { wordCount: data.wordCount }),
        ...(data.targetKeywords !== undefined && { targetKeywords: data.targetKeywords }),
        ...(data.draftUrl !== undefined && { draftUrl: data.draftUrl }),
        ...(data.finalUrl !== undefined && { finalUrl: data.finalUrl }),
      },
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
        status: true,
        dueDate: true,
        publishedAt: true,
        wordCount: true,
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

// DELETE /api/client/content/projects/[id]
// Deletes a content project
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
  const existing = await prisma.contentProject.findFirst({
    where: { id, userId: user.id },
  });

  if (!existing) {
    return apiError("Project not found", 404);
  }

  await prisma.contentProject.delete({
    where: { id },
  });

  return apiSuccess({ message: "Project deleted successfully" });
}
