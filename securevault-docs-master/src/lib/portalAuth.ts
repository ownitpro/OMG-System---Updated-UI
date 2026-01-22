// lib/portalAuth.ts
// Secure portal authentication utilities

import { NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE_NAME = 'portal_session';
const MAX_SESSION_AGE = 24 * 60 * 60 * 1000; // 24 hours

// In-memory rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { attempts: number; resetAt: number }>();
const PIN_ATTEMPT_LIMIT = 5;
const PIN_LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

// Session storage (in production, use Redis or database)
interface PortalSession {
  portalId: string;
  authenticatedAt: number;
  expiresAt: number;
}

// Session signing key - required in production
const SESSION_SECRET = process.env.PORTAL_SESSION_SECRET;
if (!SESSION_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('PORTAL_SESSION_SECRET environment variable is required in production');
}
const effectiveSecret = SESSION_SECRET || 'dev-secret-local-only';

/**
 * Simple base64 encode/decode for session data
 * In production, use proper encryption (e.g., iron-session, jose)
 */
function encodeSession(session: PortalSession): string {
  const data = JSON.stringify(session);
  // Simple encoding with signature (base64 data + signature)
  const encoded = Buffer.from(data).toString('base64');
  const signature = Buffer.from(
    `${encoded}.${effectiveSecret}`
  ).toString('base64').slice(0, 16);
  return `${encoded}.${signature}`;
}

function decodeSession(token: string): PortalSession | null {
  try {
    const [encoded, signature] = token.split('.');
    if (!encoded || !signature) return null;

    // Verify signature
    const expectedSig = Buffer.from(
      `${encoded}.${effectiveSecret}`
    ).toString('base64').slice(0, 16);

    if (signature !== expectedSig) {
      console.warn('[Portal Auth] Invalid session signature');
      return null;
    }

    const data = Buffer.from(encoded, 'base64').toString('utf-8');
    return JSON.parse(data) as PortalSession;
  } catch (e) {
    console.error('[Portal Auth] Failed to decode session:', e);
    return null;
  }
}

/**
 * Create a new portal session after successful PIN verification
 * Returns the encoded session token to be stored in cookie
 */
export function createPortalSession(portalId: string): string {
  const now = Date.now();
  const session: PortalSession = {
    portalId,
    authenticatedAt: now,
    expiresAt: now + MAX_SESSION_AGE,
  };

  return encodeSession(session);
}

/**
 * Verify and retrieve portal session from request
 * Now reads session data directly from cookie (stateless)
 */
export function getPortalSession(req: NextRequest): PortalSession | null {
  const sessionToken = req.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionToken) {
    return null;
  }

  const session = decodeSession(sessionToken);

  if (!session) {
    return null;
  }

  // Check if session has expired
  if (Date.now() > session.expiresAt) {
    return null;
  }

  return session;
}

/**
 * Verify that the session belongs to the requested portal
 */
export function verifyPortalAccess(session: PortalSession | null, portalId: string): boolean {
  if (!session) {
    return false;
  }

  return session.portalId === portalId;
}

/**
 * Rate limiting for PIN attempts
 */
export function checkPinRateLimit(portalId: string): { allowed: boolean; remainingAttempts?: number; lockoutEndsAt?: number } {
  const now = Date.now();
  const key = `pin_${portalId}`;

  let record = rateLimitStore.get(key);

  // Clean up expired records
  if (record && now > record.resetAt) {
    rateLimitStore.delete(key);
    record = undefined;
  }

  if (!record) {
    return { allowed: true, remainingAttempts: PIN_ATTEMPT_LIMIT };
  }

  if (record.attempts >= PIN_ATTEMPT_LIMIT) {
    return {
      allowed: false,
      lockoutEndsAt: record.resetAt,
    };
  }

  return {
    allowed: true,
    remainingAttempts: PIN_ATTEMPT_LIMIT - record.attempts,
  };
}

/**
 * Record a failed PIN attempt
 */
export function recordFailedPinAttempt(portalId: string): void {
  const now = Date.now();
  const key = `pin_${portalId}`;

  let record = rateLimitStore.get(key);

  if (!record || now > record.resetAt) {
    record = {
      attempts: 1,
      resetAt: now + PIN_LOCKOUT_DURATION,
    };
  } else {
    record.attempts += 1;
  }

  rateLimitStore.set(key, record);
}

