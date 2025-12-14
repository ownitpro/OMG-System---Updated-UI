"use client";

import React, { useState, useEffect } from "react";
import { XMarkIcon, CogIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

interface ConsentPreferences {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}

interface ConsentManagerProps {
  onConsentChange?: (preferences: ConsentPreferences) => void;
}

export function ConsentManager({ onConsentChange }: ConsentManagerProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    essential: true, // Always true
    analytics: false,
    functional: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if consent has been given before
    const savedConsent = localStorage.getItem('omg_consent');
    const savedPreferences = localStorage.getItem('omg_consent_preferences');
    
    if (savedConsent === 'accepted' && savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences(parsed);
        setShowBanner(false);
      } catch (error) {
        console.error('Error parsing saved consent preferences:', error);
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const newPreferences = {
      essential: true,
      analytics: true,
      functional: true,
      marketing: true,
    };
    
    setPreferences(newPreferences);
    saveConsent(newPreferences);
    setShowBanner(false);
    onConsentChange?.(newPreferences);
    
    // Initialize analytics if accepted
    if (newPreferences.analytics && typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: newPreferences.marketing ? 'granted' : 'denied',
        functionality_storage: newPreferences.functional ? 'granted' : 'denied',
      });
    }
  };

  const handleRejectAll = () => {
    const newPreferences = {
      essential: true,
      analytics: false,
      functional: false,
      marketing: false,
    };
    
    setPreferences(newPreferences);
    saveConsent(newPreferences);
    setShowBanner(false);
    onConsentChange?.(newPreferences);
    
    // Deny all non-essential cookies
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        functionality_storage: 'denied',
      });
    }
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
    setShowBanner(false);
    setShowSettings(false);
    onConsentChange?.(preferences);
    
    // Update Google Analytics consent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: preferences.analytics ? 'granted' : 'denied',
        ad_storage: preferences.marketing ? 'granted' : 'denied',
        functionality_storage: preferences.functional ? 'granted' : 'denied',
      });
    }
  };

  const saveConsent = (prefs: ConsentPreferences) => {
    localStorage.setItem('omg_consent', 'accepted');
    localStorage.setItem('omg_consent_preferences', JSON.stringify(prefs));
    localStorage.setItem('omg_consent_timestamp', new Date().toISOString());
  };

  const handlePreferenceChange = (category: keyof ConsentPreferences, value: boolean) => {
    if (category === 'essential') return; // Essential cookies cannot be disabled
    
    setPreferences(prev => ({
      ...prev,
      [category]: value
    }));
  };

  if (!showBanner && !showSettings) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowSettings(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
          aria-label="Open cookie settings"
        >
          <CogIcon className="h-5 w-5" />
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Cookie Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <ShieldCheckIcon className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    We use cookies to enhance your experience
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  We use cookies to provide essential functionality, analyze site usage, and personalize content. 
                  You can choose which cookies to accept.
                </p>
                <div className="mt-2">
                  <a 
                    href="/legal/cookies" 
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Learn more about our cookie policy →
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 ml-6">
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Customize
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Reject All
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Cookie Preferences
                </h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="px-6 py-4">
              <p className="text-sm text-gray-600 mb-6">
                Choose which cookies you want to accept. Essential cookies are required for the website to function properly.
              </p>
              
              <div className="space-y-6">
                {/* Essential Cookies */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Essential Cookies</h3>
                      <p className="text-sm text-gray-600">
                        Required for basic website functionality, security, and authentication.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={preferences.essential}
                        disabled
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-500">Always Active</span>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Session management and authentication</li>
                    <li>• Security and fraud prevention</li>
                    <li>• Load balancing and performance</li>
                  </ul>
                </div>

                {/* Analytics Cookies */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Analytics Cookies</h3>
                      <p className="text-sm text-gray-600">
                        Help us understand how visitors interact with our website.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => handlePreferenceChange('analytics', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Page views and user behavior tracking</li>
                    <li>• Performance metrics and error tracking</li>
                    <li>• Traffic sources and referral analysis</li>
                  </ul>
                </div>

                {/* Functional Cookies */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Functional Cookies</h3>
                      <p className="text-sm text-gray-600">
                        Enable enhanced functionality and personalization.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) => handlePreferenceChange('functional', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• User preferences and settings</li>
                    <li>• Language and region selection</li>
                    <li>• A/B testing and feature flags</li>
                  </ul>
                </div>

                {/* Marketing Cookies */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Marketing Cookies</h3>
                      <p className="text-sm text-gray-600">
                        Used to deliver relevant advertisements and track campaign effectiveness.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => handlePreferenceChange('marketing', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Ad targeting and personalization</li>
                    <li>• Campaign performance tracking</li>
                    <li>• Social media integration</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <a 
                href="/legal/cookies" 
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Learn more about cookies →
              </a>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
