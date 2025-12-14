import { NextRequest, NextResponse } from 'next/server';
import { searchKnowledge } from '@/lib/chatbot/ingestKnowledge';
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

// Types for the chatbot API
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

interface ChatRequest {
  message: string;
  history?: ChatMessage[];
  sessionId?: string;
  userId?: string;
}

interface ChatResponse {
  answer: string;
  sources?: Array<{
    title: string;
    url: string;
    type: string;
  }>;
  confidence?: number;
  fallback?: boolean;
  shouldEscalate?: boolean;
  escalationType?: string;
  responseTime?: number;
  interactionId?: string;
}

// Get client IP for rate limiting
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0] || realIP || 'unknown';
}

// Generate a response using retrieved knowledge
async function generateResponse(query: string, relevantChunks: any[]): Promise<string> {
  if (relevantChunks.length === 0) {
    return "I'm sorry, I don't have specific information about that topic. Could you please rephrase your question or contact our support team for assistance?";
  }

  // Build context from relevant chunks
  const context = relevantChunks.map(chunk => 
    `Title: ${chunk.metadata.title}\nContent: ${chunk.content}`
  ).join('\n\n');

  // Simple response generation (in production, use OpenAI or similar)
  const response = `Based on our available information:

${relevantChunks[0].content}

${relevantChunks.length > 1 ? `\nAdditional information:\n${relevantChunks.slice(1).map(chunk => `• ${chunk.content}`).join('\n')}` : ''}

Would you like to know more about any specific aspect, or would you prefer to speak with our team directly?`;

  return response;
}

// Extract sources from chunks
function extractSources(chunks: any[]): Array<{ title: string; url: string; type: string }> {
  return chunks.map(chunk => ({
    title: chunk.metadata.title,
    url: chunk.metadata.url,
    type: chunk.metadata.type
  }));
}

// Calculate confidence based on chunk relevance
function calculateConfidence(chunks: any[], query: string, response: string): number {
  return calculateConfidenceScore(chunks, query, response);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();
  const interactionId = uuidv4();
  
  try {
    const body: ChatRequest = await request.json();
    const { message, history = [], sessionId, userId } = body;
    const clientIP = getClientIP(request);
    const userIdentifier = userId || sessionId || clientIP;

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

    // Security check - block disallowed topics
    const disallowedResponse = getDisallowedResponse(message);
    if (disallowedResponse.response) {
      const responseTime = Date.now() - startTime;
      const response: ChatResponse = {
        answer: disallowedResponse.response,
        fallback: true,
        confidence: 0,
        shouldEscalate: disallowedResponse.shouldEscalate,
        escalationType: disallowedResponse.escalationType,
        responseTime,
        interactionId
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

    // Search for relevant knowledge
    const relevantChunks = await searchKnowledge(message, 5);
    
    // Generate response
    const answer = await generateResponse(message, relevantChunks);
    const sources = extractSources(relevantChunks);
    const confidence = calculateConfidence(relevantChunks, message, answer);

    // Determine if we should suggest escalation
    const shouldEscalate = confidence < 0.6 || relevantChunks.length === 0 || shouldEscalateToHuman(message);

    const finalAnswer = shouldEscalate 
      ? `${answer}\n\nIf you need more specific assistance, I'd be happy to connect you with our team. Would you like to book a demo or speak with a specialist?`
      : answer;

    const responseTime = Date.now() - startTime;
    const response: ChatResponse = {
      answer: finalAnswer,
      sources,
      confidence,
      fallback: shouldEscalate,
      shouldEscalate: shouldEscalate,
      escalationType: shouldEscalate ? 'low_confidence' : undefined,
      responseTime,
      interactionId
    };

    // Log the interaction with enhanced analytics
    logChatbotInteraction(
      message, 
      finalAnswer, 
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
    console.error('Chatbot API error:', error);
    
    return NextResponse.json({
      answer: "I'm experiencing some technical difficulties. Please try again in a moment, or contact our support team for immediate assistance.",
      fallback: true,
      confidence: 0,
      shouldEscalate: true,
      escalationType: 'error',
      responseTime,
      interactionId
    } as ChatResponse, { status: 500 });
  }
}

// Handle GET requests (health check)
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    status: 'healthy',
    service: 'chatbot-api',
    timestamp: new Date().toISOString()
  });
}
