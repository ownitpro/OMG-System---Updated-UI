import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { 
      category, 
      rating, 
      feedback, 
      page, 
      userAgent, 
      browserInfo,
      featureRequest,
      bugReport,
      improvementSuggestion
    } = body;

    // Validate required fields
    if (!category || !rating || !feedback) {
      return NextResponse.json({ 
        error: 'Missing required fields: category, rating, feedback' 
      }, { status: 400 });
    }

    // Get user's organization ID
    const activeOrgId = (session.user as any)?.activeOrgId;
    
    if (!activeOrgId) {
      return NextResponse.json({ error: 'No active organization' }, { status: 400 });
    }

    // Create feedback record
    const feedbackRecord = await prisma.feedback.create({
      data: {
        organizationId: activeOrgId,
        userId: session.user.id,
        category,
        rating: parseInt(rating),
        feedback,
        page: page || null,
        userAgent: userAgent || null,
        browserInfo: browserInfo || null,
        featureRequest: featureRequest || false,
        bugReport: bugReport || false,
        improvementSuggestion: improvementSuggestion || false,
        status: 'new',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    // Log feedback submission for analytics
    await prisma.auditLog.create({
      data: {
        organizationId: activeOrgId,
        userId: session.user.id,
        action: 'FEEDBACK_SUBMITTED',
        resourceType: 'feedback',
        resourceId: feedbackRecord.id,
        metadata: {
          category,
          rating,
          page,
          hasFeatureRequest: featureRequest,
          hasBugReport: bugReport
        },
        ipAddress: request.ip || request.headers.get('x-forwarded-for'),
        userAgent: request.headers.get('user-agent'),
        createdAt: new Date()
      }
    });

    return NextResponse.json({ 
      success: true, 
      feedbackId: feedbackRecord.id,
      message: 'Feedback submitted successfully' 
    });

  } catch (error) {
    console.error('Feedback submission error:', error);
    return NextResponse.json({ 
      error: 'Failed to submit feedback' 
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
    
    // Only admin and staff can view all feedback
    if (!['ADMIN', 'STAFF', 'OWNER'].includes(userRole)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const organizationId = searchParams.get('organizationId');

    const where: any = {};
    
    if (category) where.category = category;
    if (status) where.status = status;
    if (organizationId) where.organizationId = organizationId;

    const [feedback, total] = await Promise.all([
      prisma.feedback.findMany({
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
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.feedback.count({ where })
    ]);

    return NextResponse.json({
      feedback,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Feedback retrieval error:', error);
    return NextResponse.json({ 
      error: 'Failed to retrieve feedback' 
    }, { status: 500 });
  }
}
