import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const createCampaignSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  platform: z.string().min(1),
  budget: z.number().positive(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  targetAudience: z.string().optional(),
  landingPageUrl: z.string().url().optional(),
});

// GET /api/client/ads/campaigns
// Returns all ad campaigns for the authenticated client
// Query params: ?status=DRAFT|ACTIVE|PAUSED|COMPLETED
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

  const campaigns = await prisma.adCampaign.findMany({
    where: {
      userId: user.id,
      ...(status && { status }),
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      description: true,
      platform: true,
      status: true,
      budget: true,
      spent: true,
      currency: true,
      startDate: true,
      endDate: true,
      impressions: true,
      clicks: true,
      conversions: true,
      ctr: true,
      cpc: true,
      targetAudience: true,
      adCreativeUrl: true,
      landingPageUrl: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return apiSuccess({ campaigns });
}

// POST /api/client/ads/campaigns
// Creates a new ad campaign
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
    const data = createCampaignSchema.parse(body);

    const newCampaign = await prisma.adCampaign.create({
      data: {
        userId: user.id,
        name: data.name,
        description: data.description,
        platform: data.platform,
        budget: data.budget,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        targetAudience: data.targetAudience,
        landingPageUrl: data.landingPageUrl,
        status: "DRAFT",
      },
      select: {
        id: true,
        name: true,
        description: true,
        platform: true,
        status: true,
        budget: true,
        currency: true,
        startDate: true,
        endDate: true,
        createdAt: true,
      },
    });

    return apiSuccess({ campaign: newCampaign }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.errors);
    }
    throw error;
  }
}
