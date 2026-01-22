'use client';

import { useState } from 'react';
import { Mail, Edit2, Trash2, Power, Send } from 'lucide-react';
import type { EmailTemplate } from '@/types/email-template';

interface EmailTemplateCardProps {
  template: EmailTemplate;
  onEdit: (template: EmailTemplate) => void;
  onDelete: (template: EmailTemplate) => void;
  onToggleActive: (template: EmailTemplate) => void;
  onTestSend: (template: EmailTemplate) => void;
}

export function EmailTemplateCard({
  template,
  onEdit,
  onDelete,
  onToggleActive,
  onTestSend,
}: EmailTemplateCardProps) {
  const [isTogglingActive, setIsTogglingActive] = useState(false);

  const handleToggleActive = async () => {
    setIsTogglingActive(true);
    try {
      await onToggleActive(template);
    } finally {
      setIsTogglingActive(false);
    }
  };

  // Get badge color based on type
  const getBadgeColor = (type: string) => {
    const colors: Record<string, string> = {
      Portal: 'bg-blue-100 text-blue-700',
      Authentication: 'bg-green-100 text-green-700',
      Request: 'bg-purple-100 text-purple-700',
      Notification: 'bg-orange-100 text-orange-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Mail className="h-5 w-5 text-blue-500 flex-shrink-0" />
            <h3 className="text-lg font-semibold text-white truncate">
              {template.name}
            </h3>
          </div>
          {template.description && (
            <p className="text-sm text-white/60 line-clamp-2">
              {template.description}
            </p>
          )}
        </div>

        {/* Status indicator */}
        <div className="flex-shrink-0">
          <button
            onClick={handleToggleActive}
            disabled={isTogglingActive}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition ${
              template.isActive
                ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
                : 'bg-gray-600/20 text-gray-400 hover:bg-gray-600/30'
            } ${isTogglingActive ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={template.isActive ? 'Click to deactivate' : 'Click to activate'}
          >
            <Power className="h-3 w-3" />
            {template.isActive ? 'Active' : 'Inactive'}
          </button>
        </div>
      </div>

      {/* Type Badge */}
      <div>
        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(template.type)}`}>
          {template.type}
        </span>
      </div>

      {/* Subject Preview */}
      <div className="rounded-xl border border-white/10 bg-black/20 p-3">
        <div className="text-xs text-white/40 mb-1">Subject:</div>
        <div className="text-sm text-white font-medium truncate">
          {template.subject}
        </div>
      </div>

      {/* Variables Count */}
      {template.variables && template.variables.length > 0 && (
        <div className="flex items-center gap-2 text-xs text-white/60">
          <span>Variables:</span>
          <div className="flex flex-wrap gap-1">
            {template.variables.slice(0, 3).map((variable, idx) => (
              <code key={idx} className="px-1.5 py-0.5 bg-white/5 rounded text-blue-400">
                {`{{${variable}}}`}
              </code>
            ))}
            {template.variables.length > 3 && (
              <span className="px-1.5 py-0.5 text-white/40">
                +{template.variables.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Metadata */}
      <div className="flex items-center gap-4 text-xs text-white/40 pt-2 border-t border-white/10">
        <span>Slug: <code className="text-white/60">{template.slug}</code></span>
        <span>•</span>
        <span>Updated {new Date(template.updatedAt).toLocaleDateString()}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2">
        <button
          onClick={() => onEdit(template)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#3b82f6] text-white text-sm font-semibold hover:opacity-90 transition"
        >
          <Edit2 className="h-4 w-4" />
          Edit
        </button>
        <button
          onClick={() => onTestSend(template)}
          className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-sm font-medium hover:bg-white/10 transition"
          title="Send test email"
        >
          <Send className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(template)}
          className="px-4 py-2 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-medium hover:bg-red-500/20 transition"
          title="Delete template"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
