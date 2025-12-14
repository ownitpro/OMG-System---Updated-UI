import { NextRequest, NextResponse } from 'next/server';

interface AnalyticsReportRequest {
  name: string;
  email: string;
  industry: string;
  metrics: string[];
  comments?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: AnalyticsReportRequest = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'industry', 'metrics'];
    const missingFields = requiredFields.filter(field => !body[field as keyof AnalyticsReportRequest]);
    
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
    
    // Validate metrics array
    if (!Array.isArray(body.metrics) || body.metrics.length === 0) {
      return NextResponse.json(
        { error: 'At least one metric must be selected' },
        { status: 400 }
      );
    }
    
    // Create analytics request record
    const analyticsRequest = {
      id: `analytics_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'analytics_report_request',
      name: body.name,
      email: body.email,
      industry: body.industry,
      metrics: body.metrics,
      comments: body.comments || null,
      status: 'pending',
      priority: 'medium',
      createdAt: new Date().toISOString(),
      source: 'analytics_demo_page',
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      estimatedCompletionTime: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString() // 48 hours from now
    };
    
    // Log the analytics request
    console.log('📊 New Analytics Report Request:', {
      id: analyticsRequest.id,
      name: analyticsRequest.name,
      email: analyticsRequest.email,
      industry: analyticsRequest.industry,
      metrics: analyticsRequest.metrics,
      comments: analyticsRequest.comments,
      timestamp: analyticsRequest.createdAt,
      estimatedCompletion: analyticsRequest.estimatedCompletionTime
    });
    
    // In a real application, you would:
    // 1. Save to database (Prisma, MongoDB, etc.)
    // 2. Send notification email to analytics team
    // 3. Create task in project management system
    // 4. Send confirmation email to user with timeline
    // 5. Schedule automated report generation
    
    // Simulate sending notification email
    console.log('📧 Sending notification email to analytics team...');
    console.log('📧 Sending confirmation email to user...');
    
    // Simulate task creation
    console.log('📋 Creating analytics task in project management system...');
    
    // Simulate report generation scheduling
    console.log('⏰ Scheduling automated report generation...');
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Analytics report request submitted successfully',
      requestId: analyticsRequest.id,
      estimatedCompletionTime: analyticsRequest.estimatedCompletionTime,
      nextSteps: [
        'Our analytics team will review your request within 24 hours',
        'Your custom report will be prepared within 48 hours',
        'You\'ll receive an email with your personalized analytics report',
        'A follow-up call will be scheduled to discuss the findings'
      ],
      includedMetrics: body.metrics,
      industryBenchmarks: getIndustryBenchmarks(body.industry)
    });
    
  } catch (error) {
    console.error('Error processing analytics report request:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'There was an error processing your request. Please try again later.'
      },
      { status: 500 }
    );
  }
}

// Helper function to get industry-specific benchmarks
function getIndustryBenchmarks(industry: string) {
  const benchmarks: Record<string, any> = {
    'Property Management': {
      avgResponseTime: '2.3 days',
      ownerSatisfaction: '94%',
      revenueGrowth: '+23%',
      keyMetrics: ['Response Time', 'Owner Satisfaction', 'Revenue Growth', 'Occupancy Rate']
    },
    'Real Estate': {
      leadConversion: '34%',
      avgDealSize: '+28%',
      marketShare: '12%',
      keyMetrics: ['Lead Conversion', 'Deal Size', 'Market Share', 'Client Retention']
    },
    'Contractors': {
      projectCompletion: '98%',
      profitMargin: '+15%',
      leadConversion: '67%',
      keyMetrics: ['Project Completion', 'Profit Margin', 'Lead Conversion', 'Customer Satisfaction']
    },
    'Accounting': {
      clientRetention: '96%',
      processingTime: '-45%',
      accuracy: '99.8%',
      keyMetrics: ['Client Retention', 'Processing Time', 'Accuracy', 'Revenue per Client']
    },
    'Cleaning Services': {
      customerSatisfaction: '97%',
      efficiency: '+32%',
      retention: '89%',
      keyMetrics: ['Customer Satisfaction', 'Efficiency', 'Retention', 'Service Quality']
    },
    'Healthcare': {
      patientSatisfaction: '95%',
      waitTime: '-38%',
      compliance: '100%',
      keyMetrics: ['Patient Satisfaction', 'Wait Time', 'Compliance', 'Outcome Quality']
    }
  };
  
  return benchmarks[industry] || {
    avgPerformance: 'Industry Average',
    keyMetrics: ['Performance Metrics', 'Efficiency', 'Customer Satisfaction', 'Growth']
  };
}

// Handle GET requests (health check)
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'analytics-report-api',
    timestamp: new Date().toISOString()
  });
}
