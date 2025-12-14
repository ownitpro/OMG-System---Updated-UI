"use client";

import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";

export default function PropertyManagementPageTracker() {
  useEffect(() => {
    trackPageView("Property Management Industry Page", {
      industry: "property-management",
      page_type: "industry_landing",
    });
  }, []);

  return null;
}
