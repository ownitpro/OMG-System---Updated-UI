// src/app/api/auth/reset-password/route.ts
// Handle password reset - validates token and updates password

import { NextRequest, NextResponse } from 'next/server';
import { queryOne, query } from '@/lib/db';
import { getTableName } from '@/lib/db-utils';
import { sendPasswordChangedEmail } from '@/lib/email';
import { CognitoIdentityProviderClient, AdminSetUserPasswordCommand } from '@aws-sdk/client-cognito-identity-provider';
import { getAwsConfig } from '@/lib/aws/config';
import crypto from 'crypto';

const cognitoClient = new CognitoIdentityProviderClient(getAwsConfig());

export async function POST(request: NextRequest) {
  try {
    const { token, email, newPassword } = await request.json();

    if (!token || !email || !newPassword) {
      return NextResponse.json(
        { error: 'Token, email, and new password are required' },
        { status: 400 }
      );
    }

    // Validate password requirements
    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters with uppercase, lowercase, and numbers' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Hash the provided token to compare with stored hash
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user by email
    const user = await queryOne<{ id: string; email: string; name: string | null }>(
      `SELECT id, email, name FROM ${getTableName('User')} WHERE LOWER(email) = $1`,
      [normalizedEmail]
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired reset link' },
        { status: 400 }
      );
    }

    // Find valid token for this user
    const resetToken = await queryOne<{
      id: string;
      userId: string;
      token: string;
      expiresAt: string;
      used: boolean;
    }>(
      `SELECT id, "userId", token, "expiresAt", used
       FROM ${getTableName('PasswordResetToken')}
       WHERE "userId" = $1 AND token = $2 AND used = false`,
      [user.id, hashedToken]
    );

    if (!resetToken) {
      return NextResponse.json(
        { error: 'Invalid or expired reset link' },
        { status: 400 }
      );
    }

    // Check if token is expired
    if (new Date(resetToken.expiresAt) < new Date()) {
      // Mark as used to prevent reuse
      await query(
        `UPDATE ${getTableName('PasswordResetToken')} SET used = true WHERE id = $1`,
        [resetToken.id]
      );
      return NextResponse.json(
        { error: 'Reset link has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    // Update password in Cognito
    const userPoolId = process.env.COGNITO_USER_POOL_ID;

    if (userPoolId) {
      try {
        const command = new AdminSetUserPasswordCommand({
          UserPoolId: userPoolId,
          Username: user.email,
          Password: newPassword,
          Permanent: true,
        });

        await cognitoClient.send(command);
        console.log('[Reset Password] Cognito password updated for:', user.email);
      } catch (cognitoError: any) {
        console.error('[Reset Password] Cognito error:', cognitoError);

        if (cognitoError.name === 'InvalidPasswordException') {
          return NextResponse.json(
            { error: 'Password does not meet requirements. Must be at least 8 characters with uppercase, lowercase, and numbers.' },
            { status: 400 }
          );
        }

        if (cognitoError.name === 'UserNotFoundException') {
          // User might not exist in Cognito yet, continue anyway
          console.log('[Reset Password] User not found in Cognito, continuing...');
        } else {
          return NextResponse.json(
            { error: 'Failed to update password. Please try again.' },
            { status: 500 }
          );
        }
      }
    } else {
      console.log('[Reset Password] Cognito not configured, skipping Cognito update');
    }

    // Mark the token as used
    await query(
      `UPDATE ${getTableName('PasswordResetToken')} SET used = true WHERE id = $1`,
      [resetToken.id]
    );

    // Delete all unused tokens for this user (cleanup)
    await query(
      `DELETE FROM ${getTableName('PasswordResetToken')}
       WHERE "userId" = $1 AND used = false`,
      [user.id]
    );

    // Send password changed confirmation email
    try {
      // Get user's organization ID if they have one
      const orgMember = await queryOne<{ organizationId: string }>(
        `SELECT om."organizationId" FROM ${getTableName('OrganizationMember')} om WHERE om."userId" = $1 LIMIT 1`,
        [user.id]
      );

      await sendPasswordChangedEmail({
        email: user.email,
        name: user.name || user.email.split('@')[0],
        timestamp: new Date(),
        organizationId: orgMember?.organizationId,
      });
      console.log('[Reset Password] Confirmation email sent to:', user.email);
    } catch (emailError) {
      console.error('[Reset Password] Failed to send confirmation email:', emailError);
      // Don't fail the reset if email fails
    }

    console.log('[Reset Password] Password reset successful for:', user.email);

    return NextResponse.json({
      success: true,
      message: 'Password has been reset successfully. You can now login with your new password.'
    });
  } catch (error: any) {
    console.error('[Reset Password] Error:', error);
    return NextResponse.json(
      { error: 'Failed to reset password. Please try again.' },
      { status: 500 }
    );
  }
}
