export const healthcareROI = {
  industry: 'Healthcare',
  slug: 'healthcare',
  title: 'Healthcare ROI Calculator',
  description: 'Calculate your time and cost savings with automated healthcare workflows.',
  inputs: [
    {
      id: 'patients',
      label: 'Number of patients',
      type: 'number',
      min: 1,
      max: 10000,
      default: 500,
      unit: 'patients',
      helperText: 'Total number of active patients'
    },
    {
      id: 'appointmentsPerWeek',
      label: 'Appointments per week',
      type: 'number',
      min: 1,
      max: 500,
      default: 80,
      unit: 'appointments',
      helperText: 'Average number of appointments per week'
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
      helperText: 'Number of people in your practice'
    },
    {
      id: 'avgAppointmentValue',
      label: 'Average appointment value',
      type: 'number',
      min: 50,
      max: 500,
      default: 150,
      unit: 'CAD',
      helperText: 'Average revenue per appointment'
    },
    {
      id: 'noShowRate',
      label: 'No-show rate',
      type: 'number',
      min: 0,
      max: 50,
      default: 15,
      unit: '%',
      helperText: 'Percentage of appointments that are no-shows'
    },
    {
      id: 'documentRequests',
      label: 'Document requests per month',
      type: 'number',
      min: 0,
      max: 1000,
      default: 100,
      unit: 'requests',
      helperText: 'Average document requests from patients monthly'
    }
  ],
  calculations: {
    timeSavedHours: (inputs: any) => {
      const baseHours = 35; // Base admin time
      const patientFactor = inputs.patients * 0.1; // 0.1 hours per patient
      const appointmentFactor = inputs.appointmentsPerWeek * 4 * 0.15; // 0.15 hours per appointment (monthly)
      const documentFactor = inputs.documentRequests * 0.1; // 0.1 hours per document request
      const teamFactor = inputs.teamSize * 5; // 5 hours per team member
      
      return baseHours + patientFactor + appointmentFactor + documentFactor + teamFactor;
    },
    costSaved: (inputs: any) => {
      const hourlyRate = 40; // Average hourly rate for healthcare staff
      const timeSaved = healthcareROI.calculations.timeSavedHours(inputs);
      return timeSaved * hourlyRate;
    },
    revenueLift: (inputs: any) => {
      const noShowReduction = 0.05; // 5% reduction in no-shows
      const additionalAppointments = inputs.appointmentsPerWeek * 4 * noShowReduction; // Monthly
      const avgAppointmentValue = inputs.avgAppointmentValue;
      return additionalAppointments * avgAppointmentValue;
    },
    paybackWeeks: (inputs: any) => {
      const monthlySavings = healthcareROI.calculations.costSaved(inputs) + 
                           healthcareROI.calculations.revenueLift(inputs);
      const setupCost = 2500; // Estimated setup cost
      return (setupCost / monthlySavings) * 4.33; // 4.33 weeks per month
    }
  },
  assumptions: {
    timeSavings: [
      'Automated patient scheduling and reminders',
      'Streamlined intake and registration',
      'Automated document collection and management',
      'Digital patient communication and updates',
      'Automated billing and insurance processing'
    ],
    costFactors: [
      'Reduced manual paperwork and data entry',
      'Fewer missed appointments and no-shows',
      'Faster patient registration and intake',
      'Reduced document processing time',
      'Improved patient satisfaction and retention'
    ],
    revenueFactors: [
      'Better patient retention through improved service',
      'Reduced no-shows and cancellations',
      'Faster appointment processing',
      'Higher patient satisfaction and referrals',
      'Reduced administrative overhead'
    ]
  },
  faqs: [
    {
      question: 'How does this apply to different healthcare specialties?',
      answer: 'The calculator works for most healthcare practices. Adjust the average appointment value and patient volume to match your specialty and practice size.'
    },
    {
      question: 'What about compliance and privacy requirements?',
      answer: 'All automations are designed to meet PHIPA and PIPEDA requirements, with data residency in Canada and appropriate security measures.'
    },
    {
      question: 'How long does implementation take?',
      answer: 'Most healthcare automations can be implemented within 3-4 weeks, with careful attention to compliance and integration with existing systems.'
    }
  ],
  cta: {
    primary: {
      text: 'Book a demo',
      href: '/campaign/leadflow'
    },
    secondary: {
      text: 'See healthcare demo',
      href: '/demo/healthcare'
    }
  }
};
