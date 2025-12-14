"use client";

import { useEffect } from "react";

export default function CRMPageTracker() {
  useEffect(() => {
    // Track page view
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_title: "CRM for Business Growth & Efficiency",
        page_location: window.location.href,
        content_group1: "Apps",
        content_group2: "CRM",
        custom_parameter_1: "crm_page_view"
      });
    }
  }, []);

  return null;
}
