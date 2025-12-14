export const hero = {
  eyebrow: "Property Performance Engine™",
  title: "Close More Deals with Less Work — Built for Realtors, by Automation Experts.",
  subtitle: "The Property Performance Engine™ streamlines your leads, listings, and transactions so you can focus on clients — not admin.",
  primaryCta: {
    label: "Try a Live Real Estate Demo",
    href: "/apps/demo?vertical=real-estate",
    id: "real_estate_cta_demo_click"
  },
  secondaryCta: {
    label: "See the System",
    href: "#how-it-works",
    id: "real_estate_cta_how_click"
  },
  badges: [
    "Canadian Hosted",
    "MLS Integrations",
    "Smart CRM",
    "Automated Follow-Ups",
    "Agent & Team Dashboards"
  ]
} as const;

export const statBand = {
  title: "Real results from Canadian realtors",
  stats: [
    { label: "Faster Lead Response", value: "↑ 45%", footnote: "Automated follow-up & scheduling" },
    { label: "Listing Engagement", value: "↑ 30%", footnote: "AI-driven property marketing" },
    { label: "Admin Time", value: "↓ 50%", footnote: "Contracts auto-filled from CRM data" },
    { label: "Referral Rate", value: "↑ 35%", footnote: "Client nurture + review automation" }
  ]
} as const;

export const pains = [
  {
    icon: "/icons/realestate/phone.svg",
    title: "Too many leads, not enough closings",
    pain: "Leads come in but fall through the cracks — no systematic follow-up or qualification process.",
    fixLabel: "Our fix:",
    solution: "Lead scoring + automated nurture follow-ups."
  },
  {
    icon: "/icons/realestate/calendar.svg",
    title: "Agents forget to follow up",
    pain: "Busy schedules mean important follow-ups get missed, losing potential deals.",
    fixLabel: "Our fix:",
    solution: "Smart reminders + SMS/Email flows."
  },
  {
    icon: "/icons/realestate/house.svg",
    title: "Listing data duplicated across systems",
    pain: "Same property information entered multiple times in MLS, CRM, and marketing tools.",
    fixLabel: "Our fix:",
    solution: "Centralized MLS + CRM sync."
  },
  {
    icon: "/icons/realestate/doc.svg",
    title: "Endless paperwork",
    pain: "Contracts, forms, and documents scattered across email, desktop, and filing cabinets.",
    fixLabel: "Our fix:",
    solution: "SecureVaultDocs auto-fills forms and stores signed PDFs."
  },
  {
    icon: "/icons/realestate/chat.svg",
    title: "Marketing inconsistent",
    pain: "Social posts, ads, and newsletters happen randomly — no coordinated strategy.",
    fixLabel: "Our fix:",
    solution: "Auto social posts + ad scheduling."
  },
  {
    icon: "/icons/realestate/chart.svg",
    title: "No performance visibility",
    pain: "Hard to track which leads convert, which marketing works, or how the team is performing.",
    fixLabel: "Our fix:",
    solution: "Dashboard with real-time lead, deal, and commission metrics."
  }
] as const;

export const modules = [
  {
    icon: "/icons/realestate/phone.svg",
    title: "LeadFlow for Realtors",
    bullets: [
      "Capture, score, and nurture prospects automatically",
      "Multi-channel lead capture from website, ads, and referrals",
      "Intelligent lead scoring based on behavior and engagement"
    ]
  },
  {
    icon: "/icons/realestate/house.svg",
    title: "Smart CRM",
    bullets: [
      "Pipeline views, contact tagging, reminders, analytics",
      "Customizable deal stages and automated workflows",
      "Team collaboration and lead assignment features"
    ]
  },
  {
    icon: "/icons/realestate/map.svg",
    title: "Listing Sync",
    bullets: [
      "Auto-import from MLS, editable listing pages, and instant social previews",
      "Real-time MLS data synchronization",
      "Automated listing marketing across multiple channels"
    ]
  },
  {
    icon: "/icons/realestate/chat.svg",
    title: "Marketing Hub",
    bullets: [
      "Schedule ads, posts, and newsletters directly from dashboard",
      "Automated social media posting and ad management",
      "Email marketing campaigns and drip sequences"
    ]
  },
  {
    icon: "/icons/realestate/doc.svg",
    title: "Transaction Manager",
    bullets: [
      "Digital signatures, status updates, and compliance logs",
      "Automated contract generation and e-signature workflows",
      "Transaction timeline tracking and milestone notifications"
    ]
  },
  {
    icon: "/icons/realestate/person.svg",
    title: "Client Portal",
    bullets: [
      "Clients track showings, offers, and closing status",
      "Secure document sharing and communication",
      "Real-time updates and notification preferences"
    ]
  },
  {
    icon: "/icons/realestate/review.svg",
    title: "Referral & Review Engine",
    bullets: [
      "Automatically requests testimonials post-closing",
      "Referral tracking and reward automation",
      "Review management and social proof generation"
    ]
  },
  {
    icon: "/icons/realestate/chart.svg",
    title: "Analytics Dashboard",
    bullets: [
      "Real-time deal, commission, and marketing metrics",
      "Performance tracking and ROI analysis",
      "Custom reports and business intelligence"
    ]
  }
] as const;

