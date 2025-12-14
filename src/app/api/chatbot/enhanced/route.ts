import { NextRequest, NextResponse } from 'next/server';
import { 
  searchEnhancedKnowledge, 
  getConversationContext, 
  updateConversationContext,
  clearConversationContext,
  cleanupExpiredContexts
} from '@/lib/chatbot/enhancedIngestKnowledge';
import { 
  containsDisallowedContent, 
  shouldEscalateToHuman, 
  getDisallowedResponse,
  rateLimiter,
  validateInput,
  calculateConfidenceScore,
  logChatbotInteraction
} from '@/lib/chatbot/guardrails';
import { v4 as uuidv4 } from 'uuid';

// Enhanced types for multi-turn conversations
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

interface EnhancedChatRequest {
  message: string;
  history?: ChatMessage[];
  sessionId?: string;
  userId?: string;
  context?: {
    industry?: string;
    topic?: string;
    clarifying?: boolean;
  };
}

interface EnhancedChatResponse {
  answer: string;
  sources?: Array<{
    title: string;
    url: string;
    type: string;
    priority: string;
  }>;
  confidence?: number;
  fallback?: boolean;
  shouldEscalate?: boolean;
  escalationType?: string;
  responseTime?: number;
  interactionId?: string;
  clarifying?: boolean;
  suggestedQuestions?: string[];
  context?: {
    industry?: string;
    topic?: string;
    conversationLength: number;
  };
}

// Get client IP for rate limiting
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0] || realIP || 'unknown';
}

// Generate clarifying questions for ambiguous queries
function generateClarifyingQuestions(query: string, context: any): string[] {
  const lowerQuery = query.toLowerCase();
  const questions: string[] = [];
  
  // Industry-specific clarifying questions
  if (lowerQuery.includes('automation') || lowerQuery.includes('solution')) {
    questions.push(
      "Which industry are you interested in? (Property Management, Real Estate, Contractors, Accounting, Cleaning, or Healthcare)",
      "Are you looking for specific automation workflows or general solutions?",
      "What's your main pain point that you'd like to automate?"
    );
  }
  
  if (lowerQuery.includes('app') || lowerQuery.includes('software')) {
    questions.push(
      "Which application are you interested in? (CRM, SecureVault Docs, LeadFlow Engine, or IndustryIQ)",
      "Are you looking for features, pricing, or implementation details?",
      "What's your primary use case for this application?"
    );
  }
  
  if (lowerQuery.includes('pricing') || lowerQuery.includes('cost')) {
    questions.push(
      "Which solution are you interested in pricing for?",
      "Are you looking for a specific industry solution?",
      "Would you like me to connect you with our sales team for a custom quote?"
    );
  }
  
  // Generic clarifying questions
  if (questions.length === 0) {
    questions.push(
      "Could you provide more details about what you're looking for?",
      "Which specific aspect would you like to know more about?",
      "Are you interested in a particular industry or solution?"
    );
  }
  
  return questions.slice(0, 3); // Return top 3 questions
}

// Generate suggested follow-up questions based on context
function generateSuggestedQuestions(context: any, sources: any[]): string[] {
  const suggestions: string[] = [];
  
  // Industry-based suggestions
  if (context.industryContext) {
    const industry = context.industryContext;
    suggestions.push(
      `What automations do you offer for ${industry}?`,
      `How can ${industry} businesses benefit from your solutions?`,
      `What's the ROI for ${industry} automation?`
    );
  }
  
  // Topic-based suggestions
  if (context.topicContext) {
    const topic = context.topicContext;
    suggestions.push(
      `Tell me more about ${topic} features`,
      `How does ${topic} integration work?`,
      `What are the benefits of ${topic}?`
    );
  }
  
  // Source-based suggestions
  if (sources.length > 0) {
    const sourceTypes = [...new Set(sources.map(s => s.type))];
    sourceTypes.forEach(type => {
      if (type === 'automation') {
        suggestions.push("What other automations do you offer?");
      } else if (type === 'app') {
        suggestions.push("What other applications do you have?");
      } else if (type === 'industry') {
        suggestions.push("What other industries do you serve?");
      }
    });
  }
  
  // Default suggestions
  if (suggestions.length === 0) {
    suggestions.push(
      "What industries do you serve?",
      "What automations do you offer?",
      "How can I get started?",
      "What's your pricing?",
      "Can I see a demo?"
    );
  }
  
  return suggestions.slice(0, 4); // Return top 4 suggestions
}

// Enhanced response generation with context awareness
async function generateEnhancedResponse(
  query: string, 
  relevantChunks: any[], 
  context: any,
  isClarifying: boolean = false
): Promise<string> {
  if (relevantChunks.length === 0) {
    if (isClarifying) {
      return "I'm still not sure I understand what you're looking for. Could you provide more specific details about your needs?";
    }
    return "I don't have specific information about that topic. Could you rephrase your question or provide more context?";
  }

  // Build context-aware response
  let response = "Based on our available information:\n\n";
  
  // Prioritize snippets for quick answers
  const snippets = relevantChunks.filter(chunk => chunk.metadata.isSnippet);
  const regularChunks = relevantChunks.filter(chunk => !chunk.metadata.isSnippet);
  
  if (snippets.length > 0) {
    response += snippets[0].text + "\n\n";
  } else if (regularChunks.length > 0) {
    response += regularChunks[0].text + "\n\n";
  }
  
  // Add additional information
  const additionalChunks = [...snippets.slice(1), ...regularChunks.slice(1)];
  if (additionalChunks.length > 0) {
    response += "Additional information:\n";
    additionalChunks.slice(0, 3).forEach(chunk => {
      response += `• ${chunk.text}\n`;
    });
  }
  
  // Add context-aware follow-up
  if (context.industryContext) {
    response += `\nSince you're interested in ${context.industryContext}, I can provide more specific information about our solutions for that industry.`;
  }
  
  if (context.topicContext) {
    response += `\nI can also share more details about ${context.topicContext} features and benefits.`;
  }
  
  response += "\n\nWould you like to know more about any specific aspect, or would you prefer to speak with our team directly?";
  
  return response;
}

