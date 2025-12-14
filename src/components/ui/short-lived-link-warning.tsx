"use client";

import React from "react";
import { useState, useEffect } from 'react';
import { ExclamationTriangleIcon, ClockIcon } from '@heroicons/react/24/outline';

interface ShortLivedLinkWarningProps {
  expiresAt: Date;
  onExpire?: () => void;
}

export function ShortLivedLinkWarning({ expiresAt, onExpire }: ShortLivedLinkWarningProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = new Date().getTime();
      const expiry = expiresAt.getTime();
      const difference = expiry - now;

      if (difference <= 0) {
        setTimeLeft(0);
        setIsExpired(true);
        onExpire?.();
      } else {
        setTimeLeft(difference);
      }
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);

  const formatTimeLeft = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getWarningLevel = () => {
    if (isExpired) return 'expired';
    if (timeLeft < 60000) return 'critical'; // Less than 1 minute
    if (timeLeft < 300000) return 'warning'; // Less than 5 minutes
    return 'info';
  };

  const warningLevel = getWarningLevel();

  if (warningLevel === 'info') return null;

  const getStyles = () => {
    switch (warningLevel) {
      case 'expired':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
          icon: 'text-red-500'
        };
      case 'critical':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
          icon: 'text-red-500'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-800',
          icon: 'text-yellow-500'
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-800',
          icon: 'text-blue-500'
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={`${styles.bg} ${styles.border} border rounded-md p-4 mb-4`} role="alert">
      <div className="flex">
        <div className="flex-shrink-0">
          {isExpired ? (
            <ExclamationTriangleIcon className={`h-5 w-5 ${styles.icon}`} aria-hidden="true" />
          ) : (
            <ClockIcon className={`h-5 w-5 ${styles.icon}`} aria-hidden="true" />
          )}
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${styles.text}`}>
            {isExpired ? 'Link Expired' : 'Link Expires Soon'}
          </h3>
          <div className={`mt-2 text-sm ${styles.text}`}>
            {isExpired ? (
              <p>This link has expired for your security. Please request a new link.</p>
            ) : (
              <p>
                This link expires in <strong>{formatTimeLeft(timeLeft)}</strong> for your security.
                Please complete your action soon.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
