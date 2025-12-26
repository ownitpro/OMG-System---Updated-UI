import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/auth';
import { sendBetaInvitation } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userRole = (session.user as any)?.role;
    
    // Only admin and staff can invite beta users
    if (!['ADMIN', 'STAFF', 'OWNER'].includes(userRole)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const body = await request.json();
    const { 
      email, 
      name, 
      company, 
      role, 
      betaTier = 'internal',
      notes 
    } = body;

    // Validate required fields
    if (!email || !name || !company) {
      return NextResponse.json({ 
        error: 'Missing required fields: email, name, company' 
      }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    let userId;
    let organizationId;

    if (existingUser) {
      userId = existingUser.id;
      
      // Check if they already have a beta invitation
      const existingInvitation = await prisma.betaInvitation.findFirst({
        where: { 
          email,
          status: { in: ['pending', 'accepted'] }
        }
      });

      if (existingInvitation) {
        return NextResponse.json({ 
          error: 'User already has a pending or accepted beta invitation' 
        }, { status: 400 });
      }
    } else {
      // Create new user
      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
      userId = newUser.id;
    }

    // Create or find organization
    const organization = await prisma.organization.upsert({
      where: { slug: company.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: {
        name: company,
        slug: company.toLowerCase().replace(/\s+/g, '-'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
    organizationId = organization.id;

    // Create user membership if it doesn't exist
    await prisma.userMembership.upsert({
      where: {
        userId_organizationId: {
          userId,
          organizationId
        }
      },
      update: {},
      create: {
        userId,
        organizationId,
        role: role === 'admin' ? 'ADMIN' : 'CLIENT',
        status: 'active',
        joinedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    // Create beta invitation
    const invitation = await prisma.betaInvitation.create({
      data: {
        email,
        name,
        company,
        role,
        betaTier,
        notes: notes || null,
        invitedBy: session.user.id,
        organizationId,
        status: 'pending',
        invitationToken: generateInvitationToken(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    // Send invitation email
    try {
      await sendBetaInvitation({
        email,
        name,
        company,
        invitationToken: invitation.invitationToken,
        betaTier
      });
    } catch (emailError) {
      console.error('Failed to send beta invitation email:', emailError);
      // Don't fail the request if email fails
    }

    // Log the invitation
    await prisma.auditLog.create({
      data: {
        organizationId,
        userId: session.user.id,
        action: 'BETA_INVITATION_SENT',
        resourceType: 'beta_invitation',
        resourceId: invitation.id,
        metadata: {
          email,
          name,
          company,
          role,
          betaTier
        },
        ipAddress: request.headers.get('x-forwarded-for')?.split(',')[0] || request.headers.get('x-real-ip') || 'unknown',
        userAgent: request.headers.get('user-agent'),
        createdAt: new Date()
      }
    });

    return NextResponse.json({ 
      success: true, 
      invitationId: invitation.id,
      message: 'Beta invitation sent successfully' 
    });

  } catch (error) {
    console.error('Beta user invitation error:', error);
    return NextResponse.json({ 
      error: 'Failed to send beta invitation' 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userRole = (session.user as any)?.role;
    
    // Only admin and staff can view beta users
    if (!['ADMIN', 'STAFF', 'OWNER'].includes(userRole)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const betaTier = searchParams.get('betaTier');

    const where: any = {};
    
    if (status) where.status = status;
    if (betaTier) where.betaTier = betaTier;

    const [invitations, total] = await Promise.all([
      prisma.betaInvitation.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          organization: {
            select: {
              id: true,
              name: true
            }
          },
          invitedByUser: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.betaInvitation.count({ where })
    ]);

    return NextResponse.json({
      invitations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Beta users retrieval error:', error);
    return NextResponse.json({ 
      error: 'Failed to retrieve beta users' 
    }, { status: 500 });
  }
}

function generateInvitationToken(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}
