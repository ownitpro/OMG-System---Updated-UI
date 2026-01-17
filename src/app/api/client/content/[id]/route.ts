import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const updateContentSchema = z.object({
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

// PATCH /api/client/content/[id]
// Updates a content project
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
  const existing = await prisma.contentProject.findFirst({
    where: { id, userId: user.id },
  });

  if (!existing) {
    return apiError("Content project not found", 404);
  }

  try {
    const body = await req.json();
    const data = updateContentSchema.parse(body);

    // Build update data object
    const updateData: any = {};

    if (data.title !== undefined && data.title.trim() !== "") {
      updateData.title = data.title;
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
    if (data.dueDate !== undefined) {
      updateData.dueDate = data.dueDate ? new Date(data.dueDate) : null;
    }
    if (data.publishedAt !== undefined) {
      updateData.publishedAt = data.publishedAt ? new Date(data.publishedAt) : null;
    }
    if (data.assignedTo !== undefined) {
      updateData.assignedTo = data.assignedTo;
    }
    if (data.wordCount !== undefined) {
      updateData.wordCount = data.wordCount;
    }
    if (data.targetKeywords !== undefined) {
      updateData.targetKeywords = data.targetKeywords;
    }
    if (data.draftUrl !== undefined) {
      updateData.draftUrl = data.draftUrl;
    }
    if (data.finalUrl !== undefined) {
      updateData.finalUrl = data.finalUrl;
    }

    // If no fields to update, just return the existing project
    if (Object.keys(updateData).length === 0) {
      return apiSuccess({ project: existing });
    }

    const updated = await prisma.contentProject.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
        status: true,
        dueDate: true,
        publishedAt: true,
        assignedTo: true,
        wordCount: true,
        targetKeywords: true,
        draftUrl: true,
        finalUrl: true,
        updatedAt: true,
      },
    });

    return apiSuccess({ project: updated });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.errors);
    }
    console.error('[API Error] Content project update failed:', error);
    throw error;
  }
}

// DELETE /api/client/content/[id]
// Deletes a content project
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
  const existing = await prisma.contentProject.findFirst({
    where: { id, userId: user.id },
  });

  if (!existing) {
    return apiError("Content project not found", 404);
  }

  await prisma.contentProject.delete({
    where: { id },
  });

  return apiSuccess({ message: "Content project deleted successfully" });
}
