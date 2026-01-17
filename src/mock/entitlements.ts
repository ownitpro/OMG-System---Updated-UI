export type ProductKey =
  | "omg_build"
  | "omg_crm"
  | "securevault_docs"
  | "omg_leads"
  | "omg_iq"
  | "omg_ai_mastery"
  | "timeguard_ai"
  | "automations"
  | "strategy_session"
  | "custom_solutions"
  | "ads_management"
  | "branding_creative"
  | "content_development"
  | "industry_focused";

export type EntitlementStatus = "active" | "locked" | "trial";

export type Entitlements = Record<ProductKey, EntitlementStatus>;

// Week 1 mock data (change anytime)
export const MOCK_ENTITLEMENTS: Entitlements = {
  omg_build: "locked", // will show Coming Soon separately
  omg_crm: "locked",
  securevault_docs: "locked",
  omg_leads: "locked",
  omg_iq: "locked",
  omg_ai_mastery: "locked",

  timeguard_ai: "locked",
  automations: "locked",
  strategy_session: "locked",
  custom_solutions: "locked",
  ads_management: "locked",
  branding_creative: "locked",
  content_development: "locked",
  industry_focused: "locked",
};

