// header_config.ts

export type NavItem = {
  label: string;
  href?: string;
  description?: string;
  children?: NavItem[];
  alignRight?: boolean; // optional hint if you want to right-align Login, etc.
};

export const headerNav: NavItem[] = [
  /**
   * APPS
   * Powerful tools for your business
   */
  {
    label: "Apps",
    description: "Powerful tools for your business",
    children: [
      {
        label: "SecureVault Docs",
        href: "/apps/securevault-docs",
        description: "Capture once. Organize forever.",
      },
      {
        label: "OMGCRM",
        href: "/apps/crm", // existing CRM page
        description: "Your all-in-one client, lead, and document hub.",
      },
      {
        label: "OMG Leads",
        // Using existing LeadFlow Engine route for now — just rebranded in nav
        href: "/apps/leadflow-engine",
        description: "Turn ad spend into predictable, qualified leads.",
      },
      {
        label: "OMG IQ",
        href: "/apps/omg-iq",
        description: "Industry insights, benchmarks, and live dashboards.",
      },
      {
        label: "OMG AI Mastery",
        href: "/apps/omg-ai-mastery",
        description: "Learn how to prompt and use AI the smart way.",
      },
    ],
  },
  /**
   * SOLUTIONS
   */
  {
    label: "Solutions",
    children: [
      {
        label: "TimeGuard AI",
        href: "/solutions/timeguard-ai",
        description:
          "AI-powered appointment and call scheduling for clinics, vets, and busy service teams.",
      },
      {
        label: "Automations",
        href: "/solutions/automations",
        description:
          "Smart and custom automations that connect your CRM, docs, and apps so work runs itself.",
      },
      {
        label: "Strategy Session",
        href: "/solutions/strategy-session",
        description:
          "Turn chaos into a clear AI game plan. Get a custom roadmap in one focused 2-hour session.",
      },
      {
        label: "Custom Solutions",
        href: "/solutions/custom-solutions",
        description:
          "Deep-dive into your company and design systems + AI to fit your exact workflows.",
      },
      {
        label: "Try Live Demo",
        href: "/try-live-demo",
        description:
          "Hands-on demos for OMGCRM and SecureVault Docs — no signup required.",
      },
    ],
  },
  /**
   * MARKETING AGENCY
   */
  {
    label: "Marketing Agency",
    children: [
      {
        label: "Ads Management",
        href: "/marketing/ads-management", // TODO: new page
        description:
          "Done-for-you ad strategy, setup, and optimization across major platforms.",
      },
      {
        label: "Branding & Creative",
        href: "/marketing/branding-creative", // TODO: new page
        description:
          "Brand identity, visuals, and creative direction that match your systems.",
      },
      {
        label: "Content Development",
        href: "/marketing/content-development", // TODO: new page
        description:
          "Content plus SOP systems built around your industry and workflows.",
      },
    ],
  },
  /**
   * INDUSTRY FOCUSED
   */
  {
    label: "Industry Focused",
    children: [
      {
        label: "Property Management",
        href: "/industries/property-management", // adjust to your actual route
      },
      {
        label: "Accounting",
        href: "/industries/accounting", // adjust if needed
      },
      {
        label: "Contractors",
        href: "/industries/contractors", // adjust if needed
      },
      {
        label: "Real Estate",
        href: "/industries/real-estate", // adjust if needed
      },
    ],
  },
  /**
   * STATIC LINKS
   */
  {
    label: "Contact Us",
    href: "/contact", // existing Contact page
  },
  {
    label: "About Us",
    href: "/about", // existing About page
  },
  {
    label: "Login",
    href: "/login", // adjust to your actual auth route if different
    alignRight: true,
  },
];

