'use client';

import React from 'react';
import { Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react';

interface UploadProgressProps {
  fileName: string;
  progress: number; // 0-100
  status: 'uploading' | 'processing' | 'success' | 'error';
  error?: string;
  onCancel?: () => void;
  onRetry?: () => void;
}

export default function UploadProgress({
  fileName,
  progress,
  status,
  error,
  onCancel,
  onRetry,
}: UploadProgressProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'bg-green-600';
      case 'error':
        return 'bg-red-600';
      default:
        return 'bg-blue-600';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'uploading':
      case 'processing':
        return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'uploading':
        return `Uploading... ${Math.round(progress)}%`;
      case 'processing':
        return 'Processing...';
      case 'success':
        return 'Upload complete!';
      case 'error':
        return error || 'Upload failed';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-start gap-3">
        {/* Status Icon */}
        <div className="flex-shrink-0 mt-0.5">{getStatusIcon()}</div>

        {/* File Info and Progress */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{fileName}</p>
              <p className="text-xs text-gray-600 mt-0.5">{getStatusText()}</p>
            </div>

            {/* Cancel/Retry buttons */}
            {status === 'uploading' && onCancel && (
              <button
                onClick={onCancel}
                className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                title="Cancel upload"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {status === 'error' && onRetry && (
              <button
                onClick={onRetry}
                className="flex-shrink-0 text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                Retry
              </button>
            )}
          </div>

          {/* Progress Bar */}
          {status !== 'error' && (
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all duration-300 ease-out ${getStatusColor()}`}
                style={{ width: `${progress}%` }}
              >
                {/* Animated stripe effect for uploading state */}
                {status === 'uploading' && (
                  <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                )}
              </div>
            </div>
          )}

          {/* Error message */}
          {status === 'error' && error && (
            <div className="mt-2 text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
              {error}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
