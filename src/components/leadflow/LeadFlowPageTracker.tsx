"use client";

import { useEffect } from "react";

export default function LeadFlowPageTracker() {
  useEffect(() => {
    // Track page view
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'LeadFlow Engine - Build a Predictable Lead Machine',
        page_location: window.location.href,
        page_path: '/apps/leadflow-engine'
      });
    }
  }, []);

  return null;
}