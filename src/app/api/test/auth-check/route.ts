import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// Test endpoint to verify authentication and role-based access control
export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({
      success: false,
      message: "Not authenticated",
      test: "FAIL"
    }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      email: true,
      role: true,
      name: true,
      organizationId: true,
    },
  });

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "User not found in database",
      test: "FAIL"
    }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    message: "Authentication working correctly!",
    test: "PASS",
    details: {
      authenticated: true,
      sessionEmail: session.user.email,
      dbUserEmail: user.email,
      role: user.role,
      hasOrganization: !!user.organizationId,
      roleCheck: {
        isClient: user.role === "CLIENT",
        isAdmin: user.role === "ADMIN",
        isOwner: user.role === "OWNER",
      }
    }
  });
}
