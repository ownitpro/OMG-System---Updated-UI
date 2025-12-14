import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      fullName,
      companyName,
      email,
      industry,
      agentRole,
      projectTimeline,
      additionalDetails
    } = body;

    // Validate required fields
    if (!fullName || !companyName || !email || !agentRole) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the quote request in the database
    const quoteRequest = await prisma.quoteRequest.create({
      data: {
        fullName,
        companyName,
        email,
        industry: industry || 'Other',
        agentRole,
        timeline: projectTimeline || 'Not specified',
        additionalDetails: additionalDetails || '',
        status: 'NEW',
        source: 'AI_AGENTS_PAGE'
      }
    });

    // TODO: Send email notification to the team
    // TODO: Send confirmation email to the user
    // TODO: Add to CRM/lead tracking system

    return NextResponse.json({
      success: true,
      message: 'Quote request submitted successfully',
      id: quoteRequest.id
    });

  } catch (error) {
    console.error('Error processing quote request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
