// app/portal/dashboard/page.tsx
// Client Portal Dashboard - Upload documents to org's client folder

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, CheckCircle2, AlertCircle, LogOut } from "lucide-react";
import { classify } from "@/lib/classifier/mockClassifier";

type UploadResult = {
  filename: string;
  folder: string;
  labels: string[];
  confidence: number;
  needsReview: boolean;
};

export default function ClientPortalDashboard() {
  const router = useRouter();
  const [clientName, setClientName] = useState("");
  const [portalId, setPortalId] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<UploadResult[]>([]);
  const [recentUploads, setRecentUploads] = useState<any[]>([]);

  useEffect(() => {
    // Check if logged in
    const token = localStorage.getItem("svd_portal_token");
    const pid = localStorage.getItem("svd_portal_id");
    const name = localStorage.getItem("svd_portal_client_name");

    if (!token || !pid) {
      router.push("/portal/login");
      return;
    }

    setClientName(name || "Client");
    setPortalId(pid);

    // Load recent uploads
    loadRecentUploads(pid);
  }, [router]);

  async function loadRecentUploads(pid: string) {
    try {
      const res = await fetch(`/api/portal/${pid}/uploads`);
      if (res.ok) {
        const data = await res.json();
        setRecentUploads(data.uploads || []);
      }
    } catch (error) {
      console.error("Failed to load uploads:", error);
    }
  }

  async function handleUpload() {
    if (!files || files.length === 0) {
      alert("Please select files first");
      return;
    }

    setUploading(true);
    setResults([]);

    const uploadResults: UploadResult[] = [];

    // Process each file
    for (const file of Array.from(files)) {
      // Classify the document
      const classification = classify(file.name, "");
      const needsReview = classification.confidence < 0.7;

      uploadResults.push({
        filename: file.name,
        folder: classification.folder,
        labels: classification.labels,
        confidence: classification.confidence,
        needsReview,
      });

      // Upload to API (saves to org's client folder)
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("portalId", portalId);
        formData.append("folder", classification.folder);
        formData.append("labels", JSON.stringify(classification.labels));
        formData.append("confidence", classification.confidence.toString());

        const res = await fetch("/api/portal/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          console.error("Upload failed for", file.name);
        }
      } catch (error) {
        console.error("Upload error:", error);
      }
    }

    setResults(uploadResults);
    setUploading(false);

    // Reload recent uploads
    await loadRecentUploads(portalId);

    // Show success message
    const needsReviewCount = uploadResults.filter((r) => r.needsReview).length;
    if (needsReviewCount > 0) {
      alert(
        `${uploadResults.length} file(s) uploaded. ${needsReviewCount} need review.`
      );
    } else {
      alert(`${uploadResults.length} file(s) uploaded and classified successfully!`);
    }

    // Clear file input
    setFiles(null);
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  }

  function handleLogout() {
    localStorage.removeItem("svd_portal_token");
    localStorage.removeItem("svd_portal_id");
    localStorage.removeItem("svd_portal_email");
    localStorage.removeItem("svd_portal_client_name");
    router.push("/portal/login");
  }

  return (
    <div className="min-h-screen landing-bg">
      {/* Grain Overlay */}
      <div className="grain-overlay"></div>

      <div className="relative max-w-4xl mx-auto px-4 py-8 z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black mb-1 text-white font-display drop-shadow-lg">Welcome, {clientName}</h1>
            <p className="text-white/80 font-medium">Upload your documents securely</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all text-white font-medium"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Upload Section */}
        <div className="glass-card rounded-2xl p-6 mb-6 border-0 shadow-2xl">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900">
            <Upload className="w-5 h-5" />
            Upload Documents
          </h2>
          <p className="text-sm text-slate-600 font-medium mb-4">
            Select files to upload. They will be automatically classified and organized in your client folder.
          </p>

          <div className="space-y-4">
            <div>
              <input
                id="file-input"
                type="file"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                className="block w-full text-sm text-slate-700 font-medium file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-gradient-to-r file:from-teal-500 file:to-teal-600 file:text-white hover:file:from-teal-600 hover:file:to-teal-700 file:cursor-pointer file:shadow-lg file:shadow-teal-500/25 file:transition-all"
              />
            </div>

            {files && files.length > 0 && (
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                <p className="text-sm text-slate-700 font-bold mb-2">
                  {files.length} file(s) selected
                </p>
                <ul className="text-xs text-slate-600 space-y-1 font-medium">
                  {Array.from(files).map((f, i) => (
                    <li key={i}>• {f.name}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!files || files.length === 0 || uploading}
              className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold px-4 py-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25"
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Upload Files
                </>
              )}
            </button>
          </div>

          {/* Upload Results */}
          {results.length > 0 && (
            <div className="mt-6 space-y-2">
              <h3 className="text-sm font-bold text-slate-900">Upload Results</h3>
              {results.map((r, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-slate-50 p-3 flex items-center justify-between border border-slate-200"
                >
                  <div className="flex items-center gap-3">
                    {r.needsReview ? (
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    )}
                    <div>
                      <p className="text-sm font-bold text-slate-900">{r.filename}</p>
                      <p className="text-xs text-slate-600 font-medium">
                        {r.folder} • {r.labels.join(", ") || "No labels"}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-slate-600 font-medium">
                    {Math.round(r.confidence * 100)}% confidence
                    {r.needsReview && (
                      <span className="ml-2 text-amber-600 font-bold">• Needs Review</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Uploads */}
        {recentUploads.length > 0 && (
          <div className="glass-card rounded-2xl p-6 border-0 shadow-2xl">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900">
              <FileText className="w-5 h-5" />
              Recent Uploads
            </h2>
            <div className="space-y-2">
              {recentUploads.map((upload, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-slate-50 p-3 flex items-center justify-between border border-slate-200"
                >
                  <div>
                    <p className="text-sm font-bold text-slate-900">{upload.filename}</p>
                    <p className="text-xs text-slate-600 font-medium">
                      {upload.folder} • {new Date(upload.uploadedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-xs text-slate-600">
                    {upload.status === "classified" ? (
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-white/60 font-medium">
          Powered by OMGsystems • 2025
        </div>
      </div>
    </div>
  );
}

