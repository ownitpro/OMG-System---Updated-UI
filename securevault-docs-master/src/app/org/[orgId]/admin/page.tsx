// src/app/org/[orgId]/admin/page.tsx
// Admin settings with Industry tag

'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Settings } from 'lucide-react';

export default function OrgAdmin() {
  const params = useParams();
  const orgId = params.orgId as string;
  const [industry, setIndustry] = React.useState('');

  React.useEffect(() => {
    // Load existing industry from mock store
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`svd_org_${orgId}_industry`);
      if (stored) setIndustry(stored);
    }
  }, [orgId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem(`svd_org_${orgId}_industry`, industry);
      alert('Settings saved (mock)');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Settings</h1>

      {/* Quick Links Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href={`/org/${orgId}/admin/email-templates`}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition group"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition">
              <Mail className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">Email Templates</h3>
              <p className="text-sm text-white/60">Customize email notifications and branding</p>
            </div>
          </div>
        </Link>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 opacity-50">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-gray-500/10 text-gray-400">
              <Settings className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">Organization Settings</h3>
              <p className="text-sm text-white/60">Manage organization profile and preferences</p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <fieldset className="rounded-2xl border border-white/10 p-6 bg-white/5 space-y-4">
          <legend className="text-lg font-semibold">Organization Profile</legend>

          <div className="space-y-2">
            <label htmlFor="industry" className="text-sm font-medium">
              Industry (optional)
            </label>
            <select
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
            >
              <option value="">None</option>
              <option>Accounting</option>
              <option>Real Estate</option>
              <option>Contractors</option>
              <option>Project Management</option>
              <option>Other</option>
            </select>
            <p className="text-xs text-white/60">
              Used to pre-fill request templates and copy. Doesn't change your plan.
            </p>
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-[#3b82f6] text-black font-semibold hover:opacity-90 transition"
          >
            Save Settings
          </button>
        </fieldset>
      </form>
    </div>
  );
}
