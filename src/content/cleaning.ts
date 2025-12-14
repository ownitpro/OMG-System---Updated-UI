export const hero = {
  eyebrow: "Cleaning Operations Engine™",
  title: "Automate your cleaning business — from quote to review.",
  subtitle: "The Cleaning Operations Engine™ connects your quotes, staff schedules, invoices, and client updates — all in one dashboard.",
  primaryCta: {
    label: "Try a Live Cleaning Demo",
    href: "/apps/demo?vertical=cleaning",
    id: "cleaning_cta_demo_click"
  },
  secondaryCta: {
    label: "See How It Works",
    href: "#how-it-works",
    id: "cleaning_cta_how_click"
  },
  badges: [
    "Built in Canada",
    "Automated Scheduling",
    "Invoice & Payment Sync",
    "Client Portals",
    "Review Generation"
  ]
} as const;

export const statBand = {
  title: "Real outcomes you can measure",
  stats: [
    { label: "Faster Job Scheduling", value: "↑ 60%", footnote: "AI auto-assigns and updates shifts" },
    { label: "Missed Appointments", value: "↓ 40%", footnote: "Clients auto-reminded, staff notified" },
    { label: "More Reviews", value: "↑ 50%", footnote: "Post-job feedback automation" },
    { label: "Revenue Stability", value: "↑ 30%", footnote: "Predictable recurring contracts" }
  ]
} as const;

export const pains = [
  {
    icon: "/icons/cleaning/calendar.svg",
    title: "Constant rescheduling chaos",
    pain: "Staff call in sick, clients reschedule, routes get disrupted — constant juggling of schedules and availability.",
    fixLabel: "Our fix:",
    solution: "Smart scheduling that syncs staff calendars & client preferences."
  },
  {
    icon: "/icons/cleaning/chat.svg",
    title: "Missed updates and miscommunication",
    pain: "Clients don't know if cleaning happened, staff forget to report issues, managers are in the dark.",
    fixLabel: "Our fix:",
    solution: "Automated job notifications and status dashboards."
  },
  {
    icon: "/icons/cleaning/money.svg",
    title: "Delayed payments",
    pain: "Invoices get lost, clients forget to pay, chasing payments takes hours every week.",
    fixLabel: "Our fix:",
    solution: "Auto-invoicing and reminders tied to job completion."
  },
  {
    icon: "/icons/cleaning/doc.svg",
    title: "No clear client reporting",
    pain: "Clients can't see what was cleaned, when it happened, or if there were any issues.",
    fixLabel: "Our fix:",
    solution: "Real-time client portal with pictures & status."
  },
  {
    icon: "/icons/cleaning/review.svg",
    title: "Poor review capture",
    pain: "Great work goes unnoticed, no social proof, missed opportunities for referrals.",
    fixLabel: "Our fix:",
    solution: "Auto follow-up + review request post-job."
  },
  {
    icon: "/icons/cleaning/growth.svg",
    title: "Tool overload",
    pain: "Spreadsheets for scheduling, texts for communication, separate invoicing software — too many systems.",
    fixLabel: "Our fix:",
    solution: "One unified system — no juggling spreadsheets or texts."
  }
] as const;

export const modules = [
  {
    icon: "/icons/cleaning/calendar.svg",
    title: "Smart Scheduling",
    bullets: [
      "Assign staff, auto-adjust routes, handle sick days instantly",
      "Real-time availability and conflict resolution",
      "Route optimization for fuel and time savings"
    ]
  },
  {
    icon: "/icons/cleaning/chat.svg",
    title: "Client Communication",
    bullets: [
      "Live portals, automated messages, photo proof uploads",
      "Real-time job status updates and notifications",
      "Two-way communication with instant responses"
    ]
  },
  {
    icon: "/icons/cleaning/money.svg",
    title: "Quote & Invoice Automation",
    bullets: [
      "Send quotes, convert to jobs, issue invoice automatically",
      "Recurring billing and payment tracking",
      "Late payment reminders and collection automation"
    ]
  },
  {
    icon: "/icons/cleaning/doc.svg",
    title: "Task & Supply Tracking",
    bullets: [
      "Checklists, consumable monitoring, re-order triggers",
      "Inventory management and cost tracking",
      "Quality control and compliance reporting"
    ]
  },
  {
    icon: "/icons/cleaning/user.svg",
    title: "Employee Time-Clock & GPS",
    bullets: [
      "Mobile clock-in/out, map tracking, route optimization",
      "Time tracking and payroll integration",
      "Performance monitoring and safety alerts"
    ]
  },
  {
    icon: "/icons/cleaning/review.svg",
    title: "Review & Referral Engine",
    bullets: [
      "Sends review requests + referral codes after job",
      "Social media integration and reputation management",
      "Referral tracking and reward automation"
    ]
  },
  {
    icon: "/icons/cleaning/growth.svg",
    title: "SecureVault Docs Integration",
    bullets: [
      "Upload contracts, inspection reports, compliance forms",
      "Secure document storage and sharing",
      "Audit trails and compliance reporting"
    ]
  },
  {
    icon: "/icons/cleaning/alert.svg",
    title: "Analytics Dashboard",
    bullets: [
      "Jobs per week, satisfaction score, revenue trendline",
      "Performance metrics and KPI tracking",
      "Predictive analytics and business insights"
    ]
  }
] as const;

