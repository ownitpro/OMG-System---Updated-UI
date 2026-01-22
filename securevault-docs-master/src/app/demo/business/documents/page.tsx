// src/app/demo/business/documents/page.tsx
// Business demo documents page with upload functionality

'use client';

import * as React from 'react';
import Link from 'next/link';
import { DemoTable } from "@/components/demo/business/DemoTable";
import { documents } from "@/lib/demo/business/mockClient";
import { Upload, FileText, CheckCircle2 } from 'lucide-react';

export default function Documents() {
  const [rows, setRows] = React.useState(documents);
  const [showUpload, setShowUpload] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [uploadedFiles, setUploadedFiles] = React.useState<string[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const cols = [
    { key: "name", title: "Document" },
    { key: "label", title: "Label" },
    { key: "status", title: "Status" },
    { key: "updated", title: "Updated" },
  ];

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadedFiles(Array.from(files).map(f => f.name));

    // Mock upload process
    setTimeout(() => {
      const newDocs = Array.from(files).map((file, i) => ({
        name: file.name,
        label: 'Document',
        status: 'Clean',
        updated: 'Just now',
      }));
      setRows([...newDocs, ...rows]);
      setUploading(false);
      setShowUpload(false);
      setUploadedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-zinc-100">Documents</h1>
      <div className="flex gap-2">
        <button
          onClick={() => setShowUpload(true)}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 inline-flex items-center gap-2 transition"
        >
          <Upload className="h-4 w-4" />
          Upload
        </button>
        <Link
          href="/demo/business/shares"
          className="rounded-xl bg-zinc-800 px-4 py-2 text-sm text-zinc-100 hover:bg-zinc-700 inline-flex items-center gap-2 transition"
        >
          New share link
        </Link>
      </div>

      {showUpload && (
        <div className="rounded-2xl border border-zinc-800 p-6 bg-zinc-900">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-100">Upload Documents</h2>
              <button
                onClick={() => {
                  setShowUpload(false);
                  setUploadedFiles([]);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="text-zinc-400 hover:text-zinc-100"
              >
                ×
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />

            {!uploading ? (
              <div
                onClick={handleFileSelect}
                className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-500/5 transition-all"
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-zinc-400" />
                <p className="text-zinc-100 font-medium mb-2">Click to browse or drag files here</p>
                <p className="text-sm text-zinc-400">PDF, DOC, DOCX, JPG, PNG (Max 10MB per file)</p>
              </div>
            ) : (
              <div className="border-2 border-blue-500/50 rounded-xl p-8 text-center bg-blue-500/10">
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                  <div>
                    <p className="text-zinc-100 font-medium mb-2">Uploading files...</p>
                    <div className="space-y-1">
                      {uploadedFiles.map((name, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                          <FileText className="h-4 w-4" />
                          <span>{name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {uploadedFiles.length > 0 && !uploading && (
              <div className="rounded-xl bg-blue-500/10 border border-blue-500/50 p-4">
                <div className="flex items-center gap-2 text-blue-400 mb-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-medium">Upload complete</span>
                </div>
                <p className="text-sm text-zinc-300">
                  {uploadedFiles.length} file(s) uploaded successfully
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <DemoTable cols={cols} rows={rows} />
    </div>
  );
}
