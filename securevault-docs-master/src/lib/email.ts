// Email notification system with multiple provider support
// Supports: Resend, SendGrid, AWS SES, or console logging for development

type EmailProvider = 'resend' | 'sendgrid' | 'ses' | 'console';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface EmailResult {
  ok: boolean;
  success: boolean;
  error?: string;
  messageId?: string;
}

/**
 * Fetch email template from database for organization
 * Falls back to hardcoded template if not found
 */
async function getTemplateByType(
  orgId: string,
  templateSlug: string
): Promise<{
  subject: string;
  html: string;
  text?: string;
} | null> {
  try {
    const { queryOne } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');

    const template = await queryOne(
      `SELECT subject, "htmlContent", "textContent"
       FROM ${getTableName('EmailTemplate')}
       WHERE "organizationId" = $1
         AND slug = $2
         AND "isActive" = true
       LIMIT 1`,
      [orgId, templateSlug]
    );

    if (template) {
      return {
        subject: template.subject,
        html: template.htmlContent,
        text: template.textContent,
      };
    }
  } catch (error: any) {
    console.error('[EMAIL] Failed to fetch template from DB:', error);
  }

  return null; // Fall back to hardcoded templates
}

/**
 * Replace template variables with actual values
 */
function replaceVariables(
  template: string,
  data: Record<string, string>
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] !== undefined ? data[key] : match; // Keep placeholder if data missing
  });
}

// Get configured email provider from environment
function getEmailProvider(): EmailProvider {
  const provider = process.env.EMAIL_PROVIDER?.toLowerCase();

  if (provider === 'resend' && process.env.RESEND_API_KEY) return 'resend';
  if (provider === 'sendgrid' && process.env.SENDGRID_API_KEY) return 'sendgrid';
  if (provider === 'ses' && process.env.AWS_ACCESS_KEY_ID) return 'ses';

  return 'console'; // Default to console logging for development
}

// Send email using configured provider
export async function sendEmail(opts: EmailOptions): Promise<EmailResult> {
  const provider = getEmailProvider();

  try {
    switch (provider) {
      case 'resend':
        return await sendViaResend(opts);
      case 'sendgrid':
        return await sendViaSendGrid(opts);
      case 'ses':
        return await sendViaSES(opts);
      case 'console':
      default:
        console.log('[EMAIL] To:', opts.to);
        console.log('[EMAIL] Subject:', opts.subject);
        console.log('[EMAIL] Body:', opts.html.substring(0, 200) + '...');
        return { ok: true, success: true };
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return { ok: false, success: false, error: String(error) };
  }
}

// Resend provider implementation
async function sendViaResend(opts: EmailOptions): Promise<EmailResult> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || 'noreply@securevault.com',
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    return { ok: false, success: false, error };
  }

  return { ok: true, success: true };
}

// SendGrid provider implementation
async function sendViaSendGrid(opts: EmailOptions): Promise<EmailResult> {
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: opts.to }] }],
      from: { email: process.env.EMAIL_FROM || 'noreply@securevault.com' },
      subject: opts.subject,
      content: [
        { type: 'text/html', value: opts.html },
        ...(opts.text ? [{ type: 'text/plain', value: opts.text }] : []),
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    return { ok: false, success: false, error };
  }

  return { ok: true, success: true };
}

// AWS SES provider implementation using AWS SDK v3
async function sendViaSES(opts: EmailOptions): Promise<EmailResult> {
  try {
    const { SESClient, SendEmailCommand } = await import('@aws-sdk/client-ses');

    const client = new SESClient({
      region: process.env.AWS_REGION || 'ca-central-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const command = new SendEmailCommand({
      Source: process.env.EMAIL_FROM || 'noreply@securevault.com',
      Destination: {
        ToAddresses: [opts.to],
      },
      Message: {
        Subject: {
          Data: opts.subject,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: opts.html,
            Charset: 'UTF-8',
          },
          ...(opts.text && {
            Text: {
              Data: opts.text,
              Charset: 'UTF-8',
            },
          }),
        },
      },
    });

    await client.send(command);
    console.log('[SES EMAIL] Sent successfully to:', opts.to);
    return { ok: true, success: true };
  } catch (error: any) {
    console.error('[SES EMAIL] Error:', error);
    return { ok: false, success: false, error: error.message || String(error) };
  }
}

// Email Templates

