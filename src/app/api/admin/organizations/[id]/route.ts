import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";

const updateOrganizationSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens").optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  website: z.string().url().optional(),
});

// GET /api/admin/organizations/[id]
// Returns details for a specific organization
export async function GET(
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

  if (!user || (user.role !== "ADMIN" && user.role !== "OWNER")) {
    return apiError("Forbidden - Admin access required", 403);
  }

  const { id } = params;

  const organization = await prisma.organization.findUnique({
    where: { id },
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
      users: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
      },
      _count: {
        select: {
          users: true,
        },
      },
    },
  });

  if (!organization) {
    return apiError("Organization not found", 404);
  }

  return apiSuccess({ organization });
}

// PATCH /api/admin/organizations/[id]
// Updates an organization's information
export async function PATCH(
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

  if (!user || (user.role !== "ADMIN" && user.role !== "OWNER")) {
    return apiError("Forbidden - Admin access required", 403);
  }

  const { id } = params;

  // Check if organization exists
  const existingOrg = await prisma.organization.findUnique({
    where: { id },
  });

  if (!existingOrg) {
    return apiError("Organization not found", 404);
  }

  try {
    const body = await req.json();
    const data = updateOrganizationSchema.parse(body);

    // If slug is being changed, check if new slug is available
    if (data.slug && data.slug !== existingOrg.slug) {
      const slugTaken = await prisma.organization.findUnique({
        where: { slug: data.slug },
      });

      if (slugTaken) {
        return apiError("Slug already in use", 400);
      }
    }

    const updatedOrganization = await prisma.organization.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.slug && { slug: data.slug }),
        ...(data.email !== undefined && { email: data.email }),
        ...(data.phone !== undefined && { phone: data.phone }),
        ...(data.website !== undefined && { website: data.website }),
      },
      select: {
        id: true,
        name: true,
        slug: true,
        email: true,
        phone: true,
        website: true,
        logo: true,
        updatedAt: true,
      },
    });

    return apiSuccess({ organization: updatedOrganization });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.errors);
    }
    throw error;
  }
}

// DELETE /api/admin/organizations/[id]
// Deletes an organization (only if no users)
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

  if (!user || (user.role !== "ADMIN" && user.role !== "OWNER")) {
    return apiError("Forbidden - Admin access required", 403);
  }

  const { id } = params;

  // Check if organization exists
  const existingOrg = await prisma.organization.findUnique({
    where: { id },
    include: {
      _count: {
        select: { users: true },
      },
    },
  });

  if (!existingOrg) {
    return apiError("Organization not found", 404);
  }

  // Prevent deletion if organization has users
  if (existingOrg._count.users > 0) {
    return apiError(
      "Cannot delete organization with active users. Please reassign or remove users first.",
      400
    );
  }

  await prisma.organization.delete({
    where: { id },
  });

  return apiSuccess({ message: "Organization deleted successfully" });
}
