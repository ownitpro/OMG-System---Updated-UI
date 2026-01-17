import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError } from "@/lib/api-utils";
import { NextResponse } from "next/server";

/**
 * POST /api/client/content-requests
 * Create a new content request from client
 */
export async function POST(req: Request) {
  const session = await auth();

  // 🔧 DEV MODE BYPASS: Use test client if no session in development
  let userEmail = session?.user?.email || null;
  if (!userEmail && process.env.NODE_ENV === 'development') {
    userEmail = 'client@testorg.com';
  }

  if (!userEmail) {
    return apiError('Unauthorized', 401);
  }

  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: { id: true, name: true },
    });

    if (!user) {
      return apiError('User not found', 404);
    }

    // Parse request body
    const body = await req.json();
    const {
      title,
      contentType,
      description,
      targetAudience,
      keywords,
      deadline,
      wordCount,
      tone,
      additionalNotes,
    } = body;

    // Validation
    if (!title || !contentType || !description) {
      return apiError('Missing required fields: title, contentType, description', 400);
    }

    // Map contentType from form to database type
    const typeMapping: Record<string, string> = {
      'blog_post': 'Blog Post',
      'video': 'Video',
      'email_campaign': 'Email Campaign',
      'social_media': 'Social Media',
      'whitepaper': 'Whitepaper',
      'case_study': 'Case Study',
      'infographic': 'Infographic',
      'podcast': 'Podcast',
      'other': 'Other',
    };

    const mappedType = typeMapping[contentType] || contentType;

    // Create content project
    const project = await prisma.contentProject.create({
      data: {
        userId: user.id,
        title,
        type: mappedType,
        description: `${description}\n\n--- Request Details ---\nTarget Audience: ${targetAudience || 'Not specified'}\nTone: ${tone || 'Not specified'}\n\nAdditional Notes:\n${additionalNotes || 'None'}`,
        status: 'DRAFT',
        targetKeywords: keywords ? JSON.stringify(keywords.split(',').map((k: string) => k.trim())) : null,
        wordCount: wordCount ? parseInt(wordCount.toString()) : null,
        dueDate: deadline ? new Date(deadline) : null,
        assignedTo: 'Content Team', // Default assignment
      },
      select: {
        id: true,
        title: true,
        type: true,
        status: true,
        dueDate: true,
        wordCount: true,
        createdAt: true,
      },
    });

    // TODO: Send email notifications
    // 1. Email to content team
    // 2. Confirmation email to client
    // For now, we'll log this
    console.log('📧 Email notifications would be sent:');
    console.log(`   → Content Team: New request "${title}"`);
    console.log(`   → ${userEmail}: Confirmation sent`);

    return apiSuccess(
      {
        project,
        message: 'Content request submitted successfully! Our team will start working on it soon.',
      },
      201
    );
  } catch (error) {
    console.error('Error creating content request:', error);
    return apiError('Failed to create content request', 500);
  }
}

/**
 * GET /api/client/content-requests
 * Get all content requests for current user (optional - for future use)
 */
export async function GET(req: Request) {
  const session = await auth();

  let userEmail = session?.user?.email || null;
  if (!userEmail && process.env.NODE_ENV === 'development') {
    userEmail = 'client@testorg.com';
  }

  if (!userEmail) {
    return apiError('Unauthorized', 401);
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: { id: true },
    });

    if (!user) {
      return apiError('User not found', 404);
    }

    const projects = await prisma.contentProject.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
        status: true,
        dueDate: true,
        publishedAt: true,
        assignedTo: true,
        wordCount: true,
        targetKeywords: true,
        draftUrl: true,
        finalUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return apiSuccess({ projects });
  } catch (error) {
    console.error('Error fetching content requests:', error);
    return apiError('Failed to fetch content requests', 500);
  }
}