function getEmailStyles(): string {
  return `
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      color: white;
      padding: 32px 24px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      padding: 32px 24px;
    }
    .content p {
      margin: 0 0 16px 0;
      color: #4b5563;
    }
    .info-box {
      background: #f3f4f6;
      border-left: 4px solid #2563eb;
      padding: 16px;
      margin: 24px 0;
      border-radius: 4px;
    }
    .info-box strong {
      color: #1f2937;
      display: block;
      margin-bottom: 4px;
    }
    .pin-display {
      font-size: 32px;
      font-weight: bold;
      color: #2563eb;
      text-align: center;
      letter-spacing: 8px;
      margin: 24px 0;
      font-family: monospace;
    }
    .button {
      display: inline-block;
      background: #2563eb;
      color: white !important;
      text-decoration: none;
      padding: 14px 28px;
      border-radius: 8px;
      font-weight: 500;
      text-align: center;
      margin: 24px 0;
    }
    .footer {
      background: #f9fafb;
      padding: 24px;
      text-align: center;
      color: #6b7280;
      font-size: 14px;
      border-top: 1px solid #e5e7eb;
    }
    .footer a {
      color: #2563eb;
      text-decoration: none;
    }
  `;
}

// Portal Created Email Template
export async function sendPortalCreatedEmail(params: {
  clientEmail: string;
  clientName: string;
  orgName: string;
  portalUrl: string;
  pin: string;
  expiresAt?: string | null;
  organizationId?: string; // NEW: Optional org ID for DB template lookup
}): Promise<EmailResult> {
  const { clientEmail, clientName, orgName, portalUrl, pin, expiresAt, organizationId } = params;

  const expiryText = expiresAt
    ? `This portal will expire on ${new Date(expiresAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}.`
    : '';

  // Try to fetch custom template from database
  if (organizationId) {
    const customTemplate = await getTemplateByType(organizationId, 'portal_created');

    if (customTemplate) {
      const data = {
        clientName,
        clientEmail,
        orgName,
        portalUrl,
        pin,
        expiryText,
        expiryDate: expiresAt ? new Date(expiresAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) : '',
      };

      return sendEmail({
        to: clientEmail,
        subject: replaceVariables(customTemplate.subject, data),
        html: replaceVariables(customTemplate.html, data),
        text: customTemplate.text ? replaceVariables(customTemplate.text, data) : undefined,
      });
    }
  }

  // Fall back to hardcoded template

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${getEmailStyles()}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Your Secure Portal is Ready</h1>
        </div>
        <div class="content">
          <p>Hello ${clientName},</p>

          <p>${orgName} has created a secure portal for you to upload and manage your documents.</p>

          <div class="info-box">
            <strong>Your Access PIN:</strong>
            <div class="pin-display">${pin}</div>
          </div>

          <p>Use this PIN to access your secure portal. Keep it confidential and do not share it with anyone.</p>

          ${expiryText ? `<p style="color: #dc2626; font-weight: 500;">${expiryText}</p>` : ''}

          <div style="text-align: center;">
            <a href="${portalUrl}" class="button">Access Your Portal</a>
          </div>

          <p style="margin-top: 24px; font-size: 14px; color: #6b7280;">
            Portal URL: <a href="${portalUrl}" style="color: #2563eb;">${portalUrl}</a>
          </p>

          <p style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
            <strong>Security Note:</strong> All uploads are encrypted and stored securely. Your connection is protected with industry-standard encryption.
          </p>
        </div>
        <div class="footer">
          <p>Powered by SecureVault Docs</p>
          <p>This is an automated message. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Your Secure Portal is Ready

Hello ${clientName},

${orgName} has created a secure portal for you to upload and manage your documents.

Your Access PIN: ${pin}

Use this PIN to access your secure portal. Keep it confidential and do not share it with anyone.

${expiryText}

Access your portal at: ${portalUrl}

Security Note: All uploads are encrypted and stored securely.

---
Powered by SecureVault Docs
  `.trim();

  return sendEmail({
    to: clientEmail,
    subject: `Your Secure Portal from ${orgName}`,
    html,
    text,
  });
}

// Document Uploaded Email Template
export async function sendDocumentUploadedEmail(params: {
  adminEmail: string;
  orgName: string;
  clientName: string;
  fileName: string;
  portalUrl: string;
  requestTitle?: string;
  organizationId?: string;
}): Promise<EmailResult> {
  const { adminEmail, orgName, clientName, fileName, portalUrl, requestTitle, organizationId } = params;

  // Try to fetch custom template from database
  if (organizationId) {
    const customTemplate = await getTemplateByType(organizationId, 'document_uploaded');
    if (customTemplate) {
      const variables = {
        clientName,
        fileName,
        portalUrl,
        requestTitle: requestTitle || '',
        orgName,
      };
      return sendEmail({
        to: adminEmail,
        subject: replaceVariables(customTemplate.subject, variables),
        html: replaceVariables(customTemplate.html, variables),
        text: customTemplate.text ? replaceVariables(customTemplate.text, variables) : undefined,
      });
    }
  }

  // Fallback to hardcoded template
  const requestInfo = requestTitle
    ? `<p><strong>Request:</strong> ${requestTitle}</p>`
    : '';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${getEmailStyles()}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📄 New Document Uploaded</h1>
        </div>
        <div class="content">
          <p>A new document has been uploaded to your portal.</p>

          <div class="info-box">
            <strong>Client:</strong> ${clientName}<br>
            <strong>File Name:</strong> ${fileName}<br>
            ${requestInfo}
          </div>

          <div style="text-align: center;">
            <a href="${portalUrl}" class="button">View Portal</a>
          </div>

          <p style="margin-top: 24px; font-size: 14px; color: #6b7280;">
            The document is now available in your organization's secure storage.
          </p>
        </div>
        <div class="footer">
          <p>Powered by SecureVault Docs</p>
          <p>${orgName}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
New Document Uploaded

A new document has been uploaded to your portal.

Client: ${clientName}
File Name: ${fileName}
${requestTitle ? `Request: ${requestTitle}` : ''}

View portal at: ${portalUrl}

---
Powered by SecureVault Docs
${orgName}
  `.trim();

  return sendEmail({
    to: adminEmail,
    subject: `New Document from ${clientName}`,
    html,
    text,
  });
}

