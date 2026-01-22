// src/types/email-template.ts
// Type definitions for email template management system

/**
 * Email template database model
 */
export interface EmailTemplate {
  id: string;
  organizationId: string;
  name: string;
  description: string | null;
  slug: string;
  type: string;
  subject: string;
  htmlContent: string;
  textContent: string | null;
  variables: string[]; // Array of variable names like ["clientName", "portalUrl"]
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdById: string | null;
}

/**
 * Supported email template types (12 total)
 */
export type EmailTemplateType =
  | 'portal_created'           // Client portal invitation with PIN and access link
  | 'document_uploaded'        // Admin notification when new document is uploaded
  | 'request_completed'        // Request completion notification to requestor
  | 'client_upload_notification' // Admin notification when client uploads files
  | 'welcome_email'            // New user welcome email (personal/business variants)
  | 'password_reset'           // Password reset link email
  | 'password_changed'         // Password change confirmation email
  | 'request_created'          // Document request notification to client
  | 'upload_confirmation'      // Client upload success confirmation
  | 'portal_expiring'          // Portal expiration warning notification
  | 'request_reminder'         // Request due date reminder notification
  | 'expiration_reminder';     // Document/item expiration reminder notification

/**
 * DTO for creating a new email template
 */
export interface CreateEmailTemplateDto {
  name: string;
  description?: string;
  slug: string;
  type: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
  variables?: string[];
  isActive?: boolean;
}

/**
 * DTO for updating an existing email template
 */
export interface UpdateEmailTemplateDto {
  name?: string;
  description?: string;
  subject?: string;
  htmlContent?: string;
  textContent?: string;
  variables?: string[];
  isActive?: boolean;
}

/**
 * Template preview request
 */
export interface TemplatePreviewRequest {
  testEmail: string;
  sampleData: Record<string, string>;
}

/**
 * Available email template variables with descriptions
 * Used for UI helpers and documentation
 */
export const EMAIL_TEMPLATE_VARIABLES: Record<string, { label: string; description: string; example: string }> = {
  clientName: {
    label: 'Client Name',
    description: "Client's full name or contact name",
    example: 'John Smith'
  },
  clientEmail: {
    label: 'Client Email',
    description: "Client's email address",
    example: 'john@example.com'
  },
  orgName: {
    label: 'Organization Name',
    description: 'Your organization or business name',
    example: 'Acme Corp'
  },
  portalUrl: {
    label: 'Portal URL',
    description: 'Link to the client portal',
    example: 'https://app.securevaultdocs.com/portal/abc123'
  },
  pin: {
    label: 'Access PIN',
    description: 'Portal access PIN code',
    example: '1234'
  },
  fileName: {
    label: 'File Name',
    description: 'Name of the uploaded or requested file',
    example: 'contract.pdf'
  },
  documentName: {
    label: 'Document Name',
    description: 'Name of the document',
    example: 'Q4 Financial Report'
  },
  requestTitle: {
    label: 'Request Title',
    description: 'Title of the document request',
    example: 'Tax Documents Request'
  },
  expiryDate: {
    label: 'Expiry Date',
    description: 'Expiration date (formatted)',
    example: 'December 31, 2024'
  },
  expiryText: {
    label: 'Expiry Text',
    description: 'Human-readable expiration information',
    example: 'Expires in 7 days'
  },
  dueDate: {
    label: 'Due Date',
    description: 'Request or task due date',
    example: 'January 15, 2025'
  },
  itemCount: {
    label: 'Item Count',
    description: 'Number of items, documents, or files',
    example: '5'
  },
  uploadCount: {
    label: 'Upload Count',
    description: 'Number of uploaded files',
    example: '3'
  },
  requestDescription: {
    label: 'Request Description',
    description: 'Description or details of the request',
    example: 'Please upload your tax documents for 2024'
  },
  userName: {
    label: 'User Name',
    description: "User's full name",
    example: 'Jane Doe'
  },
  userEmail: {
    label: 'User Email',
    description: "User's email address",
    example: 'jane@example.com'
  },
  resetLink: {
    label: 'Reset Link',
    description: 'Password reset link URL',
    example: 'https://app.securevaultdocs.com/reset-password?token=xyz'
  },
  verificationCode: {
    label: 'Verification Code',
    description: 'Email verification or confirmation code',
    example: '123456'
  },
  loginUrl: {
    label: 'Login URL',
    description: 'Application login page URL',
    example: 'https://app.securevaultdocs.com/login'
  },
  supportEmail: {
    label: 'Support Email',
    description: 'Customer support email address',
    example: 'support@securevaultdocs.com'
  },
  daysRemaining: {
    label: 'Days Remaining',
    description: 'Number of days until expiration/due date',
    example: '7'
  },
  storageUsed: {
    label: 'Storage Used',
    description: 'Amount of storage space used',
    example: '450 MB'
  },
  storageLimit: {
    label: 'Storage Limit',
    description: 'Total storage space available',
    example: '1 GB'
  },
};

