import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const createCouponSchema = z.object({
  code: z.string().min(1).max(50),
  description: z.string().optional(),
  type: z.enum(["PERCENTAGE", "FIXED_AMOUNT"]),
  value: z.number().min(0),
  maxUses: z.number().int().positive().optional().nullable(),
  minPurchase: z.number().min(0).optional().nullable(),
  maxDiscount: z.number().min(0).optional().nullable(),
  startsAt: z.string().datetime().optional().nullable(),
  expiresAt: z.string().datetime().optional().nullable(),
  isActive: z.boolean().default(true),
  isPublic: z.boolean().default(false),
  category: z.enum(["PROMO", "PARTNER", "LOYALTY", "SEASONAL", "REFERRAL", "OTHER"]).default("OTHER"),
  appliesTo: z.string().optional().nullable(), // JSON string
  assignedTo: z.string().optional().nullable(), // JSON string
  firstTimeOnly: z.boolean().default(false),
  stackable: z.boolean().default(false),
  stackGroup: z.string().optional().nullable(),
  priority: z.number().int().default(0),
  note: z.string().optional().nullable(),
  organizationId: z.string().optional(), // Will use default if not provided
});

// GET /api/admin/coupons
// Returns all coupons with optional filtering
// Query params: ?search=code&status=active|inactive|expired|scheduled&category=PROMO
export async function GET(req: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return apiError("Unauthorized", 401);
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, role: true, organizationId: true },
  });

  if (!user || (user.role !== "ADMIN" && user.role !== "OWNER")) {
    return apiError("Forbidden - Admin access required", 403);
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");
  const status = searchParams.get("status");
  const category = searchParams.get("category");

  const now = new Date();

  // Build where clause based on filters
  const whereClause: any = {};

  // Search filter
  if (search) {
    whereClause.OR = [
      { code: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { note: { contains: search, mode: "insensitive" } },
    ];
  }

  // Category filter
  if (category) {
    whereClause.category = category.toUpperCase();
  }

  // Status filter
  if (status) {
    switch (status) {
      case "active":
        whereClause.isActive = true;
        // Use AND to combine with any existing OR from search
        if (!whereClause.AND) whereClause.AND = [];
        whereClause.AND.push({
          OR: [
            { startsAt: null },
            { startsAt: { lte: now } },
          ],
        });
        whereClause.AND.push({
          OR: [
            { expiresAt: null },
            { expiresAt: { gt: now } },
          ],
        });
        break;
      case "inactive":
        whereClause.isActive = false;
        break;
      case "expired":
        whereClause.expiresAt = { lt: now };
        break;
      case "scheduled":
        whereClause.startsAt = { gt: now };
        break;
    }
  }

  const coupons = await prisma.coupon.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      code: true,
      description: true,
      type: true,
      value: true,
      maxUses: true,
      currentUses: true,
      minPurchase: true,
      maxDiscount: true,
      startsAt: true,
      expiresAt: true,
      isActive: true,
      isPublic: true,
      category: true,
      appliesTo: true,
      assignedTo: true,
      firstTimeOnly: true,
      stackable: true,
      stackGroup: true,
      priority: true,
      totalSavings: true,
      note: true,
      organizationId: true,
      organization: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      createdById: true,
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });

  return apiSuccess({
    coupons,
    total: coupons.length,
  });
}

// POST /api/admin/coupons
// Creates a new coupon
export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return apiError("Unauthorized", 401);
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, role: true, organizationId: true },
  });

  if (!user || (user.role !== "ADMIN" && user.role !== "OWNER")) {
    return apiError("Forbidden - Admin access required", 403);
  }

  try {
    const body = await req.json();
    const data = createCouponSchema.parse(body);

    // Check if code already exists
    const existingCoupon = await prisma.coupon.findUnique({
      where: { code: data.code.toUpperCase() },
    });

    if (existingCoupon) {
      return apiError("Coupon code already exists", 400);
    }

    // Get organization ID - use provided or user's default
    let organizationId = data.organizationId;
    if (!organizationId) {
      // Get the first organization or the user's organization
      if (user.organizationId) {
        organizationId = user.organizationId;
      } else {
        const defaultOrg = await prisma.organization.findFirst({
          select: { id: true },
        });
        if (!defaultOrg) {
          return apiError("No organization found. Please create an organization first.", 400);
        }
        organizationId = defaultOrg.id;
      }
    }

    const newCoupon = await prisma.coupon.create({
      data: {
        code: data.code.toUpperCase(),
        description: data.description,
        type: data.type,
        value: data.value,
        maxUses: data.maxUses,
        minPurchase: data.minPurchase,
        maxDiscount: data.maxDiscount,
        startsAt: data.startsAt ? new Date(data.startsAt) : null,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
        isActive: data.isActive,
        isPublic: data.isPublic,
        category: data.category,
        appliesTo: data.appliesTo,
        assignedTo: data.assignedTo,
        firstTimeOnly: data.firstTimeOnly,
        stackable: data.stackable,
        stackGroup: data.stackGroup,
        priority: data.priority,
        note: data.note,
        organizationId: organizationId,
        createdById: user.id,
      },
      select: {
        id: true,
        code: true,
        description: true,
        type: true,
        value: true,
        maxUses: true,
        currentUses: true,
        minPurchase: true,
        maxDiscount: true,
        startsAt: true,
        expiresAt: true,
        isActive: true,
        isPublic: true,
        category: true,
        appliesTo: true,
        assignedTo: true,
        firstTimeOnly: true,
        stackable: true,
        stackGroup: true,
        priority: true,
        totalSavings: true,
        note: true,
        organizationId: true,
        organization: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        createdAt: true,
      },
    });

    return apiSuccess({ coupon: newCoupon }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.issues);
    }
    console.error("Create coupon error:", error);
    throw error;
  }
}