// Request Completed Email Template
export async function sendRequestCompletedEmail(params: {
  clientEmail: string;
  adminEmail: string;
  clientName: string;
  orgName: string;
  requestTitle: string;
  itemCount: number;
  portalUrl: string;
  organizationId?: string;
}): Promise<EmailResult> {
  const { clientEmail, adminEmail, clientName, orgName, requestTitle, itemCount, portalUrl, organizationId } = params;

  // Try to fetch custom template from database
  if (organizationId) {
    const customTemplate = await getTemplateByType(organizationId, 'request_completed');
    if (customTemplate) {
      const variables = {
        clientName,
        requestTitle,
        itemCount: String(itemCount),
        portalUrl,
        orgName,
      };

      // Send to both client and admin with the same template
      const clientResult = await sendEmail({
        to: clientEmail,
        subject: replaceVariables(customTemplate.subject, variables),
        html: replaceVariables(customTemplate.html, variables),
        text: customTemplate.text ? replaceVariables(customTemplate.text, variables) : undefined,
      });

      const adminResult = await sendEmail({
        to: adminEmail,
        subject: replaceVariables(customTemplate.subject, variables),
        html: replaceVariables(customTemplate.html, variables),
        text: customTemplate.text ? replaceVariables(customTemplate.text, variables) : undefined,
      });

      return clientResult.ok || adminResult.ok
        ? { ok: true }
        : { ok: false, error: 'Failed to send both emails' };
    }
  }

  // Send to client
  const clientHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${getEmailStyles()}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Request Completed</h1>
        </div>
        <div class="content">
          <p>Hello ${clientName},</p>

          <p>Thank you for completing your document request!</p>

          <div class="info-box">
            <strong>Request:</strong> ${requestTitle}<br>
            <strong>Documents Uploaded:</strong> ${itemCount}
          </div>

          <p>${orgName} has received all requested documents. They will review your submission and contact you if any additional information is needed.</p>

          <div style="text-align: center;">
            <a href="${portalUrl}" class="button">View Your Portal</a>
          </div>
        </div>
        <div class="footer">
          <p>Powered by SecureVault Docs</p>
          <p>${orgName}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const clientText = `
Request Completed

Hello ${clientName},

Thank you for completing your document request!

Request: ${requestTitle}
Documents Uploaded: ${itemCount}

${orgName} has received all requested documents. They will review your submission and contact you if any additional information is needed.

View your portal at: ${portalUrl}

---
Powered by SecureVault Docs
${orgName}
  `.trim();

  // Send to admin
  const adminHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${getEmailStyles()}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Request Completed</h1>
        </div>
        <div class="content">
          <p>${clientName} has completed all items in their document request.</p>

          <div class="info-box">
            <strong>Client:</strong> ${clientName}<br>
            <strong>Request:</strong> ${requestTitle}<br>
            <strong>Documents Uploaded:</strong> ${itemCount}
          </div>

          <p>All requested documents are now available in your secure storage for review.</p>

          <div style="text-align: center;">
            <a href="${portalUrl}" class="button">Review Documents</a>
          </div>
        </div>
        <div class="footer">
          <p>Powered by SecureVault Docs</p>
          <p>${orgName}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const adminText = `
Request Completed

${clientName} has completed all items in their document request.

Client: ${clientName}
Request: ${requestTitle}
Documents Uploaded: ${itemCount}

All requested documents are now available in your secure storage for review.

Review documents at: ${portalUrl}

---
Powered by SecureVault Docs
${orgName}
  `.trim();

  // Send both emails
  const clientResult = await sendEmail({
    to: clientEmail,
    subject: `Request Completed: ${requestTitle}`,
    html: clientHtml,
    text: clientText,
  });

  const adminResult = await sendEmail({
    to: adminEmail,
    subject: `${clientName} completed: ${requestTitle}`,
    html: adminHtml,
    text: adminText,
  });

  // Return success if at least one email sent
  return clientResult.ok || adminResult.ok
    ? { ok: true }
    : { ok: false, error: 'Failed to send both emails' };
}

