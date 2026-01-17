import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const createTimeEntrySchema = z.object({
  project: z.string().min(1),
  description: z.string().optional(),
  startTime: z.string(), // ISO string
  endTime: z.string().optional(), // ISO string, null for running entries
  billable: z.boolean().default(true),
  tags: z.array(z.string()).optional(),
});

// GET /api/client/time-entries
// Returns all time entries for the authenticated client
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
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const project = searchParams.get("project");

  const entries = await prisma.timeEntry.findMany({
    where: {
      userId: user.id,
      ...(startDate && { startTime: { gte: new Date(startDate) } }),
      ...(endDate && { startTime: { lte: new Date(endDate) } }),
      ...(project && { project }),
    },
    orderBy: { startTime: "desc" },
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

  return apiSuccess({ entries });
}

// POST /api/client/time-entries
// Creates a new time entry (or starts a timer)
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
    const data = createTimeEntrySchema.parse(body);

    // Calculate duration if endTime is provided
    let duration = null;
    if (data.endTime) {
      const start = new Date(data.startTime).getTime();
      const end = new Date(data.endTime).getTime();
      duration = Math.round((end - start) / 60000); // Convert to minutes
    }

    const newEntry = await prisma.timeEntry.create({
      data: {
        userId: user.id,
        project: data.project,
        description: data.description,
        startTime: new Date(data.startTime),
        endTime: data.endTime ? new Date(data.endTime) : null,
        duration,
        billable: data.billable,
        tags: data.tags || [],
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

    return apiSuccess({ entry: newEntry }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.errors);
    }
    console.error('[API Error] Time entry creation failed:', error);
    throw error;
  }
}
