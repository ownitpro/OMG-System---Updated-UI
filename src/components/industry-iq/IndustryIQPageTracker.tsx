"use client";

import { useEffect } from "react";

export default function IndustryIQPageTracker() {
  useEffect(() => {
    // Track page view
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_title: "Industry IQ – AI-Powered Business Intelligence",
        page_location: window.location.href,
        content_group1: "Apps",
        content_group2: "Industry IQ",
      });
    }

    // Track specific Industry IQ page view
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "view_item", {
        item_id: "industry-iq",
        item_name: "Industry IQ",
        item_category: "Business Intelligence",
        item_category2: "AI Analytics",
        value: 1,
        currency: "USD",
      });
    }

    // Track scroll depth
    let maxScroll = 0;
    const trackScrollDepth = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        // Track milestone scroll depths
        if (scrollPercent >= 25 && maxScroll < 25) {
          if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "scroll", {
              event_category: "Industry IQ",
              event_label: "25% scroll depth",
              value: 25,
            });
          }
        }
        
        if (scrollPercent >= 50 && maxScroll < 50) {
          if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "scroll", {
              event_category: "Industry IQ",
              event_label: "50% scroll depth",
              value: 50,
            });
          }
        }
        
        if (scrollPercent >= 75 && maxScroll < 75) {
          if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "scroll", {
              event_category: "Industry IQ",
              event_label: "75% scroll depth",
              value: 75,
            });
          }
        }
        
        if (scrollPercent >= 90 && maxScroll < 90) {
          if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "scroll", {
              event_category: "Industry IQ",
              event_label: "90% scroll depth",
              value: 90,
            });
          }
        }
      }
    };

    window.addEventListener("scroll", trackScrollDepth);

    // Track time on page
    const startTime = Date.now();
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "timing_complete", {
          name: "time_on_page",
          value: timeSpent,
          event_category: "Industry IQ",
          event_label: "Time on Industry IQ page",
        });
      }
    };

    // Track time milestones
    setTimeout(() => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "engagement_time", {
          event_category: "Industry IQ",
          event_label: "30 seconds on page",
          value: 30,
        });
      }
    }, 30000);

    setTimeout(() => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "engagement_time", {
          event_category: "Industry IQ",
          event_label: "60 seconds on page",
          value: 60,
        });
      }
    }, 60000);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", trackScrollDepth);
      trackTimeOnPage();
    };
  }, []);

  return null;
}