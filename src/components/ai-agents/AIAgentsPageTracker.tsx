"use client";

import { useEffect } from "react";

export default function AIAgentsPageTracker() {
  useEffect(() => {
    // Track page view
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_title: "AI Agents",
        page_location: window.location.href,
      });
    }

    // Track AI agents page engagement
    const trackEngagement = () => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "ai_agents_page_engagement", {
          event_category: "AI Agents",
          event_label: "Page Interaction",
        });
      }
    };

    // Track CTA interactions
    const trackCTAClick = (ctaType: string, ctaLocation: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "ai_agents_cta_click", {
          event_category: "AI Agents",
          event_label: `CTA: ${ctaType} - ${ctaLocation}`,
          cta_type: ctaType,
          cta_location: ctaLocation,
        });
      }
    };

    // Track form interactions
    const trackFormInteraction = (formType: string, action: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "ai_agents_form_interaction", {
          event_category: "AI Agents",
          event_label: `${formType} - ${action}`,
          form_type: formType,
          action: action,
        });
      }
    };

    // Track case study interactions
    const trackCaseStudyInteraction = (caseStudyName: string, action: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "ai_agents_case_study_interaction", {
          event_category: "AI Agents",
          event_label: `${caseStudyName} - ${action}`,
          case_study_name: caseStudyName,
          action: action,
        });
      }
    };

    // Track process step interactions
    const trackProcessStepInteraction = (stepNumber: number, stepName: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "ai_agents_process_interaction", {
          event_category: "AI Agents",
          event_label: `Step ${stepNumber}: ${stepName}`,
          step_number: stepNumber,
          step_name: stepName,
        });
      }
    };

    // Track FAQ interactions
    const trackFAQInteraction = (question: string, action: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "ai_agents_faq_interaction", {
          event_category: "AI Agents",
          event_label: `${question} - ${action}`,
          question: question,
          action: action,
        });
      }
    };

    // Track founder offer interactions
    const trackFounderOfferInteraction = (action: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "ai_agents_founder_offer_interaction", {
          event_category: "AI Agents",
          event_label: `Founder Offer - ${action}`,
          action: action,
        });
      }
    };

    // Track benefits section interactions
    const trackBenefitsInteraction = (benefitType: string, action: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "ai_agents_benefits_interaction", {
          event_category: "AI Agents",
          event_label: `${benefitType} - ${action}`,
          benefit_type: benefitType,
          action: action,
        });
      }
    };

    // Track quote form submissions
    const trackQuoteFormSubmission = (formData: any) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "ai_agents_quote_form_submission", {
          event_category: "AI Agents",
          event_label: "Quote Form Submitted",
          industry: formData.industry,
          timeline: formData.timeline,
          value: 2500 // Founder's offer value
        });
      }
    };

    // Expose tracking functions globally for use in other components
    (window as any).trackAIAgentsEngagement = trackEngagement;
    (window as any).trackCTAClick = trackCTAClick;
    (window as any).trackFormInteraction = trackFormInteraction;
    (window as any).trackCaseStudyInteraction = trackCaseStudyInteraction;
    (window as any).trackProcessStepInteraction = trackProcessStepInteraction;
    (window as any).trackFAQInteraction = trackFAQInteraction;
    (window as any).trackFounderOfferInteraction = trackFounderOfferInteraction;
    (window as any).trackBenefitsInteraction = trackBenefitsInteraction;
    (window as any).trackQuoteFormSubmission = trackQuoteFormSubmission;

    // Initial engagement tracking
    trackEngagement();

    // Cleanup
    return () => {
      delete (window as any).trackAIAgentsEngagement;
      delete (window as any).trackCTAClick;
      delete (window as any).trackFormInteraction;
      delete (window as any).trackCaseStudyInteraction;
      delete (window as any).trackProcessStepInteraction;
      delete (window as any).trackFAQInteraction;
      delete (window as any).trackFounderOfferInteraction;
      delete (window as any).trackBenefitsInteraction;
      delete (window as any).trackQuoteFormSubmission;
    };
  }, []);

  return null;
}