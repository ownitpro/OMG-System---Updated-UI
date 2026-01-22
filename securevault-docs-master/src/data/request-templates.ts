// src/data/request-templates.ts
// Request templates by industry (replaces vertical-based templates)

export type RequestTemplateItem = {
  key: string;
  label: string;
  required?: boolean;
};

export type RequestTemplate = {
  key: string;
  title: string;
  description?: string;
  items: RequestTemplateItem[];
};

export const templatesByIndustry: Record<string, RequestTemplate[]> = {
  Custom: [
    {
      key: 'basic',
      title: 'Basic Documents',
      items: [
        { key: 'id', label: 'ID', required: true },
        { key: 'bank', label: 'Bank Statement' },
        { key: 'invoice', label: 'Invoice' },
        { key: 'contract', label: 'Contract' },
      ],
    },
  ],
  Accounting: [
    {
      key: 'tax_docs',
      title: 'Tax documents',
      description: 'Annual tax package.',
      items: [
        { key: 't1_t2', label: 'T1/T2', required: true },
        { key: 'noa', label: 'NOA', required: true },
        { key: 'gst_hst', label: 'GST/HST' },
        { key: 'payroll', label: 'Payroll' },
      ],
    },
  ],
  'Real Estate': [
    {
      key: 'offer_pack',
      title: 'Offer Package',
      description: 'Everything needed to draft an offer.',
      items: [
        { key: 'kyc', label: 'KYC', required: true },
        { key: 'offer', label: 'Offer Package', required: true },
        { key: 'mortgage', label: 'Mortgage Docs' },
      ],
    },
  ],
  Contractors: [
    {
      key: 'permit',
      title: 'Permit',
      description: 'Permit intake package.',
      items: [
        { key: 'permit', label: 'Permit', required: true },
        { key: 'quote', label: 'Quote' },
        { key: 'change_order', label: 'Change Order' },
        { key: 'invoice', label: 'Invoice' },
      ],
    },
  ],
  'Project Management': [
    {
      key: 'signoff',
      title: 'Sign-off Package',
      description: 'Close a milestone with approvals.',
      items: [
        { key: 'sow', label: 'SOW', required: true },
        { key: 'po', label: 'PO' },
        { key: 'signoff', label: 'Sign-off' },
      ],
    },
  ],
};

// Legacy support (deprecated)
export type VerticalTemplates = Record<string, RequestTemplate[]>;

export const REQUEST_TEMPLATES: VerticalTemplates = templatesByIndustry;
