import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { generateMFASetup } from "@/lib/mfa";

// POST /api/auth/mfa/setup - Initiate MFA setup
export async function POST() {
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
      select: { id: true, email: true, mfaEnabled: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (user.mfaEnabled) {
      return NextResponse.json(
        { error: "MFA is already enabled" },
        { status: 400 }
      );
    }

    // Generate MFA setup (secret, QR code, backup codes)
    const mfaSetup = await generateMFASetup(user.email);

    // Store the secret temporarily (not enabled yet until verified)
    await prisma.user.update({
      where: { id: user.id },
      data: {
        mfaSecret: mfaSetup.secret,
        backupCodes: mfaSetup.backupCodes,
      }
    });

    return NextResponse.json({
      qrCodeUrl: mfaSetup.qrCodeUrl,
      backupCodes: mfaSetup.backupCodes,
    });
  } catch (error) {
    console.error("MFA setup error:", error);
    return NextResponse.json(
      { error: "Failed to setup MFA" },
      { status: 500 }
    );
  }
}
