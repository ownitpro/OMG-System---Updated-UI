import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { generateBackupCodes } from "@/lib/mfa";
import bcrypt from "bcryptjs";

// POST /api/auth/mfa/backup-codes - Regenerate backup codes (requires password)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: "Password is required to regenerate backup codes" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, password: true, mfaEnabled: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (!user.mfaEnabled) {
      return NextResponse.json(
        { error: "MFA is not enabled" },
        { status: 400 }
      );
    }

    // Verify password
    if (!user.password) {
      return NextResponse.json(
        { error: "Cannot verify password for OAuth accounts" },
        { status: 400 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 400 }
      );
    }

    // Generate new backup codes
    const newBackupCodes = generateBackupCodes();

    await prisma.user.update({
      where: { id: user.id },
      data: { backupCodes: newBackupCodes }
    });

    return NextResponse.json({
      success: true,
      backupCodes: newBackupCodes,
    });
  } catch (error) {
    console.error("Backup codes regeneration error:", error);
    return NextResponse.json(
      { error: "Failed to regenerate backup codes" },
      { status: 500 }
    );
  }
}

// GET /api/auth/mfa/backup-codes - Get current backup codes (for display only)
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
      select: { mfaEnabled: true, backupCodes: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (!user.mfaEnabled) {
      return NextResponse.json(
        { error: "MFA is not enabled" },
        { status: 400 }
      );
    }

    const codes = Array.isArray(user.backupCodes)
      ? user.backupCodes
      : JSON.parse(user.backupCodes as string || "[]");

    return NextResponse.json({
      backupCodes: codes,
    });
  } catch (error) {
    console.error("Get backup codes error:", error);
    return NextResponse.json(
      { error: "Failed to get backup codes" },
      { status: 500 }
    );
  }
}
