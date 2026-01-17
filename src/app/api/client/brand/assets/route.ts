import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const createAssetSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  type: z.string().min(1),
  category: z.string().optional(),
  fileUrl: z.string().url().optional(),
  thumbnailUrl: z.string().url().optional(),
  fileSize: z.number().int().positive().optional(),
  fileFormat: z.string().optional(),
  dimensions: z.string().optional(),
  colorCodes: z.string().optional(), // JSON array
  version: z.string().optional(),
  tags: z.string().optional(), // JSON array
});

// GET /api/client/brand/assets
// Returns all brand assets for the authenticated client
// Query params: ?type=Logo|Typography|Template&category=Primary|Secondary
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
  const type = searchParams.get("type");
  const category = searchParams.get("category");

  const assets = await prisma.brandAsset.findMany({
    where: {
      userId: user.id,
      ...(type && { type }),
      ...(category && { category }),
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      description: true,
      type: true,
      category: true,
      fileUrl: true,
      thumbnailUrl: true,
      fileSize: true,
      fileFormat: true,
      dimensions: true,
      colorCodes: true,
      version: true,
      tags: true,
      downloadCount: true,
      lastDownloadAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return apiSuccess({ assets });
}

// POST /api/client/brand/assets
// Creates a new brand asset
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
    const data = createAssetSchema.parse(body);

    const newAsset = await prisma.brandAsset.create({
      data: {
        userId: user.id,
        name: data.name,
        description: data.description,
        type: data.type,
        category: data.category,
        fileUrl: data.fileUrl,
        thumbnailUrl: data.thumbnailUrl,
        fileSize: data.fileSize,
        fileFormat: data.fileFormat,
        dimensions: data.dimensions,
        colorCodes: data.colorCodes,
        version: data.version || "1.0",
        tags: data.tags,
      },
      select: {
        id: true,
        name: true,
        description: true,
        type: true,
        category: true,
        fileUrl: true,
        fileFormat: true,
        version: true,
        createdAt: true,
      },
    });

    return apiSuccess({ asset: newAsset }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.errors);
    }
    throw error;
  }
}
