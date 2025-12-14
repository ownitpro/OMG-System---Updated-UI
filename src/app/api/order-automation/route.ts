import { NextRequest, NextResponse } from 'next/server';

interface Automation {
  id: string;
  title: string;
  description: string;
  painPoint: string;
  solution: string;
  price: number;
  setupTime: string;
  category: string;
  icon: string;
  features: string[];
  benefits: string[];
  industries: string[];
}

interface AutomationOrderRequest {
  name: string;
  email: string;
  company: string;
  phone?: string;
  industry: string;
  requirements?: string;
  automation: Automation;
}

export async function POST(request: NextRequest) {
  try {
    const body: AutomationOrderRequest = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'company', 'industry', 'automation'];
    const missingFields = requiredFields.filter(field => !body[field as keyof AutomationOrderRequest]);
    
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
    
    // Validate automation data
    if (!body.automation.id || !body.automation.title || !body.automation.price) {
      return NextResponse.json(
        { error: 'Invalid automation data' },
        { status: 400 }
      );
    }
    
    // Create automation order record
    const automationOrder = {
      id: `automation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'smart_automation_order',
      customerInfo: {
        name: body.name,
        email: body.email,
        company: body.company,
        phone: body.phone || null,
        industry: body.industry,
        requirements: body.requirements || null,
      },
      automation: {
        id: body.automation.id,
        title: body.automation.title,
        description: body.automation.description,
        category: body.automation.category,
        price: body.automation.price,
        setupTime: body.automation.setupTime,
        features: body.automation.features,
        benefits: body.automation.benefits,
        industries: body.automation.industries,
      },
      status: 'pending',
      priority: 'medium',
      createdAt: new Date().toISOString(),
      source: 'smart_automations_page',
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      estimatedCompletionTime: getEstimatedCompletionTime(body.automation.setupTime),
      paymentStatus: 'pending'
    };
    
    // Log the automation order
    console.log('🤖 New Smart Automation Order:', {
      id: automationOrder.id,
      customer: automationOrder.customerInfo.name,
      company: automationOrder.customerInfo.company,
      email: automationOrder.customerInfo.email,
      industry: automationOrder.customerInfo.industry,
      automation: {
        title: automationOrder.automation.title,
        category: automationOrder.automation.category,
        price: automationOrder.automation.price,
        setupTime: automationOrder.automation.setupTime,
      },
      timestamp: automationOrder.createdAt
    });
    
    // In a real application, you would:
    // 1. Save to database (Prisma, MongoDB, etc.)
    // 2. Send notification email to automation team
    // 3. Create project in project management system
    // 4. Send confirmation email to customer
    // 5. Create payment intent (Stripe, PayPal, etc.)
    // 6. Schedule kickoff call
    // 7. Set up automation deployment pipeline
    
    // Simulate sending notification email
    console.log('📧 Sending notification email to automation team...');
    console.log('📧 Sending confirmation email to customer...');
    
    // Simulate project creation
    console.log('📋 Creating automation project in project management system...');
    
    // Simulate payment processing setup
    console.log('💳 Setting up payment processing...');
    
    // Simulate scheduling
    console.log('📅 Scheduling automation kickoff call...');
    
    // Simulate deployment pipeline setup
    console.log('🚀 Setting up automation deployment pipeline...');
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Automation order submitted successfully',
      orderId: automationOrder.id,
      estimatedCompletionTime: automationOrder.estimatedCompletionTime,
      nextSteps: [
        'Our automation team will review your order within 24 hours',
        'We\'ll contact you to schedule your kickoff call',
        'Payment processing will be set up for your order',
        'Your automation will be configured and tested',
        'We\'ll provide training and documentation'
      ],
      automationSummary: {
        title: body.automation.title,
        category: body.automation.category,
        price: body.automation.price,
        setupTime: body.automation.setupTime,
        features: body.automation.features,
        benefits: body.automation.benefits
      }
    });
    
  } catch (error) {
    console.error('Error processing automation order:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'There was an error processing your automation order. Please try again later.'
      },
      { status: 500 }
    );
  }
}

// Helper function to get estimated completion time
function getEstimatedCompletionTime(setupTime: string): string {
  const now = new Date();
  let daysToAdd = 0;
  
  // Parse setup time (e.g., "1-2 weeks", "2-3 weeks")
  if (setupTime.includes('1-2')) {
    daysToAdd = 10; // 1.5 weeks
  } else if (setupTime.includes('2-3')) {
    daysToAdd = 17; // 2.5 weeks
  } else if (setupTime.includes('3-4')) {
    daysToAdd = 24; // 3.5 weeks
  } else {
    daysToAdd = 14; // Default 2 weeks
  }
  
  const completionDate = new Date(now.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
  return completionDate.toISOString();
}

// Handle GET requests (health check)
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'automation-order-api',
    timestamp: new Date().toISOString()
  });
}
