import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const createCustomProjectSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  type: z.string().min(1),
  startDate: z.string().optional(),
  targetEndDate: z.string().optional(),
  estimatedHours: z.number().int().positive().optional(),
  budget: z.number().positive().optional(),
  milestones: z.string().optional(),
  deliverables: z.string().optional(),
  assignedTeam: z.string().optional(),
});

// GET /api/client/custom
// Returns all custom projects for the authenticated client
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

  const projects = await prisma.customProject.findMany({
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
      createdAt: true,
      updatedAt: true,
    },
  });

  return apiSuccess({ projects });
}

// POST /api/client/custom
// Creates a new custom project
export async function POST(req: Request) {
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

  try {
    const body = await req.json();
    const data = createCustomProjectSchema.parse(body);

    const newProject = await prisma.customProject.create({
      data: {
        userId: user.id,
        name: data.name,
        description: data.description,
        type: data.type,
        status: "PLANNING",
        startDate: data.startDate ? new Date(data.startDate) : null,
        targetEndDate: data.targetEndDate ? new Date(data.targetEndDate) : null,
        estimatedHours: data.estimatedHours,
        budget: data.budget,
        milestones: data.milestones,
        deliverables: data.deliverables,
        assignedTeam: data.assignedTeam,
      },
      select: {
        id: true,
        name: true,
        description: true,
        type: true,
        status: true,
        createdAt: true,
      },
    });

    return apiSuccess({ project: newProject }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.errors);
    }
    throw error;
  }
}
