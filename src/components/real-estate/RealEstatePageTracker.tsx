"use client";

import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";

export default function RealEstatePageTracker() {
  useEffect(() => {
    trackPageView("Real Estate Industry Page", {
      industry: "real-estate",
      page_type: "industry_landing",
    });
  }, []);

  return null;
}
