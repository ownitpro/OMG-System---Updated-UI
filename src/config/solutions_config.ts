// solutions_config.ts

import type { SolutionId, AppId } from "./apps_config";
import type { IndustryId } from "./apps_config";
import type { RelationRole } from "@/lib/relationsHelpers";

export type SolutionAppRelation = {
  appId: AppId;              // "svd" | "crm" | "leads" | "iq" | "ai_mastery" | "timeguard"
  role?: RelationRole;       // "primary" | "secondary"
  priority?: number;         // optional fine-tune, otherwise use default scoring
};

export type SolutionIndustryRelation = {
  industryId: IndustryId;    // "re" | "pm" | "cont" | "acc"
  role?: RelationRole;
  priority?: number;
};

export type SolutionConfig = {
  id: SolutionId;
  label: string;
  slug: string;
  href: string;
  summary: string;
  apps?: SolutionAppRelation[];  // Apps that work best with this solution
  industries?: SolutionIndustryRelation[];  // Industries that use this solution most
  // Optional: keep these for backward compatibility if needed elsewhere
  category?: "Solutions" | "Marketing Agency";
  shortTagline?: string;
  status?: "live" | "coming_soon";
  badge?: string;
  whoItHelps?: string[];
  keyOutcomes?: string[];
  // Homepage section configuration
  homepageSection?: "automation_workflows" | "ai_training";
  tagline?: string;
  bullets?: string[];
  ctaLabel?: string;
  ctaHref?: string;
};

