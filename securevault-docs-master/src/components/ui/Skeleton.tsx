'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
  className = '',
  variant = 'text',
  width,
  height,
  animation = 'pulse',
}: SkeletonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'rectangular':
        return 'rounded-lg';
      case 'text':
      default:
        return 'rounded';
    }
  };

  const getAnimationClasses = () => {
    switch (animation) {
      case 'wave':
        return 'animate-wave bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]';
      case 'pulse':
        return 'animate-pulse bg-gray-200';
      case 'none':
      default:
        return 'bg-gray-200';
    }
  };

  const style: React.CSSProperties = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
  };

  return (
    <div
      className={`${getVariantClasses()} ${getAnimationClasses()} ${className}`}
      style={style}
    >
      <style jsx>{`
        @keyframes wave {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        .animate-wave {
          animation: wave 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Portal List Skeleton
export function PortalListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <Skeleton width="60%" height={24} className="mb-2" />
              <Skeleton width="40%" height={16} />
            </div>
            <Skeleton variant="circular" width={48} height={48} />
          </div>
          <div className="flex gap-4 mt-4">
            <Skeleton width="30%" height={20} />
            <Skeleton width="25%" height={20} />
            <Skeleton width="20%" height={20} />
          </div>
        </div>
      ))}
    </div>
  );
}

// Portal Detail Skeleton
export function PortalDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <Skeleton width="40%" height={32} className="mb-2" />
        <Skeleton width="60%" height={20} />
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-6">
            <Skeleton width="50%" height={20} className="mb-3" />
            <Skeleton width="70%" height={36} />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <Skeleton width="30%" height={24} className="mb-4" />
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton variant="circular" width={40} height={40} />
              <div className="flex-1">
                <Skeleton width="70%" height={20} className="mb-2" />
                <Skeleton width="40%" height={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Request List Skeleton
export function RequestListSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3 flex-1">
              <Skeleton variant="circular" width={40} height={40} />
              <div className="flex-1">
                <Skeleton width="60%" height={20} className="mb-2" />
                <Skeleton width="40%" height={16} />
              </div>
            </div>
            <Skeleton width={80} height={32} />
          </div>
          <Skeleton width="100%" height={8} className="rounded-full" />
        </div>
      ))}
    </div>
  );
}

// Upload Skeleton
export function UploadSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <Skeleton width="50%" height={24} className="mb-4" />
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-12">
        <div className="flex flex-col items-center">
          <Skeleton variant="circular" width={64} height={64} className="mb-4" />
          <Skeleton width="60%" height={20} className="mb-2" />
          <Skeleton width="40%" height={16} />
        </div>
      </div>
    </div>
  );
}

// Settings Form Skeleton
export function SettingsFormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
        <Skeleton width="40%" height={24} className="mb-4" />

        {/* Form fields */}
        {[...Array(4)].map((_, i) => (
          <div key={i}>
            <Skeleton width="30%" height={16} className="mb-2" />
            <Skeleton width="100%" height={40} />
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex justify-between">
        <Skeleton width={120} height={40} />
        <div className="flex gap-3">
          <Skeleton width={100} height={40} />
          <Skeleton width={120} height={40} />
        </div>
      </div>
    </div>
  );
}

// Table Skeleton
export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {[...Array(columns)].map((_, i) => (
            <Skeleton key={i} width="80%" height={20} />
          ))}
        </div>
      </div>

      {/* Rows */}
      {[...Array(rows)].map((_, rowIdx) => (
        <div key={rowIdx} className="border-b border-gray-200 p-4 last:border-b-0">
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {[...Array(columns)].map((_, colIdx) => (
              <Skeleton key={colIdx} width="90%" height={16} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Card Skeleton
export function CardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-start gap-4 mb-4">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1">
          <Skeleton width="70%" height={20} className="mb-2" />
          <Skeleton width="50%" height={16} />
        </div>
      </div>
      <Skeleton width="100%" height={12} className="mb-2" />
      <Skeleton width="80%" height={12} className="mb-2" />
      <Skeleton width="60%" height={12} />
    </div>
  );
}

// Analytics Chart Skeleton
export function ChartSkeleton({ height = 300 }: { height?: number }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <Skeleton width="40%" height={24} className="mb-6" />
      <div className="flex items-end justify-between gap-2" style={{ height: `${height}px` }}>
        {[...Array(8)].map((_, i) => (
          <Skeleton
            key={i}
            width="100%"
            height={`${Math.random() * 80 + 20}%`}
            variant="rectangular"
          />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} width={40} height={12} />
        ))}
      </div>
    </div>
  );
}

export default Skeleton;
