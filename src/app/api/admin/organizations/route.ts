import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const createOrganizationSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  website: z.string().url().optional(),
});

// GET /api/admin/organizations
// Returns all organizations with optional search
// Query params: ?search=omg
export async function GET(req: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return apiError("Unauthorized", 401);
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, role: true },
  });

  if (!user || (user.role !== "ADMIN" && user.role !== "OWNER")) {
    return apiError("Forbidden - Admin access required", 403);
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");

  const organizations = await prisma.organization.findMany({
    where: {
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { slug: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      }),
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      slug: true,
      email: true,
      phone: true,
      website: true,
      logo: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          users: true,
        },
      },
    },
  });

  return apiSuccess({ organizations, total: organizations.length });
}

// POST /api/admin/organizations
// Creates a new organization
export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return apiError("Unauthorized", 401);
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, role: true },
  });

  if (!user || (user.role !== "ADMIN" && user.role !== "OWNER")) {
    return apiError("Forbidden - Admin access required", 403);
  }

  try {
    const body = await req.json();
    const data = createOrganizationSchema.parse(body);

    // Check if slug already exists
    const existingOrg = await prisma.organization.findUnique({
      where: { slug: data.slug },
    });

    if (existingOrg) {
      return apiError("Organization with this slug already exists", 400);
    }

    const newOrganization = await prisma.organization.create({
      data: {
        name: data.name,
        slug: data.slug,
        email: data.email,
        phone: data.phone,
        website: data.website,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        email: true,
        phone: true,
        website: true,
        logo: true,
        createdAt: true,
      },
    });

    return apiSuccess({ organization: newOrganization }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.errors);
    }
    throw error;
  }
}
