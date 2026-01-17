import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";
import { hash } from "bcryptjs";

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  role: z.enum(["CLIENT", "ADMIN", "OWNER"]),
  organizationId: z.string().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  position: z.string().optional(),
  password: z.string().min(8).optional(),
});

// GET /api/admin/users
// Returns all users with optional filtering
// Query params: ?role=CLIENT&organizationId=xyz&search=john
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
  const role = searchParams.get("role");
  const organizationId = searchParams.get("organizationId");
  const search = searchParams.get("search");

  const users = await prisma.user.findMany({
    where: {
      ...(role && { role: role as any }),
      ...(organizationId && { organizationId }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { company: { contains: search, mode: "insensitive" } },
        ],
      }),
    },
    orderBy: { createdAt: "desc" },
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
      createdAt: true,
      updatedAt: true,
    },
  });

  return apiSuccess({ users, total: users.length });
}

// POST /api/admin/users
// Creates a new user
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
    const data = createUserSchema.parse(body);

    // Check if user with email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return apiError("User with this email already exists", 400);
    }

    // Hash password if provided
    const hashedPassword = data.password
      ? await hash(data.password, 12)
      : null;

    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        role: data.role,
        organizationId: data.organizationId,
        phone: data.phone,
        company: data.company,
        position: data.position,
        password: hashedPassword,
      },
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
        createdAt: true,
      },
    });

    return apiSuccess({ user: newUser }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError("Validation failed", 400, error.errors);
    }
    throw error;
  }
}
