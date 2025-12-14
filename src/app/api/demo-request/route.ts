import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      fullName,
      email,
      company,
      phone,
      industry,
      challenge,
      newsletter
    } = body;

    // Basic validation
    if (!fullName || !email || !company || !industry) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save to database
    const demoRequest = await prisma.demoRequest.create({
      data: {
        fullName,
        email,
        company,
        phone: phone || null,
        industry,
        challenge: challenge || null,
        newsletter: newsletter || false,
        status: 'NEW',
        source: 'DEMO_PAGE'
      },
    });

    // In a real application, you would also:
    // 1. Send an email notification to the sales team
    // 2. Send a confirmation email to the user
    // 3. Trigger the demo generation process
    // 4. Add to CRM/marketing automation

    return NextResponse.json({ 
      success: true, 
      message: 'Demo request submitted successfully',
      demoRequestId: demoRequest.id
    });

  } catch (error) {
    console.error('Error processing demo request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
