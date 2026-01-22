// src/lib/marketplace/templatePreviews.ts
// Template preview data showing what gets installed

export type TemplatePreview = {
  folders?: string[];
  labels?: string[];
  quickActions?: string[];
  requests?: string[];
  shares?: string[];
  analytics?: string[];
  intakeLinks?: string[];
  checklists?: string[];
};

export const templatePreviews: Record<string, TemplatePreview> = {
  'tpl-personal-life': {
    folders: [
      'IDs',
      'Bills',
      'Receipts',
      'Tax',
      '2025/January',
      '2025/February',
      '2025/March',
      '2025/April',
      '2025/May',
      '2025/June',
      '2025/July',
      '2025/August',
      '2025/September',
      '2025/October',
      '2025/November',
      '2025/December'
    ],
    labels: [
      'Important',
      'Tax Document',
      'Bill',
      'Receipt',
      'ID',
      'Medical'
    ],
    quickActions: [
      'Upload Bill',
      'Scan Receipt',
      'Add Tax Document',
      'Organize by Month'
    ],
    checklists: [
      'Set up monthly bill reminders',
      'Organize receipts by category',
      'Prepare tax documents folder'
    ]
  },
  'tpl-biz-generic': {
    folders: [
      'Requests',
      'Share Links',
      'Analytics'
    ],
    requests: [
      'KYC Document Request',
      'Year-end Package Request',
      'Invoice Request Template'
    ],
    shares: [
      'Client Portal Share',
      'Document Share Template',
      'Secure Link Template'
    ],
    analytics: [
      'Upload Activity Dashboard',
      'Client Engagement Metrics',
      'Document Processing Stats'
    ],
    quickActions: [
      'Create Request',
      'Generate Share Link',
      'View Analytics'
    ]
  },
  'tpl-acc-starter': {
    folders: [
      'Clients',
      'Tax Returns',
      'Financial Statements',
      'Receipts',
      'Invoices',
      'Bank Statements',
      'Payroll'
    ],
    labels: [
      'Client: Acme Corp',
      'Client: Maple Homes',
      'Tax Year 2024',
      'Tax Year 2025',
      'Pending Review',
      'Approved',
      'Filed'
    ],
    intakeLinks: [
      'Client Onboarding Form',
      'Tax Document Intake',
      'Receipt Upload Portal',
      'Invoice Submission Link'
    ],
    quickActions: [
      'Add New Client',
      'Create Tax Return Folder',
      'Generate Intake Link',
      'Label Documents'
    ],
    checklists: [
      'Set up client folder structure',
      'Configure intake links',
      'Create tax year folders',
      'Set up document labels'
    ]
  }
};

