// app/lib/plan.ts
// Plan utilities for demo wiring

export type PersonalPlan = "starter" | "growth" | "pro";

const KEY = "svd_personal_plan";

export function savePersonalPlan(plan: PersonalPlan) {
  try {
    localStorage.setItem(KEY, plan);
  } catch {}
}

export function loadPersonalPlan(defaultPlan: PersonalPlan = "starter"): PersonalPlan {
  try {
    const v = localStorage.getItem(KEY) as PersonalPlan | null;
    return v ?? defaultPlan;
  } catch {
    return defaultPlan;
  }
}

