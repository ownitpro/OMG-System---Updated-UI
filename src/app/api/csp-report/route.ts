import { NextRequest, NextResponse } from 'next/server';
import { handleCSPViolation, logSecurityEvent } from '@/lib/security';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate CSP violation report structure
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid CSP report' }, { status: 400 });
    }
    
    // Log the CSP violation
    handleCSPViolation(body);
    
    // Additional security logging
    logSecurityEvent('CSP_VIOLATION_RECEIVED', {
      userAgent: request.headers.get('user-agent'),
      ip: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
      violation: body
    }, request);
    
    // In production, you might want to:
    // 1. Store violations in a database for analysis
    // 2. Send alerts for repeated violations
    // 3. Update CSP policy based on legitimate violations
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing CSP violation report:', error);
    return NextResponse.json({ error: 'Failed to process report' }, { status: 500 });
  }
}
