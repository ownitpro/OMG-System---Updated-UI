'use client';

import { useState, useMemo } from 'react';
import { Monitor, Smartphone } from 'lucide-react';

interface TemplatePreviewPaneProps {
  htmlContent: string;
  sampleData: Record<string, string>;
  subject?: string;
}

export function TemplatePreviewPane({
  htmlContent,
  sampleData,
  subject,
}: TemplatePreviewPaneProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  // Replace variables in template
  const replaceVariables = (text: string): string => {
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return sampleData[key] || match; // Keep placeholder if data missing
    });
  };

  // Process the HTML content
  const processedHtml = useMemo(() => {
    return replaceVariables(htmlContent);
  }, [htmlContent, sampleData]);

  const processedSubject = useMemo(() => {
    return subject ? replaceVariables(subject) : '';
  }, [subject, sampleData]);

  // Width based on view mode
  const containerWidth = viewMode === 'desktop' ? 'w-full' : 'w-96';

  return (
    <div className="space-y-4">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Preview</h3>
        <div className="flex items-center gap-2 p-1 bg-white/5 rounded-lg">
          <button
            onClick={() => setViewMode('desktop')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm transition ${
              viewMode === 'desktop'
                ? 'bg-blue-600 text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Monitor className="h-4 w-4" />
            Desktop
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm transition ${
              viewMode === 'mobile'
                ? 'bg-blue-600 text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Smartphone className="h-4 w-4" />
            Mobile
          </button>
        </div>
      </div>

      {/* Subject Preview */}
      {processedSubject && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="text-xs text-white/40 mb-1">Subject:</div>
          <div className="text-sm text-white font-medium">{processedSubject}</div>
        </div>
      )}

      {/* Email Preview */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 overflow-x-auto">
        <div className={`mx-auto transition-all ${containerWidth}`}>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Render HTML in iframe for isolation */}
            <iframe
              srcDoc={processedHtml}
              className="w-full border-0"
              style={{ minHeight: '400px', height: 'auto' }}
              sandbox="allow-same-origin"
              title="Email Preview"
              onLoad={(e) => {
                // Auto-adjust iframe height to content
                const iframe = e.target as HTMLIFrameElement;
                if (iframe.contentWindow) {
                  try {
                    const height = iframe.contentWindow.document.body.scrollHeight;
                    iframe.style.height = `${height + 20}px`;
                  } catch (err) {
                    // Ignore cross-origin errors
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Warning for missing variables */}
      {(() => {
        const variablesInTemplate = htmlContent.match(/\{\{(\w+)\}\}/g) || [];
        const missingVariables = variablesInTemplate.filter(v => {
          const key = v.replace(/[{}]/g, '');
          return !sampleData[key];
        });

        if (missingVariables.length > 0) {
          return (
            <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-3">
              <div className="text-xs text-orange-400 font-medium mb-1">
                Missing sample data:
              </div>
              <div className="flex flex-wrap gap-1">
                {Array.from(new Set(missingVariables)).map((variable, idx) => (
                  <code key={idx} className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-300 rounded">
                    {variable}
                  </code>
                ))}
              </div>
            </div>
          );
        }
        return null;
      })()}
    </div>
  );
}
