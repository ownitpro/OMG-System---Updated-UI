'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOrganization } from '@/contexts/OrganizationContext';
import {
  Upload,
  Download,
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowLeft,
  Info
} from 'lucide-react';

interface CSVRow {
  clientName: string;
  clientEmail: string;
  pin?: string;
  expiresAt?: string;
  description?: string;
}

interface ProcessedRow extends CSVRow {
  index: number;
  status: 'pending' | 'processing' | 'success' | 'error';
  error?: string;
  portalId?: string;
}

export default function BulkCreatePortalsPage() {
  const router = useRouter();
  const { activeOrg } = useOrganization();

  const [file, setFile] = useState<File | null>(null);
  const [rows, setRows] = useState<ProcessedRow[]>([]);
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleReset = () => {
    setFile(null);
    setRows([]);
    setProcessing(false);
    setCompleted(false);
  };

  const downloadTemplate = () => {
    const template = `clientName,clientEmail,pin,expiresAt,description
John Doe,john@example.com,123456,2024-12-31,Tax documents 2024
Jane Smith,jane@example.com,654321,2025-01-15,Client onboarding
Bob Johnson,bob@example.com,,2025-02-28,Financial review`;

    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portal-template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const parseCSV = (text: string): CSVRow[] => {
    // Handle different line endings (Windows \r\n, Unix \n, Mac \r)
    const lines = text.trim().split(/\r?\n/).filter(line => line.trim());
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim());
    const data: CSVRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      const row: any = {};

      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });

      data.push(row as CSVRow);
    }

    return data;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith('.csv')) {
      alert('Please select a CSV file');
      return;
    }

    setFile(selectedFile);
    setCompleted(false);

    // Parse CSV
    const text = await selectedFile.text();
    const parsed = parseCSV(text);

    const processedRows: ProcessedRow[] = parsed.map((row, index) => ({
      ...row,
      index: index + 2, // +2 because row 1 is headers, and we're 0-indexed
      status: 'pending',
    }));

    setRows(processedRows);
  };

  const validateRow = (row: CSVRow): string | null => {
    if (!row.clientName?.trim()) return 'Client name is required';
    if (!row.clientEmail?.trim()) return 'Client email is required';
    if (row.clientEmail && !row.clientEmail.includes('@')) return 'Invalid email format';
    if (row.pin && (row.pin.length < 4 || row.pin.length > 6)) return 'PIN must be 4-6 digits';
    if (row.expiresAt && isNaN(Date.parse(row.expiresAt))) return 'Invalid expiration date';
    return null;
  };

  const createPortal = async (row: CSVRow): Promise<{ success: boolean; portalId?: string; error?: string }> => {
    try {
      const res = await fetch(`/api/org/${activeOrg?.id}/portals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: row.clientName, // API expects 'name' not 'clientName'
          clientEmail: row.clientEmail,
          pin: row.pin || undefined,
          expiresAt: row.expiresAt || undefined,
          description: row.description || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        return { success: false, error: data.error || 'Failed to create portal' };
      }

      const data = await res.json();
      return { success: true, portalId: data.portal?.id };
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const handleProcessCSV = async () => {
    if (!activeOrg) {
      alert('No organization selected');
      return;
    }

    setProcessing(true);

    // Process rows sequentially
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      // Update status to processing
      setRows(prev => prev.map((r, idx) =>
        idx === i ? { ...r, status: 'processing' } : r
      ));

      // Validate
      const validationError = validateRow(row);
      if (validationError) {
        setRows(prev => prev.map((r, idx) =>
          idx === i ? { ...r, status: 'error', error: validationError } : r
        ));
        continue;
      }

      // Create portal
      const result = await createPortal(row);

      if (result.success) {
        setRows(prev => prev.map((r, idx) =>
          idx === i ? { ...r, status: 'success', portalId: result.portalId } : r
        ));
      } else {
        setRows(prev => prev.map((r, idx) =>
          idx === i ? { ...r, status: 'error', error: result.error } : r
        ));
      }

      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    setProcessing(false);
    setCompleted(true);
  };

  const getStatusIcon = (status: ProcessedRow['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'processing':
        return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-slate-300" />;
    }
  };

  const stats = {
    total: rows.length,
    success: rows.filter(r => r.status === 'success').length,
    error: rows.filter(r => r.status === 'error').length,
    pending: rows.filter(r => r.status === 'pending').length,
  };

  return (
    <div className="space-y-6 max-w-6xl animate-fadeIn">
      {/* Header */}
      <div>
        <button
          onClick={() => router.push('/portals')}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-navy mb-4 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to portals
        </button>
        <h1 className="text-3xl font-black text-navy font-display">Bulk Create Portals</h1>
        <p className="mt-2 text-slate-500 font-medium">Upload a CSV file to create multiple portals at once</p>
      </div>

      {/* Instructions */}
      <div className="glass-card rounded-2xl p-6 border-blue-200/50 bg-blue-500/5">
        <div className="flex gap-4">
          <div className="p-2 rounded-xl bg-blue-500/10 h-fit">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-navy text-lg font-display mb-3">How to use bulk creation:</h3>
            <ol className="text-sm text-slate-600 space-y-2 list-decimal list-inside font-medium font-outfit">
              <li>Download the CSV template below</li>
              <li>Fill in your portal details (clientName and clientEmail are required)</li>
              <li>Upload the completed CSV file</li>
              <li>Review the parsed data and click "Create Portals"</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Template Download */}
      <div className="glass-card rounded-2xl p-6 sm:p-8">
        <h2 className="text-xl font-black text-navy font-display mb-4">Step 1: Download Template</h2>
        <button
          onClick={downloadTemplate}
          className="flex items-center gap-2 px-6 py-3 bg-white/40 hover:bg-white/60 text-navy rounded-xl transition-all border border-white/40 font-bold shadow-sm hover:shadow-md"
        >
          <Download className="w-5 h-5" />
          Download CSV Template
        </button>
        <p className="text-sm text-slate-500 mt-3 font-medium">
          Required fields: clientName, clientEmail | Optional: pin, expiresAt, description
        </p>
      </div>

      {/* File Upload */}
      <div className="glass-card rounded-2xl p-6 sm:p-8">
        <h2 className="text-xl font-black text-navy font-display mb-4">Step 2: Upload CSV</h2>
        <label className="block w-full">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
            disabled={processing}
          />
          <div className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
            file 
              ? 'border-teal-500 bg-teal-500/5' 
              : 'border-slate-300 hover:border-teal-400 hover:bg-teal-50/10'
          }`}>
            {file ? (
              <div className="flex flex-col items-center animate-fadeIn">
                <div className="p-4 rounded-full bg-teal-500/10 mb-4">
                  <FileSpreadsheet className="w-10 h-10 text-teal-600" />
                </div>
                <p className="text-navy font-bold text-lg font-display">{file.name}</p>
                <p className="text-sm text-slate-500 mt-1 font-medium">{rows.length} portals found</p>
              </div>
            ) : (
              <div className="flex flex-col items-center group">
                <div className="p-4 rounded-full bg-slate-100 group-hover:bg-teal-500/10 transition-colors mb-4">
                  <Upload className="w-10 h-10 text-slate-400 group-hover:text-teal-600 transition-colors" />
                </div>
                <p className="text-navy font-bold text-lg font-display">Click to upload CSV</p>
                <p className="text-sm text-slate-400 mt-1 font-medium">or drag and drop</p>
              </div>
            )}
          </div>
        </label>
      </div>

      {/* Preview & Process */}
      {rows.length > 0 && (
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-navy font-display">
              Step 3: Review & Create ({rows.length} portals)
            </h2>
            {!completed && (
              <button
                onClick={handleProcessCSV}
                disabled={processing}
                className="flex items-center gap-2 px-6 py-2.5 btn-enhanced-primary rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal-mid/20 hover:scale-[1.02] transition-all"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Create Portals
                  </>
                )}
              </button>
            )}
          </div>

          {/* Stats */}
          {(processing || completed) && (
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-white/40 border border-white/40 shadow-sm backdrop-blur-sm">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Total</p>
                <p className="text-2xl font-black text-navy font-display">{stats.total}</p>
              </div>
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 shadow-sm backdrop-blur-sm">
                <p className="text-xs font-bold text-green-600 uppercase tracking-wide mb-1">Success</p>
                <p className="text-2xl font-black text-green-700 font-display">{stats.success}</p>
              </div>
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 shadow-sm backdrop-blur-sm">
                <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-1">Failed</p>
                <p className="text-2xl font-black text-red-700 font-display">{stats.error}</p>
              </div>
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 shadow-sm backdrop-blur-sm">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">Pending</p>
                <p className="text-2xl font-black text-blue-700 font-display">{stats.pending}</p>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-white/20">
            <table className="w-full text-sm">
              <thead className="bg-white/50 border-b border-white/20">
                <tr>
                  <th className="text-left p-4 font-bold text-navy font-display uppercase tracking-wider text-xs">Row</th>
                  <th className="text-left p-4 font-bold text-navy font-display uppercase tracking-wider text-xs">Status</th>
                  <th className="text-left p-4 font-bold text-navy font-display uppercase tracking-wider text-xs">Client Name</th>
                  <th className="text-left p-4 font-bold text-navy font-display uppercase tracking-wider text-xs">Email</th>
                  <th className="text-left p-4 font-bold text-navy font-display uppercase tracking-wider text-xs">PIN</th>
                  <th className="text-left p-4 font-bold text-navy font-display uppercase tracking-wider text-xs">Expires</th>
                  <th className="text-left p-4 font-bold text-navy font-display uppercase tracking-wider text-xs">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {rows.map((row, idx) => (
                  <tr key={idx} className="transition-colors hover:bg-white/30">
                    <td className="p-4 text-slate-500 font-medium">{row.index}</td>
                    <td className="p-4">{getStatusIcon(row.status)}</td>
                    <td className="p-4 font-bold text-navy">{row.clientName}</td>
                    <td className="p-4 text-slate-500 font-medium">{row.clientEmail}</td>
                    <td className="p-4 text-slate-500 font-mono tracking-wider">
                      {row.pin || <span className="text-slate-400 opacity-50">auto</span>}
                    </td>
                    <td className="p-4 text-slate-500 font-medium">
                      {row.expiresAt || <span className="text-slate-400 opacity-50">never</span>}
                    </td>
                    <td className="p-4">
                      {row.status === 'success' && row.portalId && (
                        <button
                          onClick={() => router.push(`/portals/${row.portalId}`)}
                          className="text-teal-600 hover:text-teal-700 font-bold hover:underline text-xs"
                        >
                          View Portal →
                        </button>
                      )}
                      {row.status === 'error' && (
                        <span className="text-red-500 text-xs font-bold bg-red-500/10 px-2 py-1 rounded inline-block">{row.error}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {completed && (
            <div className="mt-6 flex justify-between items-center">
              <p className="text-sm text-slate-600 font-medium">
                Created <span className="font-bold text-navy">{stats.success}</span> of <span className="font-bold text-navy">{stats.total}</span> portals successfully
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]"
                >
                  Upload Another CSV
                </button>
                <button
                  onClick={() => {
                    window.location.href = '/portals';
                  }}
                  className="px-6 py-2.5 bg-white/40 hover:bg-white/60 text-navy font-bold rounded-xl border border-white/20 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      )}

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
