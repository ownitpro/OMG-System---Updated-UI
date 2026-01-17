// app/case-snapshots/snapshots.ts
export type SnapshotItem = {
  slug: string;
  industry: string;
  title: string;
  subtitle: string;
  metricLabel: string;
  metricValue: string;
  hero?: string;        // path under /public e.g. "/cases/pm-dashboard.png"
  heroAlt?: string;
  challenge: string;
  solution: string[];
  results: string[];
};

export const SNAPSHOTS: SnapshotItem[] = [
  {
    slug: 'property-management-3-day-turnaround',
    industry: 'Property Management',
    title: 'From Spreadsheet Chaos to a Predictable 3-Day Turnaround',
    subtitle: 'How a Durham property management firm automated owner statements and cut ticket resolution time by 57%',
    metricLabel: 'Average ticket close time',
    metricValue: '-57%',
    hero: '/cases/pm-dashboard.png',
    heroAlt: 'Dashboard-style banner with three cards and small table',
    challenge: 'Durham Property Management was drowning in spreadsheets. With 200+ properties and thousands of maintenance requests, their team was spending 12+ hours weekly just on owner statements and ticket management.',
    solution: [
      'Automated owner statement generation',
      'Smart ticket routing and prioritization',
      'Real-time dashboard for property managers',
      'Automated follow-up reminders'
    ],
    results: [
      '57% reduction in average ticket close time',
      '12 hours of admin time saved weekly',
      '96% owner satisfaction rate',
      'Zero missed maintenance requests'
    ]
  },
  {
    slug: 'contractor-80-percent-quote-time',
    industry: 'Contractors',
    title: 'How a GTA Renovation Firm Cut Quote Time by 80%',
    subtitle: 'From 3-day quote delays to 45-minute turnarounds with automated lead scoring and proposal generation',
    metricLabel: 'Quote turnaround time',
    metricValue: '-80%',
    hero: '/cases/contractor-quote-approved.png',
    heroAlt: 'Contractor holding tablet showing Quote Approved',
    challenge: 'GTA Renovations was losing potential clients due to slow quote turnaround times. Their manual process took 3+ days, causing frustrated customers to seek faster alternatives.',
    solution: [
      'Automated lead scoring and qualification',
      'Template-based proposal generation',
      'Real-time material cost calculations',
      'Automated follow-up sequences'
    ],
    results: [
      '80% reduction in quote turnaround time',
      '40% increase in quote acceptance rate',
      '25% growth in monthly revenue',
      '95% customer satisfaction score'
    ]
  },
  {
    slug: 'real-estate-self-booking-showings',
    industry: 'Real Estate',
    title: 'Never Miss a Showing Again: Self-Booking + SMS Reminders',
    subtitle: 'Toronto real estate agent eliminates scheduling conflicts and increases showing attendance by 40%',
    metricLabel: 'Showing attendance',
    metricValue: '+40%',
    hero: '/cases/realestate-showings.png',
    heroAlt: 'Agent with calendar showing increased attendance',
    challenge: 'Sarah Chen, a Toronto real estate agent, was constantly juggling showing schedules and dealing with no-shows. Manual coordination was eating into her time and costing her sales.',
    solution: [
      'Self-booking calendar integration',
      'Automated SMS reminders',
      'Smart conflict detection',
      'Automated follow-up sequences'
    ],
    results: [
      '40% increase in showing attendance',
      '60% reduction in scheduling conflicts',
      '8 hours saved weekly on coordination',
      '30% increase in closed deals'
    ]
  },
  {
    slug: 'accounting-document-automation-70',
    industry: 'Accounting',
    title: 'From Chasing Documents to 70% Time Savings',
    subtitle: 'Small CPA firm in Mississauga automates client onboarding and document collection',
    metricLabel: 'Document collection time',
    metricValue: '-70%',
    hero: '/cases/accounting-intake.png',
    heroAlt: 'CPA dashboard with document collection automation stats',
    challenge: 'Mississauga CPA firm was spending 15+ hours weekly chasing client documents. Manual follow-ups and paper-based processes were slowing down tax season.',
    solution: [
      'Automated document request sequences',
      'Digital document collection portal',
      'Smart reminder system',
      'Automated client onboarding'
    ],
    results: [
      '70% reduction in document collection time',
      '90% of clients submit documents digitally',
      '50% faster tax return preparation',
      '100% client satisfaction rate'
    ]
  },
  {
    slug: 'cleaning-route-optimization',
    industry: 'Cleaning',
    title: 'Route Optimization + Auto-Invoicing = 50% Faster Payments',
    subtitle: 'GTA cleaning company eliminates manual invoicing and reduces receivables by 50%',
    metricLabel: 'Payment collection time',
    metricValue: '-50%',
    hero: '/cases/cleaning-route-invoice.png',
    heroAlt: 'Cleaning company dashboard with route efficiency',
    challenge: 'GTA Cleaning Services was struggling with manual invoicing and slow payment collection. Their team was spending 10+ hours weekly on paperwork and follow-ups.',
    solution: [
      'Route optimization for cleaning teams',
      'Automated invoice generation',
      'Digital payment processing',
      'Automated payment reminders'
    ],
    results: [
      '50% reduction in payment collection time',
      '30% improvement in route efficiency',
      '85% of invoices paid within 7 days',
      '40% reduction in administrative overhead'
    ]
  },
  {
    slug: 'healthcare-intake-automation-50',
    industry: 'Healthcare',
    title: 'Digital Intake + OCR Reduces Patient Wait Times by 50%',
    subtitle: 'Toronto healthcare clinic automates patient intake and document processing',
    metricLabel: 'Patient intake time',
    metricValue: '-50%',
    hero: '/cases/healthcare-intake-ocr.png',
    heroAlt: 'Clinic dashboard with CareFlow intake',
    challenge: 'Toronto Healthcare Clinic was experiencing long patient wait times due to manual intake processes. Paper forms and manual data entry were creating bottlenecks.',
    solution: [
      'Digital intake forms',
      'OCR document processing',
      'Automated data validation',
      'Real-time patient updates'
    ],
    results: [
      '50% reduction in patient intake time',
      '95% accuracy in document processing',
      '40% increase in patient satisfaction',
      '60% reduction in administrative errors'
    ]
  }
];
