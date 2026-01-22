// src/components/install/InstallModal.tsx
// Install modal (Desktop + PWA only, no iOS/Android)

'use client';

import React from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function InstallModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Install SecureVault Docs</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 transition"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2 text-gray-900">Desktop App</h3>
            <p className="text-sm text-gray-600 mb-3">
              Download the native app for Windows, Mac, or Linux.
            </p>
            <a
              href="https://securevaultdocs.com/download"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:opacity-90 transition"
            >
              Download Desktop App
            </a>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-semibold mb-2 text-gray-900">PWA (Progressive Web App)</h3>
            <p className="text-sm text-gray-600 mb-3">
              Install SecureVault Docs as a PWA for quick access from your device.
            </p>
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                <strong>Chrome/Edge:</strong> Click the install icon in the address bar, or use the browser menu.
              </p>
              <p>
                <strong>Safari:</strong> Use Share → Add to Home Screen.
              </p>
              <p>
                <strong>Firefox:</strong> Use the menu → Install.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition text-gray-900"
        >
          Close
        </button>
      </div>
    </div>
  );
}

