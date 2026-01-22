// src/config/pricing/business.ts
// Updated December 2025 - Per-Seat Billing, Processing Units

import type { PlanCard } from "./registry";
import { annualFromMonthly } from "./registry";

export const businessCards: PlanCard[] = [
  {
    key: "business_starter",
    group: "business",
    name: "Starter",
    blurb: [
      "Per-seat pricing for small teams",
      "Client portals included",
      "Shared organization storage",
    ],
    prices: {
      monthly: {
        stripe: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_STARTER_MONTHLY || '',
        amountUsd: 59.99,
      },
      annual: {
        stripe: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_STARTER_YEARLY || '',
        amountUsd: annualFromMonthly(59.99),
      },
    },
    // New pricing model fields
    isPerSeat: true,
    seatRange: "1-3",
    processingUnitsPerMonth: 6750, // Per seat
    storageGb: 300, // Shared org storage
    egressGbPerMonth: 50, // Shared org egress
    pdfPageLimit: 25,
    activeShareLinks: 25,
    features: [
      "$59.99/seat/month (1-3 seats)",
      "6,750 Processing Units/seat/mo",
      "300 GB shared storage",
      "50 GB downloads/mo",
      "PDFs up to 25 pages",
      "25 active share links",
      "Up to 3 business vaults",
      "Client portals with branding",
      "Request-files links",
      "Email rules & scheduled exports",
      "Advanced search",
      "Audit log",
      "Priority support",
    ],
  },
  {
    key: "business_growth",
    group: "business",
    name: "Growth",
    blurb: [
      "For growing teams",
      "More processing power",
      "Custom branding",
    ],
    prices: {
      monthly: {
        stripe: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_GROWTH_MONTHLY || '',
        amountUsd: 109.99,
      },
      annual: {
        stripe: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_GROWTH_YEARLY || '',
        amountUsd: annualFromMonthly(109.99),
      },
    },
    // New pricing model fields
    isPerSeat: true,
    seatRange: "3-10",
    processingUnitsPerMonth: 19500, // Per seat
    storageGb: 500, // Shared org storage
    egressGbPerMonth: 90, // Shared org egress
    pdfPageLimit: 50,
    activeShareLinks: 100,
    features: [
      "$109.99/seat/month (3-10 seats)",
      "19,500 Processing Units/seat/mo",
      "500 GB shared storage",
      "90 GB downloads/mo",
      "PDFs up to 50 pages",
      "100 active share links",
      "Up to 10 business vaults",
      "Everything in Starter",
      "PII redaction on export",
      "Custom branding",
      "API access",
    ],
  },
  {
    key: "business_pro",
    group: "business",
    name: "Pro",
    blurb: [
      "For larger teams",
      "Maximum processing",
      "Dedicated support",
    ],
    prices: {
      monthly: {
        stripe: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_PRO_MONTHLY || '',
        amountUsd: 219.99,
      },
      annual: {
        stripe: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_PRO_YEARLY || '',
        amountUsd: annualFromMonthly(219.99),
      },
    },
    // New pricing model fields
    isPerSeat: true,
    seatRange: "10-20",
    processingUnitsPerMonth: 36000, // Per seat
    storageGb: 1000, // 1 TB shared org storage
    egressGbPerMonth: 110, // Shared org egress
    pdfPageLimit: 100,
    activeShareLinks: 250,
    features: [
      "$219.99/seat/month (10-20 seats)",
      "36,000 Processing Units/seat/mo",
      "1 TB shared storage",
      "110 GB downloads/mo",
      "PDFs up to 100 pages",
      "250 active share links",
      "Up to 50 business vaults",
      "Everything in Growth",
      "Dedicated support manager",
      "Custom integrations",
      "SLA guarantees",
    ],
  },
  {
    key: "business_enterprise",
    group: "business",
    name: "Enterprise",
    blurb: [
      "Custom seats & limits",
      "SSO & private cloud",
      "Dedicated success manager",
    ],
    prices: {
      monthly: {
        stripe: "price_business_enterprise_monthly",
        amountUsd: 0, // Custom pricing - contact sales
      },
      annual: {
        stripe: "price_business_enterprise_annual",
        amountUsd: 0, // Custom pricing - contact sales
      },
    },
    // New pricing model fields
    isPerSeat: true,
    seatRange: "20+",
    processingUnitsPerMonth: 100000, // Customizable
    storageGb: 10000, // 10 TB, customizable
    egressGbPerMonth: 500, // Customizable
    pdfPageLimit: 500, // Customizable
    activeShareLinks: 1000, // Customizable
    features: [
      "Custom pricing (20+ seats)",
      "Custom Processing Units",
      "Custom storage & bandwidth",
      "Custom PDF limits",
      "Unlimited share links",
      "Everything in Pro",
      "SSO / SAML integration",
      "Private cloud deployment options",
      "Custom data retention policies",
      "Dedicated success manager",
      "Custom SLA & support",
      "On-site training available",
    ],
  },
];

// Helper to get price display text
export function getBusinessPriceDisplay(card: PlanCard): string {
  if (card.key === 'business_enterprise') {
    return 'Contact Sales';
  }
  const price = card.prices.monthly.amountUsd;
  return `$${price}/seat/mo`;
}

// Helper to get seat range display
export function getSeatRangeDisplay(card: PlanCard): string {
  return card.seatRange ? `${card.seatRange} seats` : '';
}
