import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, industry } = body;
    if (!name || !email || !industry) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Log the submission (in a real app, this would go to a database)
    console.log('Contact Sales Submission:', {
      timestamp: new Date().toISOString(),
      name,
      email,
      phone: body.phone || 'Not provided',
      company: body.company || 'Not provided',
      industry,
      product: body.product || 'Not specified',
      message: body.message || 'No message',
      source: body.source || 'contact-sales',
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    });

    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification to sales team
    // 3. Add to CRM system
    // 4. Send confirmation email to customer
    
    // For now, we'll just return success
    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact sales request submitted successfully' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing contact sales request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
