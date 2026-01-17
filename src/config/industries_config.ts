// industries_config.ts

import type { IndustryId, AppId } from "./apps_config";
import { getAppById } from "./apps_config";
import type { RelationRole } from "@/lib/relationsHelpers";

export type IndustryAppRelation = {
  appId: AppId;              // "svd" | "crm" | "leads" | "iq" | "ai_mastery" | "timeguard"
  role?: RelationRole;       // "primary" | "secondary"
  priority?: number;         // optional: use only if you want custom ordering
};

export type IndustrySolutionRelation = {
  solutionId: SolutionId;
  role?: RelationRole;
  priority?: number;
};

export type IndustryConfig = {
  id: IndustryId;
  label: string;
  slug: string;
  href: string;
  summary: string;
  apps?: IndustryAppRelation[];  // Apps that appear in this industry with roles
  solutions?: IndustrySolutionRelation[];  // Solutions recommended for this industry
  recommendedApps?: IndustryAppRelation[];  // Preferred name (same as apps)
  recommendedSolutions?: IndustrySolutionRelation[];  // Preferred name (same as solutions)
  // Optional: keep these for backward compatibility if needed elsewhere
  heroTitle?: string;
  heroSubtitle?: string;
  description?: string;
};

export const industriesConfig: IndustryConfig[] = [
  {
    id: "re",
    label: "Real Estate",
    slug: "real-estate",
    href: "/industries/real-estate",
    heroTitle: "Real Estate Systems that Keep Deals Moving",
    heroSubtitle:
      "From new leads to closed deals, keep every client, document, and follow-up in one clean flow.",
    description:
      "OMGsystems helps real estate teams track leads, manage listings and offers, organize documents, and follow up automatically so nothing slips through the cracks.",
    summary:
      "Turn leads, showings, offers, and documents into one clean pipeline that runs on autopilot.",
    apps: [
      // 🔵 Core / primary apps for Real Estate
      { appId: "crm", role: "primary" },   // OMGCRM = core
      { appId: "svd", role: "primary" },   // SecureVault Docs = core
      { appId: "leads", role: "primary" }, // OMG Leads = core
      { appId: "iq", role: "primary" },    // OMG IQ = NOW core for RE
      // ⚪ Secondary / optional training
      { appId: "ai_mastery", role: "secondary" }, // OMG AI Mastery = optional training
    ],
    recommendedSolutions: [
      { solutionId: "automations", role: "primary" },
      { solutionId: "ai_scheduler", role: "secondary" },
      { solutionId: "ai_mastery_training", role: "secondary" }, // AI Training
    ],
  },
  {
    id: "pm",
    label: "Property Management",
    slug: "property-management",
    href: "/industries/property-management",
    heroTitle: "Property Management Without the Chaos",
    heroSubtitle:
      "Centralize tenant requests, owner updates, and documents with systems that scale as fast as your portfolio.",
    description:
      "Use OMGsystems to manage tenant leads, maintenance workflows, renewals, inspections, and owner reporting—without drowning in email threads.",
    summary:
      "Automate owner updates, tenant workflows, maintenance requests, and document collection.",
    apps: [
      // 🔵 Core apps for PM
      { appId: "crm", role: "primary" },        // OMGCRM
      { appId: "svd", role: "primary" },        // SecureVault Docs
      { appId: "leads", role: "primary" },      // OMG Leads
      { appId: "iq", role: "primary" },         // OMG IQ = analytics
      // Optional add-ons
      { appId: "ai_mastery", role: "secondary" }, // OMG AI Mastery = optional training
    ],
    recommendedSolutions: [
      { solutionId: "automations", role: "primary" },
      { solutionId: "ai_scheduler", role: "secondary" },
      { solutionId: "ai_mastery_training", role: "secondary" }, // AI Training
    ],
  },
  {
    id: "cont",
    label: "Contractors",
    slug: "contractors",
    href: "/industries/contractors",
    heroTitle: "Quotes, Jobs, and Invoices in One Flow",
    heroSubtitle:
      "Turn inquiries into scheduled jobs with clear pipelines, organized documents, and automatic follow-ups.",
    description:
      "OMGsystems helps contractors capture leads, send quotes, track jobs, and keep contracts and receipts in one place—so you spend more time on site, not in your inbox.",
    summary:
      "Quotes, jobs, invoices, and follow-ups all handled with clear pipelines and smart automations.",
    apps: [
      // 🔵 Core apps for Contractors
      { appId: "crm", role: "primary" },   // OMGCRM = core
      { appId: "svd", role: "primary" },   // SecureVault Docs = NOW core (was secondary)
      { appId: "leads", role: "primary" }, // OMG Leads = core
      // ⚪ Secondary recommendation
      { appId: "iq", role: "secondary" },  // OMG IQ = secondary for Contractors
      { appId: "ai_mastery", role: "secondary" }, // OMG AI Mastery = optional training
    ],
    recommendedSolutions: [
      { solutionId: "automations", role: "primary" },
      { solutionId: "ai_mastery_training", role: "secondary" }, // AI Training
    ],
  },
  {
    id: "acc",
    label: "Accounting",
    slug: "accounting",
    href: "/industries/accounting",
    heroTitle: "Clean Intake, Clean Books, Calm Firm",
    heroSubtitle:
      "Stop chasing clients for documents and status updates—let your systems do the heavy lifting.",
    description:
      "Combine SecureVault Docs with OMGCRM and automation to streamline client intake, document collection, reminders, and communication.",
    summary:
      "Client intake, document requests, and deadlines organized with portals and automated reminders.",
    apps: [
      // 🔵 Core apps for Accounting
      { appId: "crm", role: "primary" },   // OMGCRM = core
      { appId: "svd", role: "primary" },   // SecureVault Docs = core, NOT optional
      // ⚪ Secondary / optional stack components
      { appId: "leads", role: "secondary" }, // OMG Leads = optional add-on
      { appId: "iq", role: "secondary" },    // OMG IQ = secondary info layer
      { appId: "ai_mastery", role: "secondary" }, // OMG AI Mastery = optional training
    ],
    recommendedSolutions: [
      { solutionId: "automations", role: "primary" },
      { solutionId: "ai_mastery_training", role: "secondary" }, // AI Training
    ],
  },
];

export function getIndustryBySlug(
  slug: string
): IndustryConfig | undefined {
  return industriesConfig.find((industry) => industry.slug === slug);
}

// 👉 Helper to grab an industry by id (kept for backward compatibility)
export function getIndustryById(id: IndustryId): IndustryConfig {
  const industry = industriesConfig.find((i) => i.id === id);
  if (!industry) {
    throw new Error(`Industry not found for id: ${id}`);
  }
  return industry;
}

export function getIndustriesByIds(ids: IndustryId[]): IndustryConfig[] {
  return industriesConfig.filter((i) => ids.includes(i.id));
}

// 👉 Helper to get industries by app ID
export function getIndustriesByAppId(appId: AppId): IndustryConfig[] {
  const app = getAppById(appId);
  if (!app.industries || app.industries.length === 0) {
    return [];
  }
  const industryIds = app.industries.map((rel) => rel.industryId);
  return getIndustriesByIds(industryIds);
}
