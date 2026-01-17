import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { sendStrategySessionUpdate } from "@/lib/email";

// PATCH /api/admin/sessions/[id] - Update session (admin only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    // Await params in Next.js 14+
    const { id } = await params;

    const body = await req.json();
    const { meetingLink, notes, status } = body;

    // Get the session before update to check what changed
    const originalSession = await prisma.strategySession.findUnique({
      where: { id },
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
    });

    if (!originalSession) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Track what fields changed
    const changedFields: string[] = [];
    if (meetingLink !== undefined && meetingLink !== originalSession.meetingLink) {
      changedFields.push('meetingLink');
    }
    if (notes !== undefined && notes !== originalSession.notes) {
      changedFields.push('notes');
    }
    if (status !== undefined && status !== originalSession.status) {
      changedFields.push('status');
    }

    // Update session
    const updatedSession = await prisma.strategySession.update({
      where: { id },
      data: {
        ...(meetingLink !== undefined && { meetingLink }),
        ...(notes !== undefined && { notes }),
        ...(status !== undefined && { status }),
        updatedAt: new Date(),
      },
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
    });

    // Send email notification if something changed
    if (changedFields.length > 0) {
      try {
        await sendStrategySessionUpdate({
          email: updatedSession.user.email,
          name: updatedSession.user.name,
          sessionTitle: updatedSession.title,
          sessionDate: updatedSession.scheduledAt.toISOString(),
          sessionTime: updatedSession.scheduledAt.toISOString(),
          duration: updatedSession.durationMinutes,
          meetingLink: updatedSession.meetingLink,
          notes: updatedSession.notes,
          status: updatedSession.status,
          changedFields,
        });
        console.log(`✉️ Email notification sent to ${updatedSession.user.email} for session update`);
      } catch (emailError) {
        // Log email error but don't fail the request
        console.error("⚠️ Failed to send email notification:", emailError);
      }
    }

    return NextResponse.json({ session: updatedSession }, { status: 200 });
  } catch (error) {
    console.error("Error updating session:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/admin/sessions/[id] - Delete session (admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    // Await params in Next.js 14+
    const { id } = await params;

    // Delete session
    await prisma.strategySession.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Session deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting session:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
