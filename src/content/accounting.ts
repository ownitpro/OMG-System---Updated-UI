export const hero = {
  eyebrow: "Financial Workflow Engine",
  title: "Automate 80% of your accounting firm's grind.",
  subtitle: "Secure document capture, AI workflows, scheduling, identity verification, e-sign and billing — built for Canadian CPA firms.",
  primaryCta: {
    label: "Try a Live Accounting Demo",
    href: "/apps/demo?vertical=accounting",
    id: "accounting_cta_demo_click"
  },
  secondaryCta: {
    label: "See How It Works",
    href: "#how-it-works",
    id: "accounting_cta_how_click"
  },
  badges: [
    "Canadian data residency",
    "PHIPA/PIPEDA aligned",
    "Audit trail",
    "Role-based access"
  ]
} as const;

export const statBand = {
  title: "Real outcomes you can measure",
  stats: [
    { label: "Reduce manual admin", value: "40–70%" },
    { label: "Cut onboarding time", value: "To minutes" },
    { label: "Fewer missing docs", value: "Audit-ready logs" },
    { label: "Scale clients", value: "Without extra hires" }
  ]
} as const;

export const pains = [
  {
    icon: "/icons/accounting/folder.svg",
    title: "Document overload & lost files",
    pain: "Scattered documents across email, desktop, and filing cabinets make it impossible to find what you need when you need it.",
    fixLabel: "Our fix:",
    solution: "Secure intake, OCR, auto-naming, versioning."
  },
  {
    icon: "/icons/accounting/chat.svg",
    title: "Client chasing & scattered threads",
    pain: "Constant back-and-forth emails and phone calls to get missing documents and information from clients.",
    fixLabel: "Our fix:",
    solution: "Templated reminders via email/SMS tied to checklists."
  },
  {
    icon: "/icons/accounting/calendar.svg",
    title: "Scheduling friction",
    pain: "Multiple phone calls and emails just to book a simple meeting with clients.",
    fixLabel: "Our fix:",
    solution: "Self-booking + Zoom + reminders."
  },
  {
    icon: "/icons/accounting/doc.svg",
    title: "Repetitive admin",
    pain: "Same tasks repeated for every client - creating checklists, setting reminders, tracking progress manually.",
    fixLabel: "Our fix:",
    solution: "Templates spawn tasks, dependencies, and due dates."
  },
  {
    icon: "/icons/accounting/alert.svg",
    title: "Compliance & audit risk",
    pain: "Worrying about missing documentation, improper retention, and audit readiness.",
    fixLabel: "Our fix:",
    solution: "Immutable audit logs, retention policies, KYC evidence metadata."
  },
  {
    icon: "/icons/accounting/chart.svg",
    title: "Tax-season crunch",
    pain: "Overwhelming workload during peak season with no visibility into bottlenecks or overdue items.",
    fixLabel: "Our fix:",
    solution: "Workload views, overdue alerts, SLA monitors."
  }
] as const;

export const modules = [
  {
    icon: "/icons/accounting/folder.svg",
    title: "Secure Document Capture & Filing",
    bullets: [
      "Email-to-vault, mobile upload, OCR + classification",
      "Versioning and automatic naming",
      "Status tracking and missing document alerts"
    ]
  },
  {
    icon: "/icons/accounting/doc.svg",
    title: "Engagement & Workflow Automation",
    bullets: [
      "Service templates (T1, T2, HST, payroll)",
      "Checklists and task dependencies",
      "Escalation rules and due date tracking"
    ]
  },
  {
    icon: "/icons/accounting/chat.svg",
    title: "Client Communication & Reminders",
    bullets: [
      "Dynamic fields and personalized messaging",
      "Drip sequences and checklist-linked messages",
      "Multi-channel communication (email, SMS)"
    ]
  },
  {
    icon: "/icons/accounting/calendar.svg",
    title: "Scheduling & Meetings",
    bullets: [
      "Real-time availability and self-booking",
      "Automatic Zoom link generation",
      "Reminder sequences and rescheduling"
    ]
  },
  {
    icon: "/icons/accounting/lock.svg",
    title: "Identity / KYC Verification",
    bullets: [
      "Government ID + selfie verification",
      "Risk assessment and gate controls",
      "Evidence metadata storage and tracking"
    ]
  },
  {
    icon: "/icons/accounting/chat.svg",
    title: "AI Meeting Summaries & Task Extraction",
    bullets: [
      "Automatic transcript to summary conversion",
      "Task extraction and auto-assignment",
      "Follow-up action item tracking"
    ]
  },
  {
    icon: "/icons/accounting/money.svg",
    title: "Billing, Invoicing & E-Sign",
    bullets: [
      "Engagement letters and contract generation",
      "Automated invoicing and payment reminders",
      "E-signature status tracking and completion"
    ]
  },
  {
    icon: "/icons/accounting/chart.svg",
    title: "Dashboards, Alerts & SLA",
    bullets: [
      "Pipeline visibility and staff workload views",
      "Overdue item alerts and quality metrics",
      "SLA monitoring and performance tracking"
    ]
  }
] as const;

