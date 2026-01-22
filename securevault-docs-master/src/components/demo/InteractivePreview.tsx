// src/components/demo/InteractivePreview.tsx
// Dynamic interactive preview component

'use client';

import * as React from 'react';
import { Upload, Link2, FileText, Eye, Download, CreditCard, CheckCircle2, ArrowRight, FileCheck, Shield, Zap } from 'lucide-react';

type PreviewType = 
  | 'upload' 
  | 'share' 
  | 'request' 
  | 'ocr' 
  | 'install' 
  | 'pricing' 
  | null;

interface InteractivePreviewProps {
  type: PreviewType;
}

export function InteractivePreview({ type }: InteractivePreviewProps) {
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    if (type) {
      setStep(0);
      const interval = setInterval(() => {
        setStep((s) => {
          if (s >= getMaxSteps(type)) {
            return 0;
          }
          return s + 1;
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [type]);

  if (!type) {
    return (
      <div className="h-full rounded-xl bg-gradient-to-br from-[#3b82f6]/10 via-[#0b0f0c] to-[#3b82f6]/5 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#3b82f6]/20 flex items-center justify-center">
            <FileText className="w-8 h-8 text-[#3b82f6]" />
          </div>
          <p className="text-sm text-white/60">Click "Simulate" to see a live preview</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full rounded-xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-white/10 overflow-hidden relative">
      {/* Mock browser chrome */}
      <div className="h-8 bg-zinc-800 border-b border-white/10 flex items-center gap-2 px-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
        </div>
        <div className="flex-1 h-5 rounded bg-black/40 mx-2 flex items-center px-2">
          <span className="text-[8px] text-white/40">securevaultdocs.com</span>
        </div>
      </div>

      {/* Content area */}
      <div className="p-6 h-[calc(100%-2rem)] overflow-y-auto">
        {renderPreviewContent(type, step)}
      </div>
    </div>
  );
}

function getMaxSteps(type: PreviewType): number {
  switch (type) {
    case 'upload': return 3;
    case 'share': return 4;
    case 'request': return 3;
    case 'ocr': return 4;
    case 'install': return 3;
    case 'pricing': return 2;
    default: return 0;
  }
}

function renderPreviewContent(type: PreviewType, step: number) {
  switch (type) {
    case 'upload':
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Upload className="w-5 h-5 text-[#3b82f6]" />
            <h3 className="text-lg font-semibold text-white">Upload Document</h3>
          </div>
          {step === 0 && (
            <div className="space-y-3 animate-fade-in">
              <div className="border-2 border-dashed border-[#3b82f6]/50 rounded-xl p-8 bg-[#3b82f6]/5 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-[#3b82f6]" />
                <p className="text-sm text-white/70">Drop files here or click to browse</p>
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-3 animate-fade-in">
              <div className="border-2 border-[#3b82f6] rounded-xl p-6 bg-[#3b82f6]/10">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="w-5 h-5 text-[#3b82f6]" />
                  <span className="text-sm font-medium text-white">Invoice_Q4_2025.pdf</span>
                </div>
                <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">
                  <div className="h-full bg-[#3b82f6] rounded-full animate-[progress_1s_ease-out] w-[75%]"></div>
                </div>
                <p className="text-xs text-white/60 mt-2">Uploading... 75%</p>
              </div>
            </div>
          )}
          {step >= 2 && (
            <div className="space-y-3 animate-fade-in">
              <div className="rounded-xl p-4 bg-blue-500/10 border border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-semibold text-white">Upload Complete!</span>
                </div>
                <p className="text-xs text-white/70">File classified as: <span className="font-medium text-blue-400">Bills / Utilities</span></p>
                <p className="text-xs text-white/60 mt-1">Confidence: 85%</p>
              </div>
            </div>
          )}
        </div>
      );

    case 'share':
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Link2 className="w-5 h-5 text-[#3b82f6]" />
            <h3 className="text-lg font-semibold text-white">Create Share Link</h3>
          </div>
          {step === 0 && (
            <div className="space-y-3 animate-fade-in">
              <div className="rounded-xl p-4 bg-white/5 border border-white/10">
                <label className="text-xs text-white/60 mb-2 block">Link Name</label>
                <input className="w-full rounded-lg bg-black/20 px-3 py-2 text-sm text-white border border-white/10" placeholder="Enter link name..." />
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-3 animate-fade-in">
              <div className="rounded-xl p-4 bg-white/5 border border-white/10">
                <label className="text-xs text-white/60 mb-2 block">PIN (Optional)</label>
                <input className="w-full rounded-lg bg-black/20 px-3 py-2 text-sm text-white border border-[#3b82f6]/50" placeholder="4-digit PIN" value="1234" readOnly />
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-3 animate-fade-in">
              <div className="rounded-xl p-4 bg-white/5 border border-white/10">
                <label className="text-xs text-white/60 mb-2 block">Expiry</label>
                <select className="w-full rounded-lg bg-black/20 px-3 py-2 text-sm text-white border border-white/10">
                  <option>7 days</option>
                </select>
              </div>
            </div>
          )}
          {step >= 3 && (
            <div className="space-y-3 animate-fade-in">
              <div className="rounded-xl p-4 bg-blue-500/10 border border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-semibold text-white">Share Link Created!</span>
                </div>
                <div className="mt-3 p-3 rounded-lg bg-black/20">
                  <p className="text-xs text-white/60 mb-1">Link URL:</p>
                  <p className="text-xs font-mono text-[#3b82f6] break-all">svd.to/abc123xyz</p>
                </div>
              </div>
            </div>
          )}
        </div>
      );

    case 'request':
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <FileCheck className="w-5 h-5 text-[#3b82f6]" />
            <h3 className="text-lg font-semibold text-white">Request Files</h3>
          </div>
          {step === 0 && (
            <div className="space-y-3 animate-fade-in">
              <div className="rounded-xl p-4 bg-white/5 border border-white/10">
                <label className="text-xs text-white/60 mb-2 block">Client Email</label>
                <input className="w-full rounded-lg bg-black/20 px-3 py-2 text-sm text-white border border-white/10" placeholder="client@example.com" />
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-3 animate-fade-in">
              <div className="rounded-xl p-4 bg-white/5 border border-white/10">
                <label className="text-xs text-white/60 mb-2 block">Requested Documents</label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <CheckCircle2 className="w-3 h-3 text-[#3b82f6]" />
                    <span>T1 Tax Return</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <CheckCircle2 className="w-3 h-3 text-[#3b82f6]" />
                    <span>NOA (Notice of Assessment)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <CheckCircle2 className="w-3 h-3 text-[#3b82f6]" />
                    <span>Bank Statements (3 months)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {step >= 2 && (
            <div className="space-y-3 animate-fade-in">
              <div className="rounded-xl p-4 bg-blue-500/10 border border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-semibold text-white">Request Sent!</span>
                </div>
                <p className="text-xs text-white/70 mt-2">Email notification sent to client@example.com</p>
              </div>
            </div>
          )}
        </div>
      );

    case 'ocr':
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-5 h-5 text-[#3b82f6]" />
            <h3 className="text-lg font-semibold text-white">OCR Preview</h3>
          </div>
          {step === 0 && (
            <div className="space-y-3 animate-fade-in">
              <div className="rounded-xl p-4 bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-white/60" />
                  <span className="text-sm text-white">Receipt_Starbucks_2025-01-15.pdf</span>
                </div>
                <div className="h-32 rounded-lg bg-black/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#3b82f6] border-t-transparent mx-auto mb-2"></div>
                    <p className="text-xs text-white/60">Processing OCR...</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-3 animate-fade-in">
              <div className="rounded-xl p-4 bg-white/5 border border-white/10">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/60">Pages:</span>
                    <span className="text-white font-medium">1</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/60">Words extracted:</span>
                    <span className="text-white font-medium">253</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/60">Confidence:</span>
                    <span className="text-blue-400 font-medium">92%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-3 animate-fade-in">
              <div className="rounded-xl p-4 bg-white/5 border border-white/10">
                <p className="text-xs text-white/60 mb-2">Extracted Text:</p>
                <div className="p-3 rounded-lg bg-black/20 text-xs text-white/80 font-mono max-h-32 overflow-y-auto">
                  <p>STARBUCKS COFFEE</p>
                  <p>123 Main Street</p>
                  <p>Date: 2025-01-15</p>
                  <p>Amount: $12.45</p>
                  <p>Card: ****1234</p>
                </div>
              </div>
            </div>
          )}
          {step >= 3 && (
            <div className="space-y-3 animate-fade-in">
              <div className="rounded-xl p-4 bg-blue-500/10 border border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-semibold text-white">Classified: Receipts</span>
                </div>
                <p className="text-xs text-white/70 mt-2">Auto-labeled: Food, Entertainment</p>
              </div>
            </div>
          )}
        </div>
      );

    case 'install':
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Download className="w-5 h-5 text-[#3b82f6]" />
            <h3 className="text-lg font-semibold text-white">Install PWA</h3>
          </div>
          {step === 0 && (
            <div className="space-y-3 animate-fade-in">
              <div className="rounded-xl p-4 bg-white/5 border border-white/10 text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-[#3b82f6]/20 flex items-center justify-center">
                  <Download className="w-8 h-8 text-[#3b82f6]" />
                </div>
                <p className="text-sm text-white/70">Install SecureVault Docs as an app</p>
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-3 animate-fade-in">
              <div className="rounded-xl p-4 bg-white/5 border border-[#3b82f6]/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#3b82f6] flex items-center justify-center">
                    <span className="text-xs font-bold text-black">SVD</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">SecureVault Docs</p>
                    <p className="text-xs text-white/60">securevaultdocs.com</p>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-[#3b82f6] text-black text-xs font-semibold">Install</button>
                </div>
              </div>
            </div>
          )}
          {step >= 2 && (
            <div className="space-y-3 animate-fade-in">
              <div className="rounded-xl p-4 bg-blue-500/10 border border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-semibold text-white">Installed Successfully!</span>
                </div>
                <p className="text-xs text-white/70 mt-2">App is now available on your device</p>
              </div>
            </div>
          )}
        </div>
      );

    case 'pricing':
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="w-5 h-5 text-[#3b82f6]" />
            <h3 className="text-lg font-semibold text-white">Pricing Plans</h3>
          </div>
          {step === 0 && (
            <div className="space-y-3 animate-fade-in">
              <div className="grid grid-cols-3 gap-2">
                {['Starter', 'Growth', 'Pro'].map((plan, i) => (
                  <div key={i} className="rounded-lg p-3 bg-white/5 border border-white/10 text-center">
                    <p className="text-xs font-semibold text-white mb-1">{plan}</p>
                    <p className="text-xs text-[#3b82f6]">${i === 0 ? '9' : i === 1 ? '29' : '99'}/mo</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {step >= 1 && (
            <div className="space-y-3 animate-fade-in">
              <div className="rounded-xl p-4 bg-blue-500/10 border border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowRight className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-semibold text-white">View Full Pricing</span>
                </div>
                <p className="text-xs text-white/70 mt-2">See all features and compare plans</p>
              </div>
            </div>
          )}
        </div>
      );

    default:
      return null;
  }
}

