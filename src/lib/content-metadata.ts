/**
 * Content Metadata System
 * 
 * This system manages metadata for all content types to control
 * what gets ingested into the chatbot knowledge base.
 */

export interface ContentMetadata {
  id: string;
  title: string;
  description: string;
  type: 'page' | 'industry' | 'app' | 'automation' | 'blog' | 'case-study' | 'faq' | 'roi';
  url: string;
  ingest: boolean; // Whether this content should be ingested
  priority: 'high' | 'medium' | 'low'; // Priority for retrieval
  tags: string[];
  lastUpdated: string;
  contentSnippets?: string[]; // Micro-content snippets
}

export interface ContentSource {
  id: string;
  name: string;
  description: string;
  type: 'file' | 'api' | 'cms';
  path: string;
  ingest: boolean;
  metadata: ContentMetadata[];
}

// Content sources configuration
export const CONTENT_SOURCES: ContentSource[] = [
  {
    id: 'industries',
    name: 'Industry Pages',
    description: 'Industry-specific solutions and content',
    type: 'file',
    path: 'src/content',
    ingest: true,
    metadata: [
      {
        id: 'property-management',
        title: 'Property Management Solutions',
        description: 'Comprehensive property management automation and tools',
        type: 'industry',
        url: '/industries/property-management',
        ingest: true,
        priority: 'high',
        tags: ['property', 'management', 'automation', 'real-estate'],
        lastUpdated: '2025-01-15',
        contentSnippets: [
          'Property management software for landlords and property managers',
          'Automated tenant screening and lease management',
          'Maintenance request tracking and vendor management',
          'Financial reporting and owner statements'
        ]
      },
      {
        id: 'real-estate',
        title: 'Real Estate Solutions',
        description: 'Real estate agent and broker automation tools',
        type: 'industry',
        url: '/industries/real-estate',
        ingest: true,
        priority: 'high',
        tags: ['real-estate', 'agents', 'brokers', 'automation'],
        lastUpdated: '2025-01-15',
        contentSnippets: [
          'CRM for real estate agents and brokers',
          'Lead management and follow-up automation',
          'Property listing management',
          'Client communication and marketing tools'
        ]
      },
      {
        id: 'contractors',
        title: 'Contractor Solutions',
        description: 'Construction and contractor business management',
        type: 'industry',
        url: '/industries/contractors',
        ingest: true,
        priority: 'high',
        tags: ['contractors', 'construction', 'project-management', 'automation'],
        lastUpdated: '2025-01-15',
        contentSnippets: [
          'Project management for contractors',
          'Quote generation and job tracking',
          'Client communication and scheduling',
          'Financial management and invoicing'
        ]
      },
      {
        id: 'accounting',
        title: 'Accounting Solutions',
        description: 'Accounting firm automation and client management',
        type: 'industry',
        url: '/industries/accounting',
        ingest: true,
        priority: 'high',
        tags: ['accounting', 'bookkeeping', 'tax', 'automation'],
        lastUpdated: '2025-01-15',
        contentSnippets: [
          'Client management for accounting firms',
          'Document collection and organization',
          'Tax preparation automation',
          'Financial reporting and compliance'
        ]
      },
      {
        id: 'cleaning',
        title: 'Cleaning Services Solutions',
        description: 'Cleaning service business management and automation',
        type: 'industry',
        url: '/industries/cleaning',
        ingest: true,
        priority: 'high',
        tags: ['cleaning', 'services', 'scheduling', 'automation'],
        lastUpdated: '2025-01-15',
        contentSnippets: [
          'Scheduling and route optimization',
          'Client management and communication',
          'Quality control and feedback systems',
          'Billing and payment processing'
        ]
      },
      {
        id: 'healthcare',
        title: 'Healthcare Solutions',
        description: 'Healthcare practice management and patient care automation',
        type: 'industry',
        url: '/industries/healthcare',
        ingest: true,
        priority: 'high',
        tags: ['healthcare', 'medical', 'patient-care', 'automation'],
        lastUpdated: '2025-01-15',
        contentSnippets: [
          'Patient management and scheduling',
          'Medical record organization',
          'Appointment reminders and follow-ups',
          'Billing and insurance processing'
        ]
      }
    ]
  },
  {
    id: 'apps',
    name: 'Application Pages',
    description: 'Core application features and capabilities',
    type: 'file',
    path: 'src/content',
    ingest: true,
    metadata: [
      {
        id: 'crm',
        title: 'CRM Application',
        description: 'Customer relationship management system',
        type: 'app',
        url: '/apps/crm',
        ingest: true,
        priority: 'high',
        tags: ['crm', 'customer-management', 'leads', 'contacts'],
        lastUpdated: '2025-01-15',
        contentSnippets: [
          'Centralized customer and lead management',
          'Automated follow-up and nurturing',
          'Pipeline tracking and sales forecasting',
          'Integration with email and calendar systems'
        ]
      },
      {
        id: 'securevault-docs',
        title: 'SecureVault Docs',
        description: 'Secure document management and storage',
        type: 'app',
        url: '/apps/securevault-docs',
        ingest: true,
        priority: 'high',
        tags: ['documents', 'security', 'storage', 'compliance'],
        lastUpdated: '2025-01-15',
        contentSnippets: [
          'Secure document storage and organization',
          'Access control and permissions',
          'Document versioning and audit trails',
          'Compliance with industry standards'
        ]
      },
      {
        id: 'leadflow-engine',
        title: 'LeadFlow Engine',
        description: 'Lead capture and management automation',
        type: 'app',
        url: '/apps/leadflow-engine',
        ingest: true,
        priority: 'high',
        tags: ['leads', 'automation', 'capture', 'management'],
        lastUpdated: '2025-01-15',
        contentSnippets: [
          'Automated lead capture from multiple sources',
          'Lead scoring and qualification',
          'Follow-up automation and nurturing',
          'Integration with CRM and marketing tools'
        ]
      },
      {
        id: 'industry-iq',
        title: 'IndustryIQ',
        description: 'Industry-specific intelligence and insights',
        type: 'app',
        url: '/apps/industry-iq',
        ingest: true,
        priority: 'medium',
        tags: ['intelligence', 'insights', 'analytics', 'industry'],
        lastUpdated: '2025-01-15',
        contentSnippets: [
          'Industry-specific templates and workflows',
          'Best practices and benchmarking',
          'Market insights and trends',
          'Competitive analysis tools'
        ]
      }
    ]
  },
  {
    id: 'automations',
    name: 'Automation Workflows',
    description: 'Ready-to-deploy automation workflows',
    type: 'file',
    path: 'src/content/automations.ts',
    ingest: true,
    metadata: [
      {
        id: 'client-upsert',
        title: 'Client Upsert + Chatbot Summarize & Approval',
        description: 'Automated client identification and response routing',
        type: 'automation',
        url: '/automations#client-upsert',
        ingest: true,
        priority: 'high',
        tags: ['client-management', 'automation', 'approval', 'chatbot'],
        lastUpdated: '2025-01-15',
        contentSnippets: [
          'Automatically identifies new vs existing clients',
          'Summarizes incoming messages for quick review',
          'Routes messages for approval when needed',
          'Sends pre-approved responses automatically'
        ]
      },
      {
        id: 'spreadsheet-sync',
        title: 'Spreadsheet Sync Lead Capture',
        description: 'Automated lead capture to spreadsheets',
        type: 'automation',
        url: '/automations#spreadsheet-sync',
        ingest: true,
        priority: 'high',
        tags: ['leads', 'spreadsheet', 'sync', 'automation'],
        lastUpdated: '2025-01-15',
        contentSnippets: [
          'Automatically syncs form submissions to Google Sheets',
          'Eliminates manual copy-paste work',
          'Real-time lead capture and organization',
          'Integration with Airtable and other tools'
        ]
      },
      {
        id: 'overdue-invoice-reminder',
        title: 'Overdue Invoice Notification',
        description: 'Automated invoice reminder system',
        type: 'automation',
        url: '/automations#overdue-invoice-reminder',
        ingest: true,
        priority: 'high',
        tags: ['invoicing', 'reminders', 'automation', 'billing'],
        lastUpdated: '2025-01-15',
        contentSnippets: [
          'Automatically identifies overdue invoices',
          'Sends branded email reminders',
          'Tracks payment status and follow-ups',
          'Reduces manual billing administration'
        ]
      },
      {
        id: 'meeting-followup',
        title: 'Meeting Follow-Up Summary',
        description: 'Automated meeting summary and action items',
        type: 'automation',
        url: '/automations#meeting-followup',
        ingest: true,
        priority: 'medium',
        tags: ['meetings', 'summaries', 'automation', 'follow-up'],
        lastUpdated: '2025-01-15',
        contentSnippets: [
          'Automatically creates meeting summaries',
          'Extracts action items and next steps',
          'Sends summaries to all participants',
          'Integrates with calendar and CRM systems'
        ]
      },
      {
        id: 'auto-filing',
        title: 'Document Auto-Filing & Tagging',
        description: 'Automated document organization and tagging',
        type: 'automation',
        url: '/automations#auto-filing',
        ingest: true,
        priority: 'medium',
        tags: ['documents', 'organization', 'tagging', 'automation'],
        lastUpdated: '2025-01-15',
        contentSnippets: [
          'Automatically reads and classifies documents',
          'Moves files to correct folders',
          'Adds relevant tags and metadata',
          'Prevents document loss and disorganization'
        ]
      }
    ]
  },
  {
    id: 'blog',
    name: 'Blog Posts',
    description: 'Educational and thought leadership content',
    type: 'file',
    path: 'src/content/blog',
    ingest: true,
    metadata: [
      {
        id: 'property-management-owner-statements',
        title: 'How Ontario Property Managers Cut Owner Statement Time',
        description: 'Case study on property management automation',
        type: 'blog',
        url: '/blog/how-ontario-property-managers-cut-owner-statement-time',
        ingest: true,
        priority: 'medium',
        tags: ['property-management', 'automation', 'case-study', 'ontario'],
        lastUpdated: '2025-01-15',
        contentSnippets: [
          'Property managers reduced owner statement time by 75%',
          'Automated financial reporting and distribution',
          'Improved accuracy and reduced manual errors',
          'Enhanced client satisfaction and retention'
        ]
      },
      {
        id: 'contractor-fast-quote',
        title: 'The 45-Minute Quote: How Ontario Builders Win Jobs Faster',
        description: 'Contractor automation case study',
        type: 'blog',
        url: '/blog/the-45-minute-quote-how-ontario-builders-win-jobs-faster',
        ingest: true,
        priority: 'medium',
        tags: ['contractors', 'quotes', 'automation', 'case-study'],
        lastUpdated: '2025-01-15',
        contentSnippets: [
          'Contractors reduced quote time from hours to 45 minutes',
          'Automated quote generation and pricing',
          'Improved win rates and customer satisfaction',
          'Streamlined project estimation process'
        ]
      },
      {
        id: 'healthcare-careflow',
        title: 'From Paper Charts to CareFlow: How Ontario Clinics Reduced Admin Time',
        description: 'Healthcare automation case study',
        type: 'blog',
        url: '/blog/from-paper-charts-to-careflow-how-ontario-clinics-reduced-admin-time',
        ingest: true,
        priority: 'medium',
        tags: ['healthcare', 'automation', 'case-study', 'admin'],
        lastUpdated: '2025-01-15',
        contentSnippets: [
          'Healthcare clinics reduced admin time by 60%',
          'Digitized patient records and workflows',
          'Automated appointment scheduling and reminders',
          'Improved patient care and staff efficiency'
        ]
      }
    ]
  },
  {
    id: 'case-snapshots',
    name: 'Case Studies',
    description: 'Detailed case studies and success stories',
    type: 'file',
    path: 'src/content/case-snapshots.ts',
    ingest: true,
    metadata: [
      {
        id: 'property-management-3-day',
        title: 'Property Management 3-Day Turnaround',
        description: 'Case study on rapid property management automation',
        type: 'case-study',
        url: '/case-snapshots/property-management-3-day-turnaround',
        ingest: true,
        priority: 'high',
        tags: ['property-management', 'turnaround', 'automation', 'case-study'],
        lastUpdated: '2025-01-15',
        contentSnippets: [
          'Implemented complete property management system in 3 days',
          'Automated tenant screening and lease management',
          'Reduced administrative overhead by 80%',
          'Improved tenant satisfaction and retention'
        ]
      }
    ]
  },
  {
    id: 'roi',
    name: 'ROI Calculators',
    description: 'Return on investment calculators and data',
    type: 'file',
    path: 'src/content/roi',
    ingest: true,
    metadata: [
      {
        id: 'property-management-roi',
        title: 'Property Management ROI Calculator',
        description: 'Calculate ROI for property management automation',
        type: 'roi',
        url: '/roi/property-management',
        ingest: true,
        priority: 'medium',
        tags: ['roi', 'calculator', 'property-management', 'automation'],
        lastUpdated: '2025-01-15',
        contentSnippets: [
          'Calculate time savings from automation',
          'Estimate cost reduction and efficiency gains',
          'Project ROI for property management tools',
          'Compare manual vs automated processes'
        ]
      }
    ]
  }
];

// Helper functions
export function getContentByType(type: string): ContentMetadata[] {
  return CONTENT_SOURCES
    .flatMap(source => source.metadata)
    .filter(content => content.type === type && content.ingest);
}

export function getContentByPriority(priority: 'high' | 'medium' | 'low'): ContentMetadata[] {
  return CONTENT_SOURCES
    .flatMap(source => source.metadata)
    .filter(content => content.priority === priority && content.ingest);
}

export function getContentByTags(tags: string[]): ContentMetadata[] {
  return CONTENT_SOURCES
    .flatMap(source => source.metadata)
    .filter(content => 
      content.ingest && 
      tags.some(tag => content.tags.includes(tag))
    );
}

export function getAllIngestibleContent(): ContentMetadata[] {
  return CONTENT_SOURCES
    .flatMap(source => source.metadata)
    .filter(content => content.ingest);
}
