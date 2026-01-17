import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const updateCampaignSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  platform: z.string().min(1).optional(),
  budget: z.number().positive().optional(),
  spent: z.number().nonnegative().optional(),
  status: z.enum(["DRAFT", "ACTIVE", "PAUSED", "COMPLETED"]).optional(),
  impressions: z.number().int().nonnegative().optional(),
  clicks: z.number().int().nonnegative().optional(),
  conversions: z.number().int().nonnegative().optional(),
  targetAudience: z.string().optional(),
  landingPageUrl: z.string().url().optional(),
});

// PATCH /api/client/ads/campaigns/[id]
// Updates an ad campaign
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

  // Verify campaign belongs to user
  const existing = await prisma.adCampaign.findFirst({
    where: { id, userId: user.id },
  });

  if (!existing) {
    return apiError("Campaign not found", 404);
  }

  try {
    const body = await req.json();
    const data = updateCampaignSchema.parse(body);

    // Build update data object
    const updateData: any = {};

    // Only add fields that are explicitly provided
    if (data.name !== undefined && data.name.trim() !== "") {
      updateData.name = data.name;
    }
    if (data.description !== undefined) {
      updateData.description = data.description;
    }
    if (data.platform !== undefined && data.platform.trim() !== "") {
      updateData.platform = data.platform;
    }
    if (data.budget !== undefined) {
      updateData.budget = data.budget;
    }
    if (data.spent !== undefined) {
      updateData.spent = data.spent;
    }
    if (data.status !== undefined) {
      updateData.status = data.status;
    }
    if (data.impressions !== undefined) {
      updateData.impressions = data.impressions;
    }
    if (data.clicks !== undefined) {
      updateData.clicks = data.clicks;
    }
    if (data.conversions !== undefined) {
      updateData.conversions = data.conversions;
    }
    if (data.targetAudience !== undefined) {
      updateData.targetAudience = data.targetAudience;
    }
    if (data.landingPageUrl !== undefined) {
      updateData.landingPageUrl = data.landingPageUrl;
    }

    // Calculate CTR and CPC if metrics are being updated
    if (data.clicks !== undefined || data.impressions !== undefined) {
      const impressions = data.impressions ?? existing.impressions;
      const clicks = data.clicks ?? existing.clicks;
      updateData.ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
    }

    if (data.clicks !== undefined || data.spent !== undefined) {
      const clicks = data.clicks ?? existing.clicks;
      const spent = data.spent ?? existing.spent;
      updateData.cpc = clicks > 0 ? spent / clicks : 0;
    }

    // If no fields to update, just return the existing campaign
    if (Object.keys(updateData).length === 0) {
      return apiSuccess({ campaign: existing });
    }

    const updated = await prisma.adCampaign.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        description: true,
        platform: true,
        status: true,
        budget: true,
        spent: true,
        currency: true,
        impressions: true,
        clicks: true,
        conversions: true,
        ctr: true,
        cpc: true,
        updatedAt: true,
      },
    });

    return apiSuccess({ campaign: updated });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.errors);
    }
    console.error('[API Error] Campaign update failed:', error);
    throw error;
  }
}

// DELETE /api/client/ads/campaigns/[id]
// Deletes an ad campaign
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

  // Verify campaign belongs to user
  const existing = await prisma.adCampaign.findFirst({
    where: { id, userId: user.id },
  });

  if (!existing) {
    return apiError("Campaign not found", 404);
  }

  await prisma.adCampaign.delete({
    where: { id },
  });

  return apiSuccess({ message: "Campaign deleted successfully" });
}
