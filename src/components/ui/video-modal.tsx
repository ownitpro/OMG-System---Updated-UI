"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  title?: string;
}

export function VideoModal({ isOpen, onClose, videoSrc, title }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Memoize onClose to avoid effect re-runs
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent scroll
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose]);

  // Pause video when modal closes
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
      onClick={handleClose}
    >
      {/* Backdrop with blur and gradient overlay */}
      <div
        className="absolute inset-0 backdrop-blur-md"
        style={{
          background: "linear-gradient(135deg, rgba(0, 84, 104, 0.85) 0%, rgba(0, 0, 0, 0.9) 50%, rgba(20, 184, 166, 0.3) 100%)"
        }}
      />

      {/* Modal Content - Glassmorphism Card */}
      <div
        className="relative z-10 w-full max-w-5xl animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glassmorphism Container */}
        <div
          className="rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1) inset"
          }}
        >
          {/* Header with Title and Close Button */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            {/* Title with Icon */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)"
                }}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              {title && (
                <h3 className="text-white text-lg sm:text-xl font-semibold font-outfit tracking-tight">{title}</h3>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 group"
              aria-label="Close video"
            >
              <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Video Player */}
          <div className="relative bg-black">
            <video
              ref={videoRef}
              src={videoSrc}
              controls
              autoPlay
              className="w-full aspect-video"
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Footer with CTA and Close Hint */}
          <div className="px-6 py-5 border-t border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Close Hint */}
              <p className="text-white/50 text-sm font-outfit order-2 sm:order-1">
                Press <kbd className="px-2 py-0.5 rounded bg-white/10 text-white/70 font-mono text-xs">ESC</kbd> or click outside to close
              </p>

              {/* CTA Button */}
              <Link
                href="https://omgsystem.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 order-1 sm:order-2"
                style={{
                  background: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)"
                }}
                onClick={handleClose}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="font-outfit">Access SecureVault Docs</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Glow Effects */}
        <div
          className="absolute -top-20 -left-20 w-40 h-40 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ background: "#14b8a6" }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: "#0891b2" }}
        />
      </div>
    </div>
  );
}
