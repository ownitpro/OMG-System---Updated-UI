"use client";

import { useState, useEffect } from "react";
import { useExitIntent } from "@/hooks/useExitIntent";
import { sessionTracker } from "@/lib/session-tracking";
import ExitIntentEmailCapture from "./ExitIntentEmailCapture";

export default function ExitIntentManager() {
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure this only runs on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle exit intent
  const handleExitIntent = () => {
    // Check if we've already shown the popup in this session
    const hasShownThisSession = sessionStorage.getItem('omg_exit_popup_shown');
    if (hasShownThisSession) {
      return;
    }
    
    // Only show if we should show email capture
    if (sessionTracker.shouldShowEmailCapture()) {
      setShowEmailCapture(true);
      sessionTracker.markEmailCaptureShown();
      // Mark as shown in this session
      sessionStorage.setItem('omg_exit_popup_shown', 'true');
    }
  };

  // Use exit intent hook
  useExitIntent({ 
    onExitIntent: handleExitIntent,
    threshold: 10, // Trigger when mouse leaves top 10px
    delay: 1000 // 1 second delay between triggers
  });

  // Handle email submission
  const handleEmailSubmit = async (email: string) => {
    setIsLoading(true);
    
    try {
      // Send to API endpoint
      const response = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'exit_intent',
          sessionData: sessionTracker.getSessionData()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit email');
      }

      const result = await response.json();
      
      // Mark as submitted in session tracker
      sessionTracker.markEmailSubmitted();
      
      // Log the lead capture
      console.log('Lead captured successfully:', {
        email,
        leadId: result.leadId,
        timestamp: new Date().toISOString(),
        sessionData: sessionTracker.getSessionData()
      });

      // Send to analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'lead_capture', {
          event_category: 'engagement',
          event_label: 'exit_intent',
          value: 1
        });
      }

    } catch (error) {
      console.error('Error submitting email:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle modal close
  const handleClose = () => {
    setShowEmailCapture(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionTracker.cleanup();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      sessionTracker.cleanup();
    };
  }, []);

  // Don't render anything if not on client side or not showing
  if (!isClient || !showEmailCapture) {
    return null;
  }

  return (
    <ExitIntentEmailCapture
      onClose={handleClose}
      onSubmit={handleEmailSubmit}
    />
  );
}
