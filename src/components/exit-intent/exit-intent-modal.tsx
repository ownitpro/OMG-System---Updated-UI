"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { XMarkIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

interface ExitIntentModalProps {
  industry: string;
  industryName: string;
}

export function ExitIntentModal({ industry, industryName }: ExitIntentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user has already seen the modal in this session
    const hasSeenModal = sessionStorage.getItem('omg_exit_seen');
    if (hasSeenModal) {
      return;
    }

    // Set up exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is leaving the top of the viewport
      if (e.clientY <= 0) {
        showModal();
      }
    };

    const handleScrollUp = () => {
      // Detect fast upward scroll (exit intent on mobile)
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop < 100) {
        showModal();
      }
    };

    // Add event listeners
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScrollUp, { passive: true });

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScrollUp);
    };
  }, []);

  const showModal = () => {
    setIsOpen(true);
    sessionStorage.setItem('omg_exit_seen', 'true');
    
    // Focus management
    setTimeout(() => {
      if (modalRef.current) {
        const firstInput = modalRef.current.querySelector('input[type="email"]') as HTMLInputElement;
        if (firstInput) {
          firstInput.focus();
        }
      }
    }, 100);
    
    // Track modal view
    const consent = localStorage.getItem('omg_consent');
    if (consent === 'accepted' && window.gtag) {
      window.gtag('event', 'exit_seen', {
        event_category: 'Exit Intent',
        industry: industry,
        page_path: window.location.pathname
      });
    }
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
    
    // Track modal dismissal
    const consent = localStorage.getItem('omg_consent');
    if (consent === 'accepted' && window.gtag) {
      window.gtag('event', 'exit_dismiss', {
        event_category: 'Exit Intent',
        industry: industry,
        page_path: window.location.pathname
      });
    }
  }, [industry]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const leadData = {
        email: formData.email,
        name: formData.firstName || 'Exit Intent User',
        company: '',
        industry: industry,
        source: 'exit-intent',
        context: {
          page_path: window.location.pathname,
          section: 'exit-intent',
          timestamp: new Date().toISOString(),
          checklist: `${industry} buying checklist`
        }
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        
        // Track submission
        const consent = localStorage.getItem('omg_consent');
        if (consent === 'accepted' && window.gtag) {
          window.gtag('event', 'exit_submit', {
            event_category: 'Exit Intent',
            industry: industry,
            page_path: window.location.pathname,
            email_domain: formData.email.split('@')[1]
          });
        }
      }
    } catch (error) {
      console.error('Exit intent lead capture error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="exit-intent-title">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={handleClose}
          aria-hidden="true"
        />
        
        {/* Modal */}
        <div ref={modalRef} className="relative bg-white rounded-lg shadow-xl max-w-md w-full" role="document">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center">
              <DocumentTextIcon className="h-6 w-6 text-blue-600 mr-3" />
              <h3 id="exit-intent-title" className="text-lg font-semibold text-gray-900">
                Before you go...
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              aria-label="Close modal"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {isSubmitted ? (
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <DocumentTextIcon className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Check your inbox!
                </h4>
                <p className="text-gray-600 mb-4">
                  We've sent you the {industryName} Buying Checklist. It includes everything you need to know about choosing the right automation solution.
                </p>
                <div className="flex space-x-3">
                  <a
                    href="/campaign/leadflow"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Book a demo
                  </a>
                  <button
                    onClick={handleClose}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 text-center rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Get the {industryName} Buying Checklist
                </h4>
                <p className="text-gray-600 mb-6">
                  Don't miss out! Get our free checklist with everything you need to know about choosing the right automation solution for your {industryName.toLowerCase()} business.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email (required)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="work@company.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name (optional)
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.email}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? 'Sending...' : 'Email me the checklist'}
                    </button>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      No thanks
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Extend window type for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
