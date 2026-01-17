import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";
import { hash } from "bcryptjs";

const updateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).optional(),
  role: z.enum(["CLIENT", "ADMIN", "OWNER"]).optional(),
  organizationId: z.string().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  position: z.string().optional(),
  password: z.string().min(8).optional(),
});

// GET /api/admin/users/[id]
// Returns details for a specific user
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

  const targetUser = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      phone: true,
      company: true,
      position: true,
      organizationId: true,
      organization: {
        select: {
          id: true,
          name: true,
          slug: true,
          email: true,
          phone: true,
        },
      },
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          subscriptions: true,
          invoices: true,
          strategySessions: true,
          timeEntries: true,
          supportTickets: true,
        },
      },
    },
  });

  if (!targetUser) {
    return apiError("User not found", 404);
  }

  return apiSuccess({ user: targetUser });
}

// PATCH /api/admin/users/[id]
// Updates a user's information
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

  // Check if target user exists
  const targetUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!targetUser) {
    return apiError("User not found", 404);
  }

  // Prevent modifying OWNER role unless you're an OWNER
  if (targetUser.role === "OWNER" && user.role !== "OWNER") {
    return apiError("Only owners can modify owner accounts", 403);
  }

  try {
    const body = await req.json();
    const data = updateUserSchema.parse(body);

    // If email is being changed, check if new email is available
    if (data.email && data.email !== targetUser.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        return apiError("Email already in use", 400);
      }
    }

    // Hash password if being updated
    const updateData: any = {
      ...(data.email && { email: data.email }),
      ...(data.name && { name: data.name }),
      ...(data.role && { role: data.role }),
      ...(data.organizationId !== undefined && {
        organizationId: data.organizationId,
      }),
      ...(data.phone !== undefined && { phone: data.phone }),
      ...(data.company !== undefined && { company: data.company }),
      ...(data.position !== undefined && { position: data.position }),
    };

    if (data.password) {
      updateData.password = await hash(data.password, 12);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phone: true,
        company: true,
        position: true,
        organizationId: true,
        organization: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        updatedAt: true,
      },
    });

    return apiSuccess({ user: updatedUser });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.errors);
    }
    throw error;
  }
}

// DELETE /api/admin/users/[id]
// Deletes a user (soft delete would be better in production)
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

  // Prevent self-deletion
  if (user.id === id) {
    return apiError("Cannot delete your own account", 400);
  }

  // Check if target user exists
  const targetUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!targetUser) {
    return apiError("User not found", 404);
  }

  // Prevent deleting OWNER unless you're an OWNER
  if (targetUser.role === "OWNER" && user.role !== "OWNER") {
    return apiError("Only owners can delete owner accounts", 403);
  }

  // Delete user (cascades will handle related records)
  await prisma.user.delete({
    where: { id },
  });

  return apiSuccess({ message: "User deleted successfully" });
}
