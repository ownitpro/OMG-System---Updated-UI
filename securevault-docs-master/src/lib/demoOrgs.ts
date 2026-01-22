// src/lib/demoOrgs.ts

export type Vertical =
  | "accounting"
  | "real_estate"
  | "construction"
  | "project_management"
  | "personal";

export type DemoOrg = {
  id: string;
  name: string;
  vertical: Vertical;
  headline: string;
  subheadline: string;
  metrics: { label: string; value: string }[];
};

export const DEMO_ORGS: Record<string, DemoOrg> = {
  org_demo_accounting: {
    id: "org_demo_accounting",
    name: "Maple Ledger Accounting",
    vertical: "accounting",
    headline: "Your month-end, without the chaos.",
    subheadline: "Receipt OCR, client portals, and share links built for accounting teams.",
    metrics: [
      { label: "Client portals", value: "24" },
      { label: "Open requests", value: "7" },
      { label: "Approvals", value: "3" }
    ]
  },
  org_demo_real_estate: {
    id: "org_demo_real_estate",
    name: "OwnIt Estates Realty",
    vertical: "real_estate",
    headline: "Offer packs in minutes, not hours.",
    subheadline: "Buyer folders, listing docs, and KYC requests in one place.",
    metrics: [
      { label: "Active buyers", value: "12" },
      { label: "Listings", value: "5" },
      { label: "Pending deals", value: "3" }
    ]
  },
  org_demo_construction: {
    id: "org_demo_construction",
    name: "EdgeNest Construction",
    vertical: "construction",
    headline: "Permits, drawings, and change orders under control.",
    subheadline: "Share site plans and collect approvals from the same portal.",
    metrics: [
      { label: "Active projects", value: "9" },
      { label: "Open RFIs", value: "4" },
      { label: "Pending change orders", value: "2" }
    ]
  },
  org_demo_pm: {
    id: "org_demo_pm",
    name: "Pulse Project Management",
    vertical: "project_management",
    headline: "SOWs, sign-offs, and releases in one workspace.",
    subheadline: "Client docs land where they belong, automatically.",
    metrics: [
      { label: "Active projects", value: "6" },
      { label: "Milestones", value: "18" },
      { label: "Awaiting sign-off", value: "4" }
    ]
  },
  org_demo_personal: {
    id: "org_demo_personal",
    name: "Your Personal Vault",
    vertical: "personal",
    headline: "Receipts, bills, and life admin, finally in one place.",
    subheadline: "Try the personal vault with fake uploads and OCR.",
    metrics: [
      { label: "Stored documents", value: "132" },
      { label: "Tags", value: "14" },
      { label: "Linked accounts", value: "2" }
    ]
  }
};

export function getDemoOrg(orgId: string): DemoOrg {
  return (
    DEMO_ORGS[orgId] || {
      id: orgId,
      name: "Demo Organization",
      vertical: "accounting",
      headline: "Welcome to your client workspace.",
      subheadline: "Upload docs, send share links, and invite clients.",
      metrics: [
        { label: "Client portals", value: "0" },
        { label: "Open requests", value: "0" },
        { label: "Approvals", value: "0" }
      ]
    }
  );
}

export function demoOrgIdForVertical(vertical: Vertical): string {
  switch (vertical) {
    case "accounting":
      return "org_demo_accounting";
    case "real_estate":
      return "org_demo_real_estate";
    case "construction":
      return "org_demo_construction";
    case "project_management":
      return "org_demo_pm";
    case "personal":
      return "org_demo_personal";
    default:
      return "org_demo_accounting";
  }
}

export function humanVertical(vertical: Vertical): string {
  switch (vertical) {
    case "accounting":
      return "Accounting";
    case "real_estate":
      return "Real Estate";
    case "construction":
      return "Construction";
    case "project_management":
      return "Project Management";
    case "personal":
      return "Personal";
    default:
      return "Workspace";
  }
}

