import bcrypt from 'bcryptjs';
import { RateLimiter } from 'limiter';

// Rate limiting configurations
export const loginRateLimiter = new RateLimiter({ tokensPerInterval: 5, interval: 'minute' });
export const apiRateLimiter = new RateLimiter({ tokensPerInterval: 100, interval: 'minute' });
export const passwordResetRateLimiter = new RateLimiter({ tokensPerInterval: 3, interval: 'hour' });

/**
 * Hash a password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

/**
 * Verify a password
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Generate a secure random token
 */
export function generateSecureToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Validate password strength
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Sanitize user input
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/['"]/g, '') // Remove quotes
    .substring(0, 255); // Limit length
}

/**
 * Check if IP is allowed (for admin access)
 */
export function isIPAllowed(ip: string, allowedIPs: string[]): boolean {
  if (allowedIPs.length === 0) return true; // No restrictions
  
  return allowedIPs.some(allowedIP => {
    if (allowedIP.includes('*')) {
      // Wildcard matching
      const pattern = allowedIP.replace(/\*/g, '.*');
      return new RegExp(pattern).test(ip);
    }
    return allowedIP === ip;
  });
}

/**
 * Validate environment variables
 */
export function validateEnvironment(): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const required = ['DATABASE_URL'];
  
  for (const key of required) {
    if (!process.env[key]) {
      errors.push(`Missing required environment variable: ${key}`);
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Redact IP address for privacy
 */
export function redactIP(ip: string): string {
  if (!ip || ip === 'unknown') return 'unknown';
  // Redact last octet of IPv4
  const parts = ip.split('.');
  if (parts.length === 4) {
    return `${parts[0]}.${parts[1]}.${parts[2]}.xxx`;
  }
  // For IPv6, just return a masked version
  return ip.substring(0, ip.lastIndexOf(':')) + ':xxxx';
}

/**
 * Redact personally identifiable information
 */
export function redactPII(text: string): string {
  if (!text) return '';
  // Simple PII redaction - replace email patterns
  return text.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[email redacted]')
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[SSN redacted]') // SSN pattern
    .replace(/\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, '[card redacted]'); // Credit card pattern
}

/**
 * Handle CSP violation reports
 */
export function handleCSPViolation(violation: any): void {
  // Log CSP violations for monitoring
  console.warn('[CSP_VIOLATION]', {
    timestamp: new Date().toISOString(),
    violation: violation['csp-report'] || violation
  });
  
  // In production, you might want to:
  // - Store in database
  // - Send alerts for repeated violations
  // - Update CSP policy dynamically
}

/**
 * Log security events
 */
export function logSecurityEvent(
  eventType: string,
  details: Record<string, any>,
  request?: any
): void {
  const logEntry = {
    timestamp: new Date().toISOString(),
    eventType,
    details: {
      ...details,
      ip: request?.ip || request?.headers?.get('x-forwarded-for') || 'unknown'
    }
  };
  
  console.log('[SECURITY_EVENT]', logEntry);
  
  // In production, you might want to:
  // - Store in database
  // - Send to security monitoring service
  // - Trigger alerts for critical events
}

export function createAuditLogEntry(
  userId: string,
  orgId: string,
  action: string,
  resource: string,
  details?: Record<string, any>
) {
  return {
    userId,
    orgId,
    action,
    resource,
    details: details || {},
    timestamp: new Date().toISOString(),
    ip: '127.0.0.1', // This would be extracted from request
  };
}