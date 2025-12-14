"use client";

import React from "react";
import { useState, useEffect } from 'react';
import { XMarkIcon, EyeIcon } from '@heroicons/react/24/outline';

interface ImpersonationBannerProps {
  organizationName: string;
  onExit: () => void;
}

export function ImpersonationBanner({ organizationName, onExit }: ImpersonationBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleExit = () => {
    setIsVisible(false);
    onExit();
  };

  if (!isVisible) return null;

  return (
    <div className="bg-yellow-50 border-b border-yellow-200" role="banner" aria-label="Impersonation warning">
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <EyeIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-800">
                <span className="font-medium">Viewing as client (read-only):</span>{' '}
                You are currently viewing the portal as {organizationName}. 
                All actions are read-only and will not affect the client's data.
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleExit}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-yellow-800 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
            >
              Exit impersonation
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="ml-3 inline-flex text-yellow-400 hover:text-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 rounded"
              aria-label="Dismiss banner"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
