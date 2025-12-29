"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ConsentPreferences {
  analytics: boolean;
  functional: boolean;
}

export function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    analytics: false,
    functional: true,
  });

  useEffect(() => {
    // Check if consent has been given
    const consent = localStorage.getItem("omg-consent");
    if (!consent) {
      setShowBanner(true);
    } else {
      const parsed = JSON.parse(consent);
      setPreferences(parsed);
      if (parsed.analytics) {
        initializeAnalytics();
      }
    }

    // Check Do Not Track
    if (navigator.doNotTrack === "1") {
      setPreferences(prev => ({ ...prev, analytics: false }));
    }
  }, []);

  const saveConsent = (newPreferences: ConsentPreferences) => {
    localStorage.setItem("omg-consent", JSON.stringify(newPreferences));
    setPreferences(newPreferences);
    setShowBanner(false);

    if (newPreferences.analytics) {
      initializeAnalytics();
    }
  };

  const acceptAll = () => {
    saveConsent({ analytics: true, functional: true });
  };

  const acceptNecessary = () => {
    saveConsent({ analytics: false, functional: true });
  };

  const customizeConsent = () => {
    // This would open a more detailed consent modal
    // For now, we'll just accept necessary
    acceptNecessary();
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-t border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-white mb-1">
              We value your privacy
            </h3>
            <p className="text-sm text-white/60">
              We use cookies to improve your experience and analyze site usage.
              Functional cookies are always enabled. You can customize your preferences.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={customizeConsent}
              className="text-xs bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30"
            >
              Customize
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={acceptNecessary}
              className="text-xs bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30"
            >
              Necessary Only
            </Button>
            <Button
              size="sm"
              onClick={acceptAll}
              className="text-xs bg-emerald-500 hover:bg-emerald-600 text-white border-0"
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Analytics initialization
function initializeAnalytics() {
  // This would initialize your analytics service (Google Analytics, etc.)
  console.log("Analytics initialized");
  
  // Track page view
  trackEvent("page_view", {
    page_path: window.location.pathname,
    page_title: document.title,
  });
}

// Event tracking
export function trackEvent(eventName: string, parameters: Record<string, any> = {}) {
  const consent = localStorage.getItem("omg-consent");
  if (!consent) return;

  const preferences = JSON.parse(consent);
  if (!preferences.analytics) return;

  // This would send to your analytics service
  console.log("Analytics event:", eventName, parameters);
}

// CTA tracking
export function trackCTA(ctaId: string, ctaText: string, placement: string, industry?: string) {
  trackEvent("cta_click", {
    cta_id: ctaId,
    cta_text: ctaText,
    placement,
    industry,
  });
}
