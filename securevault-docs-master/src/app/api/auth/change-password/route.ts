// src/app/api/auth/change-password/route.ts
// Change user password via AWS Cognito

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { CognitoIdentityProviderClient, ChangePasswordCommand, AdminSetUserPasswordCommand } from '@aws-sdk/client-cognito-identity-provider'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getAwsConfig } from '@/lib/aws/config'

const cognitoClient = new CognitoIdentityProviderClient(getAwsConfig())

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { currentPassword, newPassword } = await request.json()

    if (!newPassword) {
      return NextResponse.json({ error: 'New password is required' }, { status: 400 })
    }

    if (newPassword.length < 8) {
      return NextResponse.json({
        error: 'Password must be at least 8 characters with uppercase, lowercase, and numbers'
      }, { status: 400 })
    }

    const userPoolId = process.env.COGNITO_USER_POOL_ID

    if (!userPoolId) {
      // In development mode without Cognito, just return success
      if (process.env.NODE_ENV === 'development') {
        console.log('[Change Password] Cognito not configured, simulating success in development')
        return NextResponse.json({ success: true, message: 'Password changed (development mode)' })
      }
      return NextResponse.json({ error: 'Cognito not configured' }, { status: 500 })
    }

    try {
      // Use AdminSetUserPassword to set the new password
      // This is used when we don't have the user's access token
      const command = new AdminSetUserPasswordCommand({
        UserPoolId: userPoolId,
        Username: session.user.email,
        Password: newPassword,
        Permanent: true,
      })

      await cognitoClient.send(command)

      console.log('[Change Password] Password changed successfully for:', session.user.email)

      // Send password changed confirmation email
      try {
        const { sendPasswordChangedEmail } = await import('@/lib/email');
        const { queryOne } = await import('@/lib/db');
        const { getTableName } = await import('@/lib/db-utils');

        // Get user ID and organization
        const user = await queryOne<{ id: string }>(
          `SELECT id FROM ${getTableName('User')} WHERE LOWER(email) = $1`,
          [session.user.email.toLowerCase()]
        );

        let organizationId: string | undefined;
        if (user?.id) {
          const orgMember = await queryOne<{ organizationId: string }>(
            `SELECT om."organizationId" FROM ${getTableName('OrganizationMember')} om WHERE om."userId" = $1 LIMIT 1`,
            [user.id]
          );
          organizationId = orgMember?.organizationId;
        }

        await sendPasswordChangedEmail({
          email: session.user.email,
          name: session.user.name || session.user.email.split('@')[0],
          timestamp: new Date(),
          organizationId,
        });
        console.log('[Change Password] Confirmation email sent to:', session.user.email);
      } catch (emailError) {
        // Don't fail the password change if email fails
        console.error('[Change Password] Failed to send confirmation email:', emailError);
      }

      return NextResponse.json({ success: true, message: 'Password changed successfully' })
    } catch (cognitoError: any) {
      console.error('[Change Password] Cognito error:', cognitoError)

      if (cognitoError.name === 'InvalidPasswordException') {
        return NextResponse.json({
          error: 'Password does not meet requirements. Must be at least 8 characters with uppercase, lowercase, and numbers.'
        }, { status: 400 })
      }

      if (cognitoError.name === 'UserNotFoundException') {
        return NextResponse.json({ error: 'User not found in Cognito' }, { status: 404 })
      }

      // Handle IAM permission errors gracefully in development
      if (cognitoError.name === 'AccessDeniedException' ||
          cognitoError.message?.includes('not authorized')) {
        if (process.env.NODE_ENV === 'development') {
          console.log('[Change Password] IAM permissions not configured, simulating success in development')
          return NextResponse.json({ success: true, message: 'Password changed (development mode)' })
        }
        return NextResponse.json({
          error: 'Password change service is not configured. Please contact support.'
        }, { status: 503 })
      }

      return NextResponse.json({ error: cognitoError.message || 'Failed to change password' }, { status: 500 })
    }
  } catch (error: any) {
    console.error('[Change Password] Error:', error)
    return NextResponse.json({ error: error.message || 'Failed to change password' }, { status: 500 })
  }
}
