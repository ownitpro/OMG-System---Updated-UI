"use client";

import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";

export default function ContractorsPageTracker() {
  useEffect(() => {
    trackPageView("Contractors Industry Page", {
      industry: "contractors",
      page_type: "industry_landing",
    });
  }, []);

  return null;
}
