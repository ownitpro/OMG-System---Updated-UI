// src/components/marketing/contact/ContactSalesStory.tsx
// Story-driven visual narrative component

"use client";

import * as React from "react";
import { useTheme } from "@/contexts/ThemeContext";

export function ContactSalesStory() {
  const { isDarkMode } = useTheme();

  const cardClasses = isDarkMode
    ? 'border-slate-700 bg-slate-800/50'
    : 'border-gray-200 bg-white';

  const labelClasses = isDarkMode ? 'text-teal-400' : 'text-teal-600';
  const titleClasses = isDarkMode ? 'text-white' : 'text-gray-900';
  const descClasses = isDarkMode ? 'text-slate-400' : 'text-gray-600';

  return (
    <div className="space-y-3">
      <div className={`rounded-2xl border p-4 ${cardClasses}`}>
        <div className={`text-sm font-medium ${labelClasses}`}>Preview</div>
        <div className={`mt-2 text-base font-medium ${titleClasses}`}>Client Portal → Request → Upload → Approve</div>
        <div className={`mt-2 text-sm ${descClasses}`}>See how a client gets an invite, uploads files, and how your team reviews them.</div>
      </div>

      <div className={`rounded-2xl border p-4 ${cardClasses}`}>
        <div className={`text-sm font-medium ${labelClasses}`}>OCR & Organize</div>
        <div className={`mt-2 text-base font-medium ${titleClasses}`}>Auto‑read receipts and statements</div>
        <div className={`mt-2 text-sm ${descClasses}`}>We extract key details and file them to the right folders. You can adjust in seconds.</div>
      </div>

      <div className={`rounded-2xl border p-4 ${cardClasses}`}>
        <div className={`text-sm font-medium ${labelClasses}`}>Secure Sharing</div>
        <div className={`mt-2 text-base font-medium ${titleClasses}`}>PIN, expiry, and watermarks</div>
        <div className={`mt-2 text-sm ${descClasses}`}>Share safely with clients and partners without losing control.</div>
      </div>
    </div>
  );
}

