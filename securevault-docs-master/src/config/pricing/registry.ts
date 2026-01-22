// src/config/pricing/registry.ts
// Updated December 2025 - Processing Units, Per-Seat Billing

export type Cadence = "monthly" | "annual";

export type PriceRef = {
  stripe: string;
  amountUsd: number;
};

export type PlanGroup = "personal" | "business";

// Personal plan keys
export type PersonalPlanKey =
  | "personal_trial"
  | "personal_starter"
  | "personal_growth"
  | "personal_pro";

// Business plan keys (simplified - no longer industry-specific)
export type BusinessPlanKey =
  | "business_starter"
  | "business_growth"
  | "business_pro"
  | "business_enterprise";

// All plan keys
export type PlanKey = PersonalPlanKey | BusinessPlanKey;

// Extended PlanCard with new pricing model fields
export type PlanCard = {
  key: string;
  group: PlanGroup;
  name: string;
  blurb: string[];
  prices: {
    monthly: PriceRef;
    annual: PriceRef;
  };
  features: string[];
  // New fields for the updated pricing model
  isPerSeat?: boolean;
  seatRange?: string; // e.g., "1-3", "3-10", "10-20", "20+"
  processingUnitsPerMonth?: number;
  storageGb?: number;
  egressGbPerMonth?: number;
  pdfPageLimit?: number;
  activeShareLinks?: number;
};

// Constants
export const ANNUAL_DISCOUNT_PERCENT = 10;

/**
 * Calculate annual price from monthly (with 10% discount)
 */
export function annualFromMonthly(m: number): number {
  return Math.round(m * 12 * (1 - ANNUAL_DISCOUNT_PERCENT / 100));
}

/**
 * Calculate per-seat annual price from monthly
 */
export function annualPerSeatFromMonthly(monthlyPerSeat: number): number {
  return Math.round(monthlyPerSeat * 12 * (1 - ANNUAL_DISCOUNT_PERCENT / 100));
}

/**
 * Format price for display
 */
export function formatPrice(amount: number, perSeat: boolean = false): string {
  const formatted = amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2
  });
  return perSeat ? `${formatted}/seat` : formatted;
}

/**
 * Format Processing Units for display
 */
export function formatProcessingUnits(pu: number, perSeat: boolean = false): string {
  const formatted = pu.toLocaleString();
  return perSeat ? `${formatted} PU/seat/mo` : `${formatted} PU/mo`;
}

// Re-export for convenience
export { businessCards } from './business';
export { personalCards } from './personal';
