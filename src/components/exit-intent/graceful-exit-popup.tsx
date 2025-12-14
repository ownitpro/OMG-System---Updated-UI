"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { XMarkIcon, DocumentTextIcon, GiftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface GracefulExitPopupProps {
  onClose?: () => void;
}

export function GracefulExitPopup({ onClose }: GracefulExitPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [mouseY, setMouseY] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);

  // Check if popup has been shown before (graceful, non-harassing)
  useEffect(() => {
    const hasShownBefore = localStorage.getItem('omg_exit_popup_shown');
    if (hasShownBefore === 'true') {
      setHasShown(true);
    }
  }, []);

  // Track mouse movement to detect exit intent
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMouseY(e.clientY);
    
    // Only trigger if:
    // 1. User hasn't seen popup before
    // 2. Mouse is moving toward top of page (exit intent)
    // 3. Popup isn't already visible
    if (!hasShown && !isVisible && e.clientY <= 50) {
      setIsLeaving(true);
      // Small delay to avoid false triggers
      setTimeout(() => {
        if (isLeaving) {
          setIsVisible(true);
          localStorage.setItem('omg_exit_popup_shown', 'true');
          setHasShown(true);
        }
      }, 100);
    }
  }, [hasShown, isVisible, isLeaving]);

  // Reset leaving state when mouse moves away from top
  const handleMouseLeave = useCallback(() => {
    setIsLeaving(false);
  }, []);

  // Add event listeners
  useEffect(() => {
    if (!hasShown) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave, hasShown]);

  // Handle popup close
  const handleClose = useCallback(() => {
    setIsVisible(false);
    onClose?.();
  }, [onClose]);

  // Handle backdrop click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  // Don't render if already shown or not visible
  if (hasShown || !isVisible) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close popup"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <GiftIcon className="h-8 w-8 text-blue-600" />
          </div>

          {/* Headline */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Wait! Don't miss out on this...
          </h2>

          {/* Subheadline */}
          <p className="text-gray-600 mb-6">
            Get our <strong>free automation checklist</strong> and discover how to cut your admin time by 60% in just 30 days.
          </p>

          {/* Benefits list */}
          <div className="text-left mb-6 space-y-2">
            <div className="flex items-center text-sm text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Step-by-step automation guide
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Industry-specific templates
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              ROI calculator spreadsheet
            </div>
          </div>

          {/* CTA Button */}
          <Link
            href="/contact?source=exit-popup&offer=automation-checklist"
            className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4"
            onClick={handleClose}
          >
            Get Free Checklist
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/demo/crm"
            className="block w-full text-blue-600 py-2 px-6 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            onClick={handleClose}
          >
            Or book a demo instead
          </Link>

          {/* Trust indicator */}
          <p className="text-xs text-gray-500 mt-4">
            Join 10,000+ businesses already automating their workflows
          </p>
        </div>
      </div>
    </div>
  );
}
