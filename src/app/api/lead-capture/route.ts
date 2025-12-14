import { NextRequest, NextResponse } from 'next/server';

interface LeadCaptureRequest {
  email: string;
  source: string;
  sessionData?: {
    pageViews: number;
    timeOnSite: number;
    hasShownEmailCapture: boolean;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadCaptureRequest = await request.json();
    const { email, source, sessionData } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Save to your database
    // 2. Send to your email marketing service (Mailchimp, ConvertKit, etc.)
    // 3. Send to your CRM
    // 4. Send welcome email

    // For now, we'll just log it and return success
    console.log('Lead captured:', {
      email,
      source: source || 'exit_intent',
      timestamp: new Date().toISOString(),
      sessionData,
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    });

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Email captured successfully',
      leadId: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    });

  } catch (error) {
    console.error('Lead capture error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle GET requests (health check)
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'lead-capture-api',
    timestamp: new Date().toISOString()
  });
}
