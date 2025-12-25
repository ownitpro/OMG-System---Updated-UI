import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !(session.user as any)?.role || ((session.user as any).role !== 'ADMIN')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      demoId,
      orgName,
      orgSlug,
      orgDescription,
      orgWebsite,
      orgIndustry,
      orgSize,
      adminName,
      adminEmail,
      adminPassword,
      billingEmail,
      billingAddress,
      billingCity,
      billingState,
      billingZip,
      billingCountry,
      projectName,
      projectDescription,
      projectPriority,
      sendWelcomeEmail,
      emailTemplate
    } = body;

    // Validate required fields
    if (!demoId || !orgName || !orgSlug || !adminName || !adminEmail || !adminPassword) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Check if demo exists and is not already booked
    const demo = await prisma.demoRequest.findUnique({
      where: { id: demoId },
      include: { lead: true }
    });

    if (!demo) {
      return NextResponse.json({ message: 'Demo request not found' }, { status: 404 });
    }

    if (demo.bookedAt) {
      return NextResponse.json({ message: 'Demo request already booked' }, { status: 400 });
    }

    // Check if organization slug is unique
    const existingOrg = await prisma.organization.findUnique({
      where: { slug: orgSlug }
    });

    if (existingOrg) {
      return NextResponse.json({ message: 'Organization slug already exists' }, { status: 400 });
    }

    // Check if admin email is unique
    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail }
    });

    if (existingUser) {
      return NextResponse.json({ message: 'Admin email already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    // Create organization and user in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create organization
      const organization = await tx.organization.create({
        data: {
          name: orgName,
          slug: orgSlug,
          description: orgDescription,
          website: orgWebsite,
          industry: orgIndustry,
          size: orgSize,
        }
      });

      // Create admin user
      const user = await tx.user.create({
        data: {
          name: adminName,
          email: adminEmail,
          // Note: In a real implementation, you'd store the hashed password
          // For now, we'll just create the user without password
        }
      });

      // Create admin membership
      const membership = await tx.userMembership.create({
        data: {
          userId: user.id,
          organizationId: organization.id,
          role: 'ADMIN',
          status: 'active'
        }
      });

      // Create initial project
      const project = await tx.project.create({
        data: {
          name: projectName,
          description: projectDescription,
          priority: projectPriority,
          status: 'PLANNING',
          organizationId: organization.id,
          userId: user.id,
        }
      });

      // Create initial tasks for the project
      const tasks = [
        {
          title: "Complete onboarding checklist",
          description: "Review and complete all onboarding requirements",
          status: "TODO" as const,
          priority: "high",
          projectId: project.id,
          userId: user.id,
        },
        {
          title: "Set up team members",
          description: "Invite team members to the organization",
          status: "TODO" as const,
          priority: "medium",
          projectId: project.id,
          userId: user.id,
        },
        {
          title: "Configure integrations",
          description: "Set up necessary integrations and connections",
          status: "TODO" as const,
          priority: "medium",
          projectId: project.id,
          userId: user.id,
        }
      ];

      await tx.task.createMany({
        data: tasks
      });

      // Mark demo as booked
      await tx.demoRequest.update({
        where: { id: demoId },
        data: { bookedAt: new Date() }
      });

      // Create audit log
      await tx.auditLog.create({
        data: {
          userId: (session.user as any).id,
          organizationId: organization.id,
          action: 'demo_converted_to_org',
          resourceType: 'organization',
          resourceId: organization.id,
          metadata: {
            demoId: demoId,
            adminEmail: adminEmail,
            projectId: project.id
          }
        }
      });

      return {
        organization,
        user,
        membership,
        project
      };
    });

    // TODO: Send welcome email if requested
    if (sendWelcomeEmail) {
      // In a real implementation, you would send an email here
      console.log(`Welcome email would be sent to ${adminEmail} for organization ${orgName}`);
    }

    return NextResponse.json({
      success: true,
      organization: result.organization,
      user: {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email
      },
      project: result.project
    });

  } catch (error) {
    console.error('Convert demo to org error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
