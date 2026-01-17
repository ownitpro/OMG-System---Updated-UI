"use client";

import { useEffect, useState } from "react";
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
  message: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, description, type = "success", duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  if (!isVisible) return null;

  const styles = {
    success: {
      bg: "bg-gradient-to-r from-[#47BD79]/95 to-[#3da86a]/95",
      border: "border-[#47BD79]/30",
      icon: <CheckCircleIcon className="w-6 h-6 text-white" />,
      shadow: "shadow-[0_8px_32px_rgba(71,189,121,0.3)]",
    },
    error: {
      bg: "bg-gradient-to-r from-red-500/95 to-red-600/95",
      border: "border-red-500/30",
      icon: <XCircleIcon className="w-6 h-6 text-white" />,
      shadow: "shadow-[0_8px_32px_rgba(239,68,68,0.3)]",
    },
    info: {
      bg: "bg-gradient-to-r from-blue-500/95 to-blue-600/95",
      border: "border-blue-500/30",
      icon: <CheckCircleIcon className="w-6 h-6 text-white" />,
      shadow: "shadow-[0_8px_32px_rgba(59,130,246,0.3)]",
    },
    warning: {
      bg: "bg-gradient-to-r from-yellow-500/95 to-yellow-600/95",
      border: "border-yellow-500/30",
      icon: <XCircleIcon className="w-6 h-6 text-white" />,
      shadow: "shadow-[0_8px_32px_rgba(234,179,8,0.3)]",
    },
  };

  const style = styles[type];

  return (
    <div
      className={`fixed top-6 right-6 z-[9999] max-w-md w-full pointer-events-auto ${
        isExiting ? "animate-slide-out-right" : "animate-slide-in-right"
      }`}
    >
      <div
        className={`${style.bg} ${style.border} ${style.shadow} backdrop-blur-xl border rounded-2xl p-5 flex items-start gap-4 transition-all duration-300 hover:scale-[1.02]`}
      >
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">{style.icon}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-base leading-tight mb-1">{message}</h3>
          {description && <p className="text-white/90 text-sm leading-relaxed">{description}</p>}
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="flex-shrink-0 text-white/70 hover:text-white transition-colors rounded-lg p-1 hover:bg-white/10"
          aria-label="Close notification"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// Toast Container Component
interface ToastContainerProps {
  toasts: Array<{
    id: string;
    message: string;
    description?: string;
    type: ToastType;
  }>;
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed top-0 right-0 z-[9999] pointer-events-none">
      <div className="flex flex-col gap-3 p-6">
        {toasts.map((toast, index) => (
          <div key={toast.id} style={{ marginTop: index > 0 ? "12px" : 0 }}>
            <Toast
              message={toast.message}
              description={toast.description}
              type={toast.type}
              onClose={() => onRemove(toast.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