export const solutionsConfig: SolutionConfig[] = [
  {
    id: "ai_scheduler",
    label: "TimeGuard AI",
    slug: "timeguard-ai",
    href: "/solutions/timeguard-ai",
    summary:
      "An AI assistant that handles your messages, books your appointments, filters your leads, and protects your time—across every platform you use.",
    category: "Solutions",
    shortTagline: "Your 24/7 client concierge that handles messages, books appointments, and protects your time.",
    status: "live",
    badge: "New",
    apps: [
      // 🔹 Primary app pairings
      { appId: "crm", role: "primary" },   // OMGCRM – appointments, contacts, tasks
      { appId: "leads", role: "primary" }, // OMG Leads – turn new leads into booked calls
      // 🔸 Supporting app
      { appId: "svd", role: "secondary" }, // SVD – upload docs before/after meetings
    ],
    industries: [
      // 🔹 Primary industries
      { industryId: "re", role: "primary" },      // showings, listing appts
      { industryId: "cont", role: "primary" },      // site visits, quotes
      { industryId: "acc", role: "primary" },       // review calls, onboarding
      // 🔸 Supporting industry
      { industryId: "pm", role: "secondary" }, // inspections, move-in/out
    ],
    whoItHelps: [
      "Doctors and medical professionals",
      "Lawyers and legal firms",
      "Accountants and financial advisors",
      "Real estate agents and brokers",
      "Property managers",
      "Consultants and service providers",
    ],
    keyOutcomes: [
      "Save 5–40 hours every week",
      "Respond instantly, close more sales",
      "Reduce stress for you and your team",
    ],
  },
  {
    id: "automations",
    label: "Automations",
    slug: "automations",
    href: "/solutions/automations",
    summary:
      "Plug-and-play workflows that connect your CRM, SecureVault Docs, and marketing tools so follow-ups, reminders, and handoffs just happen in the background.",
    category: "Solutions",
    shortTagline: "Connect your tools and kill repetitive tasks.",
    tagline: "Plug-and-play workflows that run your backend for you.",
    status: "live",
    homepageSection: "automation_workflows",
    bullets: [
      "Auto-route new leads into the right pipelines",
      "Trigger emails, texts, and tasks based on client activity",
      "Connect forms, CRMs, inboxes, and document portals",
      "Cut manual admin by 20–40% in the first month",
    ],
    ctaLabel: "Explore Automations",
    ctaHref: "/solutions/automations",
    apps: [
      // 🔹 Primary app pairings
      { appId: "svd", role: "primary" },   // SVD – doc intake, expiry alerts, auto-filing
      { appId: "crm", role: "primary" },   // OMGCRM – pipelines, follow-up, tasks
      // 🔸 Supporting app
      { appId: "leads", role: "secondary" }, // OMG Leads – ad → lead → nurture flows
    ],
    industries: [
      // 🔹 Primary industries
      { industryId: "pm", role: "primary" }, // maintenance, notices, routing
      { industryId: "acc", role: "primary" },          // recurring reminders, intake flows
      // 🔸 Supporting industries
      { industryId: "re", role: "secondary" },       // nurture & deal workflows (secondary as requested)
      { industryId: "cont", role: "secondary" },       // job pipelines, quote follow-ups
    ],
    whoItHelps: [
      "Service businesses drowning in admin",
      "Teams stuck copy-pasting between tools",
      "Owners who want less manual work and more sales time",
    ],
    keyOutcomes: [
      "40–60% less admin time",
      "Cleaner hand-offs between teams",
      "More consistent client experience end-to-end",
    ],
  },
  {
    id: "strategy_session",
    label: "Strategy Session",
    slug: "strategy-session",
    href: "/solutions/strategy-session",
    summary:
      "In one focused 2-hour session, we audit your business, find the real bottlenecks, and map out a simple AI + automation roadmap you can start using right away.",
    category: "Solutions",
    shortTagline: "Turn chaos into a clear AI game plan.",
    tagline: "Custom AI & Systems Strategy Session",
    status: "live",
    whoItHelps: [
      "Business owners with big goals but slow systems",
      "Teams drowning in manual workflows",
      "Leaders ready to leverage AI and automation",
    ],
    keyOutcomes: [
      "Discover what's actually slowing your business down",
      "Find which AI + automation tools fit your workflow",
      "Leave with a clear, step-by-step action plan",
    ],
  },
  {
    id: "custom_solutions",
    label: "Custom Solutions",
    slug: "custom-solutions",
    href: "/solutions/custom-solutions",
    summary:
      "Deep-dive consulting where we map your entire process and build a custom automation + AI system around how your business really works.",
    category: "Solutions",
    shortTagline: "Done-with-you systems, built around your ops.",
    tagline: "Deep-dive automation and AI systems built around your business.",
    status: "live",
    homepageSection: "automation_workflows",
    bullets: [
      "Full audit of your tools, CRMs, and workflows",
      "Custom automations designed for your industry and team",
      "AI-powered systems for intake, sales, operations, and reporting",
      "Team training so the systems actually get used",
    ],
    ctaLabel: "Explore Custom Solutions",
    ctaHref: "/solutions/custom-solutions",
    apps: [
      // 🔹 Primary apps (we design the best mix for you)
      { appId: "svd", role: "primary" },   // SecureVault Docs – doc spine
      { appId: "crm", role: "primary" },   // OMGCRM – operations and sales hub
      { appId: "leads", role: "primary" }, // OMG Leads – predictable demand
      // You can later add IQ / AI Mastery as secondary if you want
      // { appId: "iq", role: "secondary" },
      // { appId: "ai_mastery", role: "secondary" },
    ],
    industries: [
      // 🔹 Primary industries (highly customized workflows)
      // ❌ Real Estate REMOVED as requested - custom_solutions not recommended for RE
      { industryId: "cont", role: "primary" },     // jobs, stages, crews
      // 🔸 Supporting industries
      { industryId: "pm", role: "secondary" },
      { industryId: "acc", role: "secondary" },
    ],
    whoItHelps: [
      "Multi-location or multi-brand companies",
      "Teams with messy, half-working tools",
      "Leaders who want a real systems overhaul, not another app",
    ],
    keyOutcomes: [
      "One clear map of your systems",
      "A rollout plan that your team can actually follow",
      "Automations that match your real workflows and departments",
    ],
  },
  {
    id: "live_demo",
    label: "Try Live Demo",
    slug: "try-live-demo",
    href: "/solutions/try-live-demo",
    summary:
      "Test-drive OMGCRM and SecureVault Docs in your browser with zero setup and no credit card.",
    category: "Solutions",
    status: "live",
    apps: [
      // 🔹 Primary demo targets
      { appId: "crm", role: "primary" }, // CRM Demo tile → /apps/crm/demo
      { appId: "svd", role: "primary" }, // SVD Demo tile → /apps/securevault-docs/demo
    ],
    industries: [
      // This is a cross-industry entry point: secondary for all four.
      { industryId: "re", role: "secondary" },
      { industryId: "pm", role: "secondary" },
      { industryId: "cont", role: "secondary" },
      { industryId: "acc", role: "secondary" },
    ],
  },
  // OMG AI Mastery Training
  {
        id: "ai_mastery_training",
        slug: "omg-ai-mastery",
        label: "OMG AI Mastery",
        href: "/apps/omg-ai-mastery",
        summary:
          "Learn how to talk to AI properly, build real-world systems, and train your team to use AI with confidence.",
        kind: "training",
        category: "Solutions",
        status: "live",
        badgeLabel: "AI Training",
        relatedApps: [
          { appId: "ai_mastery", role: "primary" }, // Core app powering this solution
          { appId: "crm", role: "secondary" },
          { appId: "leads", role: "secondary" },
          { appId: "svd", role: "secondary" },
        ],
        relatedIndustries: [
          { industryId: "re", role: "secondary" },
          { industryId: "pm", role: "secondary" },
          { industryId: "cont", role: "secondary" },
          { industryId: "acc", role: "secondary" },
        ],
        // Legacy support
        apps: [
          { appId: "ai_mastery", role: "primary" },
          { appId: "crm", role: "secondary" },
          { appId: "leads", role: "secondary" },
          { appId: "svd", role: "secondary" },
        ],
        industries: [
          { industryId: "re", role: "secondary" },
          { industryId: "pm", role: "secondary" },
          { industryId: "cont", role: "secondary" },
          { industryId: "acc", role: "secondary" },
        ],
      },
    ];

