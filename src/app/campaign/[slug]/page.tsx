import React from "react";
import { notFound } from "next/navigation";
import { CampaignLanding } from "@/components/campaign/campaign-landing";
import { 
  parseUTMParams, 
  createCampaignData, 
  getCampaignConfig, 
  detectCampaign,
  generateLeadSource,
  generateLeadNotes 
} from "@/lib/utm";
import { generatePageMetadata } from "@/lib/metadata";

interface CampaignPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params, searchParams }: CampaignPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const utmParams = parseUTMParams(new URLSearchParams(resolvedSearchParams as Record<string, string>));
  const campaignData = createCampaignData(utmParams);
  const campaignKey = detectCampaign(campaignData);
  
  if (!campaignKey) {
    return generatePageMetadata({
      title: "Campaign Landing Page",
      description: "Discover how OMGsystems can transform your business with automation.",
      path: `/campaign/${slug}`,
    });
  }
  
  const config = getCampaignConfig(campaignKey);
  
  return generatePageMetadata({
    title: config.headline,
    description: config.subheadline,
    path: `/campaign/${slug}`,
  });
}

export default async function CampaignPage({ params, searchParams }: CampaignPageProps) {
  const resolvedSearchParams = await searchParams;
  const utmParams = parseUTMParams(new URLSearchParams(resolvedSearchParams as Record<string, string>));
  const campaignData = createCampaignData(utmParams);
  const campaignKey = detectCampaign(campaignData);
  
  // If no campaign detected, show generic landing
  if (!campaignKey) {
    return (
      <CampaignLanding
        headline="Transform Your Business with Automation"
        subheadline="Join thousands of Canadian businesses using OMGsystems to streamline operations and grow faster."
        painPoints={[
          "Manual processes taking hours every day",
          "Missing opportunities due to slow response times",
          "Inconsistent customer experience",
          "Difficulty tracking and reporting on business metrics",
        ]}
        solution="OMGsystems provides intelligent automation that works 24/7 to grow your business."
        ctaText="See How It Works"
        ctaHref="/demo/crm"
        campaignData={campaignData}
      />
    );
  }
  
  const config = getCampaignConfig(campaignKey);
  
  return (
    <CampaignLanding
      headline={config.headline}
      subheadline={config.subheadline}
      painPoints={config.painPoints as unknown as string[]}
      solution={config.solution}
      ctaText={config.ctaText}
      ctaHref={config.ctaHref}
      campaignData={campaignData}
    />
  );
}
