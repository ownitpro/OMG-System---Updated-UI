"use client";

import { useEffect } from "react";

export default function SecureVaultDemoPageTracker() {
  useEffect(() => {
    // Track page view
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_title: "SecureVault Docs Demo",
        page_location: window.location.href,
        page_path: "/apps/securevault-docs/demo",
      });
    }

    // Track demo page engagement
    const trackDemoEngagement = () => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "demo_page_engagement", {
          event_category: "demo",
          event_label: "securevault_docs_demo",
          value: 1,
        });
      }
    };

    // Track industry selection
    const trackIndustrySelection = (industry: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "industry_selection", {
          event_category: "demo",
          event_label: industry,
          value: 1,
        });
      }
    };

    // Track demo launch
    const trackDemoLaunch = (industry: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "demo_launch", {
          event_category: "demo",
          event_label: industry,
          value: 1,
        });
      }
    };

    // Add event listeners for tracking
    const handleIndustryChange = (event: Event) => {
      const target = event.target as HTMLSelectElement;
      if (target.value) {
        trackIndustrySelection(target.value);
      }
    };

    const handleDemoLaunch = (event: Event) => {
      const target = event.target as HTMLElement;
      const industry = target.getAttribute("data-industry");
      if (industry) {
        trackDemoLaunch(industry);
      }
    };

    // Add event listeners
    document.addEventListener("change", handleIndustryChange);
    document.addEventListener("click", handleDemoLaunch);

    // Track initial engagement
    trackDemoEngagement();

    return () => {
      document.removeEventListener("change", handleIndustryChange);
      document.removeEventListener("click", handleDemoLaunch);
    };
  }, []);

  return null;
}
