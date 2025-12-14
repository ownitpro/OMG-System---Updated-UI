export const cleaningROI = {
  industry: 'Cleaning',
  slug: 'cleaning',
  title: 'Cleaning ROI Calculator',
  description: 'Calculate your time and cost savings with automated cleaning workflows.',
  inputs: [
    {
      id: 'clients',
      label: 'Number of clients',
      type: 'number',
      min: 1,
      max: 500,
      default: 25,
      unit: 'clients',
      helperText: 'Total number of active cleaning clients'
    },
    {
      id: 'avgClientValue',
      label: 'Average client value',
      type: 'number',
      min: 100,
      max: 10000,
      default: 800,
      unit: 'CAD',
      helperText: 'Monthly revenue per client'
    },
    {
      id: 'teamSize',
      label: 'Team size',
      type: 'select',
      options: [
        { value: 1, label: 'Solo cleaner' },
        { value: 3, label: '2-4 people' },
        { value: 8, label: '5-10 people' },
        { value: 15, label: '11-20 people' },
        { value: 30, label: '21+ people' }
      ],
      default: 3,
      helperText: 'Number of people in your team'
    },
    {
      id: 'jobsPerWeek',
      label: 'Jobs per week',
      type: 'number',
      min: 1,
      max: 200,
      default: 40,
      unit: 'jobs',
      helperText: 'Average number of cleaning jobs per week'
    },
    {
      id: 'travelTime',
      label: 'Travel time per job',
      type: 'number',
      min: 0,
      max: 120,
      default: 15,
      unit: 'minutes',
      helperText: 'Average travel time between jobs'
    },
    {
      id: 'supplyCosts',
      label: 'Supply costs per month',
      type: 'number',
      min: 50,
      max: 5000,
      default: 500,
      unit: 'CAD',
      helperText: 'Monthly supply and equipment costs'
    }
  ],
  calculations: {
    timeSavedHours: (inputs: any) => {
      const baseHours = 20; // Base admin time
      const clientFactor = inputs.clients * 0.3; // 0.3 hours per client
      const jobFactor = inputs.jobsPerWeek * 4 * 0.2; // 0.2 hours per job (monthly)
      const travelFactor = inputs.jobsPerWeek * 4 * (inputs.travelTime / 60); // Travel time (monthly)
      const teamFactor = inputs.teamSize * 2; // 2 hours per team member
      
      return baseHours + clientFactor + jobFactor + travelFactor + teamFactor;
    },
    costSaved: (inputs: any) => {
      const hourlyRate = 25; // Average hourly rate for cleaning services
      const timeSaved = cleaningROI.calculations.timeSavedHours(inputs);
      return timeSaved * hourlyRate;
    },
    revenueLift: (inputs: any) => {
      const efficiencyIncrease = 0.15; // 15% improvement in efficiency
      const additionalJobs = inputs.jobsPerWeek * 4 * efficiencyIncrease; // Monthly
      const avgJobValue = inputs.avgClientValue / 4; // Weekly to monthly
      return additionalJobs * avgJobValue;
    },
    paybackWeeks: (inputs: any) => {
      const monthlySavings = cleaningROI.calculations.costSaved(inputs) + 
                           cleaningROI.calculations.revenueLift(inputs);
      const setupCost = 1200; // Estimated setup cost
      return (setupCost / monthlySavings) * 4.33; // 4.33 weeks per month
    }
  },
  assumptions: {
    timeSavings: [
      'Automated client scheduling and route optimization',
      'Streamlined job assignment and tracking',
      'Automated supply ordering and inventory management',
      'Digital client communication and updates',
      'Automated invoicing and payment processing'
    ],
    costFactors: [
      'Reduced manual scheduling and coordination',
      'Fewer missed appointments and cancellations',
      'Faster job completion through better planning',
      'Reduced supply waste and over-ordering',
      'Improved team coordination and efficiency'
    ],
    revenueFactors: [
      'Better client retention through improved service',
      'Faster job completion and more jobs per day',
      'Reduced travel time through route optimization',
      'Higher client satisfaction and referrals',
      'Reduced no-shows and cancellations'
    ]
  },
  faqs: [
    {
      question: 'How does this work for different types of cleaning services?',
      answer: 'The calculator works for most cleaning services. Adjust the average client value and job frequency to match your specific service type (residential, commercial, specialized).'
    },
    {
      question: 'What about seasonal variations?',
      answer: 'The calculator uses annual averages. For seasonal businesses, consider running separate calculations for peak and off-peak periods.'
    },
    {
      question: 'How long does implementation take?',
      answer: 'Most cleaning automations can be implemented within 1-2 weeks, starting with scheduling and client communication.'
    }
  ],
  cta: {
    primary: {
      text: 'Book a demo',
      href: '/campaign/leadflow'
    },
    secondary: {
      text: 'See cleaning demo',
      href: '/demo/cleaning'
    }
  }
};
