import { z } from "zod";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { apiSuccess, apiError, parseBody } from "@/lib/api-utils";

const updateProfileSchema = z.object({
  name: z.string().min(1).optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  position: z.string().optional(),
  avatar: z.string().url().optional(),
});

// GET /api/client/profile
export async function GET() {
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

  const profile = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      company: true,
      position: true,
      avatar: true,
      role: true,
      twoFactorEnabled: true,
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

  if (!profile) {
    return apiError("Profile not found", 404);
  }

  return apiSuccess({ profile });
}

// PATCH /api/client/profile
export async function PATCH(req: Request) {
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

  const body = await req.json();
  const data = updateProfileSchema.parse(body);

  const updatedProfile = await prisma.user.update({
    where: { id: user.id },
    data,
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      company: true,
      position: true,
      avatar: true,
      updatedAt: true,
    },
  });

  return apiSuccess({ profile: updatedProfile });
}
