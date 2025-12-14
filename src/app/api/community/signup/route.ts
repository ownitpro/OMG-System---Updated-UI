import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, company, industry, role, goal, agreement } = body;

    // Validate required fields
    if (!fullName || !email || !company || !industry || !role || !goal || !agreement) {
      return NextResponse.json(
        { error: 'All fields are required' },
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

    // Create community member record
    const memberData = {
      id: `member_${Date.now()}`,
      fullName,
      email,
      company,
      industry,
      role,
      goal,
      agreement,
      status: 'Pending Approval',
      createdAt: new Date().toISOString(),
      priority: 'Normal'
    };

    // Log the signup (in production, you'd save to database)
    console.log('Community Signup:', memberData);

    // In a real application, you would:
    // 1. Save to database (Prisma, MongoDB, etc.)
    // 2. Send welcome email
    // 3. Add to CRM/lead system
    // 4. Trigger onboarding workflow

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      message: 'Thank you for joining! We\'ll send you access details within 24-48 hours.',
      memberId: memberData.id
    });

  } catch (error) {
    console.error('Community signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
