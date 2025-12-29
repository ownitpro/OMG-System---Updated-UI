import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { verifyMFAToken } from "@/lib/mfa";

// POST /api/auth/mfa/verify - Verify MFA code and enable MFA
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { code } = await request.json();

    if (!code || typeof code !== "string" || code.length !== 6) {
      return NextResponse.json(
        { error: "Invalid code format" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, mfaSecret: true, mfaEnabled: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (!user.mfaSecret) {
      return NextResponse.json(
        { error: "MFA setup not initiated" },
        { status: 400 }
      );
    }

    // Verify the code
    const isValid = verifyMFAToken(code, user.mfaSecret);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid verification code" },
        { status: 400 }
      );
    }

    // Enable MFA
    await prisma.user.update({
      where: { id: user.id },
      data: { mfaEnabled: true }
    });

    return NextResponse.json({
      success: true,
      message: "MFA enabled successfully"
    });
  } catch (error) {
    console.error("MFA verify error:", error);
    return NextResponse.json(
      { error: "Failed to verify MFA" },
      { status: 500 }
    );
  }
}
