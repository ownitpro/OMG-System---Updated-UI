import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const createBrandAssetSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  type: z.string().min(1), // Logo, Color Palette, Typography, etc.
  category: z.string().optional(),
  fileUrl: z.string().url().optional(),
  thumbnailUrl: z.string().url().optional(),
  fileSize: z.number().int().positive().optional(),
  fileFormat: z.string().optional(),
  dimensions: z.string().optional(),
  colorCodes: z.string().optional(), // JSON string
  tags: z.string().optional(), // JSON string
});

// GET /api/client/brand
// Returns all brand assets for the authenticated client
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

  const assets = await prisma.brandAsset.findMany({
    where: { userId: user.id },
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

// POST /api/client/brand
// Creates a new brand asset
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
    const data = createBrandAssetSchema.parse(body);

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
        tags: data.tags,
      },
      select: {
        id: true,
        name: true,
        description: true,
        type: true,
        fileFormat: true,
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
