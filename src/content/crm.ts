export const analytics = {
  view: "crm_view",
  ctaDemo: "crm_cta_demo_click",
} as const;

export const hero = {
  eyebrow: "Automation CRM",
  title: "OMGsystems CRM — Built for Real Businesses, Not Generic Workflows",
  subtitle: "Automation, documents, billing, and communication — all in one. Tailored builds for property management, healthcare, contractors, real estate, accounting, cleaning, and more.",
  primaryCta: { 
    label: "Book a Demo", 
    href: "/demo/crm", 
    id: "crm_demo" 
  },
  secondaryCta: { 
    label: "See Pricing", 
    href: "/pricing/crm", 
    id: "crm_pricing" 
  },
  badges: [
    "Canadian data residency", 
    "Encryption at rest & in transit", 
    "Role-based access", 
    "Audit logging"
  ]
} as const;

export const pains = [
  { 
    title: "Leads fall through the cracks", 
    pain: "New inquiries land in inboxes and sheets; half never get a timely reply." 
  },
  { 
    title: "Too much manual paperwork", 
    pain: "Collecting docs, chasing signatures, and filing eats your day." 
  },
  { 
    title: "No clarity on who does what", 
    pain: "Sales, field, finance all operate in silos and collide on deadlines." 
  },
  { 
    title: "Clients keep asking for updates", 
    pain: "Status lives in emails and spreadsheets — not a client-visible place." 
  },
  { 
    title: "Follow-ups and renewals are ad-hoc", 
    pain: "No systematic nurture to prevent churn or missed upsells." 
  },
  { 
    title: "You've outgrown spreadsheets", 
    pain: "You need real workflows, not another to-do list app." 
  }
] as const;

export const fixes = [
  {
    title: "Smart lead capture & instant follow-ups",
    bullets: [
      "Forms auto-create and score leads",
      "Email/SMS drips start immediately",
      "Every response logged to the timeline"
    ]
  },
  {
    title: "Documents & e-sign inside the CRM",
    bullets: [
      "Send proposals and contracts",
      "Track signing status at a glance",
      "Store audit-ready records (via secure vault integration)"
    ]
  },
  {
    title: "Role-based dashboards",
    bullets: [
      "Sales sees pipelines", 
      "Field sees schedules", 
      "Finance sees invoices & AR"
    ]
  },
  {
    title: "Client portals & status updates",
    bullets: [
      "Self-serve progress view", 
      "Automated milestones", 
      "Fewer 'what's the status?' calls"
    ]
  },
  {
    title: "Retention & renewal automation",
    bullets: [
      "Proactive reminders", 
      "Satisfaction surveys", 
      "At-risk account alerts"
    ]
  },
  {
    title: "Simple scaling",
    bullets: [
      "Start small", 
      "Enable modules as you grow", 
      "No migrations or vendor lock-in"
    ]
  }
] as const;

export const industries = [
  { 
    title: "Property Management", 
    blurb: "Owner reports, PMA tracking, occupancy, and maintenance flows.", 
    href: "/industries/propertymanagement" 
  },
  { 
    title: "Healthcare", 
    blurb: "PHIPA-aligned pipelines, scheduling, onboarding, and compliance.", 
    href: "/industries/healthcare" 
  },
  { 
    title: "Contractors", 
    blurb: "Lead→quote→invoice with milestone tracking and review engine.", 
    href: "/industries/contractors" 
  },
  { 
    title: "Accounting", 
    blurb: "Intake, document workflows, recurring billing, and e-sign.", 
    href: "/industries/accounting" 
  },
  { 
    title: "Cleaning", 
    blurb: "Quote-to-job automation, routing, checklists, and invoicing.", 
    href: "/industries/cleaning" 
  },
  { 
    title: "Real Estate", 
    blurb: "Buyer/seller drips, showings, contracts, and post-close nurture.", 
    href: "/industries/real-estate" 
  }
] as const;

export const modules = [
  { 
    title: "Automation engine", 
    bullets: ["Event-based workflows", "Email/SMS actions", "Webhooks & API triggers"] 
  },
  { 
    title: "Document hub", 
    bullets: ["Requests & e-sign", "Auto-filing", "Retention policies"] 
  },
  { 
    title: "Pipelines & tasks", 
    bullets: ["Kanban deals", "Task assignments", "SLA alerts"] 
  },
  { 
    title: "Billing & payments", 
    bullets: ["Invoices & reminders", "Deposits & milestones", "Aging view"] 
  },
  { 
    title: "Client portals", 
    bullets: ["Live status", "File exchange", "Messaging trails"] 
  },
  { 
    title: "Analytics & health", 
    bullets: ["Lead→revenue conversion", "Usage meter warnings", "Churn risk flags"] 
  }
] as const;

export const stats = {
  stats: [
    { value: "7×", label: "Faster lead response" },
    { value: "40–60%", label: "Less admin time" },
    { value: "+20%", label: "Higher retention" },
    { value: "0%", label: "Manual reporting" }
  ]
} as const;

export const pricing = {
  plans: [
    {
      name: "Starter",
      price: "$25–35/user",
      bullets: ["Leads & tasks", "Basic document hub", "Shared hosting"],
      cta: { label: "Start Starter", href: "/start?plan=starter" }
    },
    {
      name: "Growth",
      price: "$55/user",
      bullets: ["Advanced automations", "Integrations", "Up to 25 GB docs"],
      cta: { label: "Start Growth", href: "/start?plan=growth" }
    },
    {
      name: "Pro",
      price: "$65–75/user",
      bullets: ["Analytics suite", "API access", "Multi-location features"],
      cta: { label: "Start Pro", href: "/start?plan=pro" }
    },
    {
      name: "Advanced",
      price: "$90+/user",
      bullets: ["Full automation suite", "250 GB docs", "Compliance & audit tools"],
      cta: { label: "Talk to Sales", href: "/contact" }
    }
  ]
} as const;

export const faqs = [
  { 
    q: "Does it integrate with my current tools?", 
    a: "Yes. We connect via webhooks and API, or you can run OMGsystems CRM standalone." 
  },
  { 
    q: "Can I use the document vault with e-sign?", 
    a: "Yes. The secure vault integrates natively for requests, signing, and audit trails." 
  },
  { 
    q: "Where is my data stored?", 
    a: "In Canada, encrypted at rest and in transit. Role-based access and audit logs are standard." 
  },
  { 
    q: "How long to launch?", 
    a: "Most teams launch in 1–3 weeks depending on complexity." 
  },
  { 
    q: "Contract terms?", 
    a: "Monthly or annual. Cancel anytime on monthly; annual includes a discount." 
  }
] as const;

export const productStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "OMGsystems CRM",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "25",
    category: "starter"
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    reviewCount: "112"
  }
} as const;