/**
 * Reset PIN attempts after successful authentication
 */
export function resetPinAttempts(portalId: string): void {
  const key = `pin_${portalId}`;
  rateLimitStore.delete(key);
}

/**
 * Invalidate a portal session (logout)
 */
export function invalidateSession(sessionId: string): void {
  sessionStore.delete(sessionId);
}

/**
 * Input validation utilities
 */
export const validators = {
  /**
   * Validate file name - prevent path traversal
   */
  fileName(name: string): { valid: boolean; error?: string } {
    if (!name || typeof name !== 'string') {
      return { valid: false, error: 'File name is required' };
    }

    if (name.length > 255) {
      return { valid: false, error: 'File name too long' };
    }

    // Check for path traversal attempts
    if (name.includes('..') || name.includes('/') || name.includes('\\')) {
      return { valid: false, error: 'Invalid file name' };
    }

    // Check for null bytes
    if (name.includes('\0')) {
      return { valid: false, error: 'Invalid file name' };
    }

    return { valid: true };
  },

  /**
   * Validate file size (max 100MB)
   */
  fileSize(size: number): { valid: boolean; error?: string } {
    const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

    if (typeof size !== 'number' || size <= 0) {
      return { valid: false, error: 'Invalid file size' };
    }

    if (size > MAX_FILE_SIZE) {
      return { valid: false, error: 'File too large (max 100MB)' };
    }

    return { valid: true };
  },

  /**
   * Validate content type - allow only safe file types
   */
  contentType(type: string): { valid: boolean; error?: string } {
    const ALLOWED_TYPES = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/jpg',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/zip',
      'text/plain',
    ];

    if (!type || typeof type !== 'string') {
      return { valid: false, error: 'Content type is required' };
    }

    if (!ALLOWED_TYPES.includes(type.toLowerCase())) {
      return { valid: false, error: 'File type not allowed' };
    }

    return { valid: true };
  },

  /**
   * Sanitize text input - prevent XSS
   */
  sanitizeText(text: string, maxLength: number = 1000): string {
    if (!text || typeof text !== 'string') {
      return '';
    }

    // Trim and limit length
    let sanitized = text.trim().substring(0, maxLength);

    // Remove any HTML tags
    sanitized = sanitized.replace(/<[^>]*>/g, '');

    // Remove null bytes
    sanitized = sanitized.replace(/\0/g, '');

    return sanitized;
  },

  /**
   * Validate PIN format
   */
  pin(pin: string): { valid: boolean; error?: string } {
    if (!pin || typeof pin !== 'string') {
      return { valid: false, error: 'PIN is required' };
    }

    // PIN should be 4-8 characters (alphanumeric)
    if (pin.length < 4 || pin.length > 8) {
      return { valid: false, error: 'Invalid PIN format' };
    }

    // Only allow alphanumeric characters
    if (!/^[a-zA-Z0-9]+$/.test(pin)) {
      return { valid: false, error: 'Invalid PIN format' };
    }

    return { valid: true };
  },
};

/**
 * Middleware to require authentication for API routes
 */
export function requirePortalAuth(
  handler: (req: NextRequest, session: PortalSession, portalId: string) => Promise<NextResponse>
) {
  return async (req: NextRequest, context: { params: Promise<{ portalId: string }> }) => {
    const { portalId } = await context.params;

    // Get session from request
    const session = getPortalSession(req);

    // Verify session exists and matches portal
    if (!session || !verifyPortalAccess(session, portalId)) {
      return NextResponse.json(
        { error: 'Unauthorized - Please log in' },
        { status: 401 }
      );
    }

    // Call the handler with verified session
    return handler(req, session, portalId);
  };
}

/**
 * Create session cookie response
 */
export function createSessionCookie(sessionId: string): string {
  const secure = process.env.NODE_ENV === 'production';
  const maxAge = MAX_SESSION_AGE / 1000; // Convert to seconds

  return `${SESSION_COOKIE_NAME}=${sessionId}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure ? '; Secure' : ''}`;
}

/**
 * Create logout cookie (expires immediately)
 */
export function createLogoutCookie(): string {
  return `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`;
}
