"use client";

import { useEffect } from "react";

export default function HealthcarePageTracker() {
  useEffect(() => {
    // Track page view for healthcare industry
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_title: "CareFlow Automation | Healthcare Workflow Automation | OMGsystems",
        page_location: window.location.href,
        industry: "healthcare",
        page_type: "industry_landing",
      });
    }

    // Track with custom analytics if available
    if (typeof window !== "undefined" && (window as any).analytics) {
      (window as any).analytics.track("Industry Page Viewed", {
        industry: "healthcare",
        page: "careflow_automation",
        timestamp: new Date().toISOString(),
      });
    }
  }, []);

  return null;
}