export const flowSteps = [
  {
    index: 1,
    icon: "/icons/realestate/phone.svg",
    title: "Lead Captured",
    description: "Via website, ad, or referral form."
  },
  {
    index: 2,
    icon: "/icons/realestate/chat.svg",
    title: "Auto Nurture & Qualification",
    description: "SMS/email flows engage immediately."
  },
  {
    index: 3,
    icon: "/icons/realestate/calendar.svg",
    title: "Showing Booked",
    description: "Calendar integrations sync across team."
  },
  {
    index: 4,
    icon: "/icons/realestate/doc.svg",
    title: "Offer → Docs → Close",
    description: "SecureVaultDocs handles contracts & compliance."
  },
  {
    index: 5,
    icon: "/icons/realestate/review.svg",
    title: "Post-Close Nurture",
    description: "System triggers review requests and referral automation."
  }
] as const;

export const personas = [
  {
    title: "Solo Agent",
    bullets: [
      "Automate your follow-ups, focus on relationships",
      "Streamlined lead management and client communication",
      "Professional marketing without the overhead"
    ]
  },
  {
    title: "Small Team",
    bullets: [
      "Centralize your deals and delegate smarter",
      "Team collaboration and lead assignment",
      "Shared calendars and task management"
    ]
  },
  {
    title: "Brokerage",
    bullets: [
      "Custom dashboards for recruiting, reporting, and coaching",
      "Multi-agent performance tracking and analytics",
      "Branded marketing tools and lead distribution"
    ]
  },
  {
    title: "Property Manager",
    bullets: [
      "Track maintenance, rent flow, and tenant communication",
      "Automated rent collection and maintenance requests",
      "Tenant portal and communication management"
    ]
  }
] as const;

export const integrationCallout = {
  title: "All your lead, marketing, and document workflows connected — no more data silos.",
  description: "Seamless integration between CRM, Marketing Engine, and SecureVault Docs ensures every lead, campaign, and document flows together.",
  features: [
    "Unified data across all platforms",
    "Automated workflows between systems",
    "Real-time synchronization and updates",
    "Single source of truth for all client data"
  ]
} as const;

export const testimonials = [
  {
    quote: "Our team cut admin time by 40% and doubled listings under contract.",
    author: "Toronto Real Estate Group",
    metric: "40% less admin, 2x more listings"
  },
  {
    quote: "The automation handles what my assistant used to do manually — 24/7.",
    author: "Sarah Chen, Re/Max Premier",
    metric: "24/7 automated assistance"
  },
  {
    quote: "Lead response time went from hours to minutes. Game changer.",
    author: "Mark Thompson, Royal LePage",
    metric: "Minutes vs hours response time"
  }
] as const;

export const implementationSteps = [
  {
    title: "Week 1",
    text: "Discovery: import contacts, connect MLS/CRM"
  },
  {
    title: "Week 2",
    text: "Build automations + review pipeline setup"
  },
  {
    title: "Week 3",
    text: "Launch and live testing"
  },
  {
    title: "Week 4",
    text: "Optimize, scale ad funnels, and onboard full team"
  }
] as const;

export const faqs = [
  {
    question: "Can I import my old leads?",
    answer: "Yes, CSV or direct CRM sync. We can import from most popular real estate CRMs and lead management systems."
  },
  {
    question: "Does it integrate with my MLS?",
    answer: "Yes, full MLS IDX sync for Canada. We support all major Canadian MLS systems and provide real-time data synchronization."
  },
  {
    question: "Can my assistants access it?",
    answer: "Yes, role-based permissions. You control who sees what data and what actions they can perform."
  },
  {
    question: "Is it compliant with RECO and CREA?",
    answer: "Fully compliant; SecureVaultDocs ensures record-keeping. All data is stored in Canada with proper audit trails."
  },
  {
    question: "How soon can I launch?",
    answer: "Usually within 2–4 weeks. Most agents are up and running with basic automation within 2 weeks, full implementation takes 3-4 weeks."
  }
] as const;

export const analytics = {
  view: "real_estate_view",
  ctaDemo: "real_estate_cta_demo_click",
  ctaHow: "real_estate_cta_how_click",
  intakeSubmit: "real_estate_intake_submit"
} as const;