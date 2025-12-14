"use client";

import { useState, useEffect, useRef } from "react";
import { XMarkIcon, EnvelopeIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

interface ExitIntentEmailCaptureProps {
  onClose: () => void;
  onSubmit: (email: string) => Promise<void>;
}

export default function ExitIntentEmailCapture({ onClose, onSubmit }: ExitIntentEmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await onSubmit(email);
      setIsSubmitted(true);
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div 
          ref={modalRef}
          className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100"
        >
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Thank You!
            </h3>
            <p className="text-gray-600 mb-6">
              We've sent you a special offer. Check your email for exclusive access to our automation solutions.
            </p>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>What's next?</strong><br />
                Our team will reach out within 24 hours with personalized automation recommendations for your business.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
            <EnvelopeIcon className="h-8 w-8 text-blue-600" />
          </div>

          {/* Heading */}
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Wait! Don't Miss Out
          </h3>
          <p className="text-gray-600 mb-6">
            Get our <strong>free automation guide</strong> and discover how to save 10+ hours per week with smart workflows.
          </p>

          {/* Benefits */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h4 className="font-semibold text-gray-900 mb-2">What you'll get:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center">
                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                Free automation templates for your industry
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                Personalized automation recommendations
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                Exclusive access to our automation experts
              </li>
            </ul>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg"
                disabled={isSubmitting}
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Get My Free Guide"}
            </button>
          </form>

          {/* Trust indicators */}
          <div className="mt-4 text-xs text-gray-500">
            <p>✓ No spam, ever ✓ Unsubscribe anytime ✓ 10,000+ businesses trust us</p>
          </div>
        </div>
      </div>
    </div>
  );
}
