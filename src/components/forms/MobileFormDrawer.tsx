"use client";

import React, { useState, useEffect } from 'react';
import SolutionsLeadForm from './SolutionsLeadForm';
import MarketingLeadForm from './MarketingLeadForm';
import IndustriesLeadForm from './IndustriesLeadForm';

interface MobileFormDrawerProps {
  variant: 'solutions' | 'marketing' | 'industries';
}

const variantStyles = {
  solutions: {
    gradient: 'from-emerald-500 to-teal-500',
    hoverGradient: 'hover:from-emerald-600 hover:to-teal-600',
    shadow: 'shadow-emerald-500/30',
    border: 'border-emerald-500/30',
    bg: 'bg-slate-950',
  },
  marketing: {
    gradient: 'from-blue-500 to-purple-500',
    hoverGradient: 'hover:from-blue-600 hover:to-purple-600',
    shadow: 'shadow-blue-500/30',
    border: 'border-blue-500/30',
    bg: 'bg-slate-950',
  },
  industries: {
    gradient: 'from-purple-500 to-pink-500',
    hoverGradient: 'hover:from-purple-600 hover:to-pink-600',
    shadow: 'shadow-purple-500/30',
    border: 'border-purple-500/30',
    bg: 'bg-slate-950',
  },
};

export default function MobileFormDrawer({ variant }: MobileFormDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const styles = variantStyles[variant];

  // Close drawer when escape key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const renderForm = () => {
    switch (variant) {
      case 'solutions':
        return <SolutionsLeadForm />;
      case 'marketing':
        return <MarketingLeadForm />;
      case 'industries':
        return <IndustriesLeadForm />;
      default:
        return <SolutionsLeadForm />;
    }
  };

  return (
    <>
      {/* Mobile Trigger Button - Only visible on mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className={`
          md:hidden fixed bottom-6 right-6 z-50
          flex items-center gap-2
          px-6 py-3
          bg-gradient-to-r ${styles.gradient} ${styles.hoverGradient}
          text-white font-semibold rounded-full
          shadow-lg ${styles.shadow}
          transition-all duration-300
          animate-pulse
        `}
        aria-label="Get Started"
      >
        <span>Get Started</span>
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          md:hidden fixed inset-x-0 bottom-0 z-50
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
        `}
      >
        <div className={`${styles.bg} rounded-t-3xl border-t ${styles.border} max-h-[90vh] overflow-y-auto`}>
          {/* Drawer Handle */}
          <div className="sticky top-0 z-10 flex justify-center pt-3 pb-2 bg-inherit">
            <button
              onClick={() => setIsOpen(false)}
              className="w-12 h-1.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              aria-label="Close drawer"
            />
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Form Content */}
          <div className="pb-safe">
            {renderForm()}
          </div>
        </div>
      </div>
    </>
  );
}