export function getSolutionBySlug(slug: string): SolutionConfig | undefined {
  return solutionsConfig.find((s) => s.slug === slug);
}

// Helpers
export function getSolutionById(id: SolutionId): SolutionConfig {
  const solution = solutionsConfig.find((s) => s.id === id);
  if (!solution) {
    throw new Error(`Solution not found for id: ${id}`);
  }
  return solution;
}

export function getSolutionsByIds(ids: SolutionId[]): SolutionConfig[] {
  return solutionsConfig.filter((s) => ids.includes(s.id));
}

/**
 * Get all solutions for a specific homepage section
 */
export function getSolutionsForHomepageSection(
  section: SolutionConfig["homepageSection"]
): SolutionConfig[] {
  return solutionsConfig.filter((solution) => solution.homepageSection === section);
}

/**
 * Tiny config for homepage "Solutions" overview grid.
 * Kept intentionally short + punchy.
 */
export type SolutionTileConfig = {
  id: SolutionId;
  label: string;
  href: string;
  eyebrow: string;
  description: string;
  badge?: string;
};

export const solutionsTilesConfig: SolutionTileConfig[] = [
  {
    id: "ai_scheduler",
    label: "TimeGuard AI",
    href: "/solutions/timeguard-ai",
    eyebrow: "Appointments & scheduling",
    description:
      "Let AI handle booking requests, confirmations, and reminders so your front desk can breathe.",
    badge: "New",
  },
  {
    id: "automations",
    label: "Automations",
    href: "/solutions/automations",
    eyebrow: "Automation & workflows",
    description:
      "Connect your CRM, documents, and messaging so work happens automatically in the background.",
  },
  {
    id: "custom_solutions",
    label: "Custom Solutions",
    href: "/solutions/custom-solutions",
    eyebrow: "Deep-dive systems design",
    description:
      "We map your whole business and design systems + AI agents built around how you actually work.",
  },
];
