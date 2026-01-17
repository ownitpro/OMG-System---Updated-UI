// apps_config.ts

export type AppId = "svd" | "crm" | "leads" | "iq" | "ai_mastery" | "timeguard";
export type IndustryId = "pm" | "re" | "cont" | "acc";
export type SolutionId = "ai_scheduler" | "automations" | "strategy_session" | "custom_solutions" | "live_demo" | "ai_mastery_training";

export type RelationshipPriority = "primary" | "secondary";

export type AppIndustryRelation = {
  industryId: IndustryId;
  priority?: RelationshipPriority; // "primary" | "secondary" (optional, default = "secondary")
  weight?: number;                 // higher = more important (optional)
};

export type AppSolutionRelation = {
  solutionId: SolutionId;
  priority?: RelationshipPriority;
  weight?: number;
};

export type AppAppRelation = {
  appId: AppId;
  priority?: RelationshipPriority;
  weight?: number;
};

export type AppConfig = {
  id: AppId;
  slug: string; // 👈 used by /apps/[id]
  label: string;
  code: string; // internal code name
  href: string; // keep for nav & links
  tagline: string;
  summary: string;
  status: "live" | "coming_soon";
  theme: "securevault" | "crm" | "leads" | "iq" | "learn" | "timeguard";
  primaryColor?: string;
  // 🔹 Legacy: kept for backward compatibility
  recommendedSolutionIds?: SolutionId[];
  recommendedIndustryIds?: IndustryId[];
  pairsWithApps?: AppId[];
  pairsWithSolutions?: SolutionId[];
  appearsInIndustries?: IndustryId[];
  // 🔗 NEW: weighted relationships – single source of truth
  industries?: AppIndustryRelation[];  // "This app appears in these industries (with priority)."
  solutions?: AppSolutionRelation[];   // "This app pairs with these solutions (with priority)."
  relatedApps?: AppAppRelation[];      // "This app pairs well with these other apps (with priority)."
};

