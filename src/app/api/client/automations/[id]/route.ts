import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const updateAutomationSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  type: z.string().min(1).optional(),
  status: z.enum(["INACTIVE", "ACTIVE", "PAUSED", "ERROR"]).optional(),
  trigger: z.string().optional(),
  actions: z.string().optional(),
  totalRuns: z.number().int().nonnegative().optional(),
  successfulRuns: z.number().int().nonnegative().optional(),
  failedRuns: z.number().int().nonnegative().optional(),
  lastRunAt: z.string().datetime().optional(),
  lastRunStatus: z.enum(["SUCCESS", "FAILED", "PARTIAL"]).optional(),
});

// PATCH /api/client/automations/[id]
// Updates an automation
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

  // Verify automation belongs to user
  const existing = await prisma.automation.findFirst({
    where: { id, userId: user.id },
  });

  if (!existing) {
    return apiError("Automation not found", 404);
  }

  try {
    const body = await req.json();
    const data = updateAutomationSchema.parse(body);

    const updated = await prisma.automation.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.type && { type: data.type }),
        ...(data.status && { status: data.status }),
        ...(data.trigger && { trigger: data.trigger }),
        ...(data.actions && { actions: data.actions }),
        ...(data.totalRuns !== undefined && { totalRuns: data.totalRuns }),
        ...(data.successfulRuns !== undefined && { successfulRuns: data.successfulRuns }),
        ...(data.failedRuns !== undefined && { failedRuns: data.failedRuns }),
        ...(data.lastRunAt !== undefined && {
          lastRunAt: data.lastRunAt ? new Date(data.lastRunAt) : null,
        }),
        ...(data.lastRunStatus !== undefined && { lastRunStatus: data.lastRunStatus }),
      },
      select: {
        id: true,
        name: true,
        status: true,
        totalRuns: true,
        successfulRuns: true,
        failedRuns: true,
        lastRunAt: true,
        lastRunStatus: true,
        updatedAt: true,
      },
    });

    return apiSuccess({ automation: updated });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.errors);
    }
    throw error;
  }
}

// DELETE /api/client/automations/[id]
// Deletes an automation
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

  // Verify automation belongs to user
  const existing = await prisma.automation.findFirst({
    where: { id, userId: user.id },
  });

  if (!existing) {
    return apiError("Automation not found", 404);
  }

  await prisma.automation.delete({
    where: { id },
  });

  return apiSuccess({ message: "Automation deleted successfully" });
}
