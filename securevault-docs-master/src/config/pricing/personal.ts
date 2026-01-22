// src/config/pricing/personal.ts
// Updated December 2025 - Processing Units, Egress, Active Share Links

import type { PlanCard } from "./registry";
import { annualFromMonthly } from "./registry";

export const personalCards: PlanCard[] = [
  {
    key: "personal_starter",
    group: "personal",
    name: "Starter",
    blurb: [
      "Perfect for personal document management",
      "AI-powered organization",
      "Secure sharing with expiry",
    ],
    prices: {
      monthly: {
        stripe: process.env.NEXT_PUBLIC_STRIPE_PRICE_PERSONAL_STARTER_MONTHLY || '',
        amountUsd: 9.99,
      },
      annual: {
        stripe: process.env.NEXT_PUBLIC_STRIPE_PRICE_PERSONAL_STARTER_YEARLY || '',
        amountUsd: annualFromMonthly(9.99),
      },
    },
    // New pricing model fields
    isPerSeat: false,
    processingUnitsPerMonth: 150,
    storageGb: 40,
    egressGbPerMonth: 8,
    pdfPageLimit: 25,
    activeShareLinks: 5,
    features: [
      "1 user (personal vault)",
      "40 GB storage",
      "150 Processing Units/mo",
      "8 GB downloads/mo",
      "PDFs up to 25 pages",
      "5 active share links (PIN + expiry + watermark)",
      "Desktop & camera upload (PWA)",
      "Folders, labels, search, versions",
      "Email-to-Vault (manual forward)",
      "ZIP export",
      "Email support",
    ],
  },
  {
    key: "personal_growth",
    group: "personal",
    name: "Growth",
    blurb: [
      "Everything in Starter",
      "More storage & processing",
      "Request files from others",
    ],
    prices: {
      monthly: {
        stripe: process.env.NEXT_PUBLIC_STRIPE_PRICE_PERSONAL_GROWTH_MONTHLY || '',
        amountUsd: 14.99,
      },
      annual: {
        stripe: process.env.NEXT_PUBLIC_STRIPE_PRICE_PERSONAL_GROWTH_YEARLY || '',
        amountUsd: annualFromMonthly(14.99),
      },
    },
    // New pricing model fields
    isPerSeat: false,
    processingUnitsPerMonth: 450,
    storageGb: 90,
    egressGbPerMonth: 15,
    pdfPageLimit: 50,
    activeShareLinks: 25,
    features: [
      "Everything in Starter",
      "90 GB storage",
      "450 Processing Units/mo",
      "15 GB downloads/mo",
      "PDFs up to 50 pages",
      "25 active share links",
      "Request-files links (checklist)",
      "Drive/OneDrive/Dropbox import",
      "Saved searches + label rules",
      "CSV/PDF bundle exports",
      "Priority email support",
    ],
  },
  {
    key: "personal_pro",
    group: "personal",
    name: "Pro",
    blurb: [
      "Everything in Growth",
      "Family sharing (up to 3)",
      "Advanced security features",
    ],
    prices: {
      monthly: {
        stripe: process.env.NEXT_PUBLIC_STRIPE_PRICE_PERSONAL_PRO_MONTHLY || '',
        amountUsd: 24.99,
      },
      annual: {
        stripe: process.env.NEXT_PUBLIC_STRIPE_PRICE_PERSONAL_PRO_YEARLY || '',
        amountUsd: annualFromMonthly(24.99),
      },
    },
    // New pricing model fields
    isPerSeat: false,
    processingUnitsPerMonth: 1350,
    storageGb: 180,
    egressGbPerMonth: 30,
    pdfPageLimit: 100,
    activeShareLinks: 75,
    features: [
      "Everything in Growth",
      "Family sharing (1 owner + 2 invites)",
      "180 GB storage (shared)",
      "1,350 Processing Units/mo",
      "30 GB downloads/mo",
      "PDFs up to 100 pages",
      "75 active share links",
      "Email rules (auto-file)",
      "Scheduled exports",
      "Advanced search (text, dates, amounts)",
      "PII redaction on export",
      "Recipient-bound share links",
      "Audit log (90 days)",
      "Priority support + early access",
    ],
  },
];

// Trial plan configuration (not shown on pricing page)
export const trialPlan: Omit<PlanCard, 'prices'> = {
  key: "personal_trial",
  group: "personal",
  name: "14-Day Trial",
  blurb: [
    "Try all Starter features",
    "No credit card required",
    "Upgrade anytime",
  ],
  isPerSeat: false,
  processingUnitsPerMonth: 15,
  storageGb: 4,
  egressGbPerMonth: 1,
  pdfPageLimit: 10,
  activeShareLinks: 2,
  features: [
    "1 user (personal vault)",
    "4 GB storage",
    "15 Processing Units",
    "1 GB downloads",
    "PDFs up to 10 pages",
    "2 active share links",
    "All Starter features for 14 days",
  ],
};
