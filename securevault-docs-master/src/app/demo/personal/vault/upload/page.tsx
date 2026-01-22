// src/app/demo/personal/vault/upload/page.tsx
// Upload flow with mock classifier

'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { classify } from '@/lib/classifier/mockClassifier';
import { addDoc } from '@/lib/vault/store';
import { generateId } from '@/lib/utils/id';
import { Upload, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export default function VaultUploadPage() {
  const router = useRouter();
  const [files, setFiles] = React.useState<FileList | null>(null);
  const [ocrText, setOcrText] = React.useState('');
  const [uploading, setUploading] = React.useState(false);
  const [results, setResults] = React.useState<Array<{ filename: string; folder: string; labels: string[]; confidence: number; needsReview: boolean }>>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setFiles(fileList);
    setResults([]);
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      alert('Please select files first');
      return;
    }

    setUploading(true);
    const now = new Date();
    const monthKey = now.toISOString().slice(0, 7);
    const uploadResults: typeof results = [];

    Array.from(files).forEach((f) => {
      const classification = classify(f.name, ocrText);
      const needsReview = classification.confidence < 0.7;

      addDoc({
        id: generateId(),
        filename: f.name,
        uploadedAt: now.toISOString(),
        amount: undefined,
        folder: classification.folder,
        labels: classification.labels,
        monthKey,
        status: needsReview ? 'needs_review' : 'classified',
        confidence: classification.confidence,
      });

      uploadResults.push({
        filename: f.name,
        folder: classification.folder,
        labels: classification.labels,
        confidence: classification.confidence,
        needsReview,
      });
    });

    setResults(uploadResults);
    setUploading(false);

    // Show toast-like message
    const needsReviewCount = uploadResults.filter(r => r.needsReview).length;
    if (needsReviewCount > 0) {
      setTimeout(() => {
        alert(`${uploadResults.length} file(s) uploaded. ${needsReviewCount} need review.`);
      }, 500);
    } else {
      setTimeout(() => {
        alert(`${uploadResults.length} file(s) uploaded and classified successfully!`);
      }, 500);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Upload Documents</h1>
        <p className="text-base text-white/60 mt-2">Upload files to your vault. They'll be automatically classified.</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 space-y-6">
        {/* File Input */}
        <div>
          <label className="block text-base text-white/70 mb-3 font-medium">Select Files</label>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={(e) => handleFiles(e.currentTarget.files)}
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-[#3b82f6] hover:bg-[#3b82f6]/5 transition-all"
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-white/40" />
            <p className="text-white font-medium mb-2">Click to browse or drag files here</p>
            <p className="text-sm text-white/60">PDF, DOC, DOCX, JPG, PNG, TXT (Max 10MB per file)</p>
            {files && files.length > 0 && (
              <p className="text-sm text-[#3b82f6] mt-2 font-medium">{files.length} file(s) selected</p>
            )}
          </div>
        </div>

        {/* OCR Text (Optional for demo) */}
        <div>
          <label className="block text-base text-white/70 mb-3 font-medium">OCR Text (Optional - for demo classification)</label>
          <textarea
            value={ocrText}
            onChange={(e) => setOcrText(e.target.value)}
            placeholder="Paste OCR text here to improve classification accuracy..."
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-base text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] min-h-32"
          />
          <p className="text-xs text-white/60 mt-2">In production, OCR text is extracted automatically from uploaded documents.</p>
        </div>

        {/* Upload Button */}
        <div className="flex justify-center">
          <button
            onClick={handleUpload}
            disabled={uploading || !files || files.length === 0}
            className="rounded-xl bg-[#3b82f6] hover:bg-[#3b82f6]/90 disabled:opacity-50 disabled:cursor-not-allowed text-black px-8 py-3 text-base font-semibold transition inline-flex items-center gap-2"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent"></div>
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload & Classify
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-white/10">
            <h3 className="text-lg font-semibold text-white">Classification Results</h3>
            {results.map((r, i) => (
              <div
                key={i}
                className={`rounded-xl border p-4 ${
                  r.needsReview
                    ? 'border-amber-500/50 bg-amber-500/10'
                    : 'border-blue-500/50 bg-blue-500/10'
                }`}
              >
                <div className="flex items-start gap-3">
                  {r.needsReview ? (
                    <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-white font-medium">{r.filename}</p>
                    <p className="text-sm text-white/70 mt-1">
                      Filed to <span className="font-semibold text-white">{r.folder}</span>
                      {r.labels.length > 0 && (
                        <> with labels: <span className="font-semibold text-white">{r.labels.join(', ')}</span></>
                      )}
                      {' '}({Math.round(r.confidence * 100)}%)
                    </p>
                    {r.needsReview && (
                      <p className="text-xs text-amber-300 mt-1">This document needs review due to low confidence.</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => router.push('/demo/personal/vault')}
                className="flex-1 rounded-xl bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-black px-6 py-3 text-base font-semibold transition"
              >
                Go to Vault
              </button>
              <button
                onClick={() => {
                  setFiles(null);
                  setResults([]);
                  setOcrText('');
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold transition"
              >
                Upload More
              </button>
            </div>
          </div>
        )}

        <p className="text-xs text-white/60 text-center pt-4 border-t border-white/10">
          This demo simulates document classification. Files are stored in your browser's localStorage. No files leave your device.
        </p>
      </div>
    </div>
  );
}

