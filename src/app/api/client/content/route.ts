import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const createContentSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  type: z.string().min(1), // Blog, Video, Social, Email, etc.
  dueDate: z.string().datetime().optional(),
  assignedTo: z.string().optional(),
  wordCount: z.number().int().positive().optional(),
  targetKeywords: z.string().optional(), // JSON string
});

// GET /api/client/content
// Returns all content projects for the authenticated client
// Query params: ?status=DRAFT|IN_PROGRESS|REVIEW|PUBLISHED
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

  const projects = await prisma.contentProject.findMany({
    where: {
      userId: user.id,
      ...(status && { status }),
    },
    orderBy: { createdAt: "desc" },
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
      createdAt: true,
      updatedAt: true,
    },
  });

  return apiSuccess({ projects });
}

// POST /api/client/content
// Creates a new content project
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
    const data = createContentSchema.parse(body);

    const newProject = await prisma.contentProject.create({
      data: {
        userId: user.id,
        title: data.title,
        description: data.description,
        type: data.type,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        assignedTo: data.assignedTo,
        wordCount: data.wordCount,
        targetKeywords: data.targetKeywords,
        status: "DRAFT",
      },
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
        status: true,
        dueDate: true,
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
