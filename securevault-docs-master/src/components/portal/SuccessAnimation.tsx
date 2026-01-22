'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, PartyPopper, Sparkles } from 'lucide-react';

interface SuccessAnimationProps {
  message: string;
  onComplete?: () => void;
  autoHide?: boolean;
  duration?: number;
}

export default function SuccessAnimation({
  message,
  onComplete,
  autoHide = true,
  duration = 3000
}: SuccessAnimationProps) {
  const [show, setShow] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setShow(true), 10);

    if (autoHide) {
      // Start exit animation before hiding
      const exitTimer = setTimeout(() => {
        setAnimateOut(true);
      }, duration - 300);

      // Hide component
      const hideTimer = setTimeout(() => {
        onComplete?.();
      }, duration);

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [autoHide, duration, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
        show && !animateOut ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Confetti effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full animate-confetti ${
              show ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: '-10%',
              backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][
                Math.floor(Math.random() * 5)
              ],
              animationDelay: `${Math.random() * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Success card */}
      <div
        className={`bg-white rounded-2xl shadow-2xl p-8 max-w-sm mx-4 transform transition-all duration-500 ${
          show && !animateOut
            ? 'scale-100 translate-y-0'
            : 'scale-75 translate-y-8'
        }`}
      >
        {/* Animated checkmark */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div
              className={`absolute inset-0 bg-green-100 rounded-full animate-ping ${
                show ? 'opacity-75' : 'opacity-0'
              }`}
              style={{ animationDuration: '1s', animationIterationCount: '2' }}
            />
            <div
              className={`relative w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center transform transition-transform duration-700 ${
                show ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
              }`}
            >
              <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Success!</h3>
          <p className="text-gray-600">{message}</p>
        </div>

        {/* Sparkle effects */}
        <div className="flex justify-center gap-4 mt-6">
          {[...Array(3)].map((_, i) => (
            <Sparkles
              key={i}
              className={`w-5 h-5 text-yellow-400 transform transition-all duration-1000 ${
                show ? 'scale-100 rotate-180 opacity-100' : 'scale-0 rotate-0 opacity-0'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
      `}</style>
    </div>
  );
}
