// src/app/api/auth/forgot-password/route.ts
// Handle password reset request - sends email with reset link

import { NextRequest, NextResponse } from 'next/server';
import { queryOne, query } from '@/lib/db';
import { getTableName } from '@/lib/db-utils';
import { sendPasswordResetEmail } from '@/lib/email';
import crypto from 'crypto';

// Token expiration time in minutes
const TOKEN_EXPIRATION_MINUTES = 60;

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Find user by email
    const user = await queryOne<{ id: string; email: string; name: string | null }>(
      `SELECT id, email, name FROM ${getTableName('User')} WHERE LOWER(email) = $1`,
      [normalizedEmail]
    );

    // Always return success to prevent email enumeration attacks
    // Even if user doesn't exist, we pretend we sent the email
    if (!user) {
      console.log('[Forgot Password] User not found:', normalizedEmail);
      return NextResponse.json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent.'
      });
    }

    // Generate a secure random token
    const rawToken = crypto.randomBytes(32).toString('hex');

    // Hash the token for storage (we only store the hash)
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

    // Calculate expiration time
    const expiresAt = new Date(Date.now() + TOKEN_EXPIRATION_MINUTES * 60 * 1000);

    // Delete any existing unused tokens for this user
    await query(
      `DELETE FROM ${getTableName('PasswordResetToken')}
       WHERE "userId" = $1 AND "used" = false`,
      [user.id]
    );

    // Store the hashed token in the database
    await query(
      `INSERT INTO ${getTableName('PasswordResetToken')}
       (id, "userId", token, "expiresAt", used, "createdAt")
       VALUES (gen_random_uuid(), $1, $2, $3, false, NOW())`,
      [user.id, hashedToken, expiresAt.toISOString()]
    );

    // Build the reset link with the raw (unhashed) token
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const resetLink = `${baseUrl}/reset-password?token=${rawToken}&email=${encodeURIComponent(normalizedEmail)}`;

    // Get user's organization ID if they have one
    const orgMember = await queryOne<{ organizationId: string }>(
      `SELECT om."organizationId" FROM ${getTableName('OrganizationMember')} om WHERE om."userId" = $1 LIMIT 1`,
      [user.id]
    );

    // Send the password reset email
    const emailResult = await sendPasswordResetEmail({
      email: user.email,
      name: user.name || user.email.split('@')[0],
      resetLink,
      expiresInMinutes: TOKEN_EXPIRATION_MINUTES,
      organizationId: orgMember?.organizationId,
    });

    if (!emailResult.ok) {
      console.error('[Forgot Password] Failed to send email:', emailResult.error);
      // Still return success to prevent enumeration
    } else {
      console.log('[Forgot Password] Reset email sent to:', user.email);
    }

    return NextResponse.json({
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent.'
    });
  } catch (error: any) {
    console.error('[Forgot Password] Error:', error);
    // Return generic success to prevent enumeration
    return NextResponse.json({
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent.'
    });
  }
}
