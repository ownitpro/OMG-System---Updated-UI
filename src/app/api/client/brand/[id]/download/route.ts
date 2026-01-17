import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

/**
 * GET /api/client/brand/[id]/download
 * Increment download count and return download URL
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  // 🔧 DEV MODE BYPASS: Use test client if no session in development
  let userEmail = session?.user?.email || null;
  if (!userEmail && process.env.NODE_ENV === 'development') {
    userEmail = 'client@testorg.com';
    console.log('[API DEV BYPASS] Using test client user for download');
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
  const asset = await prisma.brandAsset.findFirst({
    where: { id, userId: user.id },
    select: {
      id: true,
      fileUrl: true,
      name: true,
    },
  });

  if (!asset) {
    return apiError("Brand asset not found", 404);
  }

  if (!asset.fileUrl) {
    return apiError("No download URL available for this asset", 400);
  }

  // Increment download count
  await prisma.brandAsset.update({
    where: { id },
    data: {
      downloadCount: { increment: 1 },
      lastDownloadAt: new Date(),
    },
  });

  return apiSuccess({ downloadUrl: asset.fileUrl });
}
