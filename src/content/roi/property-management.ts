export const propertyManagementROI = {
  industry: 'Property Management',
  slug: 'property-management',
  title: 'Property Management ROI Calculator',
  description: 'Calculate your time and cost savings with automated property management workflows.',
  inputs: [
    {
      id: 'properties',
      label: 'Number of properties managed',
      type: 'number',
      min: 1,
      max: 1000,
      default: 50,
      unit: 'properties',
      helperText: 'Total properties in your portfolio'
    },
    {
      id: 'units',
      label: 'Total units',
      type: 'number',
      min: 1,
      max: 10000,
      default: 200,
      unit: 'units',
      helperText: 'Total rental units across all properties'
    },
    {
      id: 'teamSize',
      label: 'Team size',
      type: 'select',
      options: [
        { value: 1, label: '1 person' },
        { value: 2, label: '2-3 people' },
        { value: 5, label: '4-6 people' },
        { value: 10, label: '7-15 people' },
        { value: 20, label: '16+ people' }
      ],
      default: 5,
      helperText: 'Number of people managing properties'
    },
    {
      id: 'avgRent',
      label: 'Average rent per unit',
      type: 'number',
      min: 500,
      max: 5000,
      default: 1500,
      unit: 'CAD',
      helperText: 'Monthly rent per unit'
    },
    {
      id: 'maintenanceCalls',
      label: 'Maintenance calls per month',
      type: 'number',
      min: 0,
      max: 1000,
      default: 25,
      unit: 'calls',
      helperText: 'Average maintenance requests per month'
    },
    {
      id: 'tenantTurnover',
      label: 'Tenant turnover rate',
      type: 'number',
      min: 0,
      max: 100,
      default: 15,
      unit: '%',
      helperText: 'Percentage of units that turn over annually'
    }
  ],
  calculations: {
    timeSavedHours: (inputs: any) => {
      const baseHours = 20; // Base admin time
      const propertyFactor = inputs.properties * 0.5; // 0.5 hours per property
      const unitFactor = inputs.units * 0.1; // 0.1 hours per unit
      const maintenanceFactor = inputs.maintenanceCalls * 0.3; // 0.3 hours per call
      const turnoverFactor = (inputs.units * inputs.tenantTurnover / 100) * 2; // 2 hours per turnover
      
      return baseHours + propertyFactor + unitFactor + maintenanceFactor + turnoverFactor;
    },
    costSaved: (inputs: any) => {
      const hourlyRate = 35; // Average hourly rate in Ontario
      const timeSaved = propertyManagementROI.calculations.timeSavedHours(inputs);
      return timeSaved * hourlyRate;
    },
    revenueLift: (inputs: any) => {
      const rentIncrease = 0.02; // 2% rent increase from better management
      const monthlyRent = inputs.units * inputs.avgRent;
      return monthlyRent * rentIncrease;
    },
    paybackWeeks: (inputs: any) => {
      const monthlySavings = propertyManagementROI.calculations.costSaved(inputs) + 
                           propertyManagementROI.calculations.revenueLift(inputs);
      const setupCost = 2000; // Estimated setup cost
      return (setupCost / monthlySavings) * 4.33; // 4.33 weeks per month
    }
  },
  assumptions: {
    timeSavings: [
      'Automated rent collection and reminders',
      'Streamlined maintenance request handling',
      'Automated tenant screening and onboarding',
      'Digital lease management and renewals',
      'Automated owner statements and reporting'
    ],
    costFactors: [
      'Reduced manual data entry and paperwork',
      'Fewer missed rent payments',
      'Faster maintenance response times',
      'Reduced tenant turnover costs',
      'Improved owner satisfaction and retention'
    ],
    revenueFactors: [
      'Better tenant retention through improved service',
      'Faster rent collection and reduced arrears',
      'Optimized rent pricing through market analysis',
      'Reduced vacancy periods',
      'Additional revenue from value-added services'
    ]
  },
  faqs: [
    {
      question: 'How accurate are these calculations?',
      answer: 'These are estimates based on typical property management workflows in Ontario. Actual savings may vary based on your current processes and team efficiency.'
    },
    {
      question: 'What if I have mixed property types?',
      answer: 'The calculator works best for residential properties. For commercial or mixed portfolios, consider running separate calculations for each property type.'
    },
    {
      question: 'How long does implementation take?',
      answer: 'Most property management automations can be implemented within 2-4 weeks, starting with the highest-impact workflows like rent collection and maintenance requests.'
    }
  ],
  cta: {
    primary: {
      text: 'Book a demo',
      href: '/campaign/leadflow'
    },
    secondary: {
      text: 'See property management demo',
      href: '/demo/property-management'
    }
  }
};
