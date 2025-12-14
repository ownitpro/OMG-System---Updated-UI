// app_pages_config.ts

import type { AppId } from "./apps_config";

export type ProblemItem = {
  title: string;
  description: string;
};

export type SolutionItem = {
  problem: string;
  solution: string;
};

export type FeatureItem = {
  title: string;
  description: string;
};

export type OutcomeMetric = {
  metric: string;
  label: string;
};

export type StepItem = {
  step: string;
  title: string;
  description: string;
};

export type SecurityItem = {
  title: string;
  description: string;
};

export type ConnectorCategory = {
  category: string;
  items: string[];
};

export type PricingPlan = {
  name: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  metric: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type CtaLink = {
  label: string;
  href: string;
};

export type HeroContent = {
  eyebrow?: string;
  title: string;
  tagline: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
  tertiaryLink?: CtaLink;
};

export type BusinessPersonalBlock = {
  heading: string;
  subheading: string;
  features: FeatureItem[];
  outcomes?: OutcomeMetric[];
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
};

export type AppPageContent = {
  hero: HeroContent;
  problems?: ProblemItem[];
  solutions?: SolutionItem[];
  businessBlock?: BusinessPersonalBlock;
  personalBlock?: BusinessPersonalBlock;
  howItWorks?: {
    heading: string;
    steps: StepItem[];
  };
  security?: {
    heading: string;
    items: SecurityItem[];
  };
  connectors?: {
    heading: string;
    categories: ConnectorCategory[];
  };
  pricingOverview?: {
    heading: string;
    plans: PricingPlan[];
  };
  proof?: {
    heading: string;
    testimonials: Testimonial[];
  };
  faqs?: {
    heading: string;
    items: FAQ[];
  };
  finalCta?: {
    heading: string;
    primaryCta: CtaLink;
    secondaryCta?: CtaLink;
    tertiaryCta?: CtaLink;
  };
};

/**
 * Full page configs per app, using the SecureVault layout shape.
 * You can keep enriching these over time.
 */
export const appPagesConfig: Partial<Record<AppId, AppPageContent>> = {
  svd: {
    // 🔐 SecureVault Docs – based on the layout + copy you gave earlier
    hero: {
      eyebrow: "Secure document portals for teams & life",
      title: "SecureVault Docs",
      tagline: "Capture once. Organize forever.",
      description:
        "Give your team and clients one secure place to upload, find, and share documents. PIN-protected links, client portals, smart OCR, and full audit trails—without email chaos.",
      primaryCta: {
        label: "Get Started Free",
        href: "/apps/securevault-docs/signup",
      },
      secondaryCta: {
        label: "Try the Live Demo",
        href: "/apps/securevault-docs/demo",
      },
      tertiaryLink: {
        label: "Talk to Sales",
        href: "/contact",
      },
    },
    problems: [
      {
        title: "Endless chasing",
        description:
          "Files buried in email threads, chat apps, and random folders across multiple drives.",
      },
      {
        title: "Missing documents",
        description:
          "No clear checklist, so you go back and forth for days just to collect a basic package.",
      },
      {
        title: "Risky sharing",
        description:
          "Open links, no PIN, no expiry, no watermark—once it's out, it's out.",
      },
      {
        title: "No single source of truth",
        description:
          "Multiple versions, duplicates, and nobody is 100% sure which file is final.",
      },
      {
        title: "Zero visibility",
        description:
          "You don't know who uploaded what or who viewed what until it becomes a problem.",
      },
    ],
    solutions: [
      {
        problem: "Chasing clients for days to collect basic documents.",
        solution:
          "Send one PIN-protected portal link with a checklist. Clients upload everything in one place.",
      },
      {
        problem: "Losing time searching across random folders and drives.",
        solution:
          "Smart OCR reads the content of your documents and makes them searchable by title, label, or text inside.",
      },
      {
        problem: "Sharing sensitive files with open links.",
        solution:
          "Use expiring, PIN-protected links with watermark-only viewing and instant revoke.",
      },
      {
        problem: "No idea who touched what or when.",
        solution:
          "Clear activity trails show who uploaded, viewed, shared, or revoked each file.",
      },
    ],
    businessBlock: {
      heading: "Built for modern firms and teams",
      subheading:
        "Collect, organize, and share client documents without the usual chaos.",
      features: [
        {
          title: "Client Portals",
          description:
            "One secure portal per client with PIN, optional expiry, and checklist guidance.",
        },
        {
          title: "File Requests",
          description:
            "Send a clear list of required documents so clients know exactly what to upload.",
        },
        {
          title: "Secure Sharing",
          description:
            "Watermarked viewer, view-only mode, and instant revoke if something changes.",
        },
        {
          title: "OCR + Auto Labels",
          description:
            "Documents are read, tagged, and organized automatically in the background.",
        },
      ],
      outcomes: [
        {
          metric: "50–70%",
          label: "Less time spent chasing documents",
        },
        {
          metric: "1 Link",
          label: "To handle an entire client package",
        },
        {
          metric: "0",
          label: "Email attachments needed",
        },
        {
          metric: "24/7",
          label: "Client upload access",
        },
      ],
      primaryCta: {
        label: "See Business Plans",
        href: "/apps/securevault-docs/pricing",
      },
      secondaryCta: {
        label: "Try the Live Demo",
        href: "/apps/securevault-docs/demo",
      },
    },
    personalBlock: {
      heading: "Also built for your personal life",
      subheading:
        "A private vault for IDs, tax slips, school docs, rental documents, and receipts.",
      features: [
        {
          title: "Simple Vault",
          description:
            "Upload, label, and find your important documents in seconds.",
        },
        {
          title: "Safe Sharing",
          description:
            "Share with PIN-protected expiring links instead of sending attachments.",
        },
        {
          title: "Smart Search",
          description:
            "Find documents by name, label, or text inside the file.",
        },
        {
          title: "Multi-Person Access",
          description:
            "Option to safely share a vault with family members or trusted partners.",
        },
      ],
      outcomes: [
        {
          metric: "Minutes",
          label: "To find any document you need",
        },
        {
          metric: "Zero",
          label: "Screenshots and camera-roll chaos",
        },
      ],
      primaryCta: {
        label: "See Personal Plans",
        href: "/apps/securevault-docs/pricing#personal",
      },
      secondaryCta: {
        label: "Get Started Free",
        href: "/apps/securevault-docs/signup",
      },
    },
    howItWorks: {
      heading: "How SecureVault Docs works",
      steps: [
        {
          step: "1",
          title: "Invite or Upload",
          description:
            "Start a client portal or upload straight into your personal or business vault.",
        },
        {
          step: "2",
          title: "Smart Organize",
          description:
            "OCR, labels, folders, and checklists keep everything in the right place.",
        },
        {
          step: "3",
          title: "Share & Track",
          description:
            "Send PIN-protected links, use watermarked viewing, and see who did what.",
        },
      ],
    },
    security: {
      heading: "Security in plain English",
      items: [
        {
          title: "PIN-only access",
          description:
            "Every shared link can require a PIN so only the right person gets in.",
        },
        {
          title: "Expiring links",
          description:
            "Links automatically expire when you decide, so old links don't float around forever.",
        },
        {
          title: "Watermarked viewer",
          description:
            "Show documents in a watermark-only viewer so raw files never leave the vault unless you say so.",
        },
        {
          title: "Activity & versions",
          description:
            "See who uploaded, downloaded, or shared which file, and roll back if needed.",
        },
      ],
    },
    connectors: {
      heading: "Connectors & automations",
      categories: [
        {
          category: "Accounting & operations",
          items: ["QuickBooks Online", "Xero", "FreshBooks", "Sage Cloud"],
        },
        {
          category: "Cloud storage",
          items: ["Google Drive", "OneDrive", "Dropbox", "Box"],
        },
        {
          category: "Communication & team",
          items: ["Email-to-Vault", "Slack", "Microsoft Teams"],
        },
        {
          category: "Signatures & workflows",
          items: ["e-sign tools", "n8n", "Make", "Notion templates"],
        },
      ],
    },
    pricingOverview: {
      heading: "Pricing overview (no surprises)",
      plans: [
        {
          name: "Business Plans",
          description:
            "Seat-based plans with unlimited client portals, usage alerts, and a 7-day free trial.",
        },
        {
          name: "Personal Plans",
          description:
            "Simple personal vault plans, with a Pro tier that supports multiple people and linked businesses.",
        },
      ],
    },
    proof: {
      heading: "Real outcomes from real teams",
      testimonials: [
        {
          quote:
            "We stopped chasing clients for weeks just to complete a basic document list.",
          metric: "50–70% less chase time",
        },
        {
          quote:
            "Every client now has a clean portal and our team finally trusts the system.",
          metric: "Far fewer mistakes & resends",
        },
        {
          quote:
            "Sharing sensitive files feels safe now. We have full control over links and access.",
          metric: "Safer sharing with fewer risks",
        },
      ],
    },
    faqs: {
      heading: "Frequently asked questions",
      items: [
        {
          question: "Is this hard to set up?",
          answer:
            "No. You can send a client portal link with a PIN in minutes. Clients upload without needing a login unless you want full portal access for them.",
        },
        {
          question: "Can I control who sees what?",
          answer:
            "Yes. You can set view, download, and share permissions per user or role, and revoke access at any time.",
        },
        {
          question: "Does this work as an app?",
          answer:
            "Yes. SecureVault Docs works as an installable app on Mac, Windows, Linux, and as a PWA on mobile.",
        },
        {
          question: "Does it connect to the tools we already use?",
          answer:
            "Yes. You can connect to cloud drives, accounting tools, e-sign platforms, and more through our connectors and automation marketplace.",
        },
      ],
    },
    finalCta: {
      heading: "Ready to stop chasing documents?",
      primaryCta: {
        label: "Get Started Free",
        href: "/apps/securevault-docs/signup",
      },
      secondaryCta: {
        label: "Try the Live Demo",
        href: "/apps/securevault-docs/demo",
      },
      tertiaryCta: {
        label: "Talk to Sales",
        href: "/contact",
      },
    },
  },

  // 🟦 OMGCRM – powered by same layout (you can extend these sections further)
  crm: {
    hero: {
      eyebrow: "CRM for real operations, not just contacts",
      title: "OMGCRM",
      tagline: "The CRM that adapts to your workflow.",
      description:
        "Unify your leads, clients, pipelines, tasks, and documents in one clean, automation-ready CRM built for real industries like property management, real estate, contractors, and accounting.",
      primaryCta: {
        label: "Try a Live Demo",
        href: "/apps/crm/demo",
      },
      secondaryCta: {
        label: "Contact Sales",
        href: "/contact",
      },
      tertiaryLink: {
        label: "See all OMG Apps",
        href: "/apps",
      },
    },

    // THE PROBLEMS MOST BUSINESSES FACE
    problems: [
      {
        title: "Leads lost in spreadsheets and inboxes",
        description:
          "New inquiries come in from forms, emails, socials, and calls—but end up scattered in random spreadsheets and DMs.",
      },
      {
        title: "Slow or inconsistent follow-up",
        description:
          "Some leads get a quick response, others wait days. Deals fall through simply because nobody followed up on time.",
      },
      {
        title: "Too many tools, no single view",
        description:
          "Your team jumps between email, spreadsheets, project tools, and shared drives just to understand one client.",
      },
      {
        title: "No clear sales performance",
        description:
          "It's hard to see which stages are stuck, which campaigns work, or which reps are overloaded.",
      },
      {
        title: "Manual data entry and errors",
        description:
          "Copy-paste between tools creates mistakes, missing info, and frustration for both your team and clients.",
      },
    ],

    // PROBLEM → SOLUTION TABLE
    solutions: [
      {
        problem: "Leads are buried in spreadsheets and random inboxes.",
        solution:
          "OMGCRM captures everything automatically into one place—web forms, ad leads, imports, and manual entries.",
      },
      {
        problem: "Follow-up is slow and depends on who checked their email.",
        solution:
          "Trigger instant routing, reminders, and automations so every lead gets a fast, consistent response.",
      },
      {
        problem: "Too many tools and no visibility across the pipeline.",
        solution:
          "Use one unified CRM with leads, clients, tasks, and documents all tied to the same record.",
      },
      {
        problem: "You don't know where deals get stuck or which campaigns perform.",
        solution:
          "Pipelines and dashboards show exactly where deals drop off, which sources convert, and where to focus.",
      },
      {
        problem: "Manual data entry leads to errors and missing details.",
        solution:
          "Automations, defaults, and validation keep records clean while reducing repetitive typing for your team.",
      },
    ],

    // WHY CHOOSE OMGCRM? + EVERYTHING YOU NEED IN ONE PLATFORM
    businessBlock: {
      heading: "Why choose OMGCRM?",
      subheading:
        "A CRM built around real industries, real workflows, and automation—not just contact lists.",
      features: [
        {
          title: "Single Source of Truth",
          description:
            "All leads, clients, tasks, and documents in one place with clear timelines and activity history.",
        },
        {
          title: "Automated Lead Follow-Up",
          description:
            "Trigger reminders, tasks, emails, or SMS when new leads come in so nobody slips through the cracks.",
        },
        {
          title: "Industry-Ready Pipelines",
          description:
            "Pre-built pipelines for property management, real estate, contractors, and accounting that you can customize.",
        },
        {
          title: "Document Integration",
          description:
            "SecureVault Docs built-in so you can request, store, and share documents directly from each client record.",
        },
        {
          title: "Reporting & Analytics",
          description:
            "Real-time dashboards show open deals, conversion rates, team workload, and revenue by source.",
        },
        {
          title: "Team Collaboration",
          description:
            "Assign tasks, leave internal notes, and keep everyone on the same page for each client or deal.",
        },
        {
          title: "Mobile Friendly",
          description:
            "Access pipelines, client info, and tasks from anywhere—perfect for agents, field teams, or on-the-go owners.",
        },
        {
          title: "Automation-Ready",
          description:
            "Connect to automations so you can stop doing the same admin work over and over again.",
        },
      ],
      outcomes: [
        {
          metric: "7× Faster",
          label: "Average response time to new leads",
        },
        {
          metric: "20–40%",
          label: "Potential lift in conversion when follow-up is consistent",
        },
        {
          metric: "1 Place",
          label: "For leads, clients, tasks, and docs",
        },
        {
          metric: "Hours Saved",
          label: "Every week by reducing manual updates",
        },
      ],
      primaryCta: {
        label: "Try a Live Demo",
        href: "/apps/crm/demo",
      },
      secondaryCta: {
        label: "Contact Sales",
        href: "/contact",
      },
    },

    // HOW IT WORKS — 3 STEP JOURNEY
    howItWorks: {
      heading: "How OMGCRM fits into your day",
      steps: [
        {
          step: "1",
          title: "Capture every lead in one place",
          description:
            "Leads flow in from forms, ads, imports, and calls straight into your pipelines—no more hunting through inboxes.",
        },
        {
          step: "2",
          title: "Work from one clean pipeline",
          description:
            "Move deals through visual stages, trigger automations, assign tasks, and keep documents attached to the right client.",
        },
        {
          step: "3",
          title: "See what's working and what's stuck",
          description:
            "Use dashboards to see where deals stall, which sources convert, and where to focus your team's time.",
        },
      ],
    },

    // SECURITY SECTION
    security: {
      heading: "Data security in plain English",
      items: [
        {
          title: "Role-based access",
          description:
            "Give each team member the right level of access so sensitive data isn't visible to everyone.",
        },
        {
          title: "Secure, encrypted storage",
          description:
            "Client data and documents are stored securely with encryption in transit and at rest.",
        },
        {
          title: "Activity history",
          description:
            "See who updated what and when, so changes to deals, notes, and contacts are fully traceable.",
        },
        {
          title: "Canadian data residency",
          description:
            "Data is stored in Canada to align with Canadian privacy and compliance expectations.",
        },
      ],
    },

    // CONNECTORS & AUTOMATIONS SECTION
    connectors: {
      heading: "Connect OMGCRM to the tools you already use",
      categories: [
        {
          category: "Communication & email",
          items: [
            "Email integration",
            "Calendar sync",
            "Follow-up reminders",
          ],
        },
        {
          category: "Documents & storage",
          items: [
            "SecureVault Docs (native)",
            "Cloud storage connectors",
          ],
        },
        {
          category: "Leads & marketing",
          items: [
            "OMG Leads",
            "Ad platform integrations",
            "Web form + landing page capture",
          ],
        },
        {
          category: "Automation platforms",
          items: [
            "n8n workflows",
            "Custom webhooks",
            "Internal automations (tasks, tags, routing)",
          ],
        },
      ],
    },

    // PRICING OVERVIEW (NO NUMBERS)
    pricingOverview: {
      heading: "CRM pricing overview",
      plans: [
        {
          name: "OMGCRM Standalone",
          description:
            "Use OMGCRM on its own with pipelines, tasks, basic automations, and document integration for your team.",
        },
        {
          name: "Full OMG Platform",
          description:
            "Combine OMGCRM with SecureVault Docs, OMG Leads, and more for an end-to-end system from lead capture to document signing.",
        },
      ],
    },

    // PROOF & OUTCOMES (SOCIAL PROOF STYLE)
    proof: {
      heading: "Real results from teams like yours",
      testimonials: [
        {
          quote:
            "We finally have one place where everyone can see what's happening with each client.",
          metric: "Clear visibility across the whole pipeline",
        },
        {
          quote:
            "Our follow-up isn't random anymore. Tasks and reminders keep the team on track.",
          metric: "Far more consistent follow-up",
        },
        {
          quote:
            "Moving deals and documents through one system cut so much admin time.",
          metric: "Hours saved every week on manual updates",
        },
      ],
    },

    // FAQ SECTION
    faqs: {
      heading: "Frequently asked questions",
      items: [
        {
          question: "Do I need to move my old data?",
          answer:
            "You can import data from spreadsheets or other CRMs. We keep the process simple so you can get up and running quickly.",
        },
        {
          question: "What tools does OMGCRM connect with?",
          answer:
            "OMGCRM connects with email, calendars, SecureVault Docs, lead sources, and automation tools so you're not rebuilding your whole stack.",
        },
        {
          question: "Is my data safe?",
          answer:
            "Yes. Data is encrypted, access is role-based, and information is stored in Canada with logging and activity history.",
        },
        {
          question: "Can I customize pipelines?",
          answer:
            "Yes. You can use our industry-ready pipelines as-is or edit stages, fields, and workflows to match how your team actually works.",
        },
        {
          question: "How fast can we launch?",
          answer:
            "Most teams can get a basic pipeline live in days, then keep refining automations and workflows as they go.",
        },
        {
          question: "Does my team need a lot of training?",
          answer:
            "No. The interface is built around simple boards, clear stages, and tasks. We include onboarding support to help your team adopt it quickly.",
        },
      ],
    },

    // FINAL CTA
    finalCta: {
      heading: "Ready to make your CRM actually work for you?",
      primaryCta: {
        label: "Try a Live Demo",
        href: "/apps/crm/demo",
      },
      secondaryCta: {
        label: "Contact Sales",
        href: "/contact",
      },
      tertiaryCta: {
        label: "Explore other OMG apps",
        href: "/apps",
      },
    },
  },

  // 🟣 OMG Leads
  leads: {
    hero: {
      eyebrow: "From random inquiries to a predictable pipeline",
      title: "OMG Leads",
      tagline: "Turn ads into predictable revenue.",
      description:
        "OMG Leads connects your ads directly to your CRM with smart scoring, automated follow-up, and real-time ROI tracking—so you stop guessing and start growing on purpose.",
      primaryCta: {
        label: "Get Your Leads Strategy Call",
        href: "/contact?topic=omg-leads",
      },
      secondaryCta: {
        label: "See How It Works",
        href: "/apps/omg-leads",
      },
      tertiaryLink: {
        label: "View all OMG Apps",
        href: "/apps",
      },
    },
    // THE PROBLEMS MOST BUSINESSES FACE
    problems: [
      {
        title: "Lead flow is a rollercoaster",
        description:
          "Some months are slammed, others are dead. You can't predict what's coming in, so planning is stressful.",
      },
      {
        title: "You're not sure which ads are actually working",
        description:
          "Money goes into Facebook, Google, or TikTok—but there's no clear line from ad spend to deals closed.",
      },
      {
        title: "Leads fall through the cracks",
        description:
          "Inquiries come in from forms, DMs, calls, and emails with no unified system. Some never get a response at all.",
      },
      {
        title: "Follow-up is slow or inconsistent",
        description:
          "If someone's busy or out of office, leads sit for hours or days before anyone replies.",
      },
      {
        title: "Your team wastes time on low-quality leads",
        description:
          "Sales reps chase people who were never serious while hot leads don't get prioritized.",
      },
      {
        title: "You're stuck doing everything manually",
        description:
          "Exporting lists, tagging, sending reminders, checking spreadsheets—too much of your \"lead system\" runs in your head.",
      },
    ],
    // PROBLEM → SOLUTION TABLE
    solutions: [
      {
        problem: "Lead volume is unpredictable, and you're always reacting.",
        solution:
          "OMG Leads builds an end-to-end funnel—from ad click to CRM to follow-up—so you have a repeatable, predictable engine.",
      },
      {
        problem: "You don't know which campaigns or channels actually produce paying clients.",
        solution:
          "We track the full journey: cost per lead, cost per hot lead, cost per sale, and revenue per campaign.",
      },
      {
        problem: "Leads stay stuck in inboxes or spreadsheets and never reach your CRM properly.",
        solution:
          "Every lead flows directly into the right pipeline with tags, source data, and key details—zero manual entry.",
      },
      {
        problem: "Follow-up depends on one person checking email or their phone.",
        solution:
          "Automated sequences handle the first touches, reminders, and nudges so your team can jump straight to real conversations.",
      },
      {
        problem: "Sales time is wasted on people who were never qualified.",
        solution:
          "Smart scoring ranks leads based on budget, urgency, location, and fit—so your team focuses on the top 10–20%.",
      },
      {
        problem: "You're working harder but still can't predict next month's revenue.",
        solution:
          "Dashboards show pipeline, conversion rates, and ROI so you can forecast and plan with confidence.",
      },
    ],
    // WHAT YOU GET / CORE VALUE BLOCK
    businessBlock: {
      heading: "What you get with OMG Leads",
      subheading:
        "A complete ads-to-CRM system that turns attention into appointments, not just clicks.",
      features: [
        {
          title: "End-to-end lead engine",
          description:
            "From ad click to booked call: forms, landing pages, routing, tagging, and nurturing all wired together.",
        },
        {
          title: "Instant lead capture",
          description:
            "No more copying from email or exporting CSVs. Every new lead is captured automatically and sent to the right pipeline.",
        },
        {
          title: "Smart lead scoring",
          description:
            "Score leads by budget, timeline, service type, location, and intent so your team sees the hottest opportunities first.",
        },
        {
          title: "Automated follow-up",
          description:
            "Nurture flows via email, SMS, or tasks keep leads warm even when your team is busy or offline.",
        },
        {
          title: "Industry-ready funnels",
          description:
            "Pre-built lead flows for real estate, contractors, property management, and accounting that you can tune for your market.",
        },
        {
          title: "ROI dashboards",
          description:
            "See cost per lead, cost per hot lead, cost per sale, and ROAS so you know exactly where your money is working.",
        },
        {
          title: "Tight CRM integration",
          description:
            "OMG Leads works hand-in-hand with OMGCRM so your team operates from one clean board instead of 10 disconnected tools.",
        },
        {
          title: "Automation-first design",
          description:
            "We design your lead system to run 24/7 in the background so your time goes into closing, not chasing.",
        },
      ],
      outcomes: [
        {
          metric: "20+",
          label: "Qualified leads in the first 7 days (typical target on a fresh funnel)",
        },
        {
          metric: "3×",
          label: "Higher conversion rates when follow-up is instant and consistent",
        },
        {
          metric: "60%",
          label: "Less manual follow-up work for you and your team",
        },
        {
          metric: "Predictable",
          label: "Lead flow you can actually plan around month after month",
        },
      ],
      primaryCta: {
        label: "Book a Leads Strategy Call",
        href: "/contact?topic=omg-leads",
      },
      secondaryCta: {
        label: "See OMGCRM + OMG Leads together",
        href: "/apps/crm",
      },
    },
    // HOW IT WORKS — 6-STEP JOURNEY
    howItWorks: {
      heading: "How OMG Leads builds your predictable lead machine",
      steps: [
        {
          step: "1",
          title: "Audit what you're doing now",
          description:
            "We review your current ads, landing pages, forms, and CRM to find the leaks, delays, and blind spots.",
        },
        {
          step: "2",
          title: "Design your lead funnel",
          description:
            "We map the full journey—ad → landing page → form → CRM pipeline → follow-up steps—specific to your industry and offer.",
        },
        {
          step: "3",
          title: "Auto-capture & tag every lead",
          description:
            "Every new lead is tagged by source, campaign, and intent so you can slice performance any way you want.",
        },
        {
          step: "4",
          title: "Turn on automated follow-up",
          description:
            "Smart sequences (email/SMS/tasks) keep leads warm, answer common questions, and move them closer to booking.",
        },
        {
          step: "5",
          title: "Prioritize hot leads for your team",
          description:
            "Scoring surfaces the best opportunities so your sales team is always working the highest-impact conversations.",
        },
        {
          step: "6",
          title: "Track, refine, and scale",
          description:
            "Dashboards show what's working. We adjust copy, targeting, and flows so performance improves over time—not just once.",
        },
      ],
    },
    // "SECURITY / DATA HANDLING" SECTION
    security: {
      heading: "Data, routing, and compliance you can trust",
      items: [
        {
          title: "Clean, compliant data handling",
          description:
            "Lead data is stored and routed securely, with clear consent paths and easy opt-out when required.",
        },
        {
          title: "Role-based access",
          description:
            "Control who can see which leads, pipelines, and reports so sensitive data stays with the right people.",
        },
        {
          title: "Reliable tracking foundation",
          description:
            "We set up consistent UTM, campaign, and source tracking so your reporting isn't guessing—it's based on clean data.",
        },
        {
          title: "Canadian data residency",
          description:
            "Data is stored in Canada to align with Canadian compliance and privacy expectations where possible.",
        },
      ],
    },
    // CONNECTORS & AUTOMATIONS SECTION
    connectors: {
      heading: "Connect OMG Leads to your ads, CRM, and automation stack",
      categories: [
        {
          category: "Ad platforms",
          items: [
            "Meta (Facebook & Instagram) Ads",
            "Google Ads",
            "TikTok Ads",
            "YouTube campaign tracking",
          ],
        },
        {
          category: "CRMs & pipelines",
          items: [
            "OMGCRM (native)",
            "Other CRMs via API/webhooks",
            "Lead capture forms & landing pages",
          ],
        },
        {
          category: "Communication & follow-up",
          items: [
            "Email sequences",
            "SMS workflows (via your provider)",
            "Task reminders for sales reps",
          ],
        },
        {
          category: "Automation platforms",
          items: [
            "n8n flows",
            "Webhooks to custom backends",
            "Internal OMGsystems automations",
          ],
        },
      ],
    },
    // PRICING OVERVIEW (NO NUMBERS)
    pricingOverview: {
      heading: "OMG Leads pricing overview",
      plans: [
        {
          name: "OMG Leads — Managed System",
          description:
            "We design, wire, and maintain your lead engine—including tracking, funnel setup, and core automations. Ideal if you want a done-for-you setup with clear reporting.",
        },
        {
          name: "OMG Leads + OMGCRM",
          description:
            "Combine OMG Leads with OMGCRM for a full stack: ads → leads → pipeline → documents → follow-up, all in one connected system.",
        },
      ],
    },
    // PROOF & OUTCOMES (SOCIAL PROOF STYLE)
    proof: {
      heading: "What a real lead engine feels like",
      testimonials: [
        {
          quote:
            "We finally understand which ads are printing money and which ones we can turn off.",
          metric: "Clear ROI visibility across campaigns",
        },
        {
          quote:
            "Leads are getting responses in minutes, not hours—and it shows in our booked calls.",
          metric: "Massive improvement in response times",
        },
        {
          quote:
            "Our team isn't drowning in cold leads anymore. The system surfaces the people who are actually ready.",
          metric: "Less busywork, more real sales conversations",
        },
      ],
    },
    // FAQ SECTION
    faqs: {
      heading: "Frequently asked questions",
      items: [
        {
          question: "What industries does OMG Leads work best for?",
          answer:
            "OMG Leads is built for service-based businesses that rely on leads—like real estate, property management, contractors, cleaning, healthcare, and accounting. If you need a predictable pipeline, we can adapt it to you.",
        },
        {
          question: "Do you manage the ads or just the system?",
          answer:
            "We can do both. OMG Leads can power your existing ad setup, or we can handle campaign strategy and management as part of a broader engagement.",
        },
        {
          question: "Do I need OMGCRM to use OMG Leads?",
          answer:
            "OMGCRM is the best match because it's built to plug into OMG Leads natively. But if you already have a CRM, we can usually connect via API or webhooks.",
        },
        {
          question: "How fast can we be live?",
          answer:
            "Most businesses can have a working lead engine in a few weeks—depending on how many campaigns, offers, and funnels we're wiring together.",
        },
        {
          question: "Will this replace my current marketing agency?",
          answer:
            "Not necessarily. OMG Leads can sit under your agency to give them a stronger backend system, or we can act as both system partner and ads partner—it's flexible.",
        },
        {
          question: "How do we measure success?",
          answer:
            "We focus on qualified leads, cost per hot lead, cost per sale, and total revenue generated—not just clicks or impressions.",
        },
      ],
    },
    // FINAL CTA
    finalCta: {
      heading: "Ready to stop guessing and start running a real lead machine?",
      primaryCta: {
        label: "Book a Leads Strategy Call",
        href: "/contact?topic=omg-leads",
      },
      secondaryCta: {
        label: "See OMGCRM + OMG Leads together",
        href: "/apps/crm",
      },
      tertiaryCta: {
        label: "Explore all OMG Apps",
        href: "/apps",
      },
    },
  },

  // 🔵 OMG IQ
  iq: {
    hero: {
      eyebrow: "Industry intelligence",
      title: "OMG IQ",
      tagline: "Daily insights for smarter decisions.",
      description:
        "See benchmarks, trends, and predictive analytics across your industry so you can move first, not last.",
      primaryCta: {
        label: "Request OMG IQ Access",
        href: "/contact?topic=iq",
      },
      secondaryCta: {
        label: "See How It Works",
        href: "/apps/omg-iq/demo",
      },
    },
    howItWorks: {
      heading: "How OMG IQ keeps you ahead",
      steps: [
        {
          step: "1",
          title: "Ingest industry data",
          description:
            "News, benchmarks, government data, and curated feeds come into one engine.",
        },
        {
          step: "2",
          title: "Summarize and score",
          description:
            "AI turns raw noise into clear summaries, alerts, and recommendations.",
        },
        {
          step: "3",
          title: "Push into your stack",
          description:
            "Key insights surface in dashboards, email digests, or inside OMG CRM where you work.",
        },
      ],
    },
    finalCta: {
      heading: "Ready to make decisions with real data?",
      primaryCta: {
        label: "Request Access",
        href: "/contact?topic=iq",
      },
      secondaryCta: {
        label: "Explore Other Apps",
        href: "/apps",
      },
    },
  },

  // 🟡 OMG AI Mastery (live)
  ai_mastery: {
    hero: {
      eyebrow: "Education · Live",
      title: "OMG AI Mastery",
      tagline: "Become AI-smart in days, not months.",
      description:
        "A practical AI learning hub that teaches individuals and teams how to talk to AI properly, build reusable systems, and save hours every week.",
      primaryCta: {
        label: "Start Learning Now",
        href: "/apps/omg-ai-mastery",
      },
      secondaryCta: {
        label: "See Course Details",
        href: "/apps/omg-ai-mastery#course-details",
      },
    },
    finalCta: {
      heading: "Ready to become AI-smart?",
      primaryCta: {
        label: "Start Learning Now",
        href: "/apps/omg-ai-mastery",
      },
    },
  },
};

export function getAppPageContent(appId: AppId): AppPageContent | undefined {
  return appPagesConfig[appId];
}

