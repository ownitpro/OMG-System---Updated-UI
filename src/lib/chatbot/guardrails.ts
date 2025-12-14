/**
 * Security Guardrails for Chatbot
 * 
 * This module implements security measures to ensure the chatbot
 * only provides appropriate responses and doesn't expose sensitive information.
 */

// Disallowed topics and keywords
export const DISALLOWED_TOPICS = [
  // Internal/Admin topics
  'internal pricing',
  'back office',
  'admin panel',
  'admin dashboard',
  'internal systems',
  'employee data',
  'staff information',
  'confidential',
  'proprietary',
  
  // Client-specific information
  'client-specific',
  'project details',
  'account status',
  'billing information',
  'payment details',
  'invoice details',
  'subscription details',
  
  // Technical/internal details
  'database schema',
  'api keys',
  'secrets',
  'credentials',
  'internal architecture',
  'server configuration',
  'deployment details',
  
  // Sensitive business information
  'revenue numbers',
  'profit margins',
  'financial details',
  'business strategy',
  'internal processes',
  'company secrets'
];

// Disallowed patterns (regex)
export const DISALLOWED_PATTERNS = [
  /password|passwd|pwd/i,
  /token|key|secret/i,
  /admin|administrator/i,
  /internal|private|confidential/i,
  /billing|payment|invoice|subscription/i,
  /client.*specific|account.*status/i,
  /database|schema|table|query/i,
  /server|host|ip|port/i,
  /deploy|deployment|ci\/cd/i
];

// Escalation triggers - when to route to human support
export const ESCALATION_TRIGGERS = [
  'complaint',
  'refund',
  'cancel',
  'terminate',
  'legal',
  'lawsuit',
  'dispute',
  'problem',
  'issue',
  'bug',
  'error',
  'broken',
  'not working',
  'urgent',
  'emergency'
];

// Content filtering functions
export function containsDisallowedContent(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  
  // Check against disallowed topics
  const hasDisallowedTopic = DISALLOWED_TOPICS.some(topic => 
    lowerMessage.includes(topic.toLowerCase())
  );
  
  if (hasDisallowedTopic) return true;
  
  // Check against disallowed patterns
  const hasDisallowedPattern = DISALLOWED_PATTERNS.some(pattern => 
    pattern.test(message)
  );
  
  return hasDisallowedPattern;
}

export function shouldEscalateToHuman(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  
  return ESCALATION_TRIGGERS.some(trigger => 
    lowerMessage.includes(trigger.toLowerCase())
  );
}

// Specific escalation response templates
const ESCALATION_RESPONSES = {
  pricing: "I'm sorry, I don't have access to specific pricing information. But I'd be happy to connect you with our sales team who can provide a custom quote based on your needs. Would you like me to send you their contact info or a link to schedule a demo?",
  internal: "I'm sorry, I don't have access to that internal information. But I can connect you with our support team who can help with account-specific details. Would you like me to provide contact information?",
  admin: "I'm sorry, I don't have access to administrative information. For account management or admin-related questions, please contact our support team. Would you like me to connect you with them?",
  general: "I'm sorry, I don't have access to that information. But I'd be happy to connect you with our sales or support team for help. Would you like me to send you a link or contact form?",
  concern: "I understand you may have a concern or issue. Let me connect you with our support team who can provide personalized assistance. Would you like me to help you contact them?"
};

export function getDisallowedResponse(message: string): { response: string; shouldEscalate: boolean; escalationType?: string } {
  const lowerMessage = message.toLowerCase();
  
  // Check for specific escalation types
  if (lowerMessage.includes('pricing') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
    return {
      response: ESCALATION_RESPONSES.pricing,
      shouldEscalate: true,
      escalationType: 'pricing'
    };
  }
  
  if (lowerMessage.includes('internal') || lowerMessage.includes('back office') || lowerMessage.includes('confidential')) {
    return {
      response: ESCALATION_RESPONSES.internal,
      shouldEscalate: true,
      escalationType: 'internal'
    };
  }
  
  if (lowerMessage.includes('admin') || lowerMessage.includes('administrator') || lowerMessage.includes('account status')) {
    return {
      response: ESCALATION_RESPONSES.admin,
      shouldEscalate: true,
      escalationType: 'admin'
    };
  }
  
  if (containsDisallowedContent(message)) {
    return {
      response: ESCALATION_RESPONSES.general,
      shouldEscalate: true,
      escalationType: 'general'
    };
  }
  
  if (shouldEscalateToHuman(message)) {
    return {
      response: ESCALATION_RESPONSES.concern,
      shouldEscalate: true,
      escalationType: 'concern'
    };
  }
  
  return { response: "", shouldEscalate: false };
}

