"use client";

import { useEffect } from "react";

export default function CRMDemoPageTracker() {
  useEffect(() => {
    // Track page view
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_title: "CRM Demo",
        page_location: window.location.href,
        page_path: "/apps/crm-demo",
      });
    }

    // Track CRM page engagement
    const trackCRMEngagement = () => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "crm_page_engagement", {
          event_category: "crm",
          event_label: "crm_demo_page",
          value: 1,
        });
      }
    };

    // Track demo launch
    const trackDemoLaunch = () => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "crm_demo_launch", {
          event_category: "crm",
          event_label: "demo_launch",
          value: 1,
        });
      }
    };

    // Track industry card clicks
    const trackIndustryClick = (industry: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "industry_card_click", {
          event_category: "crm",
          event_label: industry,
          value: 1,
        });
      }
    };

    // Track FAQ interactions
    const trackFAQInteraction = (question: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "faq_interaction", {
          event_category: "crm",
          event_label: question,
          value: 1,
        });
      }
    };

    // Add event listeners for tracking
    const handleDemoLaunch = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.textContent?.includes("Try a Live Demo")) {
        trackDemoLaunch();
      }
    };

    const handleIndustryClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const industry = target.closest('a')?.getAttribute('href')?.split('/').pop();
      if (industry) {
        trackIndustryClick(industry);
      }
    };

    const handleFAQClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const question = target.textContent?.trim();
      if (question) {
        trackFAQInteraction(question);
      }
    };

    // Add event listeners
    document.addEventListener("click", handleDemoLaunch);
    document.addEventListener("click", handleIndustryClick);
    document.addEventListener("click", handleFAQClick);

    // Track initial engagement
    trackCRMEngagement();

    return () => {
      document.removeEventListener("click", handleDemoLaunch);
      document.removeEventListener("click", handleIndustryClick);
      document.removeEventListener("click", handleFAQClick);
    };
  }, []);

  return null;
}