export const flowSteps = [
  {
    index: 1,
    icon: "/icons/cleaning/phone.svg",
    title: "Lead Captured",
    description: "Via Meta or form, enters CRM automatically."
  },
  {
    index: 2,
    icon: "/icons/cleaning/doc.svg",
    title: "Quote Created",
    description: "Templated quote auto-sends with pricing."
  },
  {
    index: 3,
    icon: "/icons/cleaning/calendar.svg",
    title: "Client Accepts → Job Scheduled",
    description: "Auto adds to calendar & staff route."
  },
  {
    index: 4,
    icon: "/icons/cleaning/broom.svg",
    title: "Staff Performs Job",
    description: "Mobile updates & photo uploads."
  },
  {
    index: 5,
    icon: "/icons/cleaning/money.svg",
    title: "Invoice Auto-Issued + Review Request Sent",
    description: "Payment processing and feedback collection."
  },
  {
    index: 6,
    icon: "/icons/cleaning/growth.svg",
    title: "Dashboard Updates",
    description: "New insights + next job auto-queued."
  }
] as const;

export const integrationCallout = {
  title: "All your work, one engine.",
  description: "Every lead, job, and document flows seamlessly between the CRM and SecureVault Docs. Quotes, invoices, inspection forms, and contracts file themselves — encrypted and auditable.",
  features: [
    "Seamless data flow between systems",
    "Automatic document filing and organization",
    "Encrypted storage with audit trails",
    "Real-time synchronization across platforms"
  ]
} as const;

export const audiences = [
  {
    title: "Residential Cleaning Teams",
    bullets: [
      "Recurring bookings, client updates, automated reminders",
      "Route optimization for multiple homes",
      "Family-friendly communication and scheduling"
    ]
  },
  {
    title: "Commercial / Janitorial Firms",
    bullets: [
      "Large sites, staff scheduling, inspections, compliance",
      "Multi-shift management and quality control",
      "Corporate client reporting and documentation"
    ]
  },
  {
    title: "Restoration / Specialty Cleaners",
    bullets: [
      "Photo documentation, insurance reports",
      "Before/after evidence collection",
      "Insurance claim integration and tracking"
    ]
  },
  {
    title: "Franchise Operators",
    bullets: [
      "Dashboards across multiple locations, unified billing",
      "Standardized processes and quality control",
      "Multi-location performance analytics"
    ]
  }
] as const;

export const securityBullets = [
  "Canadian-hosted data with encryption at rest & in transit",
  "Role-based access control with granular permissions",
  "Full audit trail for all actions and document access",
  "Automated backups and failover protection",
  "Privacy-first design under PHIPA/PIPEDA compliance",
  "Secure API integrations with third-party systems"
] as const;

export const implementationSteps = [
  {
    title: "Discovery",
    text: "Understand sites, teams, and goals"
  },
  {
    title: "Configuration",
    text: "Tailor modules (schedule, invoice, review)"
  },
  {
    title: "Integration",
    text: "Connect CRM + SecureVault Docs"
  },
  {
    title: "Pilot",
    text: "Run first 2 weeks with live jobs"
  },
  {
    title: "Go-Live",
    text: "System monitors, alerts, optimizes"
  },
  {
    title: "Scale",
    text: "Add more routes, contracts, or franchises"
  }
] as const;

export const faqs = [
  {
    question: "Do I need new devices?",
    answer: "No, it runs on phones, tablets, or laptops. Your existing devices work perfectly with our mobile-responsive platform."
  },
  {
    question: "How fast can we go live?",
    answer: "Usually within 1–3 weeks. Small teams can be up and running in as little as 1 week, while larger operations may take 2-3 weeks for full deployment."
  },
  {
    question: "Do staff need special training?",
    answer: "Minimal — the UI is tap-simple. Most staff learn the basics in under 30 minutes, and we provide ongoing support and training materials."
  },
  {
    question: "Is it secure?",
    answer: "100%, with Canadian encryption and audit logs. All data is stored in Canada with enterprise-grade security and compliance with Canadian privacy laws."
  },
  {
    question: "Can I use it with my existing CRM?",
    answer: "Yes, direct API or email-to-vault integration. We integrate with most popular CRM systems and can work alongside your existing tools."
  }
] as const;

export const analytics = {
  view: "cleaning_view",
  ctaDemo: "cleaning_cta_demo_click",
  ctaHow: "cleaning_cta_how_click",
  intakeSubmit: "cleaning_intake_submit"
} as const;