// Email Notification Service
// Handles sending notification emails for expiration, due dates, and other alerts

import { sendEmail } from '@/lib/email';

interface NotificationEmailParams {
  userEmail: string;
  userName: string;
  documentName: string;
  notificationType: string;
  title: string;
  message: string;
  date: string;
}

interface StorageAlertEmailParams {
  userEmail: string;
  userName: string;
  usedBytes: number;
  totalBytes: number;
  percentUsed: number;
  vaultName: string;
}

interface ClientUploadEmailParams {
  ownerEmail: string;
  ownerName: string;
  clientName: string;
  fileName: string;
  folderPath: string;
  organizationName: string;
  uploadDate: Date;
}

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
      padding: 32px 24px;
      text-align: center;
      color: white;
    }
    .header-urgent {
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
    }
    .header-warning {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    }
    .header-info {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
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
    .info-box-urgent {
      border-left-color: #dc2626;
      background: #fef2f2;
    }
    .info-box-warning {
      border-left-color: #f59e0b;
      background: #fffbeb;
    }
    .info-box strong {
      color: #1f2937;
      display: block;
      margin-bottom: 4px;
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

function getUrgencyLevel(notificationType: string): 'urgent' | 'warning' | 'info' {
  if (notificationType.includes('today') || notificationType.includes('expired') || notificationType === 'past_due') {
    return 'urgent';
  }
  if (notificationType.includes('1d') || notificationType.includes('2d') || notificationType.includes('3d')) {
    return 'warning';
  }
  return 'info';
}

function getHeaderIcon(notificationType: string): string {
  if (notificationType.startsWith('expiration')) return '📅';
  if (notificationType.startsWith('due_date')) return '⏰';
  if (notificationType === 'past_due') return '⚠️';
  if (notificationType === 'document_expired') return '❌';
  return '🔔';
}

export async function sendNotificationEmail(params: NotificationEmailParams): Promise<{ ok: boolean; error?: string }> {
  const { userEmail, userName, documentName, notificationType, title, message, date } = params;

  const urgency = getUrgencyLevel(notificationType);
  const icon = getHeaderIcon(notificationType);
  const headerClass = urgency === 'urgent' ? 'header-urgent' : urgency === 'warning' ? 'header-warning' : 'header-info';
  const infoBoxClass = urgency === 'urgent' ? 'info-box-urgent' : urgency === 'warning' ? 'info-box-warning' : '';

  const dateFormatted = date ? new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : '';

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://securevault.com';

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
        <div class="header ${headerClass}">
          <h1>${icon} ${title}</h1>
        </div>
        <div class="content">
          <p>Hello ${userName},</p>

          <p>${message}</p>

          <div class="info-box ${infoBoxClass}">
            <strong>Document:</strong> ${documentName}<br>
            ${dateFormatted ? `<strong>Date:</strong> ${dateFormatted}` : ''}
          </div>

          <p>Please take the necessary action to ensure your documents remain up to date.</p>

          <div style="text-align: center;">
            <a href="${appUrl}/documents" class="button">View Your Documents</a>
          </div>

          <p style="margin-top: 24px; font-size: 14px; color: #6b7280;">
            This is an automated reminder from SecureVault Docs. You can manage your notification preferences in your account settings.
          </p>
        </div>
        <div class="footer">
          <p>Powered by SecureVault Docs</p>
          <p><a href="${appUrl}/settings">Manage Notification Preferences</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
${title}

Hello ${userName},

${message}

Document: ${documentName}
${dateFormatted ? `Date: ${dateFormatted}` : ''}

Please take the necessary action to ensure your documents remain up to date.

View your documents at: ${appUrl}/documents

---
This is an automated reminder from SecureVault Docs.
Manage notification preferences: ${appUrl}/settings
  `.trim();

  return sendEmail({
    to: userEmail,
    subject: title,
    html,
    text,
  });
}

export async function sendStorageAlertEmail(params: StorageAlertEmailParams): Promise<{ ok: boolean; error?: string }> {
  const { userEmail, userName, usedBytes, totalBytes, percentUsed, vaultName } = params;

  const formatBytes = (bytes: number): string => {
    if (bytes >= 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
    }
    if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  const usedFormatted = formatBytes(usedBytes);
  const totalFormatted = formatBytes(totalBytes);

  let title: string;
  let urgency: 'urgent' | 'warning' | 'info';
  let messageText: string;

  if (percentUsed >= 100) {
    title = `Storage Full - ${vaultName}`;
    urgency = 'urgent';
    messageText = 'Your storage is full. You will not be able to upload new files until you free up space or upgrade your plan.';
  } else if (percentUsed >= 90) {
    title = `Storage Critical - ${vaultName}`;
    urgency = 'urgent';
    messageText = 'Your storage is almost full. Consider deleting unused files or upgrading your plan to avoid interruptions.';
  } else {
    title = `Storage Warning - ${vaultName}`;
    urgency = 'warning';
    messageText = 'Your storage is filling up. You may want to review your files and consider upgrading if needed.';
  }

  const headerClass = urgency === 'urgent' ? 'header-urgent' : 'header-warning';
  const infoBoxClass = urgency === 'urgent' ? 'info-box-urgent' : 'info-box-warning';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://securevault.com';

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
        <div class="header ${headerClass}">
          <h1>💾 ${title}</h1>
        </div>
        <div class="content">
          <p>Hello ${userName},</p>

          <p>${messageText}</p>

          <div class="info-box ${infoBoxClass}">
            <strong>Storage Usage:</strong>
            <div style="margin-top: 8px;">
              <div style="background: #e5e7eb; border-radius: 4px; height: 12px; overflow: hidden;">
                <div style="background: ${percentUsed >= 90 ? '#dc2626' : '#f59e0b'}; height: 100%; width: ${Math.min(percentUsed, 100)}%;"></div>
              </div>
              <p style="margin: 8px 0 0 0; font-size: 14px;">${usedFormatted} of ${totalFormatted} used (${percentUsed.toFixed(0)}%)</p>
            </div>
          </div>

          <div style="text-align: center;">
            <a href="${appUrl}/settings/storage" class="button">Manage Storage</a>
          </div>
        </div>
        <div class="footer">
          <p>Powered by SecureVault Docs</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
${title}

Hello ${userName},

${messageText}

Storage Usage: ${usedFormatted} of ${totalFormatted} (${percentUsed.toFixed(0)}%)

Manage your storage at: ${appUrl}/settings/storage

---
Powered by SecureVault Docs
  `.trim();

  return sendEmail({
    to: userEmail,
    subject: title,
    html,
    text,
  });
}

export async function sendClientUploadNotification(params: ClientUploadEmailParams): Promise<{ ok: boolean; error?: string }> {
  const { ownerEmail, ownerName, clientName, fileName, folderPath, organizationName, uploadDate } = params;

  const dateFormatted = uploadDate.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://securevault.com';

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
        <div class="header header-info">
          <h1>📥 New Client Upload</h1>
        </div>
        <div class="content">
          <p>Hello ${ownerName},</p>

          <p>A client has uploaded a new file to your organization.</p>

          <div class="info-box">
            <strong>📄 File:</strong> ${fileName}<br>
            <strong>👤 Client:</strong> ${clientName}<br>
            <strong>📁 Folder:</strong> ${folderPath}<br>
            <strong>🕐 Uploaded:</strong> ${dateFormatted}
          </div>

          <p>The file is now available in your ${organizationName} vault.</p>

          <div style="text-align: center;">
            <a href="${appUrl}/documents" class="button">View Documents</a>
          </div>
        </div>
        <div class="footer">
          <p>Powered by SecureVault Docs</p>
          <p>${organizationName}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
New Client Upload

Hello ${ownerName},

A client has uploaded a new file to your organization.

File: ${fileName}
Client: ${clientName}
Folder: ${folderPath}
Uploaded: ${dateFormatted}

The file is now available in your ${organizationName} vault.

View documents at: ${appUrl}/documents

---
Powered by SecureVault Docs
${organizationName}
  `.trim();

  return sendEmail({
    to: ownerEmail,
    subject: `${clientName} uploaded "${fileName}" to ${organizationName}`,
    html,
    text,
  });
}
