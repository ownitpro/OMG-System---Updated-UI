import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const createSessionSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  scheduledAt: z.string().datetime(),
  durationMinutes: z.number().int().positive().default(60),
  meetingLink: z.string().url().optional(),
  notes: z.string().optional(),
});

// GET /api/client/sessions
// Returns all strategy sessions for the authenticated client
// Query params: ?upcoming=true (filters for future sessions only)
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
  const upcoming = searchParams.get("upcoming") === "true";

  const sessions = await prisma.strategySession.findMany({
    where: {
      userId: user.id,
      ...(upcoming && {
        scheduledAt: { gte: new Date() },
        status: { not: "CANCELLED" },
      }),
    },
    orderBy: { scheduledAt: "asc" },
    select: {
      id: true,
      title: true,
      description: true,
      scheduledAt: true,
      durationMinutes: true,
      status: true,
      meetingLink: true,
      notes: true,
      recordingUrl: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return apiSuccess({ sessions });
}

// POST /api/client/sessions
// Books a new strategy session
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
    const data = createSessionSchema.parse(body);

    const newSession = await prisma.strategySession.create({
      data: {
        userId: user.id,
        title: data.title,
        description: data.description,
        scheduledAt: new Date(data.scheduledAt),
        durationMinutes: data.durationMinutes,
        status: "SCHEDULED",
        meetingLink: data.meetingLink,
        notes: data.notes,
      },
      select: {
        id: true,
        title: true,
        description: true,
        scheduledAt: true,
        durationMinutes: true,
        status: true,
        meetingLink: true,
        notes: true,
        createdAt: true,
      },
    });

    return apiSuccess({ session: newSession }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.errors);
    }
    throw error;
  }
}
