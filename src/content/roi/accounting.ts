export const accountingROI = {
  industry: 'Accounting',
  slug: 'accounting',
  title: 'Accounting ROI Calculator',
  description: 'Calculate your time and cost savings with automated accounting workflows.',
  inputs: [
    {
      id: 'clients',
      label: 'Number of clients',
      type: 'number',
      min: 1,
      max: 1000,
      default: 50,
      unit: 'clients',
      helperText: 'Total number of active clients'
    },
    {
      id: 'avgClientValue',
      label: 'Average client value',
      type: 'number',
      min: 500,
      max: 50000,
      default: 5000,
      unit: 'CAD',
      helperText: 'Annual revenue per client'
    },
    {
      id: 'teamSize',
      label: 'Team size',
      type: 'select',
      options: [
        { value: 1, label: 'Solo practitioner' },
        { value: 3, label: '2-4 people' },
        { value: 8, label: '5-10 people' },
        { value: 15, label: '11-20 people' },
        { value: 30, label: '21+ people' }
      ],
      default: 3,
      helperText: 'Number of people in your firm'
    },
    {
      id: 'taxReturns',
      label: 'Tax returns per year',
      type: 'number',
      min: 0,
      max: 1000,
      default: 200,
      unit: 'returns',
      helperText: 'Number of tax returns prepared annually'
    },
    {
      id: 'bookkeepingClients',
      label: 'Bookkeeping clients',
      type: 'number',
      min: 0,
      max: 500,
      default: 30,
      unit: 'clients',
      helperText: 'Clients with ongoing bookkeeping services'
    },
    {
      id: 'documentRequests',
      label: 'Document requests per month',
      type: 'number',
      min: 0,
      max: 500,
      default: 50,
      unit: 'requests',
      helperText: 'Average document requests from clients monthly'
    }
  ],
  calculations: {
    timeSavedHours: (inputs: any) => {
      const baseHours = 30; // Base admin time
      const clientFactor = inputs.clients * 0.5; // 0.5 hours per client
      const taxFactor = inputs.taxReturns * 0.3; // 0.3 hours per return
      const bookkeepingFactor = inputs.bookkeepingClients * 2; // 2 hours per bookkeeping client
      const documentFactor = inputs.documentRequests * 0.2; // 0.2 hours per document request
      const teamFactor = inputs.teamSize * 4; // 4 hours per team member
      
      return baseHours + clientFactor + taxFactor + bookkeepingFactor + documentFactor + teamFactor;
    },
    costSaved: (inputs: any) => {
      const hourlyRate = 50; // Average hourly rate for accounting professionals
      const timeSaved = accountingROI.calculations.timeSavedHours(inputs);
      return timeSaved * hourlyRate;
    },
    revenueLift: (inputs: any) => {
      const efficiencyIncrease = 0.12; // 12% improvement in efficiency
      const additionalClients = inputs.clients * efficiencyIncrease;
      const avgClientValue = inputs.avgClientValue;
      return additionalClients * avgClientValue;
    },
    paybackWeeks: (inputs: any) => {
      const monthlySavings = accountingROI.calculations.costSaved(inputs) + 
                           accountingROI.calculations.revenueLift(inputs);
      const setupCost = 2200; // Estimated setup cost
      return (setupCost / monthlySavings) * 4.33; // 4.33 weeks per month
    }
  },
  assumptions: {
    timeSavings: [
      'Automated client onboarding and document collection',
      'Streamlined tax return preparation',
      'Automated bookkeeping and reconciliation',
      'Digital document management and sharing',
      'Automated client communication and reminders'
    ],
    costFactors: [
      'Reduced manual data entry and paperwork',
      'Fewer client follow-ups and document requests',
      'Faster tax return preparation',
      'Reduced errors and rework',
      'Improved client satisfaction and retention'
    ],
    revenueFactors: [
      'Better client retention through improved service',
      'Faster turnaround times for tax returns',
      'More accurate bookkeeping and reporting',
      'Reduced client churn',
      'Additional revenue from value-added services'
    ]
  },
  faqs: [
    {
      question: 'How does this apply to different accounting specialties?',
      answer: 'The calculator works for most accounting practices. Adjust the average client value and services to match your specialty (tax, bookkeeping, audit, etc.).'
    },
    {
      question: 'What about seasonal variations?',
      answer: 'The calculator uses annual averages. For tax-focused practices, consider the impact of tax season on your calculations.'
    },
    {
      question: 'How quickly can I see results?',
      answer: 'Most accounting automations show results within 2-4 weeks, with full impact visible after 2-3 months as your processes improve.'
    }
  ],
  cta: {
    primary: {
      text: 'Book a demo',
      href: '/campaign/leadflow'
    },
    secondary: {
      text: 'See accounting demo',
      href: '/demo/accounting'
    }
  }
};
