import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

// GET /api/auth/mfa/status - Check MFA status for current user
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        mfaEnabled: true,
        backupCodes: true,
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Count remaining backup codes
    let backupCodesRemaining = 0;
    if (user.backupCodes) {
      const codes = Array.isArray(user.backupCodes)
        ? user.backupCodes
        : JSON.parse(user.backupCodes as string);
      backupCodesRemaining = codes.length;
    }

    return NextResponse.json({
      mfaEnabled: user.mfaEnabled,
      backupCodesRemaining,
    });
  } catch (error) {
    console.error("MFA status error:", error);
    return NextResponse.json(
      { error: "Failed to get MFA status" },
      { status: 500 }
    );
  }
}
