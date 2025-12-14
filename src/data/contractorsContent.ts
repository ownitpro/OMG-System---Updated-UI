// Content arrays for Contractor Industry Page

export interface PainCard {
  title: string;
  problem: string;
  solution: string;
  iconName: string;
}

export interface Module {
  name: string;
  bullets: string[];
  iconName: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  iconName: string;
}

export interface Benefit {
  title: string;
  subtitle: string;
  iconName: string;
}

export interface UseCase {
  title: string;
  points: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  logoUrl?: string;
  photoUrl?: string;
}

// Pain Points → How We Solve
export const contractorPains: PainCard[] = [
  {
    title: "Leads come in waves, crews idle",
    problem: "One week you're swamped, the next you're waiting for work—you never know when jobs will come.",
    solution: "Targeted ads + high-intent landing pages feed you a steady stream of leads.",
    iconName: "lead-wave",
  },
  {
    title: "Calls with tire-kickers waste time",
    problem: "You spend hours talking with people who can't or won't pay.",
    solution: "Smart intake scoring filters out low-quality leads and only delivers real jobs you want.",
    iconName: "filter",
  },
  {
    title: "Quotes take too long, you lose clients",
    problem: "You're drafting estimates from scratch, losing to faster competitors.",
    solution: "Proposal templates + pricing libraries let you send branded quotes in minutes.",
    iconName: "quote",
  },
  {
    title: "Chasing payments drains cash flow",
    problem: "Clients forget, delay, or neglect to pay on time—forcing you to chase.",
    solution: "Accepted quotes trigger invoices + reminders; overdue triggers gentle nudges automatically.",
    iconName: "payment",
  },
  {
    title: "Clients constantly ask, 'Where's the update?'",
    problem: "You repeat same status calls all day and lose productivity.",
    solution: "Milestone messaging + client portal keeps them informed without you picking up the phone.",
    iconName: "update",
  },
  {
    title: "We forget to ask for reviews",
    problem: "After finishing work, you miss the opportunity to get testimonials or social proof.",
    solution: "When jobs close, system requests reviews + auto-posts positive ones to your site/social.",
    iconName: "review",
  },
  {
    title: "Posting before/after content is a chore",
    problem: "You take photos but forget to post, or waste time editing and scheduling.",
    solution: "Content Engine uploads, schedules, and auto-posts your photos/videos (30/60/90s).",
    iconName: "content",
  },
  {
    title: "I don't know what's working",
    problem: "You lack visibility—don't know which ads, projects, or clients are profitable.",
    solution: "Dashboard shows leads, conversion rate, ROI, unpaid invoices, and content engagement.",
    iconName: "analytics",
  },
];

// Core Features / Modules
export const contractorModules: Module[] = [
  {
    name: "Lead Gen & Ads Integration",
    bullets: ["Targeted ad campaigns (Meta, Google)", "Landing pages + funnels", "Audience testing & scaling"],
    iconName: "ads",
  },
  {
    name: "Smart Intake & Auto-Booking",
    bullets: ["Collect photos, budget, timeline", "Auto-qualify leads", "Booking link embedded in flow"],
    iconName: "intake",
  },
  {
    name: "Proposal / Estimate Automation",
    bullets: ["Predefined templates & pricing library", "Auto-fill from intake", "Branded PDF delivery"],
    iconName: "proposal",
  },
  {
    name: "Follow-up / Drip Sequences",
    bullets: ["Email/SMS sequences for unapproved quotes", "Reminder and nurture flows", "Pause on response"],
    iconName: "drip",
  },
  {
    name: "Invoicing / Payment Module",
    bullets: ["Generate invoices from accepted quotes", "Deposit requests", "Automated reminders & overdue flows"],
    iconName: "invoice",
  },
  {
    name: "Project Milestones & Updates",
    bullets: ["Define job phases (e.g. rough-in, finish)", "Milestone notifications", "Client portal status view"],
    iconName: "milestone",
  },
  {
    name: "Review & Referral Automation",
    bullets: ["Ask for Google/Facebook reviews", "Auto-post positive ones", "Referral prompts & rewards"],
    iconName: "review",
  },
  {
    name: "Content Engine for Contractors",
    bullets: ["Upload photos/videos (30/60/90s)", "Auto-post to social / web", "Moderation & scheduling"],
    iconName: "content",
  },
  {
    name: "Dashboard & Monthly Optimization",
    bullets: ["Leads, conversion, ROI metrics", "Unpaid invoices, content metrics", "Alerts for anomalies"],
    iconName: "dashboard",
  },
];

