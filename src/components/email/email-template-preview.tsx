"use client";

import React, { useState } from "react";
import { XMarkIcon, EyeIcon, DevicePhoneMobileIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { EmailTemplate } from "@/content/email-drips";

interface EmailTemplatePreviewProps {
  template: EmailTemplate;
  isOpen: boolean;
  onClose: () => void;
}

export function EmailTemplatePreview({ template, isOpen, onClose }: EmailTemplatePreviewProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Email Template Preview</h2>
            <p className="text-gray-600 text-sm mt-1">{template.subject}</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('desktop')}
                className={`flex items-center px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                  viewMode === 'desktop'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <ComputerDesktopIcon className="h-4 w-4 mr-1" />
                Desktop
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`flex items-center px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                  viewMode === 'mobile'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <DevicePhoneMobileIcon className="h-4 w-4 mr-1" />
                Mobile
              </button>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className={`mx-auto ${viewMode === 'mobile' ? 'max-w-sm' : 'max-w-2xl'}`}>
            {/* Email Header */}
            <div className="bg-gray-100 p-4 rounded-t-lg">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div>
                  <p><strong>From:</strong> OMGsystems &lt;noreply@omgsystems.com&gt;</p>
                  <p><strong>To:</strong> {`{{firstName}} <{{email}}>`}</p>
                  <p><strong>Subject:</strong> {template.subject}</p>
                </div>
                <div className="text-right">
                  <p>Today at 2:30 PM</p>
                  <p className="text-xs text-gray-500">View in browser</p>
                </div>
              </div>
            </div>

            {/* Email Body */}
            <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg">
              {/* Preheader */}
              <div className="bg-gray-50 px-4 py-2 text-sm text-gray-600 border-b border-gray-200">
                {template.preheader}
              </div>

              {/* Email Content */}
              <div className="p-6">
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: template.content.replace(/\{\{(\w+)\}\}/g, '<span class="bg-yellow-100 px-1 rounded">$1</span>')
                  }}
                  className="prose prose-sm max-w-none"
                />
              </div>

              {/* CTA Button */}
              <div className="px-6 pb-6">
                <a
                  href={template.ctaUrl}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  {template.ctaText}
                </a>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="text-center text-sm text-gray-600">
                  <p>OMGsystems - Business Automation Solutions</p>
                  <p>123 Main St, Toronto, ON M1M 1M1, Canada</p>
                  <div className="mt-2 space-x-4">
                    <a href="#" className="text-blue-600 hover:text-blue-700">Unsubscribe</a>
                    <a href="#" className="text-blue-600 hover:text-blue-700">Update Preferences</a>
                    <a href="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <p><strong>Template ID:</strong> {template.id}</p>
              <p><strong>Type:</strong> {template.type} • <strong>Priority:</strong> {template.priority}</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                Edit Template
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors duration-200">
                Send Test Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