// Client Upload Notification Email Template
// Sent to admin when a client uploads a file through a portal
export async function sendClientUploadNotificationEmail(params: {
  adminEmail: string;
  adminName: string;
  clientName: string;
  clientEmail: string;
  fileName: string;
  fileSize: string;
  portalName: string;
  uploadDate: Date;
  viewUrl: string;
  organizationId?: string;
}): Promise<EmailResult> {
  const { adminEmail, adminName, clientName, clientEmail, fileName, fileSize, portalName, uploadDate, viewUrl, organizationId } = params;

  const formattedDate = uploadDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // Try to fetch custom template from database
  if (organizationId) {
    const customTemplate = await getTemplateByType(organizationId, 'client_upload_notification');
    if (customTemplate) {
      const variables = {
        adminName,
        clientName,
        clientEmail,
        fileName,
        fileSize,
        portalName,
        uploadDate: formattedDate,
        viewUrl,
      };
      return sendEmail({
        to: adminEmail,
        subject: replaceVariables(customTemplate.subject, variables),
        html: replaceVariables(customTemplate.html, variables),
        text: customTemplate.text ? replaceVariables(customTemplate.text, variables) : undefined,
      });
    }
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${getEmailStyles()}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📥 New Client Upload</h1>
        </div>
        <div class="content">
          <p>Hi ${adminName},</p>

          <p>A new file has been uploaded to your portal and is ready for review.</p>

          <div class="info-box">
            <strong>📄 File:</strong> ${fileName}<br>
            <strong>📦 Size:</strong> ${fileSize}<br>
            <strong>👤 Client:</strong> ${clientName}<br>
            <strong>📧 Email:</strong> ${clientEmail}<br>
            <strong>🚪 Portal:</strong> ${portalName}<br>
            <strong>🕐 Uploaded:</strong> ${formattedDate}
          </div>

          <p>This upload is awaiting your review. You can approve, download, or reject the file from your dashboard.</p>

          <div style="text-align: center;">
            <a href="${viewUrl}" class="button">Review Upload</a>
          </div>

          <p style="margin-top: 24px; font-size: 14px; color: #6b7280;">
            Direct link: <a href="${viewUrl}" style="color: #2563eb;">${viewUrl}</a>
          </p>
        </div>
        <div class="footer">
          <p>Powered by SecureVault Docs</p>
          <p>This is an automated notification. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
New Client Upload

Hi ${adminName},

A new file has been uploaded to your portal and is ready for review.

File: ${fileName}
Size: ${fileSize}
Client: ${clientName}
Email: ${clientEmail}
Portal: ${portalName}
Uploaded: ${formattedDate}

This upload is awaiting your review. You can approve, download, or reject the file from your dashboard.

Review at: ${viewUrl}

---
Powered by SecureVault Docs
  `.trim();

  return sendEmail({
    to: adminEmail,
    subject: `New upload from ${clientName} - ${fileName}`,
    html,
    text,
  });
}

// Welcome Email Template
// Sent when a new user signs up
export async function sendWelcomeEmail(params: {
  email: string;
  name: string;
  accountType: 'personal' | 'business';
  organizationId?: string;
}): Promise<EmailResult> {
  const { email, name, accountType, organizationId } = params;

  // Try to fetch custom template from database
  if (organizationId) {
    const customTemplate = await getTemplateByType(organizationId, 'welcome_email');
    if (customTemplate) {
      const variables = {
        name,
        accountType: accountType === 'business' ? 'Business' : 'Personal',
        dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://securevault.com'}/dashboard`,
      };
      return sendEmail({
        to: email,
        subject: replaceVariables(customTemplate.subject, variables),
        html: replaceVariables(customTemplate.html, variables),
        text: customTemplate.text ? replaceVariables(customTemplate.text, variables) : undefined,
      });
    }
  }

  const accountTypeText = accountType === 'business' ? 'Business' : 'Personal';
  const features = accountType === 'business'
    ? `
      <li>Create secure client portals</li>
      <li>Request documents from clients</li>
      <li>Collaborate with team members</li>
      <li>Organize documents in folders</li>
      <li>Track uploads and access history</li>
    `
    : `
      <li>Securely store your documents</li>
      <li>Organize files in folders</li>
      <li>Access from anywhere</li>
      <li>Industry-standard encryption</li>
    `;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${getEmailStyles()}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome to SecureVault Docs!</h1>
        </div>
        <div class="content">
          <p>Hello ${name},</p>

          <p>Thank you for creating your <strong>${accountTypeText} Account</strong>. Your secure document vault is now ready!</p>

          <div class="info-box">
            <strong>What you can do:</strong>
            <ul style="margin: 8px 0 0 0; padding-left: 20px;">
              ${features}
            </ul>
          </div>

          <div style="text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://securevault.com'}/dashboard" class="button">Go to Dashboard</a>
          </div>

          <p style="margin-top: 24px;">If you have any questions, our support team is here to help.</p>

          <p style="font-size: 14px; color: #6b7280;">
            Best regards,<br>
            The SecureVault Docs Team
          </p>
        </div>
        <div class="footer">
          <p>Powered by SecureVault Docs</p>
          <p>This is an automated welcome message.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Welcome to SecureVault Docs!

