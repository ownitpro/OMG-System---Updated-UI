/* content/healthcare.ts
   Static content for the Healthcare ("CareFlow Automation") industry page.
   All strings are human-readable; IDs are stable for analytics/FAQ JSON-LD.
*/

export const hero = {
  eyebrow: "CareFlow Automation",
  title:
    "Automate Clinical Workflows. Improve Patient Care. Strengthen Operational Efficiency.",
  subtitle:
    "Scheduling, intake, documentation, claims, medications, staffing, and alerts — secure and Canadian-compliant for clinics, LTC, and group homes. Designed for Ontario clinics, long-term care homes, and group practices.",
  primaryCta: {
    label: "Try a Live Healthcare Demo",
    href: "/apps/demo?vertical=healthcare",
    id: "healthcare_cta_demo_click",
  },
  secondaryCta: {
    label: "See CareFlow in Action",
    href: "#how-it-works",
    id: "healthcare_cta_how_click",
  },
  badges: [
    "PHIPA-aligned",
    "Canadian data residency",
    "Enterprise security",
    "Audit trail",
  ],
  bgVariant: "lightGradient",
} as const;

export const pains = [
  {
    icon: "/icons/calendar.svg",
    title: "Scheduling chaos & no-shows",
    pain:
      "Staff time lost to calls, cancellations, and manual reschedules. Missed visits frustrate patients.",
    fixLabel: "Our fix:",
    solution:
      "Self-service booking, confirmations/reminders, waitlist auto-fill, and virtual link attach.",
    tone: "neutral",
  },
  {
    icon: "/icons/clipboard.svg",
    title: "Paper intake & re-entry",
    pain:
      "Patients re-key the same details; staff retype into multiple systems — errors and delays.",
    fixLabel: "Our fix:",
    solution: "Digital forms, e-sign, OCR, and direct mapping to records.",
    tone: "neutral",
  },
  {
    icon: "/icons/dollar.svg",
    title: "Claim rejections & delays",
    pain:
      "Denied or delayed claims, manual coding, and eligibility checks slow revenue.",
    fixLabel: "Our fix:",
    solution:
      "Eligibility checks, validation, one-click submissions, and denial management.",
    tone: "neutral",
  },
  {
    icon: "/icons/folder.svg",
    title: "Scattered documents",
    pain:
      "Consents, lab results, and notes live in silos — hard to find, share, or audit.",
    fixLabel: "Our fix:",
    solution:
      "Unified document hub with smart tags, role-based access, and immutable logs.",
    tone: "neutral",
  },
  {
    icon: "/icons/pill.svg",
    title: "Medication rounds (LTC/home care)",
    pain:
      "Manual logging, inventory issues, and risk of missed or incorrect doses.",
    fixLabel: "Our fix:",
    solution:
      "Barcode checks, auto-dose logging, stock alerts, and pharmacy reconciliation.",
    tone: "neutral",
  },
  {
    icon: "/icons/users.svg",
    title: "Staffing gaps & overtime",
    pain:
      "Sudden absences, skill-mix gaps, overtime spikes, and fairness concerns.",
    fixLabel: "Our fix:",
    solution:
      "Constraint-aware shift engine, auto-substitution, and mobile rosters.",
    tone: "neutral",
  },
  {
    icon: "/icons/alert.svg",
    title: "Alerts missed or late",
    pain:
      "Lab values or vitals don't reach the right person fast enough — increased risk.",
    fixLabel: "Our fix:",
    solution:
      "Rules + escalation chains, context-rich notifications, and alert dashboards.",
    tone: "neutral",
  },
  {
    icon: "/icons/report.svg",
    title: "Compliance reporting load",
    pain: "Manual spreadsheets for quality metrics, filings, and audits.",
    fixLabel: "Our fix:",
    solution:
      "Dashboards, exports, and compliance-ready templates with near real-time data.",
    tone: "neutral",
  },
] as const;

export const modules = [
  {
    icon: "/icons/calendar.svg",
    title: "Smart Scheduling & Telehealth",
    bullets: [
      "Self-service booking and rescheduling",
      "Multi-channel reminders reduce no-shows",
      "Automatic waitlist fill and calendar/EHR sync",
    ],
    cta: { label: "See details", href: "#modules-scheduling" },
  },
  {
    icon: "/icons/clipboard.svg",
    title: "Digital Intake & Documents",
    bullets: [
      "Dynamic forms with e-signatures",
      "OCR for scanned/faxed docs",
      "Direct field mapping to records",
    ],
    cta: { label: "See details", href: "#modules-intake" },
  },
  {
    icon: "/icons/dollar.svg",
    title: "Billing & Claims",
    bullets: [
      "Eligibility checks and validation",
      "Draft, submit, and track claims",
      "Denial management with resubmission",
    ],
    cta: { label: "See details", href: "#modules-claims" },
  },
  {
    icon: "/icons/folder.svg",
    title: "Secure Document Hub",
    bullets: [
      "Central store with smart tags",
      "Role-based access control",
      "Cross-site sharing with audit logs",
    ],
    cta: { label: "See details", href: "#modules-docs" },
  },
  {
    icon: "/icons/pill.svg",
    title: "Medication & Inventory (LTC)",
    bullets: [
      "Barcode dosing and auto-logging",
      "Inventory alerts and reconciliation",
      "Scheduled med rounds overview",
    ],
    cta: { label: "See details", href: "#modules-meds" },
  },
  {
    icon: "/icons/users.svg",
    title: "Staff Scheduling",
    bullets: [
      "AI-assisted rosters with constraints",
      "Fairness and overtime control",
      "Mobile roster updates",
    ],
    cta: { label: "See details", href: "#modules-staffing" },
  },
  {
    icon: "/icons/alert.svg",
    title: "Alerting & Escalation",
    bullets: [
      "Rules++, routing, and escalation chains",
      "Context-rich notifications",
      "Alert dashboards and audit trails",
    ],
    cta: { label: "See details", href: "#modules-alerts" },
  },
  {
    icon: "/icons/report.svg",
    title: "Analytics & Compliance",
    bullets: [
      "KPI dashboards and SLA watches",
      "Exportable regulatory reports",
      "Usage analytics and trends",
    ],
    cta: { label: "See details", href: "#modules-analytics" },
  },
] as const;

