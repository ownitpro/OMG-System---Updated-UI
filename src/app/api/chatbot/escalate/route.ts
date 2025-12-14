import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

interface EscalationRequest {
  sessionId: string;
  userId?: string;
  conversationHistory: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }>;
  escalationType: string;
  userInfo?: {
    name?: string;
    email?: string;
    company?: string;
    phone?: string;
  };
  context?: {
    industry?: string;
    topic?: string;
    lastQuery?: string;
  };
}

interface EscalationResponse {
  success: boolean;
  ticketId?: string;
  message: string;
  nextSteps?: string[];
}

// Mock email service (replace with real email service)
async function sendEscalationEmail(escalationData: EscalationRequest): Promise<string> {
  // In production, this would send to your support team
  console.log('📧 Escalation Email:', {
    to: 'support@omgsystems.com',
    subject: `Chatbot Escalation - ${escalationData.escalationType}`,
    body: `
New chatbot escalation received:

Escalation Type: ${escalationData.escalationType}
Session ID: ${escalationData.sessionId}
User ID: ${escalationData.userId || 'Anonymous'}

User Information:
${escalationData.userInfo ? `
Name: ${escalationData.userInfo.name || 'Not provided'}
Email: ${escalationData.userInfo.email || 'Not provided'}
Company: ${escalationData.userInfo.company || 'Not provided'}
Phone: ${escalationData.userInfo.phone || 'Not provided'}
` : 'Not provided'}

Context:
Industry: ${escalationData.context?.industry || 'Not specified'}
Topic: ${escalationData.context?.topic || 'Not specified'}
Last Query: ${escalationData.context?.lastQuery || 'Not available'}

Conversation History:
${escalationData.conversationHistory.map(msg => 
  `${msg.role.toUpperCase()}: ${msg.content} (${msg.timestamp})`
).join('\n')}

Please follow up with this user promptly.
    `
  });
  
  return 'escalation-email-sent';
}

// Mock ticket creation (replace with real ticketing system)
async function createSupportTicket(escalationData: EscalationRequest): Promise<string> {
  const ticketId = `TICKET-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  // In production, this would create a ticket in your support system
  console.log('🎫 Support Ticket Created:', {
    ticketId,
    type: escalationData.escalationType,
    priority: escalationData.escalationType === 'concern' ? 'high' : 'medium',
    status: 'open',
    assignedTo: 'support-team',
    createdAt: new Date().toISOString()
  });
  
  return ticketId;
}

// Get escalation response based on type
function getEscalationResponse(escalationType: string): { message: string; nextSteps: string[] } {
  switch (escalationType) {
    case 'pricing':
      return {
        message: "I've connected you with our sales team who can provide detailed pricing information and custom quotes.",
        nextSteps: [
          "Our sales team will contact you within 2 hours",
          "You'll receive a personalized quote based on your needs",
          "We can schedule a demo to show you the solutions in action"
        ]
      };
    
    case 'internal':
    case 'admin':
      return {
        message: "I've escalated your request to our support team who can help with account-specific information.",
        nextSteps: [
          "Our support team will contact you within 1 hour",
          "Please have your account information ready",
          "We'll verify your identity before providing sensitive information"
        ]
      };
    
    case 'concern':
      return {
        message: "I've prioritized your concern and connected you with our support team for immediate assistance.",
        nextSteps: [
          "Our support team will contact you within 30 minutes",
          "We take all concerns seriously and will resolve this quickly",
          "You'll receive a direct phone call from our support manager"
        ]
      };
    
    case 'low_confidence':
      return {
        message: "I've connected you with our team who can provide more detailed assistance with your specific needs.",
        nextSteps: [
          "Our team will contact you within 1 hour",
          "We'll provide personalized guidance based on your requirements",
          "We can schedule a consultation to better understand your needs"
        ]
      };
    
    default:
      return {
        message: "I've connected you with our team for personalized assistance.",
        nextSteps: [
          "Our team will contact you within 2 hours",
          "We'll provide detailed information about our solutions",
          "We can schedule a demo or consultation as needed"
        ]
      };
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: EscalationRequest = await request.json();
    const { sessionId, userId, conversationHistory, escalationType, userInfo, context } = body;

    // Validate required fields
    if (!sessionId || !escalationType || !conversationHistory) {
      return NextResponse.json(
        { error: 'Missing required fields: sessionId, escalationType, conversationHistory' },
        { status: 400 }
      );
    }

    // Create support ticket
    const ticketId = await createSupportTicket(body);

    // Send escalation email
    await sendEscalationEmail(body);

    // Get appropriate response
    const { message, nextSteps } = getEscalationResponse(escalationType);

    // Log escalation
    console.log('🚨 Chatbot Escalation:', {
      ticketId,
      sessionId,
      userId,
      escalationType,
      timestamp: new Date().toISOString(),
      conversationLength: conversationHistory.length,
      hasUserInfo: !!userInfo
    });

    // In production, you might also:
    // - Add to CRM system
    // - Send Slack notification
    // - Create calendar event for follow-up
    // - Update user profile with escalation history

    const response: EscalationResponse = {
      success: true,
      ticketId,
      message,
      nextSteps
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Escalation API error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        message: "I apologize, but there was an issue processing your request. Please try contacting us directly.",
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}

// Handle GET requests (health check)
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    status: 'healthy',
    service: 'chatbot-escalation-api',
    timestamp: new Date().toISOString(),
    features: [
      'support-ticket-creation',
      'email-notifications',
      'conversation-context-preservation',
      'user-info-collection'
    ]
  });
}
