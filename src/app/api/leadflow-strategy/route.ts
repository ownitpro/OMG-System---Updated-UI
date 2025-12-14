import { NextRequest, NextResponse } from 'next/server';

interface LeadFlowStrategyRequest {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  industry: string;
  hasRunAds: string;
  platforms: string[];
  monthlyBudget?: string;
  teamSize?: string;
  leadGoal: string;
  additionalNotes?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadFlowStrategyRequest = await request.json();
    
    // Validate required fields
    const requiredFields = ['fullName', 'email', 'industry', 'hasRunAds', 'leadGoal'];
    const missingFields = requiredFields.filter(field => !body[field as keyof LeadFlowStrategyRequest]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Create lead record (in a real app, this would save to database)
    const leadRecord = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'leadflow_strategy_call',
      fullName: body.fullName,
      email: body.email,
      phone: body.phone || null,
      company: body.company || null,
      industry: body.industry,
      hasRunAds: body.hasRunAds,
      platforms: body.platforms,
      monthlyBudget: body.monthlyBudget || null,
      teamSize: body.teamSize || null,
      leadGoal: body.leadGoal,
      additionalNotes: body.additionalNotes || null,
      status: 'new',
      priority: 'high',
      createdAt: new Date().toISOString(),
      source: 'leadflow_strategy_page',
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    };
    
    // Log the lead (in production, save to database)
    console.log('🎯 New LeadFlow Strategy Call Request:', {
      id: leadRecord.id,
      name: leadRecord.fullName,
      email: leadRecord.email,
      company: leadRecord.company,
      industry: leadRecord.industry,
      hasRunAds: leadRecord.hasRunAds,
      platforms: leadRecord.platforms,
      monthlyBudget: leadRecord.monthlyBudget,
      teamSize: leadRecord.teamSize,
      leadGoal: leadRecord.leadGoal,
      timestamp: leadRecord.createdAt
    });
    
    // In a real application, you would:
    // 1. Save to database (Prisma, MongoDB, etc.)
    // 2. Send notification email to sales team
    // 3. Create calendar event or send to CRM
    // 4. Send confirmation email to user
    
    // Simulate sending notification email
    console.log('📧 Sending notification email to sales team...');
    console.log('📧 Sending confirmation email to user...');
    
    // Simulate CRM integration
    console.log('🔗 Creating CRM record...');
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Strategy call request submitted successfully',
      leadId: leadRecord.id,
      nextSteps: [
        'We\'ll review your request within 24 hours',
        'Our team will contact you to schedule your call',
        'You\'ll receive a calendar invite with meeting details'
      ]
    });
    
  } catch (error) {
    console.error('Error processing LeadFlow strategy request:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'There was an error processing your request. Please try again later.'
      },
      { status: 500 }
    );
  }
}

// Handle GET requests (health check)
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'leadflow-strategy-api',
    timestamp: new Date().toISOString()
  });
}