// Process Flow / Journey Steps
export const contractorSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Attract",
    description: "Run targeted ads + landing pages funnel leads in.",
    iconName: "attract",
  },
  {
    step: 2,
    title: "Qualify",
    description: "Intake scoring filters and sends booking links for real jobs.",
    iconName: "qualify",
  },
  {
    step: 3,
    title: "Quote",
    description: "Generate and send branded proposals from template.",
    iconName: "quote",
  },
  {
    step: 4,
    title: "Convert",
    description: "Client approves, contract + invoice triggered automatically.",
    iconName: "convert",
  },
  {
    step: 5,
    title: "Deliver",
    description: "Track job via milestones; clients see status in portal.",
    iconName: "deliver",
  },
  {
    step: 6,
    title: "Close & Grow",
    description: "Request review, post content, send referrals, re-engage client.",
    iconName: "grow",
  },
];

// Benefits / Outcomes
export const contractorBenefits: Benefit[] = [
  {
    title: "Smoothed revenue & fewer idle periods",
    subtitle: "Steady lead flow helps you predict and plan work.",
    iconName: "steady",
  },
  {
    title: "Less time quoting, more jobs won",
    subtitle: "Templates + automation reduce quoting time drastically.",
    iconName: "speed",
  },
  {
    title: "Better cash flow, fewer arrears",
    subtitle: "Automatic invoicing & reminders reduce late payments.",
    iconName: "cashflow",
  },
  {
    title: "Less support burden",
    subtitle: "Clients see progress; fewer calls asking status.",
    iconName: "support",
  },
  {
    title: "Stronger reputation & more leads",
    subtitle: "Review automation & content marketing attract new work.",
    iconName: "reputation",
  },
  {
    title: "Full visibility into business health",
    subtitle: "Dashboard shows ROI, lead metrics, project performance.",
    iconName: "visibility",
  },
];

// Use Cases / Contractor Types
export const contractorUseCases: UseCase[] = [
  {
    title: "Home Renovation / Remodeling",
    points: ["Kitchen, bath, basement conversions", "Project-driven quoting & phased payments"],
  },
  {
    title: "Painting / Flooring / Finishing Trades",
    points: ["Fast quoting by room / square footage", "Recurring scheduling & upsells"],
  },
  {
    title: "HVAC / Electric / Plumbing",
    points: ["Service + installation jobs", "Change orders and parts tracking"],
  },
  {
    title: "General Contractor / GC",
    points: ["Managing subcontractors", "Multi-phase projects, site updates, client portal"],
  },
];

// FAQ / Objections
export const contractorFaqs: FAQItem[] = [
  {
    question: "Will this work even if I already run some ads or use another CRM?",
    answer: "Yes — you can bring your existing ads or CRM; we integrate or transition gradually.",
  },
  {
    question: "How long until this is live?",
    answer: "Typically 1–3 weeks (depends on number of modules and complexity).",
  },
  {
    question: "Can I customize proposal templates or contract logic?",
    answer: "Yes — you have full control over templates, pricing, clauses, branding, and logic.",
  },
  {
    question: "What happens when I hit usage limits or overages?",
    answer: "You'll be alerted at thresholds (70%, 90%, etc.). New automations will pause at 100% until you upgrade or reduce usage.",
  },
  {
    question: "Are client data and documents secure in Ontario / Canada?",
    answer: "Absolutely — encrypted, stored in Canadian region, audit logs & role-based access.",
  },
  {
    question: "Does it support photo & video content posting?",
    answer: "Yes — content engine supports photo/video (up to 90s), with scheduling, moderation, auto-posting.",
  },
];

// Sample Testimonials / Proof Metrics
export const contractorTestimonials: Testimonial[] = [
  {
    quote: "In 14 days we booked 8 new high-value jobs through ad campaigns + CRM automation.",
    author: "Northern Renovations, Sudbury, ON",
    logoUrl: "/logos/northern-reno-logo.png",
    photoUrl: "/photos/user1.jpg",
  },
  {
    quote: "We cut quoting time from 4 hours to 20 minutes — and win rate improved 25%.",
    author: "Elite Electric & Plumbing, Barrie, ON",
    logoUrl: "/logos/elite-logo.png",
  },
  {
    quote: "Late payments dropped 70% when invoices + reminders automated.",
    author: "King's Flooring & Designs, Kitchener, ON",
  },
  {
    quote: "Our crews stay busy now — less idle time, more jobs delivered.",
    author: "GTA Home Contractors, Mississauga, ON",
  },
];