Hello ${name},

Thank you for creating your ${accountTypeText} Account. Your secure document vault is now ready!

Visit your dashboard: ${process.env.NEXT_PUBLIC_APP_URL || 'https://securevault.com'}/dashboard

If you have any questions, our support team is here to help.

Best regards,
The SecureVault Docs Team
  `.trim();

  return sendEmail({
    to: email,
    subject: `Welcome to SecureVault Docs, ${name}!`,
    html,
    text,
  });
}

// Password Reset Email Template
// Sent when user requests a password reset
export async function sendPasswordResetEmail(params: {
  email: string;
  name: string;
  resetLink: string;
  expiresInMinutes: number;
  organizationId?: string;
}): Promise<EmailResult> {
  const { email, name, resetLink, expiresInMinutes, organizationId } = params;

  // Try to fetch custom template from database
  if (organizationId) {
    const customTemplate = await getTemplateByType(organizationId, 'password_reset');
    if (customTemplate) {
      const variables = {
        name,
        resetLink,
        expiresInMinutes: String(expiresInMinutes),
      };
      return sendEmail({
        to: email,
        subject: replaceVariables(customTemplate.subject, variables),
        html: replaceVariables(customTemplate.html, variables),
        text: customTemplate.text ? replaceVariables(customTemplate.text, variables) : undefined,
      });
    }
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${getEmailStyles()}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔑 Reset Your Password</h1>
        </div>
        <div class="content">
          <p>Hello ${name},</p>

          <p>We received a request to reset your password. Click the button below to create a new password.</p>

          <div style="text-align: center;">
            <a href="${resetLink}" class="button">Reset Password</a>
          </div>

          <div class="info-box" style="border-left-color: #f59e0b;">
            <strong>⏰ This link expires in ${expiresInMinutes} minutes.</strong>
            <p style="margin: 8px 0 0 0; font-size: 14px;">For security reasons, this link can only be used once.</p>
          </div>

          <p style="font-size: 14px; color: #6b7280;">
            If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
          </p>

          <p style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
            <strong>Link not working?</strong> Copy and paste this URL into your browser:<br>
            <a href="${resetLink}" style="color: #2563eb; word-break: break-all;">${resetLink}</a>
          </p>
        </div>
        <div class="footer">
          <p>Powered by SecureVault Docs</p>
          <p>This is an automated security message. Please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Reset Your Password

Hello ${name},

We received a request to reset your password. Use the link below to create a new password:

${resetLink}

This link expires in ${expiresInMinutes} minutes. For security reasons, this link can only be used once.

If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.

---
Powered by SecureVault Docs
  `.trim();

  return sendEmail({
    to: email,
    subject: 'Reset your SecureVault Docs password',
    html,
    text,
  });
}

