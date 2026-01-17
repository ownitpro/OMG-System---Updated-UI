import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const updateAssetSchema = z.object({
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
  downloadCount: z.number().int().nonnegative().optional(),
  lastDownloadAt: z.string().datetime().optional(),
});

// PATCH /api/client/brand/assets/[id]
// Updates a brand asset
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
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

  const { id } = params;

  // Verify asset belongs to user
  const existing = await prisma.brandAsset.findFirst({
    where: { id, userId: user.id },
  });

  if (!existing) {
    return apiError("Asset not found", 404);
  }

  try {
    const body = await req.json();
    const data = updateAssetSchema.parse(body);

    const updated = await prisma.brandAsset.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.type && { type: data.type }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.fileUrl !== undefined && { fileUrl: data.fileUrl }),
        ...(data.thumbnailUrl !== undefined && { thumbnailUrl: data.thumbnailUrl }),
        ...(data.fileSize !== undefined && { fileSize: data.fileSize }),
        ...(data.fileFormat !== undefined && { fileFormat: data.fileFormat }),
        ...(data.dimensions !== undefined && { dimensions: data.dimensions }),
        ...(data.colorCodes !== undefined && { colorCodes: data.colorCodes }),
        ...(data.version && { version: data.version }),
        ...(data.tags !== undefined && { tags: data.tags }),
        ...(data.downloadCount !== undefined && { downloadCount: data.downloadCount }),
        ...(data.lastDownloadAt !== undefined && {
          lastDownloadAt: data.lastDownloadAt ? new Date(data.lastDownloadAt) : null,
        }),
      },
      select: {
        id: true,
        name: true,
        type: true,
        version: true,
        downloadCount: true,
        lastDownloadAt: true,
        updatedAt: true,
      },
    });

    return apiSuccess({ asset: updated });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.errors);
    }
    throw error;
  }
}

// DELETE /api/client/brand/assets/[id]
// Deletes a brand asset
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
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

  const { id } = params;

  // Verify asset belongs to user
  const existing = await prisma.brandAsset.findFirst({
    where: { id, userId: user.id },
  });

  if (!existing) {
    return apiError("Asset not found", 404);
  }

  await prisma.brandAsset.delete({
    where: { id },
  });

  return apiSuccess({ message: "Asset deleted successfully" });
}
