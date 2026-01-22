'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useOrganization } from '@/contexts/OrganizationContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Users, ArrowLeft, Eye, EyeOff, Lock, Calendar, AlertCircle } from 'lucide-react';
import DateTimePicker from '@/components/shared/DateTimePicker';

export default function NewPortalPage() {
  const router = useRouter();
  const { activeOrg } = useOrganization();
  const { user } = useAuth();
  const { isDarkMode } = useTheme();

  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    clientEmail: '',
    pin: '',
    expiresAt: '', // Optional expiration date
  });

  const [enableExpiration, setEnableExpiration] = React.useState(false);

  const [creating, setCreating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showPin, setShowPin] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!activeOrg?.id) {
      setError('No organization selected');
      return;
    }

    if (!user?.id) {
      setError('Not authenticated');
      return;
    }

    // Validate PIN - must be exactly 4 digits
    if (!formData.pin || !/^\d{4}$/.test(formData.pin)) {
      setError('PIN must be exactly 4 digits');
      return;
    }

    setCreating(true);
    setError(null);

    try {
      console.log('[PORTAL CREATE] Submitting with user.id:', user.id, 'activeOrg.id:', activeOrg.id);

      // Prepare form data with optional expiration
      const submitData = {
        ...formData,
        expiresAt: enableExpiration && formData.expiresAt
          ? new Date(formData.expiresAt).toISOString()
          : null,
      };

      const response = await fetch(`/api/org/${activeOrg.id}/portals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id,
        },
        body: JSON.stringify(submitData),
      });
      console.log('[PORTAL CREATE] Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create portal');
      }

      const data = await response.json();
      console.log('Portal created:', data.portal);
      router.push('/portals');
    } catch (err: any) {
      console.error('Error creating portal:', err);
      setError(err.message || 'Failed to create portal');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <div className="mb-8">
        <button
          onClick={() => router.push('/portals')}
          className="flex items-center gap-2 text-sm mb-4 transition-colors text-white/70 hover:text-white font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portals
        </button>
        <h1 className="text-3xl font-black text-white font-display">
          Create Client Portal
        </h1>
        <p className="mt-2 text-white/80 font-medium">
          Set up a secure portal for your client to access documents
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
        {!activeOrg?.id && (
          <div className="border rounded-xl p-4 bg-orange-500/10 border-orange-500/20">
            <p className="text-sm font-bold text-orange-600 font-display">
              No organization selected
            </p>
            <p className="text-xs mt-1 text-orange-600/80 font-medium">
              You need to <a href="/settings?tab=organization" className="underline hover:no-underline">create an organization</a> before creating portals.
            </p>
          </div>
        )}
        {error && (
          <div className="border rounded-xl p-4 bg-red-500/10 border-red-500/20">
            <p className="text-sm font-bold text-red-600">{error}</p>
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-bold text-white mb-2 font-display">
            Portal Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/50 text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium"
            placeholder="e.g., John Doe - Tax Documents"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-bold text-white mb-2 font-display">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/50 text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium resize-none"
            rows={3}
            placeholder="Brief description of what this portal is for"
          />
        </div>

        <div>
          <label htmlFor="clientEmail" className="block text-sm font-bold text-white mb-2 font-display">
            Client Email
          </label>
          <input
            type="email"
            id="clientEmail"
            value={formData.clientEmail}
            onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/50 text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium"
            placeholder="client@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="pin" className="block text-sm font-bold text-white mb-2 font-display">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-teal-dark" />
              Portal Access PIN
            </div>
          </label>
          <p className="text-xs mb-2 text-white/70 font-medium">
            Your client will use this 4-digit PIN to access their portal
          </p>
          <div className="relative">
            <input
              type={showPin ? 'text' : 'password'}
              id="pin"
              value={formData.pin}
              onChange={(e) => {
                // Only allow digits and max 4 characters
                const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                setFormData({ ...formData, pin: value });
              }}
              className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/50 text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-mono text-lg tracking-widest"
              placeholder="••••"
              maxLength={4}
              inputMode="numeric"
              pattern="\d{4}"
              required
            />
            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors text-slate-400 hover:text-navy hover:bg-white/50"
            >
              {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-xs mt-2 text-white/60 font-medium font-mono">
            {formData.pin.length}/4 digits
          </p>
        </div>

        {/* Expiration Date Section */}
        <div className="p-5 border rounded-2xl transition-colors bg-white/40 border-white/40 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-orange-500/10">
                <Calendar className="w-4 h-4 text-orange-600" />
              </div>
              <span className="text-sm font-bold text-white">
                Portal Expiration
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enableExpiration}
                onChange={(e) => {
                  setEnableExpiration(e.target.checked);
                  if (!e.target.checked) {
                    setFormData({ ...formData, expiresAt: '' });
                  }
                }}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>

          {enableExpiration && (
            <div className="animate-fadeIn">
              <p className="text-xs mb-3 text-white/70 font-medium">
                Set an expiration date and time after which this portal will no longer be accessible
              </p>
              <DateTimePicker
                value={formData.expiresAt}
                onChange={(value) => setFormData({ ...formData, expiresAt: value })}
                placeholder="Select expiration date and time"
              />
              {formData.expiresAt && (
                <div className="mt-3 flex items-center gap-2 text-xs text-orange-600 font-bold bg-orange-500/5 p-2 rounded-lg border border-orange-200/50">
                  <AlertCircle className="w-3 h-3" />
                  Portal will expire on {new Date(formData.expiresAt).toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              )}
            </div>
          )}

          {!enableExpiration && (
            <p className="text-xs text-white/70 font-medium ml-1">
              Portal will remain accessible indefinitely until manually disabled
            </p>
          )}
        </div>

        <div className="flex gap-3 pt-6 border-t border-white/20">
          <button
            type="submit"
            disabled={creating}
            className="flex items-center gap-2 px-6 py-3 btn-enhanced-primary rounded-xl shadow-lg shadow-teal-mid/20 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Users className="w-4 h-4" />
            {creating ? 'Creating...' : 'Create Portal'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/portals')}
            className="px-6 py-3 rounded-xl transition-colors bg-white/40 hover:bg-white/60 text-navy font-bold border border-white/20"
          >
            Cancel
          </button>
        </div>
      </form>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
