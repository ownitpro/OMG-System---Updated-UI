// src/lib/orgContext.ts

// Re-export Vertical type from demoOrgs for backward compatibility
export type Vertical =
  | "accounting"
  | "real_estate"
  | "construction"
  | "project_management"
  | "personal";

export function isBusinessVertical(v: Vertical): boolean {
  return (
    v === "accounting" ||
    v === "real_estate" ||
    v === "construction" ||
    v === "project_management"
  );
}

// For backward compatibility, export DEMO_ORGS mapping
// New code should use demoOrgs.ts instead
import { demoOrgIdForVertical } from "./demoOrgs";

export const DEMO_ORGS: Record<Vertical, string> = {
  accounting: "org_demo_accounting",
  real_estate: "org_demo_real_estate",
  construction: "org_demo_construction",
  project_management: "org_demo_pm",
  personal: "org_demo_personal",
};

