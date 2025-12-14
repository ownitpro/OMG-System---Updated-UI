import { APP_LINKS } from "@/config/appLinks";
import type { ProductKey } from "@/mock/entitlements";

export type ProductCatalogItem = {
  key: ProductKey;
  name: string;
  description: string;
  // Launch URL (Week 1: localhost). If undefined, it can't launch.
  launchUrl?: string;
  // Unlock URL (Week 1 placeholder). Later: Stripe checkout link.
  unlockUrl?: string;
  // Coming soon overrides entitlement
  comingSoon?: boolean;
  // Optional grouping for display
  group: "top" | "apps" | "work" | "growth" | "industry";
};

export const PRODUCT_CATALOG: ProductCatalogItem[] = [
  {
    key: "omg_build",
    name: "OMG Build",
    description: "Build systems, workflows, and AI tools for your business.",
    comingSoon: true,
    group: "top",
  },
  {
    key: "omg_crm",
    name: "OMG-CRM",
    description: "Manage leads, clients, and follow-ups in one place.",
    launchUrl: APP_LINKS.omgCrm,
    unlockUrl: "/products/omg-crm",
    group: "top",
  },
  {
    key: "securevault_docs",
    name: "SecureVault Docs",
    description: "Store and protect your most important documents.",
    launchUrl: APP_LINKS.securevaultDocs,
    unlockUrl: "/products/securevault-docs",
    group: "top",
  },
  {
    key: "omg_leads",
    name: "OMG-Leads",
    description: "Capture leads and keep your pipeline moving.",
    launchUrl: APP_LINKS.omgLeads,
    unlockUrl: "/products/omg-leads",
    group: "top",
  },
  {
    key: "omg_iq",
    name: "OMG-IQ",
    description: "Daily updates that tell you what matters today.",
    launchUrl: APP_LINKS.omgIq,
    unlockUrl: "/products/omg-iq",
    group: "top",
  },
  {
    key: "omg_ai_mastery",
    name: "OMG-AI-Mastery",
    description: "Learn AI step-by-step for real business results.",
    launchUrl: APP_LINKS.omgAiMastery,
    unlockUrl: "/products/omg-ai-mastery",
    group: "top",
  },

  // Extras (Week 1: locked/coming soon pages)
  {
    key: "timeguard_ai",
    name: "Timeguard-AI",
    description: "AI time tracking and focus support for your team.",
    unlockUrl: "/products/timeguard-ai",
    group: "apps",
  },
  {
    key: "automations",
    name: "Automations",
    description: "Run automations that save you hours every week.",
    unlockUrl: "/products/automations",
    group: "work",
  },
  {
    key: "strategy_session",
    name: "Strategy-Session",
    description: "Book time with our team to map your next move.",
    unlockUrl: "/products/strategy-session",
    group: "work",
  },
  {
    key: "custom_solutions",
    name: "Custom-Solutions",
    description: "Get a done-for-you build customized to your business.",
    unlockUrl: "/products/custom-solutions",
    group: "work",
  },
  {
    key: "ads_management",
    name: "Ads-Management",
    description: "Launch ads with clear tracking and strong creative.",
    unlockUrl: "/products/ads-management",
    group: "growth",
  },
  {
    key: "branding_creative",
    name: "Branding-Creative",
    description: "Brand kits, visuals, and creative direction.",
    unlockUrl: "/products/branding-creative",
    group: "growth",
  },
  {
    key: "content_development",
    name: "Content-Development",
    description: "Content systems for consistent posting and growth.",
    unlockUrl: "/products/content-development",
    group: "growth",
  },
  {
    key: "industry_focused",
    name: "Industry-Focused",
    description: "Industry packs for Real Estate, PM, Contractors, Accounting.",
    unlockUrl: "/products/industry-focused",
    group: "industry",
  },
];

