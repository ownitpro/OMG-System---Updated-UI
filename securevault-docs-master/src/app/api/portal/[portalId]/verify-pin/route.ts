// API route to verify portal PIN
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import {
  checkPinRateLimit,
  recordFailedPinAttempt,
  resetPinAttempts,
  createPortalSession,
  createSessionCookie,
  validators,
} from '@/lib/portalAuth';

type Props = {
  params: Promise<{ portalId: string }>;
};

interface ClientPortalRecord {
  id: string;
  pin: string | null;
  expiresAt: string | null;
}

export async function POST(req: NextRequest, { params }: Props) {
  try {
    const { queryOne } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');

    const { portalId } = await params;
    const { pin } = await req.json();

    // Check database Portal table for PIN first (to handle no-PIN portals)
    const portalRecord = await queryOne<ClientPortalRecord>(
      `SELECT id, pin, "expiresAt" FROM ${getTableName('Portal')} WHERE id = $1`,
      [portalId]
    );

    if (!portalRecord) {
      return NextResponse.json(
        { error: 'Portal not found' },
        { status: 404 }
      );
    }

    // Check if portal has expired
    if (portalRecord.expiresAt) {
      const expirationDate = new Date(portalRecord.expiresAt);
      const now = new Date();
      if (now > expirationDate) {
        return NextResponse.json(
          {
            error: 'This portal has expired',
            expired: true,
            expiredAt: portalRecord.expiresAt,
          },
          { status: 403 }
        );
      }
    }

    // If portal has no PIN set, auto-grant access (no validation needed)
    // Check for null, undefined, or empty string
    if (!portalRecord.pin || portalRecord.pin.length === 0) {
      // Create secure session without PIN verification
      const sessionId = createPortalSession(portalId);
      const response = NextResponse.json({ success: true, noPinRequired: true });
      response.headers.set('Set-Cookie', createSessionCookie(sessionId));
      return response;
    }

    // PIN is required - validate the provided PIN format
    const pinValidation = validators.pin(pin);
    if (!pinValidation.valid) {
      return NextResponse.json(
        { error: pinValidation.error || 'Invalid PIN' },
        { status: 400 }
      );
    }

    // Check rate limiting
    const rateLimit = checkPinRateLimit(portalId);
    if (!rateLimit.allowed) {
      const lockoutMinutes = Math.ceil((rateLimit.lockoutEndsAt! - Date.now()) / 60000);
      return NextResponse.json(
        {
          error: `Too many failed attempts. Please try again in ${lockoutMinutes} minutes.`,
          lockoutEndsAt: rateLimit.lockoutEndsAt,
        },
        { status: 429 }
      );
    }

    let validPin = false;

    // Verify PIN using bcrypt
    validPin = await bcrypt.compare(pin, portalRecord.pin);

    if (validPin) {
      // Reset failed attempts on success
      resetPinAttempts(portalId);

      // Create secure session
      const sessionId = createPortalSession(portalId);

      // Create response with session cookie
      const response = NextResponse.json({ success: true });
      response.headers.set('Set-Cookie', createSessionCookie(sessionId));

      return response;
    } else {
      // Record failed attempt
      recordFailedPinAttempt(portalId);

      return NextResponse.json(
        {
          error: 'Invalid PIN',
          remainingAttempts: Math.max(0, (rateLimit.remainingAttempts || 1) - 1),
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Error verifying PIN:', error);
    return NextResponse.json(
      { error: 'Failed to verify PIN' },
      { status: 500 }
    );
  }
}
