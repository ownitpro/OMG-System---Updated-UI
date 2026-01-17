import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const createEntrySchema = z.object({
  project: z.string().min(1),
  description: z.string().optional(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime().optional(),
  billable: z.boolean().default(true),
  tags: z.array(z.string()).default([]),
});

// GET /api/client/timeguard/entries
// Returns all time entries for the authenticated client
// Query params: ?startDate=2026-01-01&endDate=2026-01-31&project=ProjectName
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
      ...(project && { project }),
      ...(startDate && endDate && {
        startTime: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      }),
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

// POST /api/client/timeguard/entries
// Creates a new time entry (start timer)
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
    const data = createEntrySchema.parse(body);

    // Calculate duration if endTime is provided
    let duration: number | undefined;
    if (data.endTime) {
      const start = new Date(data.startTime);
      const end = new Date(data.endTime);
      duration = Math.round((end.getTime() - start.getTime()) / 1000 / 60); // minutes
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
        tags: data.tags,
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
    throw error;
  }
}