// Content sanitization
export function sanitizeContent(content: string): string {
  // Remove any potential sensitive information
  return content
    .replace(/\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, '[CARD-NUMBER]') // Credit card numbers
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[SSN]') // SSN
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL]') // Email addresses
    .replace(/\b\d{3}-\d{3}-\d{4}\b/g, '[PHONE]') // Phone numbers
    .replace(/\b(?:password|passwd|pwd)\s*[:=]\s*\S+/gi, 'password=[REDACTED]') // Passwords
    .replace(/\b(?:token|key|secret)\s*[:=]\s*\S+/gi, 'token=[REDACTED]'); // API keys/tokens
}

// Rate limiting (simple in-memory implementation)
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number = 10, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    // Add current request
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    
    return true;
  }
}

export const rateLimiter = new RateLimiter(10, 60000); // 10 requests per minute

// Input validation
export function validateInput(input: string): { valid: boolean; error?: string } {
  if (!input || typeof input !== 'string') {
    return { valid: false, error: 'Input is required and must be a string' };
  }
  
  if (input.length > 1000) {
    return { valid: false, error: 'Input is too long (max 1000 characters)' };
  }
  
  if (input.trim().length === 0) {
    return { valid: false, error: 'Input cannot be empty' };
  }
  
  // Check for potential injection attempts
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /eval\s*\(/i,
    /function\s*\(/i
  ];
  
  const hasSuspiciousPattern = suspiciousPatterns.some(pattern => 
    pattern.test(input)
  );
  
  if (hasSuspiciousPattern) {
    return { valid: false, error: 'Input contains potentially malicious content' };
  }
  
  return { valid: true };
}

// Confidence scoring
export function calculateConfidenceScore(
  relevantChunks: any[],
  query: string,
  response: string
): number {
  let score = 0;
  
  // Base score from number of relevant chunks
  if (relevantChunks.length >= 3) score += 0.4;
  else if (relevantChunks.length >= 2) score += 0.3;
  else if (relevantChunks.length >= 1) score += 0.2;
  
  // Score based on response length (more detailed = higher confidence)
  if (response.length > 200) score += 0.2;
  else if (response.length > 100) score += 0.1;
  
  // Score based on whether response contains specific information
  const hasSpecificInfo = /specific|exactly|precisely|specifically/i.test(response);
  if (hasSpecificInfo) score += 0.1;
  
  // Penalty for generic responses
  const isGeneric = /I don't know|I'm not sure|I can't help/i.test(response);
  if (isGeneric) score -= 0.3;
  
  // Ensure score is between 0 and 1
  return Math.max(0, Math.min(1, score));
}

// Enhanced logging for monitoring and analytics
export function logChatbotInteraction(
  query: string,
  response: string,
  confidence: number,
  sources: any[],
  userId?: string,
  shouldEscalate: boolean = false,
  escalationType?: string,
  responseTime: number = 0,
  interactionId: string = ''
): void {
  const logEntry = {
    timestamp: new Date().toISOString(),
    query: sanitizeContent(query),
    response: sanitizeContent(response),
    confidence,
    sourceCount: sources.length,
    userId: userId || 'anonymous',
    hasDisallowedContent: containsDisallowedContent(query),
    shouldEscalate,
    escalationType,
    responseTime,
    interactionId,
    sessionId: userId?.includes('session') ? userId : undefined
  };
  
  // Enhanced logging with analytics
  console.log('🤖 Chatbot Interaction:', JSON.stringify(logEntry, null, 2));
  
  // In production, this would send to:
  // - Analytics service (Google Analytics, Mixpanel)
  // - Logging service (DataDog, Sentry, CloudWatch)
  // - Database for detailed analysis
  // - Real-time monitoring dashboard
  
  // Example analytics event (if gtag is available)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'chatbot_interaction', {
      event_category: 'engagement',
      event_label: shouldEscalate ? 'escalated' : 'resolved',
      value: Math.round(confidence * 100),
      custom_parameters: {
        interaction_id: interactionId,
        response_time: responseTime,
        escalation_type: escalationType,
        source_count: sources.length
      }
    });
  }
}
