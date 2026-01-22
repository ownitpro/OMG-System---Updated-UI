'use client';

import React, { useState, useEffect } from 'react';
import { X, Shield, Calendar, Download, FileText, Folder } from 'lucide-react';
import DocumentPicker from './DocumentPicker';
import DateTimePicker from '../shared/DateTimePicker';
import { useTheme } from '@/contexts/ThemeContext';

interface Document {
  id: string;
  name: string;
  type: string;
  sizeBytes: number;
  folderId?: string | null;
}

interface CreateShareLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateShare: (shareData: {
    label: string;
    expiresAt: string;
    pin?: string;
    allowDownload: boolean;
    documentIds: string[];
  }) => Promise<void>;
  organizationId?: string;
  personalVaultId?: string;
}

export default function CreateShareLinkModal({
  isOpen,
  onClose,
  onCreateShare,
  organizationId,
  personalVaultId,
}: CreateShareLinkModalProps) {
  const { isDarkMode } = useTheme();
  const [label, setLabel] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [pin, setPin] = useState('');
  const [allowDownload, setAllowDownload] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedDocIds, setSelectedDocIds] = useState<Set<string>>(new Set());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!label.trim()) {
      setError('Please enter a label for this share link');
      return;
    }

    if (!expiresAt) {
      setError('Please select an expiration date');
      return;
    }

    // Validate expiration date is in the future
    const expDate = new Date(expiresAt);
    if (expDate <= new Date()) {
      setError('Expiration date must be in the future');
      return;
    }

    if (selectedDocIds.size === 0) {
      setError('Please select at least one document to share');
      return;
    }

    try {
      setLoading(true);
      await onCreateShare({
        label: label.trim(),
        expiresAt,
        pin: pin.trim() || undefined,
        allowDownload,
        documentIds: Array.from(selectedDocIds),
      });
      handleClose();
    } catch (err) {
      setError('Failed to create share link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setLabel('');
    setExpiresAt('');
    setPin('');
    setAllowDownload(true);
    setSelectedDocIds(new Set());
    setError('');
    onClose();
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[9999] p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-slideUp bg-gradient-to-br from-teal-600 to-teal-500 my-8">
        {/* Header with gradient */}
        <div className="relative px-6 py-5 bg-white/10 backdrop-blur-sm border-b border-white/20">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white font-display">Create Share Link</h2>
            <button
              onClick={handleClose}
              className="p-2 rounded-xl transition-colors hover:bg-white/10 text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 sm:p-8 space-y-6 bg-white/95 backdrop-blur-sm max-h-[calc(85vh-80px)] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="border rounded-xl p-4 bg-red-50 border-red-200">
                <p className="text-sm font-bold text-red-700">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-base font-bold mb-2 text-slate-900">
                Label <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g., Q4 Financial Reports"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all font-medium"
                disabled={loading}
              />
              <p className="text-sm mt-2 text-slate-600 font-medium">
                A descriptive name for this share link
              </p>
            </div>

            <div>
              <label className="block text-base font-bold mb-2 text-slate-900">
                <FileText className="w-5 h-5 inline mr-1" />
                Select Documents <span className="text-red-500">*</span> ({selectedDocIds.size} selected)
              </label>
              <DocumentPicker
                organizationId={organizationId}
                personalVaultId={personalVaultId}
                selectedDocIds={selectedDocIds}
                onSelectionChange={setSelectedDocIds}
              />
              <p className="text-sm mt-2 text-slate-600 font-medium">
                Browse folders or search to find documents to share
              </p>
            </div>

            <div className="p-5 border rounded-2xl transition-colors bg-white/40 backdrop-blur-sm border-white/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-orange-500/20 backdrop-blur-sm">
                  <Calendar className="w-5 h-5 text-orange-600" />
                </div>
                <label className="text-base font-bold text-slate-900">
                  Expiration Date <span className="text-red-500">*</span>
                </label>
              </div>
              <p className="text-sm mb-3 text-slate-600 font-medium">
                The link will expire after this date and time
              </p>
              <DateTimePicker
                value={expiresAt}
                onChange={setExpiresAt}
                min={new Date().toISOString().slice(0, 16)}
                disabled={loading}
                placeholder="Select expiration date and time"
              />
            </div>

            <div className="p-5 border rounded-2xl transition-colors bg-white/40 backdrop-blur-sm border-white/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-purple-500/20 backdrop-blur-sm">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <label className="text-base font-bold text-slate-900">
                  PIN (Optional)
                </label>
              </div>
              <p className="text-sm mb-3 text-slate-600 font-medium">
                Add extra security by requiring a PIN to access the link
              </p>
              <input
                type="text"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter a 4-6 digit PIN"
                maxLength={6}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all font-medium"
                disabled={loading}
              />
            </div>

            <div className="p-5 border rounded-2xl transition-colors bg-white/40 backdrop-blur-sm border-white/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20 backdrop-blur-sm">
                    <Download className="w-5 h-5 text-blue-600" />
                  </div>
                  <label htmlFor="allowDownload" className="text-base font-bold text-slate-900">
                    Allow downloads
                  </label>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="allowDownload"
                    checked={allowDownload}
                    onChange={(e) => setAllowDownload(e.target.checked)}
                    className="sr-only peer"
                    disabled={loading}
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-3 rounded-xl transition-colors bg-white hover:bg-slate-50 text-slate-700 font-bold border-2 border-slate-200"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-400 text-white rounded-xl hover:from-teal-600 hover:to-teal-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-teal-500/25 transition-all font-bold"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  'Create Link'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
