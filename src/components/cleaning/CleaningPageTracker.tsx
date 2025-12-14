"use client";

import { useEffect } from "react";

export default function CleaningPageTracker() {
  useEffect(() => {
    // Track page view for cleaning industry
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_title: "Cleaning Operations Engine™ | Cleaning Business Automation | OMGsystems",
        page_location: window.location.href,
        industry: "cleaning",
        page_type: "industry_landing",
      });
    }

    // Track with custom analytics if available
    if (typeof window !== "undefined" && (window as any).analytics) {
      (window as any).analytics.track("Industry Page Viewed", {
        industry: "cleaning",
        page: "cleaning_operations_engine",
        timestamp: new Date().toISOString(),
      });
    }
  }, []);

  return null;
}
