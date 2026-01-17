// try_live_demo_config.ts

export type LiveDemoTile = {
  id: "crm" | "svd" | "leads" | "iq" | "ai-mastery" | "content-engine";
  label: string;
  href: string;
  badge?: string;
  summary: string;
  idealFor: string;
  estTimeMinutes: number;
  highlights: string[];
};

export const liveDemos: LiveDemoTile[] = [
  {
    id: "crm",
    label: "OMGCRM Demo",
    href: "/apps/demo/crm",
    badge: "CRM",
    summary:
      "See how OMGCRM unifies your leads, clients, tasks, and documents in one clean workspace.",
    idealFor:
      "Teams that want faster follow-up, clear pipelines, and less manual admin.",
    estTimeMinutes: 5,
    highlights: [
      "Lead & contact management",
      "Visual pipelines with drag-and-drop stages",
      "Automated follow-up and reminders",
      "Built-in SecureVault Docs integration",
    ],
  },
  {
    id: "svd",
    label: "SecureVault Docs Demo",
    href: "/apps/demo/securevault-docs",
    badge: "Docs",
    summary:
      "Experience how SecureVault Docs collects, organizes, and shares documents without email chaos.",
    idealFor:
      "Firms and individuals who chase documents, need checklists, and care about secure sharing.",
    estTimeMinutes: 5,
    highlights: [
      "Client portals with PIN-protected access",
      "Smart OCR and auto-labeling",
      "Secure sharing with expiry and watermarks",
      "Clear activity trails and usage visibility",
    ],
  },
  {
    id: "leads",
    label: "OMG-Leads Demo",
    href: "/apps/demo/leads",
    badge: "Leads",
    summary:
      "Discover how OMG-Leads captures, qualifies, and nurtures prospects with intelligent lead scoring and automated workflows.",
    idealFor:
      "Sales teams that need to maximize lead conversion, prioritize hot prospects, and automate outreach.",
    estTimeMinutes: 5,
    highlights: [
      "Smart lead capture from multiple channels",
      "AI-powered lead scoring and qualification",
      "Automated nurture campaigns and follow-ups",
      "Real-time lead routing and notifications",
    ],
  },
  {
    id: "iq",
    label: "OMG-IQ Demo",
    href: "/apps/demo/iq",
    badge: "IQ",
    summary:
      "See how OMG-IQ transforms your business data into actionable insights with AI-powered analytics and reporting.",
    idealFor:
      "Decision-makers who need real-time dashboards, predictive analytics, and intelligent business insights.",
    estTimeMinutes: 10,
    highlights: [
      "AI-powered business intelligence and analytics",
      "Customizable real-time dashboards",
      "Predictive forecasting and trend analysis",
      "Natural language query interface",
    ],
  },
  {
    id: "ai-mastery",
    label: "OMG AI Mastery Demo",
    href: "/apps/demo/ai-mastery",
    badge: "AI",
    summary:
      "Experience how OMG AI Mastery empowers your team with enterprise AI tools, custom workflows, and intelligent automation.",
    idealFor:
      "Organizations ready to leverage AI for content generation, process automation, and strategic decision-making.",
    estTimeMinutes: 10,
    highlights: [
      "Custom AI assistants trained on your data",
      "Multi-model AI orchestration (GPT-4, Claude, etc.)",
      "Enterprise-grade prompt management",
      "AI-powered workflow automation and integration",
    ],
  },
  {
    id: "content-engine",
    label: "Content Engine Demo",
    href: "/apps/demo/content-engine",
    badge: "Content",
    summary:
      "See how Content Engine creates multi-format content at scale while maintaining your brand voice across all channels.",
    idealFor:
      "Marketing teams and content creators who need to scale output without sacrificing quality or brand consistency.",
    estTimeMinutes: 7,
    highlights: [
      "AI-powered content generation across formats",
      "Brand voice learning and adaptation",
      "Multi-channel content repurposing",
      "SEO optimization and performance tracking",
    ],
  },
];