export const flowSteps = [
  {
    index: 1,
    icon: "/icons/accounting/chat.svg",
    title: "Lead lands",
    description: "Added to CRM with automatic lead scoring and assignment."
  },
  {
    index: 2,
    icon: "/icons/accounting/calendar.svg",
    title: "Books intro call",
    description: "Calendar + Zoom created automatically with confirmation emails."
  },
  {
    index: 3,
    icon: "/icons/accounting/lock.svg",
    title: "Pre-meeting intake/KYC",
    description: "Digital forms, e-sign, and identity verification completed."
  },
  {
    index: 4,
    icon: "/icons/accounting/chat.svg",
    title: "Meeting held",
    description: "AI summary + tasks automatically generated and assigned."
  },
  {
    index: 5,
    icon: "/icons/accounting/folder.svg",
    title: "Docs flow via SecureVault",
    description: "Checklists complete automatically as documents are received."
  },
  {
    index: 6,
    icon: "/icons/accounting/money.svg",
    title: "Engagement runs",
    description: "Invoices, reminders, dashboards, and retention policies active."
  }
] as const;

export const svdCallout = {
  title: "Documents collect themselves.",
  description: "Intake from upload/email; OCR auto-names; status page shows what's missing; CRA forms & e-sign; immutable 'packetize & lock' for year-end.",
  features: [
    "Usage meters with 70/80/90/95% nudges",
    "Hard stop at 100% to avoid surprises",
    "Automatic document classification",
    "Immutable audit trails"
  ]
} as const;

export const audiences = [
  {
    title: "Solo/Small Firms",
    bullets: [
      "Streamline client onboarding and document collection",
      "Automate routine tasks to focus on advisory work",
      "Professional client experience with minimal overhead"
    ]
  },
  {
    title: "Multi-partner Practices",
    bullets: [
      "Standardize workflows across all partners",
      "Centralized document management and client communication",
      "Workload balancing and capacity planning"
    ]
  },
  {
    title: "Tax-season Teams",
    bullets: [
      "Handle peak volume without additional staff",
      "Automated client reminders and document collection",
      "Real-time visibility into bottlenecks and overdue items"
    ]
  },
  {
    title: "Compliance-focused Firms",
    bullets: [
      "Immutable audit logs and retention policies",
      "KYC verification and evidence tracking",
      "PHIPA/PIPEDA compliance with Canadian data residency"
    ]
  }
] as const;

export const securityBullets = [
  "Canadian residency with encryption at rest and in transit",
  "Role-based access control with least privilege principles",
  "Immutable audit logs for all document access and changes",
  "Consent tracking and suppression list management",
  "Automated backups and disaster recovery procedures",
  "PHIPA/PIPEDA alignment with privacy by design"
] as const;

export const implementationSteps = [
  {
    title: "Discovery & Blueprint",
    text: "Map your current workflows and identify automation opportunities."
  },
  {
    title: "Configuration",
    text: "Set up templates, checklists, and integration points."
  },
  {
    title: "Integration & Import",
    text: "Connect existing systems and migrate priority data."
  },
  {
    title: "Pilot",
    text: "Test with select clients and refine processes."
  },
  {
    title: "Go-Live & Optimize",
    text: "Full rollout with ongoing monitoring and optimization."
  }
] as const;

export const faqs = [
  {
    question: "Does this replace our tax suite/EFILE software?",
    answer: "No, it integrates and automates around your existing tax software. We work with QuickBooks, Sage, and other popular accounting platforms to streamline your workflow without disrupting your current processes."
  },
  {
    question: "Do we keep ownership of client data?",
    answer: "Yes, you maintain full ownership of all client data. Everything is stored in Canada with comprehensive audit logs, and you can export or delete data at any time according to your retention policies."
  },
  {
    question: "Can we start small?",
    answer: "Absolutely. We recommend beginning with SecureVault Docs + Scheduling, then adding modules as your team becomes comfortable. Most firms start with 2-3 modules and expand over time."
  },
  {
    question: "Which identity checks do you support?",
    answer: "We support government ID verification with selfie matching, including Canadian driver's licenses, passports, and health cards. All verification includes metadata storage for audit purposes."
  },
  {
    question: "How do you handle retention/deletion?",
    answer: "We provide configurable retention policies with legal holds capability. All changes to retention settings are logged in immutable audit trails, and automated deletion occurs according to your specified schedules."
  }
] as const;

export const analytics = {
  view: "accounting_view",
  ctaDemo: "accounting_cta_demo_click",
  ctaHow: "accounting_cta_how_click",
  intakeSubmit: "accounting_intake_submit"
} as const;