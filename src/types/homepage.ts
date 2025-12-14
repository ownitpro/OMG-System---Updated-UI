export interface Metric {
  value: string;
  label: string;
}

export interface Feature {
  title: string;
  description: string;
  iconName: string; // or ReactNode
  link: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  logoUrl?: string;
}

export interface Plan {
  name: string;
  priceMonthly: number;
  features: string[];
  link: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface LeadFlowData {
  headline: string;
  subheadline: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  painPoints: string[];
  systemExplanation: string;
  sixStepJourney: Array<{
    step: number;
    whatHappens: string;
    whyItMatters: string;
  }>;
  deliverables: string[];
  results: Array<{
    metric: string;
    description: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export interface HomePageProps {
  metrics: Metric[];
  features: Feature[];
  testimonials: Testimonial[];
  plans: Plan[];
  faqs: FAQItem[];
  leadFlowData: LeadFlowData;
}
