import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const createAutomationSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  type: z.string().min(1),
  trigger: z.string().min(1), // JSON config
  actions: z.string().min(1), // JSON config
});

// GET /api/client/automations
// Returns all automations for the authenticated client
// Query params: ?status=INACTIVE|ACTIVE|PAUSED|ERROR
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

  const automations = await prisma.automation.findMany({
    where: {
      userId: user.id,
      ...(status && { status }),
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      description: true,
      type: true,
      status: true,
      trigger: true,
      actions: true,
      totalRuns: true,
      successfulRuns: true,
      failedRuns: true,
      lastRunAt: true,
      lastRunStatus: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return apiSuccess({ automations });
}

// POST /api/client/automations
// Creates a new automation
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
    const data = createAutomationSchema.parse(body);

    const newAutomation = await prisma.automation.create({
      data: {
        userId: user.id,
        name: data.name,
        description: data.description,
        type: data.type,
        trigger: data.trigger,
        actions: data.actions,
        status: "INACTIVE",
      },
      select: {
        id: true,
        name: true,
        description: true,
        type: true,
        status: true,
        trigger: true,
        actions: true,
        createdAt: true,
      },
    });

    return apiSuccess({ automation: newAutomation }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.errors);
    }
    throw error;
  }
}
