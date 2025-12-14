// try_live_demo_config.ts

export type LiveDemoTile = {
  id: "crm" | "svd";
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
];

