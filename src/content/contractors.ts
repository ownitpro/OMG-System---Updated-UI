/* content/contractors.ts
   Static content for the Contractors ("Project Growth Engine") industry page.
   All strings are human-readable; IDs are stable for analytics/FAQ JSON-LD.
*/

export const hero = {
  eyebrow: "Project Growth Engine",
  title: "Grow your contracting business. Let automation handle the admin.",
  subtitle: "Lead capture, quoting, payments, and client communication — all automated for Ontario builders, renovators, and trades.",
  primaryCta: {
    label: "Try a Live Contractor Demo",
    href: "/apps/demo?vertical=contractors",
    id: "contractor_cta_demo_click",
  },
  secondaryCta: {
    label: "See How It Works",
    href: "#how-it-works",
    id: "contractor_cta_how_click",
  },
  badges: [
    "Steady lead flow",
    "Faster quoting",
    "Automated payments",
    "Content marketing",
  ],
  bgVariant: "lightGradient",
} as const;

export const pains = [
  {
    icon: "/icons/contractors/helmet.svg",
    title: "Feast-or-famine jobs",
    pain: "One week you're swamped, the next you're waiting for work — no predictability in your pipeline.",
    fixLabel: "Our fix:",
    solution: "Targeted ads + high-intent landing pages feed you a steady stream of qualified leads.",
    tone: "neutral",
  },
  {
    icon: "/icons/contractors/tape.svg",
    title: "Wasted calls with tire-kickers",
    pain: "Hours lost on prospects outside your service area, budget, or scope of work.",
    fixLabel: "Our fix:",
    solution: "Smart intake scoring filters by job type, budget, and location before you call.",
    tone: "neutral",
  },
  {
    icon: "/icons/contractors/quote.svg",
    title: "Slow quotes lose clients",
    pain: "Drafting estimates from scratch means losing to faster competitors.",
    fixLabel: "Our fix:",
    solution: "Proposal templates + pricing libraries produce branded quotes in minutes.",
    tone: "neutral",
  },
  {
    icon: "/icons/contractors/invoice.svg",
    title: "Payment delays drain cash flow",
    pain: "Late or missed payments force you to follow up again and again.",
    fixLabel: "Our fix:",
    solution: "Accepted quotes trigger invoices + automated reminders until paid.",
    tone: "neutral",
  },
  {
    icon: "/icons/contractors/chat.svg",
    title: "No reviews or referrals",
    pain: "You finish strong but never ask — missed social proof and repeat business.",
    fixLabel: "Our fix:",
    solution: "Auto-requests for Google/Facebook reviews on job completion.",
    tone: "neutral",
  },
  {
    icon: "/icons/contractors/growth.svg",
    title: "No content marketing",
    pain: "You take photos but forget to post or spend too long editing and scheduling.",
    fixLabel: "Our fix:",
    solution: "Content Engine uploads, schedules, and auto-posts your photos/videos (30/60/90s).",
    tone: "neutral",
  },
] as const;

export const modules = [
  {
    icon: "/icons/contractors/helmet.svg",
    title: "Lead Gen & Ads",
    bullets: [
      "Targeted ad campaigns (Meta, Google)",
      "Landing pages + funnels",
      "Audience testing & scaling",
    ],
    cta: { label: "See details", href: "#modules-leads" },
  },
  {
    icon: "/icons/contractors/tape.svg",
    title: "Smart Intake",
    bullets: [
      "Collect photos, budget, timeline",
      "Auto-qualify leads",
      "Booking link embedded in flow",
    ],
    cta: { label: "See details", href: "#modules-intake" },
  },
  {
    icon: "/icons/contractors/quote.svg",
    title: "Fast Proposals",
    bullets: [
      "Predefined templates & pricing library",
      "Auto-fill from intake",
      "Branded PDF delivery",
    ],
    cta: { label: "See details", href: "#modules-proposals" },
  },
  {
    icon: "/icons/contractors/invoice.svg",
    title: "Auto-Invoicing",
    bullets: [
      "Generate invoices from accepted quotes",
      "Deposit requests",
      "Automated reminders & overdue flows",
    ],
    cta: { label: "See details", href: "#modules-invoicing" },
  },
  {
    icon: "/icons/contractors/chat.svg",
    title: "Client Portal",
    bullets: [
      "Define job phases (e.g. rough-in, finish)",
      "Milestone notifications",
      "Client portal status view",
    ],
    cta: { label: "See details", href: "#modules-portal" },
  },
  {
    icon: "/icons/contractors/growth.svg",
    title: "Review Automation",
    bullets: [
      "Ask for Google/Facebook reviews",
      "Auto-post positive ones",
      "Referral prompts & rewards",
    ],
    cta: { label: "See details", href: "#modules-reviews" },
  },
] as const;