// Password Changed Confirmation Email Template
// Sent when user successfully changes their password
export async function sendPasswordChangedEmail(params: {
  email: string;
  name: string;
  timestamp: Date;
  organizationId?: string;
}): Promise<EmailResult> {
  const { email, name, timestamp, organizationId } = params;

  const formattedDate = timestamp.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  // Try to fetch custom template from database
  if (organizationId) {
    const customTemplate = await getTemplateByType(organizationId, 'password_changed');
    if (customTemplate) {
      const variables = {
        name,
        timestamp: formattedDate,
        dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://securevault.com'}/dashboard`,
      };
      return sendEmail({
        to: email,
        subject: replaceVariables(customTemplate.subject, variables),
        html: replaceVariables(customTemplate.html, variables),
        text: customTemplate.text ? replaceVariables(customTemplate.text, variables) : undefined,
      });
    }
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${getEmailStyles()}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔒 Password Changed</h1>
        </div>
        <div class="content">
          <p>Hello ${name},</p>

          <p>Your password was successfully changed.</p>

          <div class="info-box">
            <strong>📅 Changed on:</strong> ${formattedDate}
          </div>

          <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 16px; margin: 24px 0;">
            <p style="margin: 0; color: #991b1b; font-weight: 500;">
              ⚠️ If you didn't make this change, please contact our support team immediately.
            </p>
          </div>

          <div style="text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://securevault.com'}/dashboard" class="button">Go to Dashboard</a>
          </div>

          <p style="margin-top: 24px; font-size: 14px; color: #6b7280;">
            For your security, we recommend using a strong, unique password and enabling two-factor authentication if available.
          </p>
        </div>
        <div class="footer">
          <p>Powered by SecureVault Docs</p>
          <p>This is an automated security message.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Password Changed

Hello ${name},

Your password was successfully changed on ${formattedDate}.

If you didn't make this change, please contact our support team immediately.

Visit your dashboard: ${process.env.NEXT_PUBLIC_APP_URL || 'https://securevault.com'}/dashboard

---
Powered by SecureVault Docs
  `.trim();

  return sendEmail({
    to: email,
    subject: 'Your SecureVault Docs password was changed',
    html,
    text,
  });
}

// Request Created Email Template
// Sent to client when business creates a document request
export async function sendRequestCreatedEmail(params: {
  clientEmail: string;
  clientName: string;
  orgName: string;
  items: { label: string; required: boolean }[];
  portalUrl: string;
  dueDate?: string | null;
  organizationId?: string;
  isReminder?: boolean;
}): Promise<EmailResult> {
  const { clientEmail, clientName, orgName, items, portalUrl, dueDate, organizationId, isReminder } = params;
  const subjectPrefix = isReminder ? 'Reminder: ' : '';

  // Try to fetch custom template from database
  if (organizationId) {
    const customTemplate = await getTemplateByType(organizationId, 'request_created');
    if (customTemplate) {
      const itemsList = items
        .map(item => `${item.label}${item.required ? ' (required)' : ''}`)
        .join(', ');

      const variables = {
        clientName,
        orgName,
        items: itemsList,
        portalUrl,
        dueDate: dueDate ? new Date(dueDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) : 'Not specified',
      };
      return sendEmail({
        to: clientEmail,
        subject: subjectPrefix + replaceVariables(customTemplate.subject, variables),
        html: replaceVariables(customTemplate.html, variables),
        text: customTemplate.text ? replaceVariables(customTemplate.text, variables) : undefined,
      });
    }
  }

  const reminderNote = isReminder
    ? `<p style="background-color: #fef3c7; border-radius: 8px; padding: 12px; color: #92400e; margin-bottom: 16px;">
        ⏰ <strong>This is a reminder</strong> about your pending document request.
      </p>`
    : '';

  const dueDateText = dueDate
    ? `<p style="color: #dc2626; font-weight: 500;">📅 Please complete this request by ${new Date(dueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}</p>`
    : '';

  const itemsList = items
    .map(item => `<li>${item.label}${item.required ? ' <span style="color: #dc2626;">*required</span>' : ''}</li>`)
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${getEmailStyles()}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📋 Document Request</h1>
        </div>
        <div class="content">
          ${reminderNote}
          <p>Hello ${clientName},</p>

          <p><strong>${orgName}</strong> is requesting the following documents from you:</p>

          <div class="info-box">
            <strong>Requested Documents:</strong>
            <ul style="margin: 8px 0 0 0; padding-left: 20px;">
              ${itemsList}
            </ul>
          </div>

          ${dueDateText}

          <p>Please upload the requested documents through your secure portal.</p>

          <div style="text-align: center;">
            <a href="${portalUrl}" class="button">Upload Documents</a>
          </div>

          <p style="margin-top: 24px; font-size: 14px; color: #6b7280;">
            Portal URL: <a href="${portalUrl}" style="color: #2563eb;">${portalUrl}</a>
          </p>

          <p style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
            <strong>Security Note:</strong> All uploads are encrypted and stored securely. Only ${orgName} can access your documents.
          </p>
        </div>
        <div class="footer">
          <p>Powered by SecureVault Docs</p>
          <p>This is an automated message from ${orgName}.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const itemsText = items
    .map(item => `- ${item.label}${item.required ? ' (required)' : ''}`)
    .join('\n');

  const reminderText = isReminder ? '\n*** REMINDER: This is a reminder about your pending document request. ***\n' : '';

  const text = `
Document Request
${reminderText}
Hello ${clientName},

${orgName} is requesting the following documents from you:

${itemsText}

${dueDate ? `Please complete this request by ${new Date(dueDate).toLocaleDateString()}.` : ''}

Upload your documents at: ${portalUrl}

Security Note: All uploads are encrypted and stored securely.

---
Powered by SecureVault Docs
  `.trim();

  return sendEmail({
    to: clientEmail,
    subject: `${subjectPrefix}Document Request from ${orgName}`,
    html,
    text,
  });
}

// Upload Confirmation Email Template
// Sent to client when they successfully upload a document
export async function sendUploadConfirmationEmail(params: {
  clientEmail: string;
  clientName: string;
  fileName: string;
  portalUrl: string;
  orgName: string;
  organizationId?: string;
}): Promise<EmailResult> {
  const { clientEmail, clientName, fileName, portalUrl, orgName, organizationId } = params;

  // Try to fetch custom template from database
  if (organizationId) {
    const customTemplate = await getTemplateByType(organizationId, 'upload_confirmation');
    if (customTemplate) {
      const variables = {
        clientName,
        fileName,
        portalUrl,
        orgName,
      };
      return sendEmail({
        to: clientEmail,
        subject: replaceVariables(customTemplate.subject, variables),
        html: replaceVariables(customTemplate.html, variables),
        text: customTemplate.text ? replaceVariables(customTemplate.text, variables) : undefined,
      });
    }
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${getEmailStyles()}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Upload Successful</h1>
        </div>
        <div class="content">
          <p>Hello ${clientName},</p>

          <p>Your document has been successfully uploaded.</p>

          <div class="info-box">
            <strong>📄 File Uploaded:</strong> ${fileName}
          </div>

          <p>${orgName} has been notified and will review your submission.</p>

          <p>If you have more documents to upload, you can continue through your portal.</p>

          <div style="text-align: center;">
            <a href="${portalUrl}" class="button">Return to Portal</a>
          </div>

          <p style="margin-top: 24px; font-size: 14px; color: #6b7280;">
            <strong>Security Note:</strong> Your document is encrypted and stored securely.
          </p>
        </div>
        <div class="footer">
          <p>Powered by SecureVault Docs</p>
          <p>This is an automated confirmation from ${orgName}.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Upload Successful

Hello ${clientName},

Your document has been successfully uploaded.

File Uploaded: ${fileName}

${orgName} has been notified and will review your submission.

Return to your portal: ${portalUrl}

---
Powered by SecureVault Docs
  `.trim();

  return sendEmail({
    to: clientEmail,
    subject: `Upload Confirmed: ${fileName}`,
    html,
    text,
  });
}
