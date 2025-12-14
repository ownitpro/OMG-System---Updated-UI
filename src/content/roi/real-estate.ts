export const realEstateROI = {
  industry: 'Real Estate',
  slug: 'real-estate',
  title: 'Real Estate ROI Calculator',
  description: 'Calculate your time and cost savings with automated real estate workflows.',
  inputs: [
    {
      id: 'transactions',
      label: 'Transactions per year',
      type: 'number',
      min: 1,
      max: 500,
      default: 24,
      unit: 'transactions',
      helperText: 'Number of real estate transactions you complete annually'
    },
    {
      id: 'avgSalePrice',
      label: 'Average sale price',
      type: 'number',
      min: 100000,
      max: 5000000,
      default: 750000,
      unit: 'CAD',
      helperText: 'Average price of properties you sell'
    },
    {
      id: 'teamSize',
      label: 'Team size',
      type: 'select',
      options: [
        { value: 1, label: 'Solo agent' },
        { value: 2, label: '2-3 agents' },
        { value: 5, label: '4-6 agents' },
        { value: 10, label: '7-15 agents' },
        { value: 20, label: '16+ agents' }
      ],
      default: 2,
      helperText: 'Number of agents in your team'
    },
    {
      id: 'leadsPerMonth',
      label: 'New leads per month',
      type: 'number',
      min: 0,
      max: 1000,
      default: 50,
      unit: 'leads',
      helperText: 'Average new leads generated monthly'
    },
    {
      id: 'showingsPerMonth',
      label: 'Property showings per month',
      type: 'number',
      min: 0,
      max: 200,
      default: 30,
      unit: 'showings',
      helperText: 'Average property showings conducted monthly'
    },
    {
      id: 'commissionRate',
      label: 'Commission rate',
      type: 'number',
      min: 1,
      max: 10,
      default: 2.5,
      unit: '%',
      helperText: 'Your average commission rate'
    }
  ],
  calculations: {
    timeSavedHours: (inputs: any) => {
      const baseHours = 15; // Base admin time
      const transactionFactor = inputs.transactions * 2; // 2 hours per transaction
      const leadFactor = inputs.leadsPerMonth * 0.2; // 0.2 hours per lead
      const showingFactor = inputs.showingsPerMonth * 0.5; // 0.5 hours per showing
      const teamFactor = inputs.teamSize * 5; // 5 hours per team member
      
      return baseHours + transactionFactor + leadFactor + showingFactor + teamFactor;
    },
    costSaved: (inputs: any) => {
      const hourlyRate = 45; // Average hourly rate for real estate professionals
      const timeSaved = realEstateROI.calculations.timeSavedHours(inputs);
      return timeSaved * hourlyRate;
    },
    revenueLift: (inputs: any) => {
      const conversionIncrease = 0.05; // 5% improvement in lead conversion
      const additionalTransactions = inputs.leadsPerMonth * 12 * conversionIncrease;
      const avgCommission = inputs.avgSalePrice * (inputs.commissionRate / 100);
      return additionalTransactions * avgCommission;
    },
    paybackWeeks: (inputs: any) => {
      const monthlySavings = realEstateROI.calculations.costSaved(inputs) + 
                           realEstateROI.calculations.revenueLift(inputs);
      const setupCost = 1500; // Estimated setup cost
      return (setupCost / monthlySavings) * 4.33; // 4.33 weeks per month
    }
  },
  assumptions: {
    timeSavings: [
      'Automated lead capture and nurturing',
      'Streamlined showing scheduling',
      'Automated contract generation and e-signing',
      'Digital document management',
      'Automated follow-up sequences'
    ],
    costFactors: [
      'Reduced manual data entry and paperwork',
      'Fewer missed appointments and follow-ups',
      'Faster transaction processing',
      'Reduced marketing and lead generation costs',
      'Improved client communication efficiency'
    ],
    revenueFactors: [
      'Better lead conversion through timely follow-up',
      'Faster transaction completion',
      'Higher client satisfaction and referrals',
      'More time for high-value activities',
      'Reduced transaction fall-through rates'
    ]
  },
  faqs: [
    {
      question: 'How does this apply to different real estate markets?',
      answer: 'The calculator uses Ontario market averages. For high-end markets or rural areas, adjust the average sale price and commission rate accordingly.'
    },
    {
      question: 'What about team-based vs solo operations?',
      answer: 'The calculator accounts for team size in time savings. Solo agents typically see higher percentage improvements, while teams benefit from better coordination.'
    },
    {
      question: 'How quickly can I see results?',
      answer: 'Most real estate automations show results within 2-3 weeks, with full impact visible after 2-3 months as your pipeline improves.'
    }
  ],
  cta: {
    primary: {
      text: 'Book a demo',
      href: '/campaign/leadflow'
    },
    secondary: {
      text: 'See real estate demo',
      href: '/demo/real-estate'
    }
  }
};
