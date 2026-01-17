import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const createDesignRequestSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  designType: z.string().min(1, "Design type is required"),
  description: z.string().min(1, "Description is required"),
  deadline: z.string().optional(),
  budget: z.string().optional(),
  assets: z.string().optional(),
});

// POST /api/client/design-requests
// Creates a new design request
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
    const data = createDesignRequestSchema.parse(body);

    // Create design request in database
    const designRequest = await prisma.designRequest.create({
      data: {
        userId: user.id,
        projectName: data.projectName,
        designType: data.designType,
        description: data.description,
        deadline: data.deadline ? new Date(data.deadline) : null,
        budget: data.budget || null,
        existingAssets: data.assets || null,
        status: "PENDING",
      },
      select: {
        id: true,
        projectName: true,
        designType: true,
        description: true,
        deadline: true,
        budget: true,
        existingAssets: true,
        status: true,
        createdAt: true,
      },
    });

    return apiSuccess({ designRequest });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.errors);
    }
    console.error('[API Error] Design request creation failed:', error);
    throw error;
  }
}

// GET /api/client/design-requests
// Lists all design requests for the current user
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

  try {
    const designRequests = await prisma.designRequest.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        projectName: true,
        designType: true,
        description: true,
        deadline: true,
        budget: true,
        existingAssets: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return apiSuccess({ designRequests });
  } catch (error) {
    console.error('[API Error] Design requests fetch failed:', error);
    throw error;
  }
}
