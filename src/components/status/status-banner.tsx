"use client";

import React, { useState, useEffect } from "react";
import { 
  ExclamationTriangleIcon, 
  InformationCircleIcon, 
  XCircleIcon, 
  CheckCircleIcon,
  XMarkIcon 
} from "@heroicons/react/24/outline";

export type StatusSeverity = 'info' | 'warning' | 'error' | 'success';

interface StatusBannerProps {
  severity: StatusSeverity;
  title: string;
  message: string;
  link?: {
    text: string;
    href: string;
  };
  dismissible?: boolean;
  onDismiss?: () => void;
}

const severityConfig = {
  info: {
    icon: InformationCircleIcon,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-400',
    titleColor: 'text-blue-800',
    messageColor: 'text-blue-700',
  },
  warning: {
    icon: ExclamationTriangleIcon,
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    iconColor: 'text-yellow-400',
    titleColor: 'text-yellow-800',
    messageColor: 'text-yellow-700',
  },
  error: {
    icon: XCircleIcon,
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    iconColor: 'text-red-400',
    titleColor: 'text-red-800',
    messageColor: 'text-red-700',
  },
  success: {
    icon: CheckCircleIcon,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    iconColor: 'text-green-400',
    titleColor: 'text-green-800',
    messageColor: 'text-green-700',
  },
};

export function StatusBanner({
  severity,
  title,
  message,
  link,
  dismissible = true,
  onDismiss
}: StatusBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const config = severityConfig[severity];
  const Icon = config.icon;

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  // Auto-dismiss info and success banners after 10 seconds
  useEffect(() => {
    if ((severity === 'info' || severity === 'success') && dismissible) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [severity, dismissible]);

  if (!isVisible) return null;

  return (
    <div className={`${config.bgColor} ${config.borderColor} border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center">
            <Icon className={`h-5 w-5 ${config.iconColor} mr-3`} />
            <div className="flex-1">
              <h3 className={`text-sm font-medium ${config.titleColor}`}>
                {title}
              </h3>
              <p className={`text-sm ${config.messageColor} mt-1`}>
                {message}
                {link && (
                  <a
                    href={link.href}
                    className={`ml-1 underline hover:no-underline ${config.messageColor}`}
                  >
                    {link.text}
                  </a>
                )}
              </p>
            </div>
          </div>
          
          {dismissible && (
            <button
              onClick={handleDismiss}
              className={`ml-4 ${config.iconColor} hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md`}
              aria-label="Dismiss banner"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Predefined status banners for common scenarios
export function MaintenanceBanner() {
  return (
    <StatusBanner
      severity="warning"
      title="Scheduled Maintenance"
      message="We're performing scheduled maintenance. Some features may be temporarily unavailable."
      link={{
        text: "View status page",
        href: "/status"
      }}
    />
  );
}

export function IncidentBanner() {
  return (
    <StatusBanner
      severity="error"
      title="Service Disruption"
      message="We're experiencing technical difficulties. Our team is working to resolve the issue."
      link={{
        text: "Get updates",
        href: "/trust"
      }}
    />
  );
}

export function RollbackBanner() {
  return (
    <StatusBanner
      severity="warning"
      title="Rolling Back Update"
      message="We're rolling back to the previous version. No action needed from you."
      link={{
        text: "Learn more",
        href: "/trust"
      }}
    />
  );
}

export function LaunchBanner() {
  return (
    <StatusBanner
      severity="info"
      title="New Features Available"
      message="We've just launched new features and improvements. Check them out!"
      link={{
        text: "See what's new",
        href: "/about"
      }}
    />
  );
}

// Hook for managing status banner state
export function useStatusBanner() {
  const [banner, setBanner] = useState<{
    severity: StatusSeverity;
    title: string;
    message: string;
    link?: { text: string; href: string };
  } | null>(null);

  const showBanner = (config: {
    severity: StatusSeverity;
    title: string;
    message: string;
    link?: { text: string; href: string };
  }) => {
    setBanner(config);
  };

  const hideBanner = () => {
    setBanner(null);
  };

  const showMaintenance = () => {
    setBanner({
      severity: 'warning',
      title: 'Scheduled Maintenance',
      message: 'We\'re performing scheduled maintenance. Some features may be temporarily unavailable.',
      link: { text: 'View status page', href: '/status' }
    });
  };

  const showIncident = () => {
    setBanner({
      severity: 'error',
      title: 'Service Disruption',
      message: 'We\'re experiencing technical difficulties. Our team is working to resolve the issue.',
      link: { text: 'Get updates', href: '/trust' }
    });
  };

  const showRollback = () => {
    setBanner({
      severity: 'warning',
      title: 'Rolling Back Update',
      message: 'We\'re rolling back to the previous version. No action needed from you.',
      link: { text: 'Learn more', href: '/trust' }
    });
  };

  return {
    banner,
    showBanner,
    hideBanner,
    showMaintenance,
    showIncident,
    showRollback,
  };
}