export const flowSteps = [
  {
    index: 1,
    icon: "/icons/contractors/helmet.svg",
    title: "Lead",
    description: "Run targeted ads + landing pages funnel leads in.",
    accent: "primary",
  },
  {
    index: 2,
    icon: "/icons/contractors/tape.svg",
    title: "Qualify",
    description: "Intake scoring filters and sends booking links for real jobs.",
    accent: "primary",
  },
  {
    index: 3,
    icon: "/icons/contractors/quote.svg",
    title: "Quote",
    description: "Generate and send branded proposals from template.",
    accent: "primary",
  },
  {
    index: 4,
    icon: "/icons/contractors/invoice.svg",
    title: "Convert",
    description: "Client approves, contract + invoice triggered automatically.",
    accent: "primary",
  },
  {
    index: 5,
    icon: "/icons/contractors/chat.svg",
    title: "Deliver",
    description: "Track job via milestones; clients see status in portal.",
    accent: "primary",
  },
  {
    index: 6,
    icon: "/icons/contractors/growth.svg",
    title: "Grow",
    description: "Request review, post content, send referrals, re-engage client.",
    accent: "primary",
  },
] as const;

export const statBand = {
  title: "Real outcomes for contractors",
  stats: [
    { label: "Faster lead response", value: "7x" },
    { label: "Less admin time", value: "40-60%" },
    { label: "Setup time", value: "1-3 weeks" },
    { label: "Client satisfaction", value: "95%" },
  ],
  variant: "subtle",
} as const;

export const audiences = [
  {
    title: "Home Renovation / Remodeling",
    bullets: ["Kitchen, bath, basement conversions", "Project-driven quoting & phased payments"],
  },
  {
    title: "Painting / Flooring / Finishing Trades",
    bullets: ["Fast quoting by room / square footage", "Recurring scheduling & upsells"],
  },
  {
    title: "HVAC / Electric / Plumbing",
    bullets: ["Service + installation jobs", "Change orders and parts tracking"],
  },
  {
    title: "General Contractor / GC",
    bullets: ["Managing subcontractors", "Multi-phase projects, site updates, client portal"],
  },
] as const;

export const securityBullets = [
  "Canadian data residency and privacy compliance",
  "Bank-level encryption for financial data",
  "Role-based access control for all users",
  "Audit trails for all project transactions",
  "Secure document storage and sharing",
  "PIPEDA and provincial privacy law compliance",
] as const;

export const implementationSteps = [
  { title: "Discovery & Setup", text: "Configure templates, pricing, and workflows." },
  { title: "Lead Integration", text: "Connect ads, landing pages, and intake forms." },
  { title: "Client Migration", text: "Import existing clients and project data." },
  { title: "Team Training", text: "Train staff on new processes and tools." },
  { title: "Go-Live & Optimize", text: "Launch with ongoing support and optimization." },
] as const;

export const faqs = [
  {
    schemaId: "existing-crm",
    question: "Will this work with my existing CRM or ads?",
    answer: "Yes — you can bring your existing ads or CRM; we integrate or transition gradually without disrupting your current workflow.",
    defaultOpen: false,
  },
  {
    schemaId: "setup-time",
    question: "How long until this is live?",
    answer: "Typically 1–3 weeks (depends on number of modules and complexity). We configure, test, and hand off seamlessly.",
    defaultOpen: false,
  },
  {
    schemaId: "customization",
    question: "Can I customize proposal templates or contract logic?",
    answer: "Yes — you have full control over templates, pricing, clauses, branding, and logic to match your business needs.",
    defaultOpen: false,
  },
  {
    schemaId: "usage-limits",
    question: "What happens when I hit usage limits or overages?",
    answer: "You'll be alerted at thresholds (70%, 90%, etc.). New automations will pause at 100% until you upgrade or reduce usage.",
    defaultOpen: false,
  },
  {
    schemaId: "data-security",
    question: "Are client data and documents secure in Ontario / Canada?",
    answer: "Absolutely — encrypted, stored in Canadian region, audit logs & role-based access. We follow PIPEDA compliance standards.",
    defaultOpen: false,
  },
] as const;

/* Analytics namespace for this page */
export const analytics = {
  view: "contractor_view",
  ctaDemo: "contractor_cta_demo_click",
  ctaHow: "contractor_cta_how_click",
  intakeSubmit: "contractor_intake_submit",
} as const;
