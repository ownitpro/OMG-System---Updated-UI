// ========== Types ==========
export type CTA = { label: string; href: string; id?: string };

export type Hero = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryCta?: CTA;
  secondaryCta?: CTA;
  badges?: string[];
};

export type Tile = {
  title: string;
  body: string;
  href: string;
  bullets?: string[];
  icon?: string;
};

export type Step = { index: number; title: string; body: string };

export type Stat = { value: string; label: string };

export type Quote = { quote: string; cite?: string };

export type IndustryItem = { title: string; blurb: string; href: string };

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  headshot?: string;
  social?: { label: string; href: string }[];
};

export type FAQ = { q: string; a: string };

export type AboutContent = {
  hero: Hero;
  tiles: Tile[];
  process: { steps: Step[]; eyebrow?: string; title?: string; subtitle?: string };
  stats: { stats: Stat[]; footerNote?: string };
  quotes: { quotes: Quote[]; logos?: string[] };
  industries: { items: IndustryItem[]; title: string; subtitle?: string };
  team: { members: TeamMember[]; values?: string[] };
  security: { badges: string[]; copy: string; cta?: CTA };
  faq: { items: FAQ[] };
  finalCta: { title: string; subtitle?: string; primaryCta: CTA; secondaryCta?: CTA };
  analytics: { view: string; ctaStrategy: string; ctaDemos: string };
  meta: {
    title: string;
    description: string;
    canonical: string;
    ogImage: string;
  };
  schema: {
    organization: Record<string, unknown>;
    breadcrumb: Record<string, unknown>;
    faq: Record<string, unknown>;
  };
};

