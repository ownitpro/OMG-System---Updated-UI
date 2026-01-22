'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DateTimePicker from '@/components/shared/DateTimePicker';
import ConfirmModal from '@/components/shared/ConfirmModal';
import {
  ArrowLeft,
  Save,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Lock,
  Calendar,
  Mail,
  FileText,
  Clock,
  CheckCircle,
  Download,
  Eye,
  EyeOff
} from 'lucide-react';

type Message = {
  type: 'success' | 'error';
  text: string;
};

export default function PortalSettingsPage() {
  const params = useParams();
  const router = useRouter();
  const portalId = params.portalId as string;

  // Form state
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [description, setDescription] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [expiresAt, setExpiresAt] = useState('');

  // UI state
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  // Requests state
  const [requests, setRequests] = useState<any[]>([]);
  const [deletingRequest, setDeletingRequest] = useState<string | null>(null);

  // Delete confirmation modal state
  const [showDeletePortalModal, setShowDeletePortalModal] = useState(false);
  const [showDeleteRequestModal, setShowDeleteRequestModal] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadPortalData(portalId);
  }, [portalId]);

  const loadPortalData = async (pid: string) => {
    try {
      setLoading(true);

      // Fetch portal data
      const res = await fetch(`/api/portals/${pid}`);
      if (res.ok) {
        const data = await res.json();
        const portal = data.portal;

        setClientName(portal.clientName || '');
        setClientEmail(portal.clientEmail || '');
        setDescription(portal.description || '');
        setPin(''); // Don't show existing PIN for security
        setExpiresAt(portal.expiresAt ? new Date(portal.expiresAt).toISOString().slice(0, 16) : '');
      } else {
        showMessage('error', 'Failed to load portal data');
      }

      // Fetch requests for this portal
      const reqRes = await fetch(`/api/org/requests?portalId=${pid}`);
      if (reqRes.ok) {
        const reqData = await reqRes.json();
        setRequests(reqData.requests || []);
      }
    } catch (err) {
      console.error('Error loading portal:', err);
      showMessage('error', 'An error occurred while loading portal data');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleSave = async () => {
    if (!clientName.trim()) {
      showMessage('error', 'Client name is required');
      return;
    }

    if (!clientEmail.trim()) {
      showMessage('error', 'Client email is required');
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(`/api/portals/${portalId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          clientEmail,
          pin: pin || undefined, // Only update if provided
          expiresAt: expiresAt || undefined,
          description,
        }),
      });

      if (res.ok) {
        showMessage('success', 'Portal settings saved successfully');
        // Reload to get updated data
        loadPortalData(portalId);
        setPin(''); // Clear PIN field after save
      } else {
        const data = await res.json();
        showMessage('error', data.error || 'Failed to save portal settings');
      }
    } catch (err) {
      console.error('Error saving:', err);
      showMessage('error', 'An error occurred while saving');
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePortal = async () => {
    setDeleting(true);

    try {
      const res = await fetch(`/api/portals/${portalId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.push('/portals');
      } else {
        const data = await res.json();
        showMessage('error', data.error || 'Failed to delete portal');
        setDeleting(false);
        setShowDeletePortalModal(false);
      }
    } catch (err) {
      console.error('Error deleting:', err);
      showMessage('error', 'An error occurred while deleting');
      setDeleting(false);
      setShowDeletePortalModal(false);
    }
  };

  const handleDeleteRequest = async (requestId: string) => {
    setDeletingRequest(requestId);

    try {
      const res = await fetch(`/api/org/requests/${requestId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setRequests(requests.filter(r => r.id !== requestId));
        showMessage('success', 'Request deleted successfully');
      } else {
        showMessage('error', 'Failed to delete request');
      }
    } catch (err) {
      console.error('Error deleting request:', err);
      showMessage('error', 'An error occurred while deleting request');
    } finally {
      setDeletingRequest(null);
      setShowDeleteRequestModal(false);
      setRequestToDelete(null);
    }
  };

  const confirmDeleteRequest = (requestId: string) => {
    setRequestToDelete(requestId);
    setShowDeleteRequestModal(true);
  };

  const handleDownloadAll = async () => {
    setDownloading(true);

    try {
      const res = await fetch(`/api/portals/${portalId}/download-all`);

      if (!res.ok) {
        const data = await res.json();
        showMessage('error', data.error || 'Failed to download documents');
        setDownloading(false);
        return;
      }

      // Get the blob from the response
      const blob = await res.blob();

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${clientName.replace(/[^a-zA-Z0-9]/g, '_')}_documents.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      showMessage('success', 'Documents downloaded successfully');
    } catch (err) {
      console.error('Error downloading:', err);
      showMessage('error', 'An error occurred while downloading');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl animate-fadeIn pb-12">
      {/* Header */}
      <div>
        <button
          onClick={() => router.push('/portals')}
          className="flex items-center gap-2 text-sm mb-4 transition-colors text-slate-500 hover:text-navy font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to portals
        </button>
        <h1 className="text-3xl font-black text-navy font-display">
          Portal Settings
        </h1>
        <p className="mt-2 text-slate-500 font-medium">
          Configure portal access and document requests
        </p>
      </div>

      {/* Message */}
      {message && (
        <div className={`flex items-center gap-3 p-4 rounded-xl border backdrop-blur-sm shadow-sm ${
          message.type === 'success'
            ? 'bg-green-500/10 border-green-500/20 text-green-700'
            : 'bg-red-500/10 border-red-500/20 text-red-700'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <p className="text-sm font-bold">{message.text}</p>
        </div>
      )}

      {/* Basic Information */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-xl font-black text-navy font-display mb-1">
            Basic Information
          </h2>
          <div className="h-1 w-12 bg-teal-500/30 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="clientName" className="block text-sm font-bold text-navy mb-2 font-display">
              Client Name *
            </label>
            <input
              id="clientName"
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/50 text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="clientEmail" className="block text-sm font-bold text-navy mb-2 font-display">
              Client Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                id="clientEmail"
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/40 bg-white/50 text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium"
                placeholder="john@example.com"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-bold text-navy mb-2 font-display">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/50 text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium resize-none"
            placeholder="Add notes about this portal..."
          />
        </div>
      </div>

      {/* Security Settings */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-xl font-black text-navy font-display mb-1">
            Security Settings
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Configure access control and expiration
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="pin" className="block text-sm font-bold text-navy mb-2 font-display">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-teal-500/10">
                  <Lock className="w-3.5 h-3.5 text-teal-600" />
                </div>
                Change PIN
              </div>
            </label>
            <div className="relative">
              <input
                id="pin"
                type={showPin ? 'text' : 'password'}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/50 text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-mono text-lg tracking-widest font-bold"
                placeholder="••••••"
                maxLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors text-slate-400 hover:text-navy hover:bg-white/50"
              >
                {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-500 font-medium font-outfit">
              4-6 digit PIN (leave empty to keep current)
            </p>
          </div>

          <div>
            <label htmlFor="expiresAt" className="block text-sm font-bold text-navy mb-2 font-display">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-orange-500/10">
                  <Calendar className="w-3.5 h-3.5 text-orange-500" />
                </div>
                Expiration Date
              </div>
            </label>
            <div className="glass-inputs-container">
              <DateTimePicker
                value={expiresAt}
                onChange={(value) => setExpiresAt(value)}
                placeholder="Select expiration date and time"
              />
            </div>
            <p className="mt-2 text-xs text-slate-500 font-medium font-outfit">
              Leave empty for no expiration
            </p>
          </div>
        </div>
      </div>

      {/* Document Requests */}
      {requests.length > 0 && (
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-black text-navy font-display mb-1">
              Document Requests
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Manage document requests for this portal
            </p>
          </div>

          <div className="space-y-4">
            {requests.map((request) => {
              const uploadedCount = request.items.filter((i: any) => i.uploaded).length;
              const totalCount = request.items.length;
              const progress = totalCount > 0 ? (uploadedCount / totalCount) * 100 : 0;
              const isComplete = uploadedCount === totalCount;

              return (
                <div key={request.id} className="rounded-xl p-5 border border-white/20 bg-white/40 transition-all hover:bg-white/60 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-white/50 shadow-sm">
                          <FileText className="w-5 h-5 text-teal-600" />
                        </div>
                        <h3 className="font-bold text-navy font-display">
                          {request.templateKey ? request.templateKey.replace(/_/g, ' ').toUpperCase() : 'Custom Request'}
                        </h3>
                        {isComplete && (
                          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                            <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                            <span className="text-[10px] font-bold text-green-700 uppercase tracking-wide">Complete</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-slate-500 font-medium ml-1">
                        <span className="font-bold text-navy">{uploadedCount}</span> of <span className="font-bold text-navy">{totalCount}</span> items uploaded
                      </p>
                    </div>

                    <button
                      onClick={() => confirmDeleteRequest(request.id)}
                      disabled={deletingRequest === request.id}
                      className="p-2.5 rounded-xl transition-colors text-red-400 hover:text-red-600 hover:bg-red-50 disabled:opacity-50"
                      title="Delete request"
                    >
                      {deletingRequest === request.id ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full rounded-full h-2 bg-slate-100 overflow-hidden border border-slate-100 mb-3">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isComplete 
                          ? 'bg-gradient-to-r from-green-500 to-green-400' 
                          : 'bg-gradient-to-r from-teal-mid to-teal-bright'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {request.dueAt && (
                    <div className="flex items-center gap-2 mt-2 text-xs font-bold text-slate-400 uppercase tracking-wide">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Due: {new Date(request.dueAt).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 mt-8 border-t border-white/10">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowDeletePortalModal(true)}
            disabled={deleting}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-red-500/5 hover:bg-red-500/10 text-red-600 border-red-200/50 font-bold shadow-sm"
          >
            {deleting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Trash2 className="w-5 h-5" />
            )}
            Delete Portal
          </button>

          <button
            onClick={handleDownloadAll}
            disabled={downloading}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-white/40 hover:bg-white/60 text-blue-600 border-blue-200/30 font-bold shadow-sm"
          >
            {downloading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Download className="w-5 h-5" />
            )}
            Download All
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => router.push('/portals')}
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl transition-colors bg-white/40 hover:bg-white/60 text-navy font-bold border border-white/20 shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 btn-enhanced-primary rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal-mid/20 hover:scale-[1.02] transition-all"
          >
            {saving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            Save Changes
          </button>
        </div>
      </div>

      {/* Delete Portal Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeletePortalModal}
        onClose={() => setShowDeletePortalModal(false)}
        onConfirm={handleDeletePortal}
        title="Delete Portal"
        message="Are you sure you want to delete this portal? This action cannot be undone and will delete all associated requests and submissions."
        confirmText="Delete Portal"
        cancelText="Cancel"
        variant="danger"
        loading={deleting}
      />

      {/* Delete Request Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteRequestModal}
        onClose={() => {
          setShowDeleteRequestModal(false);
          setRequestToDelete(null);
        }}
        onConfirm={() => requestToDelete && handleDeleteRequest(requestToDelete)}
        title="Delete Request"
        message="Are you sure you want to delete this document request? This action cannot be undone."
        confirmText="Delete Request"
        cancelText="Cancel"
        variant="danger"
        loading={!!deletingRequest}
      />

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        /* Style DateTimePicker to match glass theme if possible via CSS class overrides */
        .react-datepicker-wrapper input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          background-color: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.4);
          color: #0F172A; /* navy */
          font-weight: 500;
          outline: none;
          transition: all 0.2s;
        }
        .react-datepicker-wrapper input:focus {
          border-color: #14B8A6; /* teal-500 */
          box-shadow: 0 0 0 2px rgba(20, 184, 166, 0.2);
        }
      `}</style>
    </div>
  );
}
