// src/app/demo/personal/vault/page.tsx
// Personal vault with filters, review queue, and CSV export

'use client';

import * as React from 'react';
import Link from 'next/link';
import { VaultDoc, VaultFolder, VaultLabel } from '@/lib/types/vault';
import { loadDocs, docsBy, getNeedsReview, getAvailableMonths, reclassifyDoc, deleteDoc } from '@/lib/vault/store';
import { X, Download, RefreshCw, Upload, AlertCircle } from 'lucide-react';
import { loadPersonalPlan } from '@/app/lib/plan';

export default function VaultPage() {
  const [docs, setDocs] = React.useState<VaultDoc[]>([]);
  const [filterFolder, setFilterFolder] = React.useState<string>('');
  const [filterMonth, setFilterMonth] = React.useState<string>('');
  const [filterStatus, setFilterStatus] = React.useState<'all' | 'needs_review'>('all');
  const [showReviewQueue, setShowReviewQueue] = React.useState(false);
  const [selectedDoc, setSelectedDoc] = React.useState<VaultDoc | null>(null);
  const [reclassifyFolder, setReclassifyFolder] = React.useState<VaultFolder>('Unsorted');
  const [reclassifyLabels, setReclassifyLabels] = React.useState<VaultLabel[]>([]);
  // Initialize availableMonths as empty to prevent hydration mismatch
  const [availableMonths, setAvailableMonths] = React.useState<string[]>([]);
  const [needsReview, setNeedsReview] = React.useState<VaultDoc[]>([]);
  // Initialize plan as "starter" to match server render (prevents hydration mismatch)
  const [plan, setPlan] = React.useState<"starter" | "growth" | "pro">("starter");
  const isPro = plan === "pro";

  const allFolders: VaultFolder[] = ['ID', 'Bills', 'Income', 'Receipts', 'Health', 'Education', 'Legal', 'Taxes', 'Unsorted'];
  const allLabels: VaultLabel[] = ['Home', 'Phone', 'Utilities', 'Internet', 'Food', 'Entertainment', 'Travel', 'Insurance', 'RX', 'Tuition', 'Invoice', 'Statement', 'T1', 'T2', 'NOA', 'Other'];

  const refreshData = React.useCallback(() => {
    let filtered = filterFolder ? docsBy(filterFolder, filterMonth) : docsBy(undefined, filterMonth);
    if (filterStatus === 'needs_review') {
      filtered = filtered.filter(d => d.status === 'needs_review');
    }
    setDocs(filtered);
  }, [filterFolder, filterMonth, filterStatus]);

  // Load months and review queue after component mounts (client-side only)
  React.useEffect(() => {
    setAvailableMonths(getAvailableMonths());
    setNeedsReview(getNeedsReview());
    // Load plan from localStorage after hydration
    const storedPlan = loadPersonalPlan("starter");
    setPlan(storedPlan);
  }, []);

  React.useEffect(() => {
    refreshData();
    // Update months and review queue when docs change
    setAvailableMonths(getAvailableMonths());
    setNeedsReview(getNeedsReview());
  }, [refreshData]);

  // Refresh on window focus (when returning from upload page) and storage changes (cross-tab sync)
  React.useEffect(() => {
    const handleFocus = () => {
      refreshData();
      setAvailableMonths(getAvailableMonths());
      setNeedsReview(getNeedsReview());
    };
    const handleStorage = () => {
      refreshData();
      setAvailableMonths(getAvailableMonths());
      setNeedsReview(getNeedsReview());
    };
    window.addEventListener('focus', handleFocus);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('storage', handleStorage);
    };
  }, [refreshData]);

  function handleReclassify() {
    if (!selectedDoc) return;
    reclassifyDoc(selectedDoc.id, reclassifyFolder, reclassifyLabels);
    setSelectedDoc(null);
    setReclassifyFolder('Unsorted');
    setReclassifyLabels([]);
    refreshData();
    const updated = getNeedsReview();
    setNeedsReview(updated);
    if (updated.length === 0 && showReviewQueue) {
      setShowReviewQueue(false);
      setFilterStatus('all');
    }
  }

  function handleExportCSV() {
    const rows = docs.map(d => ({
      date: new Date(d.uploadedAt).toLocaleDateString(),
      filename: d.filename,
      folder: d.folder,
      labels: d.labels.join('; '),
      amount: d.amount || '',
      month: d.monthKey,
      status: d.status,
    }));

    const headers = ['Date', 'Filename', 'Folder', 'Labels', 'Amount', 'Month', 'Status'];
    const csv = [
      headers.join(','),
      ...rows.map(r => [
        `"${r.date}"`,
        `"${r.filename}"`,
        `"${r.folder}"`,
        `"${r.labels}"`,
        r.amount || '',
        `"${r.month}"`,
        `"${r.status}"`,
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vault-export-${filterFolder || 'all'}-${filterMonth || 'all'}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function getStatusBadge(status: VaultDoc['status'], confidence: number) {
    if (status === 'reclassified') {
      return <span className="px-2 py-1 rounded text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">Re-classified</span>;
    }
    if (status === 'needs_review') {
      return <span className="px-2 py-1 rounded text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">Needs Review</span>;
    }
    return <span className="px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">Classified</span>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">My Vault</h1>
          <p className="text-base text-white/60 mt-1">Your personal document storage</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/demo/personal/vault/upload"
            className="rounded-xl bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-black px-6 py-3 text-base font-semibold transition inline-flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload
          </Link>
          {isPro && (
            <Link
              href="/personal/portal"
              className="rounded-xl bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-black px-6 py-3 text-base font-semibold transition"
            >
              Portal
            </Link>
          )}
        </div>
      </div>

      {/* Review Queue Panel */}
      {needsReview.length > 0 && (
        <div className="rounded-2xl border-2 border-amber-500/50 bg-amber-500/10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            <span className="text-base font-semibold text-white">
              {needsReview.length} document{needsReview.length > 1 ? 's' : ''} need{needsReview.length === 1 ? 's' : ''} review
            </span>
          </div>
          <button
            onClick={() => {
              setShowReviewQueue(!showReviewQueue);
              if (!showReviewQueue) {
                setFilterStatus('needs_review');
              }
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-semibold transition"
          >
            {showReviewQueue ? 'Hide Queue' : 'Show Queue'}
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-4">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-white/70 mb-2 font-medium">Folder</label>
            <select
              value={filterFolder}
              onChange={(e) => setFilterFolder(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-base text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
            >
              <option value="">All Folders</option>
              {allFolders.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-2 font-medium">Month</label>
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-base text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
            >
              <option value="">All Months</option>
              {availableMonths.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-2 font-medium">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'needs_review')}
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-base text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
            >
              <option value="all">All</option>
              <option value="needs_review">Needs Review</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleExportCSV}
              disabled={docs.length === 0}
              className="w-full rounded-xl bg-[#3b82f6] hover:bg-[#3b82f6]/90 disabled:opacity-50 disabled:cursor-not-allowed text-black px-4 py-2 text-base font-semibold transition inline-flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <table className="w-full text-base">
          <thead className="bg-black/20 border-b border-white/10">
            <tr>
              <th className="text-left p-4 text-white/70 font-semibold">File Name</th>
              <th className="text-left p-4 text-white/70 font-semibold">Amount</th>
              <th className="text-left p-4 text-white/70 font-semibold">Folder</th>
              <th className="text-left p-4 text-white/70 font-semibold">Labels</th>
              <th className="text-left p-4 text-white/70 font-semibold">Status</th>
              <th className="text-left p-4 text-white/70 font-semibold">Confidence</th>
              <th className="text-left p-4 text-white/70 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {docs.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-white/60 text-base">
                  No documents found. <Link href="/demo/personal/vault/upload" className="text-[#3b82f6] hover:underline">Upload some files</Link> to get started.
                </td>
              </tr>
            ) : (
              docs.map((d) => (
                <tr key={d.id} className="border-t border-white/10 hover:bg-white/5 transition">
                  <td className="p-4 text-white font-medium">{d.filename}</td>
                  <td className="p-4 text-white/70">{d.amount ? `$${d.amount.toFixed(2)}` : '—'}</td>
                  <td className="p-4 text-white/70">{d.folder}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {d.labels.length > 0 ? (
                        d.labels.map((l, i) => (
                          <span key={i} className="px-2 py-1 rounded text-xs bg-white/10 text-white/80 border border-white/20">
                            {l}
                          </span>
                        ))
                      ) : (
                        <span className="text-white/40 text-sm">—</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">{getStatusBadge(d.status, d.confidence)}</td>
                  <td className="p-4 text-white/70">
                    {d.status === 'reclassified' ? '—' : `${Math.round(d.confidence * 100)}%`}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => {
                        setSelectedDoc(d);
                        setReclassifyFolder(d.folder);
                        setReclassifyLabels([...d.labels]);
                      }}
                      className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium transition inline-flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Reclassify
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Reclassify Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6 max-w-2xl w-full space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Reclassify Document</h2>
              <button
                onClick={() => {
                  setSelectedDoc(null);
                  setReclassifyFolder('Unsorted');
                  setReclassifyLabels([]);
                }}
                className="text-white/60 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-white/60 mb-2">File: <span className="text-white font-medium">{selectedDoc.filename}</span></p>
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2 font-medium">Folder</label>
                <select
                  value={reclassifyFolder}
                  onChange={(e) => setReclassifyFolder(e.target.value as VaultFolder)}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-base text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                >
                  {allFolders.map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2 font-medium">Labels (select multiple)</label>
                <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto p-2 border border-white/10 rounded-xl bg-black/20">
                  {allLabels.map(l => (
                    <label key={l} className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={reclassifyLabels.includes(l)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setReclassifyLabels([...reclassifyLabels, l]);
                          } else {
                            setReclassifyLabels(reclassifyLabels.filter(x => x !== l));
                          }
                        }}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-white">{l}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleReclassify}
                  className="flex-1 rounded-xl bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-black px-6 py-3 text-base font-semibold transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setSelectedDoc(null);
                    setReclassifyFolder('Unsorted');
                    setReclassifyLabels([]);
                  }}
                  className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