// Extract enhanced sources
function extractEnhancedSources(chunks: any[]): EnhancedChatResponse['sources'] {
  return chunks.map(chunk => ({
    title: chunk.metadata.title,
    url: chunk.metadata.url,
    type: chunk.metadata.type,
    priority: chunk.metadata.priority
  }));
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();
  const interactionId = uuidv4();
  
  try {
    const body: EnhancedChatRequest = await request.json();
    const { message, history = [], sessionId, userId, context: requestContext } = body;
    const clientIP = getClientIP(request);
    const userIdentifier = userId || sessionId || clientIP;

    // Clean up expired contexts
    cleanupExpiredContexts();

    // Input validation
    const validation = validateInput(message);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Rate limiting
    if (!rateLimiter.isAllowed(clientIP)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Get or create conversation context
    let conversationContext = getConversationContext(sessionId || userIdentifier);
    if (!conversationContext) {
      conversationContext = {
        sessionId: sessionId || userIdentifier,
        messages: [],
        lastActivity: new Date()
      };
    }

    // Update conversation context with new message
    updateConversationContext(sessionId || userIdentifier, {
      role: 'user',
      content: message
    });

    // Security check - block disallowed topics
    const disallowedResponse = getDisallowedResponse(message);
    if (disallowedResponse.response) {
      const responseTime = Date.now() - startTime;
      const response: EnhancedChatResponse = {
        answer: disallowedResponse.response,
        fallback: true,
        confidence: 0,
        shouldEscalate: disallowedResponse.shouldEscalate,
        escalationType: disallowedResponse.escalationType,
        responseTime,
        interactionId,
        clarifying: false,
        context: {
          industry: conversationContext.industryContext,
          topic: conversationContext.topicContext,
          conversationLength: conversationContext.messages.length
        }
      };
      
      logChatbotInteraction(
        message, 
        disallowedResponse.response, 
        0, 
        [], 
        userIdentifier, 
        true, 
        disallowedResponse.escalationType,
        responseTime,
        interactionId
      );
      return NextResponse.json(response);
    }

    // Enhanced knowledge search with context
    const relevantChunks = await searchEnhancedKnowledge(
      message, 
      5,
      conversationContext,
      requestContext?.industry,
      requestContext?.topic
    );
    
    // Determine if we need clarifying questions
    const isLowConfidence = relevantChunks.length === 0 || 
      relevantChunks.every(chunk => chunk.metadata.priority === 'low');
    const isAmbiguous = message.length < 20 || 
      message.toLowerCase().includes('that') || 
      message.toLowerCase().includes('this') ||
      message.toLowerCase().includes('it');
    
    const needsClarification = isLowConfidence || isAmbiguous;
    
    // Generate response
    const answer = await generateEnhancedResponse(
      message, 
      relevantChunks, 
      conversationContext,
      needsClarification
    );
    
    const sources = extractEnhancedSources(relevantChunks);
    const confidence = calculateConfidenceScore(relevantChunks, message, answer);

    // Determine escalation
    const shouldEscalate = confidence < 0.5 || relevantChunks.length === 0 || shouldEscalateToHuman(message);

    // Generate clarifying questions if needed
    const clarifyingQuestions = needsClarification ? 
      generateClarifyingQuestions(message, conversationContext) : undefined;

    // Generate suggested follow-up questions
    const suggestedQuestions = generateSuggestedQuestions(conversationContext, sources);

    const responseTime = Date.now() - startTime;
    const response: EnhancedChatResponse = {
      answer,
      sources,
      confidence,
      fallback: shouldEscalate,
      shouldEscalate,
      escalationType: shouldEscalate ? 'low_confidence' : undefined,
      responseTime,
      interactionId,
      clarifying: needsClarification,
      suggestedQuestions,
      context: {
        industry: conversationContext.industryContext,
        topic: conversationContext.topicContext,
        conversationLength: conversationContext.messages.length
      }
    };

    // Update conversation context with assistant response
    updateConversationContext(sessionId || userIdentifier, {
      role: 'assistant',
      content: answer
    });

    // Log the interaction
    logChatbotInteraction(
      message, 
      answer, 
      confidence, 
      sources, 
      userIdentifier, 
      shouldEscalate, 
      response.escalationType,
      responseTime,
      interactionId
    );

    return NextResponse.json(response);

  } catch (error) {
    const responseTime = Date.now() - startTime;
    console.error('Enhanced Chatbot API error:', error);
    
    return NextResponse.json({
      answer: "I'm experiencing some technical difficulties. Please try again in a moment, or contact our support team for immediate assistance.",
      fallback: true,
      confidence: 0,
      shouldEscalate: true,
      escalationType: 'error',
      responseTime,
      interactionId
    } as EnhancedChatResponse, { status: 500 });
  }
}

// Handle GET requests (health check)
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    status: 'healthy',
    service: 'enhanced-chatbot-api',
    timestamp: new Date().toISOString(),
    features: [
      'multi-turn-conversations',
      'context-awareness',
      'clarifying-questions',
      'enhanced-search',
      'priority-ranking'
    ]
  });
}
