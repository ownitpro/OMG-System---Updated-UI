/* content/propertymanagement.ts
   Static content for the Property Management ("SmartRent Flow") industry page.
   All strings are human-readable; IDs are stable for analytics/FAQ JSON-LD.
*/

export const hero = {
  eyebrow: "SmartRent Flow",
  title: "Simplify property operations. Automate rent, repairs, and reports.",
  subtitle: "The Property Growth Kickstart by OMGsystems helps Ontario landlords and property managers automate communication, rent collection, and owner reporting — all in one connected dashboard.",
  primaryCta: {
    label: "Try a Live Property Demo",
    href: "/apps/demo?vertical=property",
    id: "property_cta_demo_click",
  },
  secondaryCta: {
    label: "See How It Works",
    href: "#how-it-works",
    id: "property_cta_how_click",
  },
  badges: [
    "Ontario-compliant",
    "QuickBooks integration",
    "Owner transparency",
    "Automated reporting",
  ],
  bgVariant: "lightGradient",
} as const;

export const pains = [
  {
    icon: "/icons/property/money.svg",
    title: "Missed rent payments",
    pain: "Late or missed rent payments create cash flow issues and require constant follow-up.",
    fixLabel: "Our fix:",
    solution: "Automated reminders + online rent collection with instant notifications.",
    tone: "neutral",
  },
  {
    icon: "/icons/property/tools.svg",
    title: "Maintenance overload",
    pain: "Repair requests pile up, coordination is chaotic, and tenants get frustrated.",
    fixLabel: "Our fix:",
    solution: "Tenant portal with instant repair requests and automated work order routing.",
    tone: "neutral",
  },
  {
    icon: "/icons/property/message.svg",
    title: "Owner updates",
    pain: "Property owners constantly ask for updates, statements, and property performance data.",
    fixLabel: "Our fix:",
    solution: "Monthly statements generated automatically with real-time dashboard access.",
    tone: "neutral",
  },
  {
    icon: "/icons/property/doc.svg",
    title: "Lease paperwork",
    pain: "Manual lease creation, signing, and renewal processes are time-consuming and error-prone.",
    fixLabel: "Our fix:",
    solution: "Digital contracts and renewals completed in minutes with e-signature integration.",
    tone: "neutral",
  },
  {
    icon: "/icons/property/message.svg",
    title: "Tenant communication chaos",
    pain: "Messages scattered across phone, email, and text — no unified communication history.",
    fixLabel: "Our fix:",
    solution: "Chat + update feed per property with automated notifications and reminders.",
    tone: "neutral",
  },
  {
    icon: "/icons/property/money.svg",
    title: "Manual accounting",
    pain: "Spreadsheet-based accounting is error-prone and doesn't integrate with existing systems.",
    fixLabel: "Our fix:",
    solution: "Export-ready ledgers integrated with QuickBooks and automated reconciliation.",
    tone: "neutral",
  },
] as const;

export const modules = [
  {
    icon: "/icons/property/key.svg",
    title: "Automated Onboarding",
    bullets: [
      "Digital application forms with instant screening",
      "Automated background and credit checks",
      "Welcome sequences and move-in checklists",
    ],
    cta: { label: "See details", href: "#modules-onboarding" },
  },
  {
    icon: "/icons/property/doc.svg",
    title: "Digital Lease Library",
    bullets: [
      "Template library for different property types",
      "Automated lease generation and customization",
      "E-signature integration and renewal tracking",
    ],
    cta: { label: "See details", href: "#modules-leases" },
  },
  {
    icon: "/icons/property/tools.svg",
    title: "Maintenance & Work Orders",
    bullets: [
      "Tenant portal for repair requests",
      "Automated work order routing to vendors",
      "Photo uploads and progress tracking",
    ],
    cta: { label: "See details", href: "#modules-maintenance" },
  },
  {
    icon: "/icons/property/building.svg",
    title: "Owner Dashboard",
    bullets: [
      "Real-time property performance metrics",
      "Monthly statement generation and delivery",
      "Investment tracking and ROI analysis",
    ],
    cta: { label: "See details", href: "#modules-owner" },
  },
  {
    icon: "/icons/property/money.svg",
    title: "Rent Automation",
    bullets: [
      "Automated rent collection and reminders",
      "Late fee calculation and processing",
      "Payment history and receipt generation",
    ],
    cta: { label: "See details", href: "#modules-rent" },
  },
  {
    icon: "/icons/property/meter.svg",
    title: "Reporting & Accounting",
    bullets: [
      "Automated financial reporting and reconciliation",
      "QuickBooks integration and data sync",
      "Tax-ready reports and expense tracking",
    ],
    cta: { label: "See details", href: "#modules-accounting" },
  },
  {
    icon: "/icons/property/growth.svg",
    title: "Content Engine",
    bullets: [
      "Property photo and video management",
      "Automated social media posting",
      "Listing optimization and marketing materials",
    ],
    cta: { label: "See details", href: "#modules-content" },
  },
] as const;