export const appsConfig: AppConfig[] = [
  // SecureVault Docs
  {
    id: "svd",
    slug: "securevault-docs",
    label: "SecureVault Docs",
    code: "svd_app",
    href: "/apps/securevault-docs",
    tagline: "Capture once. Organize forever.",
    summary:
      "Give your team and clients one secure place to upload, organize, and share documents—without email chaos.",
    status: "live",
    theme: "securevault",
    primaryColor: "#14B8A6", // Teal-500 to match SVD page theme
    industries: [
      { industryId: "pm", priority: "primary", weight: 90 },
      { industryId: "re", priority: "primary", weight: 85 },
      { industryId: "cont", priority: "primary", weight: 85 }, // Updated to primary
      { industryId: "acc", priority: "primary", weight: 85 }, // Updated to primary
    ],
    solutions: [
      { solutionId: "automations", priority: "primary", weight: 85 },
      { solutionId: "custom_solutions", priority: "secondary", weight: 70 },
    ],
    relatedApps: [
      { appId: "crm", priority: "primary", weight: 90 },
      { appId: "leads", priority: "secondary", weight: 75 },
      { appId: "iq", priority: "secondary", weight: 60 },
    ],
  },
  // OMGCRM
  {
    id: "crm",
    slug: "crm",
    label: "OMGCRM",
    code: "crm_app",
    href: "/apps/crm",
    tagline: "The CRM that adapts to your workflow.",
    summary:
      "Unify your leads, clients, pipelines, tasks, and documents in one clean, automation-ready CRM.",
    status: "live",
    theme: "crm",
    primaryColor: "#3A86FF",
    industries: [
      { industryId: "pm", priority: "primary", weight: 95 },
      { industryId: "re", priority: "primary", weight: 95 },
      { industryId: "cont", priority: "primary", weight: 90 },
      { industryId: "acc", priority: "primary", weight: 90 }, // Updated to primary
    ],
    solutions: [
      { solutionId: "ai_scheduler", priority: "primary", weight: 90 },
      { solutionId: "automations", priority: "primary", weight: 95 },
      { solutionId: "custom_solutions", priority: "secondary", weight: 70 },
    ],
    relatedApps: [
      { appId: "svd", priority: "primary", weight: 90 },
      { appId: "leads", priority: "primary", weight: 95 },
      { appId: "iq", priority: "secondary", weight: 60 },
    ],
  },
  // OMG Leads (replaces LeadFlow Engine)
  {
    id: "leads",
    slug: "omg-leads",
    label: "OMG Leads",
    code: "leadflow_app",
    href: "/apps/omg-leads",
    tagline: "Turn ads into predictable revenue.",
    summary:
      "Connect your ads to your CRM with smart scoring, automated follow-up, and real ROI tracking.",
    status: "live",
    theme: "leads",
    primaryColor: "#2563EB",
    industries: [
      { industryId: "re", priority: "primary", weight: 100 }, // 🔥 Real estate = #1
      { industryId: "pm", priority: "primary", weight: 90 }, // Updated to primary
      { industryId: "cont", priority: "primary", weight: 90 },
      { industryId: "acc", priority: "secondary", weight: 60 },
    ],
    solutions: [
      { solutionId: "automations", priority: "primary", weight: 100 },
      { solutionId: "custom_solutions", priority: "secondary", weight: 80 },
    ],
    relatedApps: [
      { appId: "crm", priority: "primary", weight: 100 },
      { appId: "svd", priority: "secondary", weight: 80 },
      { appId: "iq", priority: "secondary", weight: 65 },
    ],
  },
  // OMG IQ
  {
    id: "iq",
    slug: "omg-iq",
    label: "OMG IQ",
    code: "iq_app",
    href: "/apps/omg-iq",
    tagline: "Daily insights for smarter decisions.",
    summary:
      "See benchmarks, trends, and predictive analytics across your industry so you can move first, not last.",
    status: "live",
    theme: "iq",
    primaryColor: "#1A1A1A",
    industries: [
      { industryId: "pm", priority: "secondary", weight: 70 }, // Updated to secondary
      { industryId: "re", priority: "primary", weight: 85 }, // Updated weight
      { industryId: "cont", priority: "secondary", weight: 70 },
      { industryId: "acc", priority: "secondary", weight: 65 },
    ],
    solutions: [
      { solutionId: "custom_solutions", priority: "primary", weight: 85 },
    ],
    relatedApps: [
      { appId: "crm", priority: "primary", weight: 85 },
      { appId: "leads", priority: "secondary", weight: 70 },
    ],
  },
  // OMG AI Mastery
  {
    id: "ai_mastery",
    slug: "omg-ai-mastery",
    label: "OMG AI Mastery",
    code: "ai_mastery_app",
    href: "/apps/omg-ai-mastery",
    tagline: "Become AI-smart in days, not months.",
    summary:
      "A practical AI learning hub that teaches individuals and teams how to talk to AI properly, build reusable systems, and save hours every week.",
    status: "live",
    theme: "learn",
    primaryColor: "#FFC94F",
    industries: [
      { industryId: "pm", priority: "secondary", weight: 65 },
      { industryId: "re", priority: "secondary", weight: 65 },
      { industryId: "cont", priority: "secondary", weight: 65 },
      { industryId: "acc", priority: "secondary", weight: 65 },
    ],
    solutions: [
      { solutionId: "custom_solutions", priority: "secondary", weight: 70 },
    ],
    relatedApps: [
      { appId: "crm", priority: "secondary", weight: 70 },
      { appId: "svd", priority: "secondary", weight: 65 },
      { appId: "leads", priority: "secondary", weight: 65 },
      { appId: "iq", priority: "secondary", weight: 60 },
    ],
  },
  // TimeGuard AI
  {
    id: "timeguard",
    slug: "timeguard-ai",
    label: "TimeGuard AI",
    code: "timeguard_app",
    href: "/apps/timeguard-ai",
    tagline: "Time & compliance automation for property management teams.",
    summary:
      "Automatically track staff time, inspections, and service windows so property managers stay compliant without manual chasing.",
    status: "coming_soon",
    theme: "crm",
    primaryColor: "#00C57A",
    industries: [
      { industryId: "pm", priority: "primary", weight: 100 },
    ],
    solutions: [
      { solutionId: "ai_scheduler", priority: "primary", weight: 95 },
      { solutionId: "automations", priority: "primary", weight: 90 },
    ],
    relatedApps: [
      { appId: "crm", priority: "primary", weight: 95 },
      { appId: "svd", priority: "primary", weight: 90 },
    ],
  },
];

export function getAppBySlug(slug: string): AppConfig | undefined {
  return appsConfig.find((app) => app.slug === slug);
}

export function getAppById(id: AppId): AppConfig {
  const app = appsConfig.find((a) => a.id === id);
  if (!app) {
    throw new Error(`App not found for id: ${id}`);
  }
  return app;
}

export function getAppsByIds(ids: AppId[]): AppConfig[] {
  return appsConfig.filter((app) => ids.includes(app.id));
}

