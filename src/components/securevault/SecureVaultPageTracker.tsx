"use client";

import { useEffect } from "react";

export default function SecureVaultPageTracker() {
  useEffect(() => {
    // Track page view
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_title: "SecureVault Docs - Document Management",
        page_location: window.location.href,
        content_group1: "Applications",
        content_group2: "SecureVault Docs"
      });
    }
  }, []);

  return null;
}