export const flowSteps = [
  {
    index: 1,
    icon: "/icons/property/key.svg",
    title: "Lead",
    description: "Prospective tenants find and apply for properties online.",
    accent: "primary",
  },
  {
    index: 2,
    icon: "/icons/property/doc.svg",
    title: "Lease",
    description: "Digital lease generation, signing, and move-in coordination.",
    accent: "primary",
  },
  {
    index: 3,
    icon: "/icons/property/money.svg",
    title: "Collect",
    description: "Automated rent collection and payment processing.",
    accent: "primary",
  },
  {
    index: 4,
    icon: "/icons/property/tools.svg",
    title: "Maintain",
    description: "Work order management and maintenance coordination.",
    accent: "primary",
  },
  {
    index: 5,
    icon: "/icons/property/meter.svg",
    title: "Report",
    description: "Automated reporting to owners and stakeholders.",
    accent: "primary",
  },
  {
    index: 6,
    icon: "/icons/property/growth.svg",
    title: "Grow",
    description: "Portfolio expansion and performance optimization.",
    accent: "primary",
  },
] as const;

export const statBand = {
  title: "Real outcomes for property managers",
  stats: [
    { label: "Save admin hours per week", value: "10+" },
    { label: "Reduce missed payments", value: "60%" },
    { label: "Faster rent collection", value: "3x" },
    { label: "Owner satisfaction", value: "95%" },
  ],
  variant: "subtle",
} as const;

export const audiences = [
  {
    title: "Individual Landlords",
    bullets: ["1-10 properties", "Rent collection", "Maintenance coordination"],
  },
  {
    title: "Property Management Companies",
    bullets: ["10+ properties", "Owner reporting", "Staff coordination"],
  },
  {
    title: "Real Estate Investors",
    bullets: ["Portfolio tracking", "ROI analysis", "Market insights"],
  },
  {
    title: "Condominium Corporations",
    bullets: ["Unit management", "Board reporting", "Resident services"],
  },
] as const;

export const securityBullets = [
  "Canadian data residency and privacy compliance",
  "Bank-level encryption for financial data",
  "Role-based access control for all users",
  "Audit trails for all property transactions",
  "Secure document storage and sharing",
  "PIPEDA and provincial privacy law compliance",
] as const;

export const implementationSteps = [
  { title: "Property Setup", text: "Import properties, units, and existing tenant data." },
  { title: "System Configuration", text: "Configure workflows, templates, and integrations." },
  { title: "Tenant Onboarding", text: "Migrate existing tenants and onboard new ones." },
  { title: "Owner Training", text: "Train property owners on dashboard and reporting." },
  { title: "Go-Live & Support", text: "Launch with ongoing support and optimization." },
] as const;

export const faqs = [
  {
    schemaId: "quickbooks-integration",
    question: "Does this integrate with QuickBooks?",
    answer: "Yes. SmartRent Flow seamlessly integrates with QuickBooks for automated accounting, expense tracking, and financial reporting.",
    defaultOpen: false,
  },
  {
    schemaId: "tenant-portal",
    question: "Do tenants get their own portal?",
    answer: "Yes. Tenants can pay rent, submit maintenance requests, view lease documents, and communicate through their dedicated portal.",
    defaultOpen: false,
  },
  {
    schemaId: "owner-dashboard",
    question: "What can property owners see in their dashboard?",
    answer: "Real-time occupancy, rent collection status, maintenance requests, financial performance, and automated monthly statements.",
    defaultOpen: false,
  },
  {
    schemaId: "maintenance-coordination",
    question: "How does maintenance request management work?",
    answer: "Tenants submit requests through the portal, which are automatically routed to appropriate vendors with photo documentation and progress tracking.",
    defaultOpen: false,
  },
  {
    schemaId: "data-security",
    question: "How secure is tenant and financial data?",
    answer: "All data is encrypted, stored in Canada, and complies with PIPEDA and provincial privacy laws. We use bank-level security standards.",
    defaultOpen: false,
  },
] as const;

/* Analytics namespace for this page */
export const analytics = {
  view: "property_view",
  ctaDemo: "property_cta_demo_click",
  ctaHow: "property_cta_how_click",
  intakeSubmit: "property_intake_submit",
} as const;
