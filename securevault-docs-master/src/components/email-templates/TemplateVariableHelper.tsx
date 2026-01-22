'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { EMAIL_TEMPLATE_VARIABLES } from '@/types/email-template';

interface TemplateVariableHelperProps {
  selectedVariables?: string[];
  onVariableSelect?: (variables: string[]) => void;
  onVariableInsert?: (variable: string) => void;
  mode?: 'select' | 'insert';
}

export function TemplateVariableHelper({
  selectedVariables = [],
  onVariableSelect,
  onVariableInsert,
  mode = 'insert',
}: TemplateVariableHelperProps) {
  const [copiedVariable, setCopiedVariable] = useState<string | null>(null);

  const handleVariableClick = async (variableName: string) => {
    if (mode === 'select' && onVariableSelect) {
      // Toggle selection
      const newSelection = selectedVariables.includes(variableName)
        ? selectedVariables.filter(v => v !== variableName)
        : [...selectedVariables, variableName];
      onVariableSelect(newSelection);
    } else if (mode === 'insert') {
      // Copy to clipboard
      const variableText = `{{${variableName}}}`;
      try {
        await navigator.clipboard.writeText(variableText);
        setCopiedVariable(variableName);
        setTimeout(() => setCopiedVariable(null), 2000);

        // Also call insert callback if provided
        if (onVariableInsert) {
          onVariableInsert(variableText);
        }
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Available Variables</h3>
        <div className="text-xs text-white/40">
          {mode === 'select' ? 'Click to select/deselect' : 'Click to copy'}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-96 overflow-y-auto pr-2">
        {Object.entries(EMAIL_TEMPLATE_VARIABLES).map(([key, info]) => {
          const isSelected = selectedVariables.includes(key);
          const isCopied = copiedVariable === key;

          return (
            <button
              key={key}
              onClick={() => handleVariableClick(key)}
              className={`text-left p-3 rounded-xl border transition ${
                mode === 'select' && isSelected
                  ? 'border-blue-500 bg-blue-500/20'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <code className="text-sm font-mono text-blue-400 break-all">
                  {`{{${key}}}`}
                </code>
                {isCopied ? (
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                ) : (
                  <Copy className="h-4 w-4 text-white/40 flex-shrink-0" />
                )}
              </div>
              <div className="text-xs font-medium text-white/80 mb-0.5">
                {info.label}
              </div>
              <div className="text-xs text-white/50 line-clamp-2">
                {info.description}
              </div>
              {info.example && (
                <div className="text-xs text-white/30 mt-1 italic">
                  e.g., {info.example}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {mode === 'select' && selectedVariables.length > 0 && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="text-xs text-white/60 mb-2">
            Selected ({selectedVariables.length}):
          </div>
          <div className="flex flex-wrap gap-1">
            {selectedVariables.map(variable => (
              <code key={variable} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                {`{{${variable}}}`}
              </code>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