export const flowSteps = [
  {
    index: 1,
    icon: "/icons/lead.svg",
    title: "Lead lands",
    description: "Campaign page or inbound contact captured in CRM.",
    accent: "primary",
  },
  {
    index: 2,
    icon: "/icons/calendar.svg",
    title: "Books visit",
    description: "Live availability for virtual or in-person appointments.",
    accent: "primary",
  },
  {
    index: 3,
    icon: "/icons/clipboard.svg",
    title: "Intake & e-sign",
    description: "Dynamic forms with optional identity check.",
    accent: "primary",
  },
  {
    index: 4,
    icon: "/icons/chat.svg",
    title: "Visit & summary",
    description: "Auto-generated notes and task extraction post-visit.",
    accent: "primary",
  },
  {
    index: 5,
    icon: "/icons/folder.svg",
    title: "Docs filed",
    description: "Checklists tick down as documents arrive.",
    accent: "primary",
  },
  {
    index: 6,
    icon: "/icons/dollar.svg",
    title: "Claims submitted",
    description: "Eligibility, submission, and denial handling.",
    accent: "primary",
  },
  {
    index: 7,
    icon: "/icons/report.svg",
    title: "Dashboards",
    description: "Throughput, issues, and SLAs monitored in real time.",
    accent: "primary",
  },
] as const;

export const statBand = {
  title: "Real outcomes you can measure",
  stats: [
    { label: "Reduce no-shows", value: "20–50%" },
    { label: "Cut intake time", value: "40–70%" },
    { label: "Slash claim rejections", value: "30–60%" },
    { label: "Eliminate manual re-entry", value: "Up to 80%" },
  ],
  variant: "subtle",
} as const;

export const audiences = [
  {
    title: "Clinics & Ambulatory",
    bullets: ["Booking", "Intake", "Billing", "Telehealth"],
  },
  {
    title: "LTC / Retirement / Group Homes",
    bullets: ["Med rounds", "Staffing", "Incident alerts", "Family updates"],
  },
  {
    title: "Allied Health (Physio/Chiro/Wellness)",
    bullets: ["Plans of care", "Reminders", "Progress notes"],
  },
  {
    title: "Integrated Networks & Home Care",
    bullets: ["Referrals", "Shared records", "Remote updates"],
  },
] as const;

export const securityBullets = [
  "Canadian residency, encryption in transit and at rest",
  "Role-based access with least privilege",
  "Immutable audit logs",
  "Consent tracking and suppression lists",
  "Backups and disaster recovery",
  "PHIPA alignment and privacy by design",
] as const;

export const implementationSteps = [
  { title: "Discovery & Kickoff", text: "Map workflows, systems, and goals." },
  { title: "Configuration", text: "Forms, rules, roles, and permissions." },
  {
    title: "Integration & Import",
    text: "Connect existing systems and migrate priority data.",
  },
  { title: "Pilot", text: "UAT with real users and refinement." },
  { title: "Go-Live & Optimize", text: "Monitor, iterate, and scale to more sites." },
] as const;

export const faqs = [
  {
    schemaId: "ehr-replacement",
    question: "Does this replace our EHR?",
    answer:
      "No. CareFlow complements and integrates with your existing systems — scheduling, intake, documents, claims, medications, staffing, and alerts.",
    defaultOpen: false,
  },
  {
    schemaId: "data-protection",
    question: "How is patient data protected?",
    answer:
      "All PHI is encrypted in transit and at rest, access is role-based, and all actions are logged. Data remains in Canadian residency.",
    defaultOpen: false,
  },
  {
    schemaId: "modular-adoption",
    question: "Can we adopt modules gradually?",
    answer:
      "Yes. Many providers start with Scheduling + Intake, then add Claims, Documents, Medications, and Alerts.",
    defaultOpen: false,
  },
  {
    schemaId: "support-slas",
    question: "What support and SLAs do you offer?",
    answer:
      "Onboarding, training, and response SLAs are included. A dedicated success manager monitors early rollout.",
    defaultOpen: false,
  },
  {
    schemaId: "automation-safety",
    question: "How secure is the automation layer?",
    answer:
      "Every workflow is monitored and auditable. Models and rules are validated for confidentiality and fairness.",
    defaultOpen: false,
  },
] as const;

/* Analytics namespace for this page */
export const analytics = {
  view: "healthcare_view",
  ctaDemo: "healthcare_cta_demo_click",
  ctaHow: "healthcare_cta_how_click",
  intakeSubmit: "healthcare_intake_submit",
} as const;
