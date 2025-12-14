"use client";

import React from "react";
import { useState, useEffect, useCallback } from 'react';
import { XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

function ToastComponent({ toast, onRemove }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        handleRemove();
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.duration]);

  const handleRemove = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => onRemove(toast.id), 300);
  }, [toast.id, onRemove]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'error':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <InformationCircleIcon className="h-5 w-5 text-blue-500" />;
      default:
        return <InformationCircleIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div
      className={`max-w-sm w-full ${getBackgroundColor()} border rounded-lg shadow-lg pointer-events-auto transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
      }`}
      role="alert"
      aria-live="polite"
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {toast.title}
            </p>
            {toast.message && (
              <p className="mt-1 text-sm text-gray-500">
                {toast.message}
              </p>
            )}
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded"
              onClick={handleRemove}
              aria-label="Close notification"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Toast Container
export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Listen for toast events
  useEffect(() => {
    const handleToast = (event: CustomEvent<Toast>) => {
      setToasts(prev => [...prev, event.detail]);
    };

    window.addEventListener('toast', handleToast as EventListener);
    return () => window.removeEventListener('toast', handleToast as EventListener);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="assertive"
      className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50"
    >
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        {toasts.map((toast) => (
          <ToastComponent
            key={toast.id}
            toast={toast}
            onRemove={removeToast}
          />
        ))}
      </div>
    </div>
  );
}

// Toast utility functions
export const toast = {
  success: (title: string, message?: string, duration = 5000) => {
    showToast({ type: 'success', title, message, duration });
  },
  error: (title: string, message?: string, duration = 7000) => {
    showToast({ type: 'error', title, message, duration });
  },
  warning: (title: string, message?: string, duration = 6000) => {
    showToast({ type: 'warning', title, message, duration });
  },
  info: (title: string, message?: string, duration = 5000) => {
    showToast({ type: 'info', title, message, duration });
  },
};

function showToast(toastData: Omit<Toast, 'id'>) {
  const id = Math.random().toString(36).substr(2, 9);
  const event = new CustomEvent('toast', {
    detail: { ...toastData, id }
  });
  window.dispatchEvent(event);
}

// Standardized system messages
export const systemMessages = {
  saved: () => toast.success('Saved', 'Your changes have been saved successfully.'),
  saveError: () => toast.error('Save Failed', 'We couldn\'t save that. Try again or contact support.'),
  deleted: () => toast.success('Deleted', 'The item has been deleted successfully.'),
  deleteError: () => toast.error('Delete Failed', 'We couldn\'t delete that. Try again or contact support.'),
  loading: () => toast.info('Loading', 'Please wait while we process your request.'),
  unauthorized: () => toast.error('Unauthorized', 'You don\'t have permission to perform this action.'),
  notFound: () => toast.error('Not Found', 'The requested resource could not be found.'),
  networkError: () => toast.error('Network Error', 'Please check your connection and try again.'),
};