// ========== Content ==========
export const about: AboutContent = {
  hero: {
    eyebrow: "Who we are",
    title: "We build systems that remove busywork and grow your revenue",
    subtitle:
      "OMGsystems designs industry-specific workflows for property management, real estate, contractors, accounting, cleaning, and healthcare — with privacy-first architecture and measurable outcomes.",
    primaryCta: { label: "Book a strategy call", href: "/contact?type=strategy", id: "about_cta_strategy" },
    secondaryCta: { label: "Try live demos", href: "/apps/demo", id: "about_cta_demos" },
    badges: [
      "Onboarding in 1–3 weeks depending on complexity",
      "Canadian data residency",
      "Role-based access & audit logs",
    ],
  },

  tiles: [
    {
      title: "Apps",
      body: "CRM, SecureVault Docs, LeadFlow Engine, IndustryIQ — designed to work together.",
      bullets: ["One login", "Shared data model", "Built-in automations"],
      href: "/apps",
      icon: "/icons/apps.svg",
    },
    {
      title: "Industries",
      body: "Pick your vertical. Get tailored pipelines, forms, and reports.",
      bullets: ["Property, Real Estate, Contractors", "Accounting, Cleaning, Healthcare"],
      href: "/industries",
      icon: "/icons/industries.svg",
    },
    {
      title: "Implementation",
      body: "From discovery to go-live — fast.",
      bullets: ["Discovery", "Configure & connect", "Train & launch"],
      href: "/implementation",
      icon: "/icons/rocket.svg",
    },
  ],

  process: {
    eyebrow: "Our approach",
    title: "Outcome-first, simple to adopt",
    subtitle: "Practical steps that get you value quickly — then keep improving.",
    steps: [
      { index: 1, title: "Discover pain & set outcomes", body: "Baseline KPIs, constraints, and success criteria." },
      { index: 2, title: "Configure vertical CRM + automations", body: "Intake, follow-ups, reminders, handoffs." },
      { index: 3, title: "Connect document flows", body: "Requests, e-sign, client portals; audit-ready storage." },
      { index: 4, title: "Train the team", body: "Playbooks, QA checklists, short sessions; ready day one." },
      { index: 5, title: "Monitor, iterate, scale", body: "Dashboards, alerts, optimizations as you grow." },
    ],
  },

  stats: {
    stats: [
      { value: "7×", label: "Faster lead response" },
      { value: "40–60%", label: "Less admin time" },
      { value: "+20%", label: "Higher retention" },
      { value: "0%", label: "Manual reporting" },
    ],
    footerNote: "Typical ranges from production implementations; your results may vary.",
  },

  quotes: {
    quotes: [
      { quote: "We reduced admin chaos and finally see everything in one place.", cite: "Operations Lead" },
      { quote: "Our response time dropped from days to minutes.", cite: "Managing Partner" },
      { quote: "Documents file themselves; audits are painless now.", cite: "Controller" },
    ],
    logos: ["/logos/client1.svg", "/logos/client2.svg", "/logos/client3.svg"],
  },

  industries: {
    title: "Who we serve",
    subtitle: "Purpose-built modules for each vertical",
    items: [
      {
        title: "Property Management",
        blurb: "Automated owner statements & maintenance flows",
        href: "/industries/property-management",
      },
      {
        title: "Real Estate",
        blurb: "Self-bookings, contract automation, post-close nurture",
        href: "/industries/real-estate",
      },
      {
        title: "Contractors",
        blurb: "Lead-to-quote, payment & update automation",
        href: "/industries/contractors",
      },
      {
        title: "Accounting",
        blurb: "Document workflows, onboarding & e-sign automation",
        href: "/industries/accounting",
      },
      {
        title: "Cleaning",
        blurb: "Route optimization, job scheduling & billing automation",
        href: "/industries/cleaning",
      },
      {
        title: "Healthcare",
        blurb: "Scheduling, intake, claims & alert automation",
        href: "/industries/healthcare",
      },
    ],
  },

  team: {
    members: [
      {
        name: "Michael",
        role: "Founder & System Architect",
        bio: "Leads product direction and industry playbooks across Canada.",
        headshot: "/team/michael.jpg",
        social: [{ label: "LinkedIn", href: "https://www.linkedin.com/" }],
      },
      {
        name: "Jamie",
        role: "VP of Operations",
        bio: "Owns client launches, QA, and training. Manages day-to-day operations and ensures smooth delivery.",
        headshot: "/team/jamie.jpg",
      },
      {
        name: "Siobhan",
        role: "Creative Director",
        bio: "Leads design and user experience across all products and client interfaces.",
        headshot: "/team/siobhan.jpg",
      },
    ],
    values: [
      "Clarity over complexity",
      "Privacy by design",
      "Outcomes you can measure",
      "Fast delivery, continuous improvement",
    ],
  },

  security: {
    badges: ["Canadian data residency", "Encryption at rest & in transit", "Audit logs", "Role-based access"],
    copy:
      "We design for privacy and auditability from day one. Data stays in Canada, access is permissioned, and every sensitive action is logged.",
    cta: { label: "Read the Security Overview", href: "/security-overview" },
  },

  faq: {
    items: [
      { q: "How long to launch?", a: "Most teams launch in 1–3 weeks depending on complexity." },
      { q: "Can we keep our tools?", a: "Yes. We connect to your stack or replace where it's simpler." },
      { q: "Where is data stored?", a: "In Canada, encrypted at rest and in transit." },
      {
        q: "Do you support my industry?",
        a: "We focus on property management, real estate, contractors, accounting, cleaning, and healthcare.",
      },
      { q: "Do you train our team?", a: "Yes. Short sessions with playbooks and recorded walkthroughs." },
      { q: "Contract terms?", a: "Monthly or annual; cancel anytime on monthly." },
    ],
  },

  finalCta: {
    title: "Ready to automate your growth?",
    subtitle: "Tell us your goals; we'll map a fast path to value.",
    primaryCta: { label: "Book a strategy call", href: "/contact?type=strategy", id: "about_cta_strategy_bottom" },
    secondaryCta: { label: "Try the CRM demo", href: "/apps/demo/crm", id: "about_cta_crm_demo" },
  },

  analytics: {
    view: "about_view",
    ctaStrategy: "about_cta_strategy_click",
    ctaDemos: "about_cta_demos_click",
  },

  meta: {
    title: "About OMGsystems — Automation that puts your growth first",
    description:
      "We design industry-specific systems for property management, real estate, contractors, accounting, cleaning, and healthcare. Canadian privacy, clear outcomes, fast delivery.",
    canonical: "/about",
    ogImage: "/og/about.jpg",
  },

  schema: {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "OMGsystems",
      url: "https://www.omgsystems.com",
      logo: "https://www.omgsystems.com/logo.svg",
      areaServed: "CA",
      contactPoint: [
        { "@type": "ContactPoint", contactType: "sales", email: "sales@omgsystems.com" },
        { "@type": "ContactPoint", contactType: "support", email: "support@omgsystems.com" },
      ],
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.omgsystems.com" },
        { "@type": "ListItem", position: 2, name: "About", item: "https://www.omgsystems.com/about" },
      ],
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        ...[
          { q: "How long to launch?", a: "Most teams launch in 1–3 weeks depending on complexity." },
          { q: "Can we keep our tools?", a: "Yes. We connect to your stack or replace where it's simpler." },
          { q: "Where is data stored?", a: "In Canada, encrypted at rest and in transit." },
          {
            q: "Do you support my industry?",
            a: "We focus on property management, real estate, contractors, accounting, cleaning, and healthcare.",
          },
          { q: "Do you train our team?", a: "Yes. Short sessions with playbooks and recorded walkthroughs." },
          { q: "Contract terms?", a: "Monthly or annual; cancel anytime on monthly." },
        ].map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      ],
    },
  },
};

export const {
  hero,
  tiles,
  process,
  stats,
  quotes,
  industries,
  team,
  security,
  faq,
  finalCta,
  analytics,
  meta,
  schema,
} = about;
