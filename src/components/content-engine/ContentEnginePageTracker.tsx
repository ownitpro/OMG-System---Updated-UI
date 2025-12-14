"use client";

import { useEffect } from "react";

export default function ContentEnginePageTracker() {
  useEffect(() => {
    // Track page view
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_title: "Content Engine",
        page_location: window.location.href,
      });
    }

    // Track content engine page engagement
    const trackEngagement = () => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "content_engine_page_engagement", {
          event_category: "Content Engine",
          event_label: "Page Interaction",
        });
      }
    };

    // Track feature interactions
    const trackFeatureInteraction = (featureName: string, action: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "feature_interaction", {
          event_category: "Content Engine",
          event_label: `${featureName} - ${action}`,
          feature_name: featureName,
          action: action,
        });
      }
    };

    // Track pricing plan selection
    const trackPricingSelection = (planName: string, planPrice: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "pricing_plan_selection", {
          event_category: "Content Engine",
          event_label: `Plan: ${planName}`,
          plan_name: planName,
          plan_price: planPrice,
        });
      }
    };

    // Track CTA clicks
    const trackCTAClick = (ctaType: string, ctaLocation: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "content_engine_cta_click", {
          event_category: "Content Engine",
          event_label: `CTA: ${ctaType} - ${ctaLocation}`,
          cta_type: ctaType,
          cta_location: ctaLocation,
        });
      }
    };

    // Track demo requests
    const trackDemoRequest = (demoType: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "demo_request", {
          event_category: "Content Engine",
          event_label: `Demo: ${demoType}`,
          demo_type: demoType,
        });
      }
    };

    // Track industry template interactions
    const trackIndustryInteraction = (industryName: string, action: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "industry_template_interaction", {
          event_category: "Content Engine",
          event_label: `${industryName} - ${action}`,
          industry_name: industryName,
          action: action,
        });
      }
    };

    // Track content type interactions
    const trackContentTypeInteraction = (contentType: string, action: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "content_type_interaction", {
          event_category: "Content Engine",
          event_label: `${contentType} - ${action}`,
          content_type: contentType,
          action: action,
        });
      }
    };

    // Track how it works step interactions
    const trackStepInteraction = (stepNumber: number, stepName: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "how_it_works_interaction", {
          event_category: "Content Engine",
          event_label: `Step ${stepNumber}: ${stepName}`,
          step_number: stepNumber,
          step_name: stepName,
        });
      }
    };

    // Track results section interactions
    const trackResultsInteraction = (metricName: string, metricValue: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "results_interaction", {
          event_category: "Content Engine",
          event_label: `${metricName}: ${metricValue}`,
          metric_name: metricName,
          metric_value: metricValue,
        });
      }
    };

    // Expose tracking functions globally for use in other components
    (window as any).trackContentEngineEngagement = trackEngagement;
    (window as any).trackFeatureInteraction = trackFeatureInteraction;
    (window as any).trackPricingSelection = trackPricingSelection;
    (window as any).trackCTAClick = trackCTAClick;
    (window as any).trackDemoRequest = trackDemoRequest;
    (window as any).trackIndustryInteraction = trackIndustryInteraction;
    (window as any).trackContentTypeInteraction = trackContentTypeInteraction;
    (window as any).trackStepInteraction = trackStepInteraction;
    (window as any).trackResultsInteraction = trackResultsInteraction;

    // Initial engagement tracking
    trackEngagement();

    // Cleanup
    return () => {
      delete (window as any).trackContentEngineEngagement;
      delete (window as any).trackFeatureInteraction;
      delete (window as any).trackPricingSelection;
      delete (window as any).trackCTAClick;
      delete (window as any).trackDemoRequest;
      delete (window as any).trackIndustryInteraction;
      delete (window as any).trackContentTypeInteraction;
      delete (window as any).trackStepInteraction;
      delete (window as any).trackResultsInteraction;
    };
  }, []);

  return null;
}
