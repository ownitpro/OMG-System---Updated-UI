export interface WorkflowDefinition {
  id: string;
  name: string;
  icon: string;
  description: string;
  tagline: string;
  pain: string;
  benefit: string;
  inputSchema: FieldDefinition[];
  defaultModules: string[];
  triggerTypes: string[];
  setupCost: number;
  monthlyCost: number;
  estimatedTime: string;
  category: string;
}

export interface FieldDefinition {
  name: string;
  type: 'text' | 'email' | 'url' | 'number' | 'select' | 'checkbox';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  helpText?: string;
  validation?: {
    pattern?: string;
    min?: number;
    max?: number;
  };
}

export const workflowDefinitions: WorkflowDefinition[] = [
  {
    id: 'spreadsheet-sync',
    name: 'Spreadsheet Sync Lead Capture',
    icon: '📊',
    description: 'Automatically sync leads from your website forms to Google Sheets or Excel',
    tagline: 'Never miss a lead again with automated spreadsheet updates',
    pain: 'Manual copy-paste of leads from website forms to spreadsheets is time-consuming and error-prone',
    benefit: 'Leads automatically appear in your spreadsheet within seconds of form submission',
    inputSchema: [
      {
        name: 'spreadsheetUrl',
        type: 'url',
        label: 'Spreadsheet URL',
        placeholder: 'https://docs.google.com/spreadsheets/d/...',
        required: true,
        helpText: 'Share your Google Sheet and copy the sharing URL here'
      },
      {
        name: 'sheetName',
        type: 'text',
        label: 'Sheet Name',
        placeholder: 'Leads',
        required: true,
        helpText: 'The name of the specific sheet tab to add leads to'
      },
      {
        name: 'formFields',
        type: 'text',
        label: 'Form Fields to Capture',
        placeholder: 'name,email,phone,message',
        required: true,
        helpText: 'Comma-separated list of form field names to capture'
      }
    ],
    defaultModules: ['trigger', 'spreadsheet', 'notification'],
    triggerTypes: ['form_submission', 'webhook'],
    setupCost: 150,
    monthlyCost: 25,
    estimatedTime: '1-2 weeks',
    category: 'lead-management'
  },
  {
    id: 'invoice-notification',
    name: 'Overdue Invoice Notification',
    icon: '💰',
    description: 'Automatically send reminder emails for overdue invoices',
    tagline: 'Get paid faster with automated invoice reminders',
    pain: 'Chasing overdue invoices manually is time-consuming and often leads to awkward conversations',
    benefit: 'Professional, automated reminders sent at optimal intervals to improve cash flow',
    inputSchema: [
      {
        name: 'emailTemplate',
        type: 'text',
        label: 'Email Template',
        placeholder: 'Subject: Invoice Reminder - Action Required',
        required: true,
        helpText: 'Customize the email subject and message for your brand'
      },
      {
        name: 'reminderSchedule',
        type: 'select',
        label: 'Reminder Schedule',
        required: true,
        options: ['7 days', '14 days', '30 days', 'Custom'],
        helpText: 'How often to send reminders for overdue invoices'
      },
      {
        name: 'maxReminders',
        type: 'number',
        label: 'Maximum Reminders',
        placeholder: '3',
        required: true,
        validation: { min: 1, max: 10 },
        helpText: 'Maximum number of reminder emails to send'
      }
    ],
    defaultModules: ['trigger', 'email', 'delay', 'condition'],
    triggerTypes: ['invoice_overdue', 'scheduled'],
    setupCost: 200,
    monthlyCost: 35,
    estimatedTime: '2-3 weeks',
    category: 'accounting'
  },
  {
    id: 'contract-expiry',
    name: 'Contract Expiry Alert',
    icon: '📋',
    description: 'Get notified before contracts expire and automatically follow up',
    tagline: 'Never lose a client due to missed contract renewals',
    pain: 'Missing contract expiry dates leads to lost revenue and client relationships',
    benefit: 'Proactive contract management with automated renewal reminders and follow-ups',
    inputSchema: [
      {
        name: 'contractDatabase',
        type: 'url',
        label: 'Contract Database URL',
        placeholder: 'https://your-crm.com/contracts',
        required: true,
        helpText: 'URL to your contract management system or CRM'
      },
      {
        name: 'alertDays',
        type: 'number',
        label: 'Alert Days Before Expiry',
        placeholder: '30',
        required: true,
        validation: { min: 1, max: 365 },
        helpText: 'How many days before expiry to send the first alert'
      },
      {
        name: 'followUpSequence',
        type: 'select',
        label: 'Follow-up Sequence',
        required: true,
        options: ['Basic (2 emails)', 'Standard (4 emails)', 'Aggressive (6 emails)'],
        helpText: 'Choose the intensity of your renewal follow-up sequence'
      }
    ],
    defaultModules: ['trigger', 'database', 'email', 'delay', 'condition'],
    triggerTypes: ['scheduled', 'database_change'],
    setupCost: 250,
    monthlyCost: 45,
    estimatedTime: '2-3 weeks',
    category: 'contract-management'
  },
  {
    id: 'appointment-reminder',
    name: 'Appointment Reminder System',
    icon: '📅',
    description: 'Automatically send appointment reminders and handle rescheduling',
    tagline: 'Reduce no-shows and improve customer experience',
    pain: 'No-show appointments waste time and reduce revenue',
    benefit: 'Automated reminders reduce no-shows by 40% and improve customer satisfaction',
    inputSchema: [
      {
        name: 'calendarSystem',
        type: 'select',
        label: 'Calendar System',
        required: true,
        options: ['Google Calendar', 'Outlook', 'Calendly', 'Custom API'],
        helpText: 'Which calendar system do you use for appointments?'
      },
      {
        name: 'reminderTiming',
        type: 'select',
        label: 'Reminder Timing',
        required: true,
        options: ['24 hours before', '48 hours before', '1 week before', 'Custom'],
        helpText: 'When to send appointment reminders'
      },
      {
        name: 'reschedulingEnabled',
        type: 'checkbox',
        label: 'Enable Rescheduling',
        required: false,
        helpText: 'Allow clients to reschedule appointments through the reminder email'
      }
    ],
    defaultModules: ['trigger', 'calendar', 'email', 'sms', 'webhook'],
    triggerTypes: ['appointment_created', 'scheduled'],
    setupCost: 180,
    monthlyCost: 30,
    estimatedTime: '1-2 weeks',
    category: 'scheduling'
  },
  {
    id: 'inventory-alert',
    name: 'Inventory Low Stock Alert',
    icon: '📦',
    description: 'Get notified when inventory levels are low and automatically reorder',
    tagline: 'Never run out of stock with intelligent inventory management',
    pain: 'Stockouts lead to lost sales and frustrated customers',
    benefit: 'Automated inventory monitoring prevents stockouts and optimizes ordering',
    inputSchema: [
      {
        name: 'inventorySystem',
        type: 'select',
        label: 'Inventory System',
        required: true,
        options: ['Shopify', 'WooCommerce', 'QuickBooks', 'Custom API'],
        helpText: 'Which inventory management system do you use?'
      },
      {
        name: 'lowStockThreshold',
        type: 'number',
        label: 'Low Stock Threshold',
        placeholder: '10',
        required: true,
        validation: { min: 1, max: 1000 },
        helpText: 'Alert when inventory drops below this number'
      },
      {
        name: 'autoReorder',
        type: 'checkbox',
        label: 'Enable Auto-Reorder',
        required: false,
        helpText: 'Automatically create purchase orders when stock is low'
      }
    ],
    defaultModules: ['trigger', 'database', 'email', 'webhook', 'condition'],
    triggerTypes: ['inventory_low', 'scheduled'],
    setupCost: 220,
    monthlyCost: 40,
    estimatedTime: '2-3 weeks',
    category: 'inventory'
  }
];

export const workflowCategories = [
  { id: 'all', name: 'All Workflows', icon: '🔧' },
  { id: 'lead-management', name: 'Lead Management', icon: '👥' },
  { id: 'accounting', name: 'Accounting', icon: '💰' },
  { id: 'contract-management', name: 'Contract Management', icon: '📋' },
  { id: 'scheduling', name: 'Scheduling', icon: '📅' },
  { id: 'inventory', name: 'Inventory', icon: '📦' }
];
