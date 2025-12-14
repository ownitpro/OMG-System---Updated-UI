export const contractorsROI = {
  industry: 'Contractors',
  slug: 'contractors',
  title: 'Contractors ROI Calculator',
  description: 'Calculate your time and cost savings with automated contractor workflows.',
  inputs: [
    {
      id: 'projectsPerYear',
      label: 'Projects per year',
      type: 'number',
      min: 1,
      max: 200,
      default: 24,
      unit: 'projects',
      helperText: 'Number of projects completed annually'
    },
    {
      id: 'avgProjectValue',
      label: 'Average project value',
      type: 'number',
      min: 1000,
      max: 1000000,
      default: 25000,
      unit: 'CAD',
      helperText: 'Average value of your projects'
    },
    {
      id: 'teamSize',
      label: 'Team size',
      type: 'select',
      options: [
        { value: 1, label: 'Solo contractor' },
        { value: 3, label: '2-4 people' },
        { value: 8, label: '5-10 people' },
        { value: 15, label: '11-20 people' },
        { value: 30, label: '21+ people' }
      ],
      default: 8,
      helperText: 'Number of people in your team'
    },
    {
      id: 'leadsPerMonth',
      label: 'New leads per month',
      type: 'number',
      min: 0,
      max: 500,
      default: 30,
      unit: 'leads',
      helperText: 'Average new leads generated monthly'
    },
    {
      id: 'estimatesPerMonth',
      label: 'Estimates per month',
      type: 'number',
      min: 0,
      max: 100,
      default: 20,
      unit: 'estimates',
      helperText: 'Average estimates provided monthly'
    },
    {
      id: 'materialCosts',
      label: 'Material costs per project',
      type: 'number',
      min: 100,
      max: 100000,
      default: 8000,
      unit: 'CAD',
      helperText: 'Average material costs per project'
    }
  ],
  calculations: {
    timeSavedHours: (inputs: any) => {
      const baseHours = 25; // Base admin time
      const projectFactor = inputs.projectsPerYear * 1.5; // 1.5 hours per project
      const leadFactor = inputs.leadsPerMonth * 0.3; // 0.3 hours per lead
      const estimateFactor = inputs.estimatesPerMonth * 1; // 1 hour per estimate
      const teamFactor = inputs.teamSize * 3; // 3 hours per team member
      
      return baseHours + projectFactor + leadFactor + estimateFactor + teamFactor;
    },
    costSaved: (inputs: any) => {
      const hourlyRate = 40; // Average hourly rate for contractors
      const timeSaved = contractorsROI.calculations.timeSavedHours(inputs);
      return timeSaved * hourlyRate;
    },
    revenueLift: (inputs: any) => {
      const efficiencyIncrease = 0.08; // 8% improvement in project efficiency
      const additionalProjects = inputs.projectsPerYear * efficiencyIncrease;
      const avgProfit = inputs.avgProjectValue * 0.2; // 20% profit margin
      return additionalProjects * avgProfit;
    },
    paybackWeeks: (inputs: any) => {
      const monthlySavings = contractorsROI.calculations.costSaved(inputs) + 
                           contractorsROI.calculations.revenueLift(inputs);
      const setupCost = 1800; // Estimated setup cost
      return (setupCost / monthlySavings) * 4.33; // 4.33 weeks per month
    }
  },
  assumptions: {
    timeSavings: [
      'Automated lead capture and qualification',
      'Streamlined estimate generation',
      'Automated project scheduling and coordination',
      'Digital material ordering and tracking',
      'Automated client communication and updates'
    ],
    costFactors: [
      'Reduced manual paperwork and data entry',
      'Fewer scheduling conflicts and delays',
      'Faster estimate turnaround times',
      'Reduced material waste and over-ordering',
      'Improved project coordination efficiency'
    ],
    revenueFactors: [
      'Better lead conversion through faster response',
      'More accurate estimates and pricing',
      'Faster project completion',
      'Higher client satisfaction and referrals',
      'Reduced project delays and change orders'
    ]
  },
  faqs: [
    {
      question: 'How does this work for different types of contractors?',
      answer: 'The calculator works for most contractor types. Adjust the average project value and material costs to match your specific trade and market.'
    },
    {
      question: 'What about seasonal variations?',
      answer: 'The calculator uses annual averages. For seasonal businesses, consider running separate calculations for peak and off-peak periods.'
    },
    {
      question: 'How long does implementation take?',
      answer: 'Most contractor automations can be implemented within 2-3 weeks, starting with lead capture and estimate generation.'
    }
  ],
  cta: {
    primary: {
      text: 'Book a demo',
      href: '/campaign/leadflow'
    },
    secondary: {
      text: 'See contractors demo',
      href: '/demo/contractors'
    }
  }
};
