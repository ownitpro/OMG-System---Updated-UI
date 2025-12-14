import { NextRequest, NextResponse } from 'next/server';

interface WorkflowNode {
  id: string;
  type: string;
  label: string;
  description: string;
  price: number;
  position: { x: number; y: number };
}

interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
}

interface WorkflowData {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  totalPrice: number;
  complexity: string;
  nodeCount: number;
  edgeCount: number;
}

interface WorkflowSubmissionRequest {
  name: string;
  email: string;
  company: string;
  phone?: string;
  industry: string;
  requirements?: string;
  workflow: WorkflowData;
}

export async function POST(request: NextRequest) {
  try {
    const body: WorkflowSubmissionRequest = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'company', 'industry', 'workflow'];
    const missingFields = requiredFields.filter(field => !body[field as keyof WorkflowSubmissionRequest]);
    
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
    
    // Validate workflow data
    if (!body.workflow.nodes || body.workflow.nodes.length === 0) {
      return NextResponse.json(
        { error: 'Workflow must contain at least one node' },
        { status: 400 }
      );
    }
    
    // Create workflow order record
    const workflowOrder = {
      id: `workflow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'workflow_builder_order',
      customerInfo: {
        name: body.name,
        email: body.email,
        company: body.company,
        phone: body.phone || null,
        industry: body.industry,
        requirements: body.requirements || null,
      },
      workflow: {
        nodes: body.workflow.nodes,
        edges: body.workflow.edges,
        totalPrice: body.workflow.totalPrice,
        complexity: body.workflow.complexity,
        nodeCount: body.workflow.nodeCount,
        edgeCount: body.workflow.edgeCount,
      },
      status: 'pending',
      priority: body.workflow.complexity === 'Complex' ? 'high' : 'medium',
      createdAt: new Date().toISOString(),
      source: 'workflow_builder_page',
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      estimatedCompletionTime: getEstimatedCompletionTime(body.workflow.complexity),
      paymentStatus: 'pending'
    };
    
    // Log the workflow order
    console.log('🔧 New Workflow Builder Order:', {
      id: workflowOrder.id,
      customer: workflowOrder.customerInfo.name,
      company: workflowOrder.customerInfo.company,
      email: workflowOrder.customerInfo.email,
      industry: workflowOrder.customerInfo.industry,
      workflow: {
        complexity: workflowOrder.workflow.complexity,
        nodeCount: workflowOrder.workflow.nodeCount,
        totalPrice: workflowOrder.workflow.totalPrice,
      },
      timestamp: workflowOrder.createdAt
    });
    
    // In a real application, you would:
    // 1. Save to database (Prisma, MongoDB, etc.)
    // 2. Send notification email to development team
    // 3. Create project in project management system
    // 4. Send confirmation email to customer
    // 5. Create payment intent (Stripe, PayPal, etc.)
    // 6. Schedule kickoff call
    
    // Simulate sending notification email
    console.log('📧 Sending notification email to development team...');
    console.log('📧 Sending confirmation email to customer...');
    
    // Simulate project creation
    console.log('📋 Creating project in project management system...');
    
    // Simulate payment processing setup
    console.log('💳 Setting up payment processing...');
    
    // Simulate scheduling
    console.log('📅 Scheduling kickoff call...');
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Workflow order submitted successfully',
      orderId: workflowOrder.id,
      estimatedCompletionTime: workflowOrder.estimatedCompletionTime,
      nextSteps: [
        'Our development team will review your workflow within 24 hours',
        'We\'ll contact you to schedule your kickoff call',
        'Payment processing will be set up for your order',
        'Your custom workflow will be built and tested',
        'We\'ll provide training and documentation'
      ],
      workflowSummary: {
        complexity: body.workflow.complexity,
        nodeCount: body.workflow.nodeCount,
        totalPrice: body.workflow.totalPrice,
        estimatedSetupTime: getEstimatedSetupTime(body.workflow.complexity)
      }
    });
    
  } catch (error) {
    console.error('Error processing workflow submission:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'There was an error processing your workflow order. Please try again later.'
      },
      { status: 500 }
    );
  }
}

// Helper function to get estimated completion time
function getEstimatedCompletionTime(complexity: string): string {
  const now = new Date();
  let daysToAdd = 0;
  
  switch (complexity) {
    case 'Simple':
      daysToAdd = 7; // 1 week
      break;
    case 'Medium':
      daysToAdd = 14; // 2 weeks
      break;
    case 'Complex':
      daysToAdd = 21; // 3 weeks
      break;
    default:
      daysToAdd = 14; // 2 weeks
  }
  
  const completionDate = new Date(now.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
  return completionDate.toISOString();
}

// Helper function to get estimated setup time
function getEstimatedSetupTime(complexity: string): string {
  switch (complexity) {
    case 'Simple':
      return '1-2 weeks';
    case 'Medium':
      return '2-3 weeks';
    case 'Complex':
      return '3-4 weeks';
    default:
      return '2-3 weeks';
  }
}

// Handle GET requests (health check)
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'workflow-submission-api',
    timestamp: new Date().toISOString()
  });
}
