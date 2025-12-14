"use client";

import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";

export default function AccountingPageTracker() {
  useEffect(() => {
    trackPageView("Accounting Industry Page", {
      industry: "accounting",
      page_type: "industry_landing",
    });
  }, []);

  return null;
}
