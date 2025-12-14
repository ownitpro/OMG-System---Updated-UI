import React from "react";
import { Metadata } from "next";
import { CampaignLanding } from "@/components/campaign/campaign-landing";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Property Management Automation - Save 20+ Hours Per Week",
  description: "Stop losing money on manual processes. Automate rent collection, maintenance requests, and owner reports with OMGsystems. Book your free strategy call.",
  path: "/campaign/property-automation",
  noindex: true, // Campaign pages typically shouldn't be indexed
});

export default function PropertyAutomationCampaign() {
  return (
    <CampaignLanding
      headline="Stop Losing Money on Manual Property Management"
      subheadline="Automate rent collection, maintenance requests, and owner reports. Save 20+ hours per week and increase your revenue by 30%."
      painPoints={[
        "Spending hours every week on manual rent collection and follow-ups",
        "Missing maintenance requests and dealing with angry tenants",
        "Creating owner reports manually and missing important details",
        "Losing potential tenants due to slow response times",
        "Struggling to keep track of multiple properties and their unique needs",
        "Wasting time on repetitive administrative tasks that could be automated"
      ]}
      solution="OMGsystems Property Management Automation platform streamlines your entire operation. From automated rent collection and maintenance request routing to real-time owner dashboards, we help you manage properties more efficiently and profitably."
      ctaText="Get My Free Strategy Call"
      ctaHref="/thank-you?campaign=property-automation"
      campaignData={{
        source: "google",
        medium: "cpc",
        campaign: "property-automation"
      }}
    />
  );
}
