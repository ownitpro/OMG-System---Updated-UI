import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type Params = { params: Promise<{ orgId: string }> };

/**
 * POST /api/org/[orgId]/email-templates/migrate-from-code
 * One-time migration utility to copy hardcoded templates from email.ts to database
 * Idempotent - only creates templates that don't already exist
 */
export async function POST(request: NextRequest, { params }: Params) {
  const { queryOne, query } = await import('@/lib/db');
  const { getTableName } = await import('@/lib/db-utils');
  const { randomUUID } = await import('crypto');
  const { orgId } = await params;

  // Get authenticated user from headers
  const userId = request.headers.get('x-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Verify user has access to this organization
    const hasAccess = await query(
      `SELECT 1 FROM ${getTableName('OrganizationMember')} WHERE "organizationId" = $1 AND "userId" = $2`,
      [orgId, userId]
    );

    if (!hasAccess || hasAccess.length === 0) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Get organization name for template defaults
    const org = await queryOne(
      `SELECT name FROM ${getTableName('Organization')} WHERE id = $1`,
      [orgId]
    );
    const orgName = org?.name || 'Your Organization';

    // Define default templates based on existing email.ts templates
    const defaultTemplates = [
      {
        name: 'Portal Created',
        description: 'Sent when a new client portal is created and shared',
        slug: 'portal_created',
        type: 'Portal',
        subject: 'Your Secure Portal from {{orgName}}',
        htmlContent: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
    .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 32px 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
    .content { padding: 32px 24px; }
    .pin-display { font-size: 32px; font-weight: bold; color: #2563eb; text-align: center; letter-spacing: 8px; margin: 24px 0; font-family: monospace; }
    .button { display: inline-block; background: #2563eb; color: white !important; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 500; }
    .footer { background: #f9fafb; padding: 24px; text-align: center; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔐 Your Secure Portal is Ready</h1>
    </div>
    <div class="content">
      <p>Hello {{clientName}},</p>
      <p>{{orgName}} has created a secure portal for you to upload and manage your documents.</p>
      <div style="background: #f3f4f6; border-left: 4px solid #2563eb; padding: 16px; margin: 24px 0;">
        <strong>Your Access PIN:</strong>
        <div class="pin-display">{{pin}}</div>
      </div>
      <p>{{expiryText}}</p>
      <div style="text-align: center;">
        <a href="{{portalUrl}}" class="button">Access Your Portal</a>
      </div>
    </div>
    <div class="footer">
      <p>Powered by SecureVault Docs</p>
    </div>
  </div>
</body>
</html>`,
        textContent: `Your Secure Portal is Ready\n\nHello {{clientName}},\n\n{{orgName}} has created a secure portal for you.\n\nYour Access PIN: {{pin}}\n\nAccess your portal at: {{portalUrl}}\n\n{{expiryText}}`,
        variables: ['clientName', 'orgName', 'portalUrl', 'pin', 'expiryText'],
      },
      {
        name: 'Document Uploaded',
        description: 'Admin notification when new document is uploaded',
        slug: 'document_uploaded',
        type: 'Portal',
        subject: 'New Document Uploaded by {{clientName}}',
        htmlContent: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h2>📄 New Document Uploaded</h2>
  <p><strong>Client:</strong> {{clientName}}</p>
  <p><strong>File:</strong> {{fileName}}</p>
  <p><a href="{{portalUrl}}" style="color: #2563eb;">View in Portal</a></p>
</body>
</html>`,
        textContent: 'New Document Uploaded\n\nClient: {{clientName}}\nFile: {{fileName}}\n\nView at: {{portalUrl}}',
        variables: ['clientName', 'fileName', 'portalUrl'],
      },
      {
        name: 'Welcome Email',
        description: 'Welcome message for new user signups',
        slug: 'welcome_email',
        type: 'Authentication',
        subject: 'Welcome to SecureVault Docs!',
        htmlContent: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
  <h2>👋 Welcome to SecureVault Docs!</h2>
  <p>Hi {{userName}},</p>
  <p>Thank you for signing up! Your account has been created successfully.</p>
  <p><a href="{{loginUrl}}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Get Started</a></p>
  <p style="color: #6b7280; font-size: 14px; margin-top: 24px;">If you have any questions, contact {{supportEmail}}</p>
</body>
</html>`,
        textContent: 'Welcome to SecureVault Docs!\n\nHi {{userName}},\n\nThank you for signing up!\n\nLogin at: {{loginUrl}}',
        variables: ['userName', 'loginUrl', 'supportEmail'],
      },
      {
        name: 'Password Reset',
        description: 'Password reset link and instructions',
        slug: 'password_reset',
        type: 'Authentication',
        subject: 'Reset Your Password',
        htmlContent: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
  <h2>🔑 Reset Your Password</h2>
  <p>Hi {{userName}},</p>
  <p>Click the link below to reset your password:</p>
  <p><a href="{{resetLink}}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Reset Password</a></p>
  <p style="color: #6b7280; font-size: 14px;">This link will expire in 1 hour.</p>
  <p style="color: #6b7280; font-size: 14px;">If you didn't request this, please ignore this email.</p>
</body>
</html>`,
        textContent: 'Reset Your Password\n\nHi {{userName}},\n\nReset your password: {{resetLink}}\n\nThis link expires in 1 hour.',
        variables: ['userName', 'resetLink'],
      },
      {
        name: 'Password Changed',
        description: 'Confirmation that password was changed',
        slug: 'password_changed',
        type: 'Authentication',
        subject: 'Your Password Was Changed',
        htmlContent: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
  <h2>✅ Password Changed</h2>
  <p>Hi {{userName}},</p>
  <p>Your password was successfully changed.</p>
  <p style="color: #6b7280; font-size: 14px;">If you didn't make this change, please contact support immediately at {{supportEmail}}</p>
</body>
</html>`,
        textContent: 'Password Changed\n\nHi {{userName}},\n\nYour password was successfully changed.',
        variables: ['userName', 'supportEmail'],
      },
      {
        name: 'Request Created',
        description: 'Notifies client of a new document request',
        slug: 'request_created',
        type: 'Request',
        subject: 'Document Request: {{requestTitle}}',
        htmlContent: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
  <h2>📋 New Document Request</h2>
  <p>Hi {{clientName}},</p>
  <p><strong>Request:</strong> {{requestTitle}}</p>
  <p>{{requestDescription}}</p>
  <p><strong>Due Date:</strong> {{dueDate}}</p>
  <p><a href="{{portalUrl}}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Upload Documents</a></p>
</body>
</html>`,
        textContent: 'New Document Request\n\nHi {{clientName}},\n\nRequest: {{requestTitle}}\n{{requestDescription}}\n\nDue: {{dueDate}}\nUpload at: {{portalUrl}}',
        variables: ['clientName', 'requestTitle', 'requestDescription', 'dueDate', 'portalUrl'],
      },
      {
        name: 'Request Completed',
        description: 'Sent when a document request is fulfilled',
        slug: 'request_completed',
        type: 'Request',
        subject: 'Request Completed: {{requestTitle}}',
        htmlContent: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
  <h2>✅ Request Completed</h2>
  <p>Hi {{clientName}},</p>
  <p>Your document request "{{requestTitle}}" has been fulfilled.</p>
  <p><strong>Items Received:</strong> {{itemCount}}</p>
</body>
</html>`,
        textContent: 'Request Completed\n\nHi {{clientName}},\n\nYour request "{{requestTitle}}" has been fulfilled.\nItems: {{itemCount}}',
        variables: ['clientName', 'requestTitle', 'itemCount'],
      },
      {
        name: 'Upload Confirmation',
        description: 'Confirms successful file upload to client',
        slug: 'upload_confirmation',
        type: 'Portal',
        subject: 'Upload Successful',
        htmlContent: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
  <h2>✅ Upload Successful</h2>
  <p>Hi {{clientName}},</p>
  <p>Your files have been uploaded successfully.</p>
  <p><strong>Files:</strong> {{uploadCount}}</p>
</body>
</html>`,
        textContent: 'Upload Successful\n\nHi {{clientName}},\n\nYour {{uploadCount}} file(s) have been uploaded successfully.',
        variables: ['clientName', 'uploadCount'],
      },
      {
        name: 'Client Upload Notification',
        description: 'Notifies admin when client uploads files to portal',
        slug: 'client_upload_notification',
        type: 'Portal',
        subject: 'New Upload from {{clientName}}',
        htmlContent: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h2>📤 Client Upload Notification</h2>
  <p><strong>Client:</strong> {{clientName}}</p>
  <p><strong>Files:</strong> {{uploadCount}}</p>
  <p><a href="{{portalUrl}}">View Portal</a></p>
</body>
</html>`,
        textContent: 'Client Upload\n\nClient: {{clientName}}\nFiles: {{uploadCount}}\nView: {{portalUrl}}',
        variables: ['clientName', 'uploadCount', 'portalUrl'],
      },
      {
        name: 'Portal Expiring',
        description: 'Warning that portal access will expire soon',
        slug: 'portal_expiring',
        type: 'Notification',
        subject: 'Portal Expiring Soon',
        htmlContent: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
  <h2>⚠️ Portal Expiring Soon</h2>
  <p>Hi {{clientName}},</p>
  <p>Your portal access will expire in <strong>{{daysRemaining}} days</strong>.</p>
  <p><strong>Expiry Date:</strong> {{expiryDate}}</p>
  <p><a href="{{portalUrl}}">Access Portal</a></p>
</body>
</html>`,
        textContent: 'Portal Expiring Soon\n\nHi {{clientName}},\n\nYour portal expires in {{daysRemaining}} days on {{expiryDate}}.\n\nAccess: {{portalUrl}}',
        variables: ['clientName', 'daysRemaining', 'expiryDate', 'portalUrl'],
      },
      {
        name: 'Request Reminder',
        description: 'Reminder about pending document request',
        slug: 'request_reminder',
        type: 'Notification',
        subject: 'Reminder: {{requestTitle}}',
        htmlContent: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
  <h2>⏰ Request Reminder</h2>
  <p>Hi {{clientName}},</p>
  <p>This is a reminder about your pending document request:</p>
  <p><strong>{{requestTitle}}</strong></p>
  <p><strong>Due:</strong> {{dueDate}} ({{daysRemaining}} days)</p>
  <p><a href="{{portalUrl}}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Upload Now</a></p>
</body>
</html>`,
        textContent: 'Request Reminder\n\n{{requestTitle}}\n\nDue: {{dueDate}} ({{daysRemaining}} days)\n\nUpload: {{portalUrl}}',
        variables: ['clientName', 'requestTitle', 'dueDate', 'daysRemaining', 'portalUrl'],
      },
      {
        name: 'Expiration Reminder',
        description: 'Reminder that documents or items are expiring soon',
        slug: 'expiration_reminder',
        type: 'Notification',
        subject: 'Documents Expiring Soon',
        htmlContent: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
  <h2>⚠️ Expiration Reminder</h2>
  <p>The following documents will expire soon:</p>
  <p><strong>{{documentName}}</strong></p>
  <p><strong>Expires:</strong> {{expiryDate}} ({{daysRemaining}} days remaining)</p>
  <p><strong>Items:</strong> {{itemCount}}</p>
</body>
</html>`,
        textContent: 'Expiration Reminder\n\n{{documentName}}\nExpires: {{expiryDate}} ({{daysRemaining}} days)\nItems: {{itemCount}}',
        variables: ['documentName', 'expiryDate', 'daysRemaining', 'itemCount'],
      },
    ];

    const migrated = [];

    // Insert each template if it doesn't already exist
    for (const template of defaultTemplates) {
      // Check if template already exists
      const existing = await queryOne(
        `SELECT id FROM ${getTableName('EmailTemplate')} WHERE "organizationId" = $1 AND slug = $2`,
        [orgId, template.slug]
      );

      if (existing) {
        console.log(`[MIGRATION] Template '${template.slug}' already exists, skipping`);
        continue;
      }

      // Insert new template
      const templateId = randomUUID();
      const created = await queryOne(
        `INSERT INTO ${getTableName('EmailTemplate')}
          (id, "organizationId", name, description, slug, type, subject, "htmlContent", "textContent", variables, "isActive", "createdById")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
         RETURNING *`,
        [
          templateId,
          orgId,
          template.name,
          template.description,
          template.slug,
          template.type,
          template.subject,
          template.htmlContent,
          template.textContent,
          JSON.stringify(template.variables),
          true, // isActive
          userId,
        ]
      );

      if (created) {
        migrated.push(created);
        console.log(`[MIGRATION] Created template '${template.slug}'`);
      }
    }

    return NextResponse.json({
      success: true,
      migrated: migrated.length,
      total: defaultTemplates.length,
      templates: migrated,
      message: `Successfully migrated ${migrated.length} of ${defaultTemplates.length} templates`,
    });
  } catch (error: any) {
    console.error('Error migrating email templates:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to migrate email templates' },
      { status: 500 }
    );
  }
}
