import React from "react";
import { CampaignLanding } from "@/components/campaign/campaign-landing-minimal";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "LeadFlow Engine™ — Predictable leads from Meta ads | OMGsystems",
  description: "Turn Facebook/Instagram campaigns into qualified clients with instant CRM follow-ups, nurture, and retargeting. Built for Ontario SMBs.",
  path: "/campaign/leadflow",
  noindex: true, // Campaign pages are often noindexed to avoid diluting SEO
});

export default function LeadFlowCampaignPage() {
  const campaignData = {
    headline: "Turn Facebook/Instagram Ads Into Qualified Clients",
    subheadline: "Stop wasting ad spend on unqualified leads. LeadFlow Engine™ automatically nurtures, scores, and converts your Meta campaigns into paying customers.",
    painPoints: [
      "High ad spend with low conversion rates",
      "Manual lead follow-up and qualification",
      "Lost leads due to slow response times",
      "Difficulty tracking ROI on social media campaigns"
    ],
    solution: "LeadFlow Engine™ integrates directly with your Meta ads to automatically capture, score, and nurture leads. Our AI-powered system identifies high-intent prospects and routes them to the right team member for immediate follow-up.",
    ctaText: "Get Your LeadFlow Strategy Call",
    ctaHref: "#lead-form", // Anchor to the form section
    campaignData: {
      source: "meta-ads",
      medium: "cpc",
      campaign: "leadflow-engine",
    },
  };

  return <CampaignLanding {...campaignData} />;
}