/**
 * Template type metadata for categorization and UI display
 */
export const TEMPLATE_TYPE_INFO: Record<EmailTemplateType, {
  category: string;
  displayName: string;
  description: string;
  suggestedVariables: string[];
}> = {
  portal_created: {
    category: 'Portal',
    displayName: 'Portal Created',
    description: 'Sent when a new client portal is created and shared',
    suggestedVariables: ['clientName', 'orgName', 'portalUrl', 'pin', 'expiryText']
  },
  document_uploaded: {
    category: 'Portal',
    displayName: 'Document Uploaded',
    description: 'Notifies admin when a new document is uploaded',
    suggestedVariables: ['fileName', 'clientName', 'orgName']
  },
  request_completed: {
    category: 'Request',
    displayName: 'Request Completed',
    description: 'Sent when a document request is fulfilled',
    suggestedVariables: ['requestTitle', 'clientName', 'itemCount']
  },
  client_upload_notification: {
    category: 'Portal',
    displayName: 'Client Upload Notification',
    description: 'Notifies admin when client uploads files to portal',
    suggestedVariables: ['clientName', 'uploadCount', 'portalUrl']
  },
  welcome_email: {
    category: 'Authentication',
    displayName: 'Welcome Email',
    description: 'Welcome message for new user signups',
    suggestedVariables: ['userName', 'userEmail', 'loginUrl']
  },
  password_reset: {
    category: 'Authentication',
    displayName: 'Password Reset',
    description: 'Password reset link and instructions',
    suggestedVariables: ['userName', 'resetLink', 'supportEmail']
  },
  password_changed: {
    category: 'Authentication',
    displayName: 'Password Changed',
    description: 'Confirmation that password was changed',
    suggestedVariables: ['userName', 'userEmail', 'supportEmail']
  },
  request_created: {
    category: 'Request',
    displayName: 'Request Created',
    description: 'Notifies client of a new document request',
    suggestedVariables: ['clientName', 'requestTitle', 'requestDescription', 'dueDate']
  },
  upload_confirmation: {
    category: 'Portal',
    displayName: 'Upload Confirmation',
    description: 'Confirms successful file upload to client',
    suggestedVariables: ['clientName', 'fileName', 'uploadCount']
  },
  portal_expiring: {
    category: 'Notification',
    displayName: 'Portal Expiring',
    description: 'Warning that portal access will expire soon',
    suggestedVariables: ['clientName', 'portalUrl', 'expiryDate', 'daysRemaining']
  },
  request_reminder: {
    category: 'Notification',
    displayName: 'Request Reminder',
    description: 'Reminder about pending document request',
    suggestedVariables: ['clientName', 'requestTitle', 'dueDate', 'daysRemaining']
  },
  expiration_reminder: {
    category: 'Notification',
    displayName: 'Expiration Reminder',
    description: 'Reminder that documents or items are expiring soon',
    suggestedVariables: ['documentName', 'expiryDate', 'daysRemaining', 'itemCount']
  },
};

/**
 * Helper function to get suggested variables for a template type
 */
export function getSuggestedVariables(templateType: EmailTemplateType): string[] {
  return TEMPLATE_TYPE_INFO[templateType]?.suggestedVariables || [];
}

/**
 * Helper function to get template category
 */
export function getTemplateCategory(templateType: EmailTemplateType): string {
  return TEMPLATE_TYPE_INFO[templateType]?.category || 'Other';
}

/**
 * Get all unique categories
 */
export function getTemplateCategories(): string[] {
  const categories = Object.values(TEMPLATE_TYPE_INFO).map(info => info.category);
  return Array.from(new Set(categories)).sort();
}
