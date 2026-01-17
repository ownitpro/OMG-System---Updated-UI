import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

// GET /api/admin/sessions - Get all strategy sessions (admin only)
export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, role: true },
    });

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden - Admin access required" }, { status: 403 });
    }

    // Get all strategy sessions with user info
    const sessions = await prisma.strategySession.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
          },
        },
      },
      orderBy: { scheduledAt: "desc" },
    });

    return NextResponse.json({ sessions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching admin sessions:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
