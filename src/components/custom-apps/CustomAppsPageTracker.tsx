"use client";

import { useEffect } from "react";

export default function CustomAppsPageTracker() {
  useEffect(() => {
    // Track page view
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_title: "Custom Apps",
        page_location: window.location.href,
      });
    }

    // Track custom apps page engagement
    const trackEngagement = () => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "custom_apps_page_engagement", {
          event_category: "Custom Apps",
          event_label: "Page Interaction",
        });
      }
    };

    // Track app gallery interactions
    const trackAppGalleryInteraction = (appName: string, action: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "app_gallery_interaction", {
          event_category: "Custom Apps",
          event_label: `${appName} - ${action}`,
          app_name: appName,
          action: action,
        });
      }
    };

    // Track filter usage
    const trackFilterUsage = (category: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "app_filter_usage", {
          event_category: "Custom Apps",
          event_label: `Filter: ${category}`,
          filter_category: category,
        });
      }
    };

    // Track CTA clicks
    const trackCTAClick = (ctaType: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "custom_apps_cta_click", {
          event_category: "Custom Apps",
          event_label: `CTA: ${ctaType}`,
          cta_type: ctaType,
        });
      }
    };

    // Track how it works step interactions
    const trackStepInteraction = (stepNumber: number, stepName: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "how_it_works_interaction", {
          event_category: "Custom Apps",
          event_label: `Step ${stepNumber}: ${stepName}`,
          step_number: stepNumber,
          step_name: stepName,
        });
      }
    };

    // Expose tracking functions globally for use in other components
    (window as any).trackCustomAppsEngagement = trackEngagement;
    (window as any).trackAppGalleryInteraction = trackAppGalleryInteraction;
    (window as any).trackFilterUsage = trackFilterUsage;
    (window as any).trackCTAClick = trackCTAClick;
    (window as any).trackStepInteraction = trackStepInteraction;

    // Initial engagement tracking
    trackEngagement();

    // Cleanup
    return () => {
      delete (window as any).trackCustomAppsEngagement;
      delete (window as any).trackAppGalleryInteraction;
      delete (window as any).trackFilterUsage;
      delete (window as any).trackCTAClick;
      delete (window as any).trackStepInteraction;
    };
  }, []);

  return null;
}
