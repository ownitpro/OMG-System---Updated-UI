import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const updateBrandAssetSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  type: z.string().min(1).optional(),
  category: z.string().optional(),
  fileUrl: z.string().url().optional(),
  thumbnailUrl: z.string().url().optional(),
  fileSize: z.number().int().positive().optional(),
  fileFormat: z.string().optional(),
  dimensions: z.string().optional(),
  colorCodes: z.string().optional(),
  version: z.string().optional(),
  tags: z.string().optional(),
});

// PATCH /api/client/brand/[id]
// Updates a brand asset
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
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

  const { id } = await params;

  // Verify asset belongs to user
  const existing = await prisma.brandAsset.findFirst({
    where: { id, userId: user.id },
  });

  if (!existing) {
    return apiError("Brand asset not found", 404);
  }

  try {
    const body = await req.json();
    const data = updateBrandAssetSchema.parse(body);

    // Build update data object
    const updateData: any = {};

    if (data.name !== undefined && data.name.trim() !== "") {
      updateData.name = data.name;
    }
    if (data.description !== undefined) {
      updateData.description = data.description;
    }
    if (data.type !== undefined && data.type.trim() !== "") {
      updateData.type = data.type;
    }
    if (data.category !== undefined) {
      updateData.category = data.category;
    }
    if (data.fileUrl !== undefined) {
      updateData.fileUrl = data.fileUrl;
    }
    if (data.thumbnailUrl !== undefined) {
      updateData.thumbnailUrl = data.thumbnailUrl;
    }
    if (data.fileSize !== undefined) {
      updateData.fileSize = data.fileSize;
    }
    if (data.fileFormat !== undefined) {
      updateData.fileFormat = data.fileFormat;
    }
    if (data.dimensions !== undefined) {
      updateData.dimensions = data.dimensions;
    }
    if (data.colorCodes !== undefined) {
      updateData.colorCodes = data.colorCodes;
    }
    if (data.version !== undefined) {
      updateData.version = data.version;
    }
    if (data.tags !== undefined) {
      updateData.tags = data.tags;
    }

    // If no fields to update, just return the existing asset
    if (Object.keys(updateData).length === 0) {
      return apiSuccess({ asset: existing });
    }

    const updated = await prisma.brandAsset.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        description: true,
        type: true,
        category: true,
        fileUrl: true,
        fileFormat: true,
        fileSize: true,
        dimensions: true,
        colorCodes: true,
        version: true,
        downloadCount: true,
        updatedAt: true,
      },
    });

    return apiSuccess({ asset: updated });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.errors);
    }
    console.error('[API Error] Brand asset update failed:', error);
    throw error;
  }
}

// DELETE /api/client/brand/[id]
// Deletes a brand asset
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
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

  const { id } = await params;

  // Verify asset belongs to user
  const existing = await prisma.brandAsset.findFirst({
    where: { id, userId: user.id },
  });

  if (!existing) {
    return apiError("Brand asset not found", 404);
  }

  await prisma.brandAsset.delete({
    where: { id },
  });

  return apiSuccess({ message: "Brand asset deleted successfully" });
}

// GET /api/client/brand/[id]/download
// Increment download count
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
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

  const { id } = await params;

  // Verify asset belongs to user
  const existing = await prisma.brandAsset.findFirst({
    where: { id, userId: user.id },
  });

  if (!existing) {
    return apiError("Brand asset not found", 404);
  }

  // Increment download count
  await prisma.brandAsset.update({
    where: { id },
    data: {
      downloadCount: { increment: 1 },
      lastDownloadAt: new Date(),
    },
  });

  return apiSuccess({ downloadUrl: existing.fileUrl });
}
