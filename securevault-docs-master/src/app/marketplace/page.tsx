"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { listTemplates, dryRunInstall, doInstall } from '@/lib/marketplace/client';
import { TemplatePreviewModal } from '@/components/marketplace/TemplatePreviewModal';
import { TemplateCardPreview } from '@/components/marketplace/TemplateCardPreview';

// --- Tiny helper to call mock API safely in Test Mode ---
async function callApi(path: string) {
  try {
    const res = await fetch(path, { method: "POST" });
    if (res.ok) return await res.json();
    // If mock API not present yet, simulate success so testing isn't blocked
    await new Promise(r => setTimeout(r, 600));
    return { ok: true, simulated: true };
  } catch {
    await new Promise(r => setTimeout(r, 600));
    return { ok: true, simulated: true };
  }
}

function TestBadge() {
  const test = process.env.NEXT_PUBLIC_SVD_MARKETPLACE_TEST_MODE === "1";
  if (!test) return null;

  return (
    <div className="mb-4 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 text-yellow-200 px-3 py-2 text-xs">
      Test Mode: installs are in‑memory only. No Stripe, no S3, no email.
    </div>
  );
}

export default function MarketplacePage() {
  const router = useRouter();
  const [templates, setTemplates] = React.useState<any[]>([]);
  const [busy, setBusy] = React.useState<string | null>(null);
  const [toast, setToast] = React.useState<string | null>(null);
  const [previewTemplate, setPreviewTemplate] = React.useState<{
    id: string;
    title: string;
    vertical: 'business' | 'personal';
  } | null>(null);

  React.useEffect(() => {
    listTemplates().then(d => setTemplates(d.items || []));
  }, []);

  const doCall = async (label: string, path: string) => {
    setBusy(label);
    setToast(null);
    const res = await callApi(path);
    setBusy(null);
    setToast(res?.ok ? `${label} complete${res?.simulated ? " (simulated)" : ""}.` : `${label} failed.`);
  };

  // Quick action buttons - use first template if available
  const handleQuickDryRun = async () => {
    if (templates.length === 0) {
      setToast("No templates available");
      return;
    }
    await onDryRun(templates[0].id, templates[0].vertical);
  };

  const handleQuickInstallBusiness = async () => {
    if (templates.length === 0) {
      setToast("No templates available");
      return;
    }
    const businessTemplate = templates.find(t => t.vertical === 'business') || templates[0];
    await onInstall(businessTemplate.id, 'business');
  };

  const handleQuickInstallPersonal = async () => {
    if (templates.length === 0) {
      setToast("No templates available");
      return;
    }
    const personalTemplate = templates.find(t => t.vertical === 'personal') || templates[0];
    await onInstall(personalTemplate.id, 'personal');
  };

  async function onPreview(id: string, title: string, vertical: 'business'|'personal') {
    setPreviewTemplate({ id, title, vertical });
  }

  async function onDryRun(id: string, target: 'business'|'personal') {
    setBusy(`dry:${id}`);
    setToast(null);
    try {
      const res = await dryRunInstall(id, target);
      // Show preview modal after dry run
      const template = templates.find(t => t.id === id);
      if (template) {
        setPreviewTemplate({ id, title: template.title, vertical: target });
      }
      setToast(res.message || 'Dry-run complete - Preview shown');
    } catch (e) {
      setToast('Dry-run failed');
    } finally {
      setBusy(null);
    }
  }

  async function onInstall(id: string, target: 'business'|'personal') {
    setBusy(`inst:${id}`);
    setToast(null);
    try {
      const res = await doInstall(id, target);
      setToast(res.message || 'Installed');
      
      // Redirect to appropriate dashboard templates page
      if (target === 'business') {
        router.push('/demo/business/templates?template=' + id);
      } else {
        router.push('/demo/personal/templates?template=' + id);
      }
    } catch (e) {
      setToast('Install failed');
    } finally {
      setBusy(null);
    }
  }

  function handleInstallFromPreview(target: 'business' | 'personal') {
    if (!previewTemplate) return;
    setPreviewTemplate(null);
    onInstall(previewTemplate.id, target);
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top Navigation - Same as Homepage */}
      <header className="border-b border-gray-200 bg-white backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Left: Logo + SecureVault Docs */}
          <Link href="/" className="flex items-center py-2">
            <img src="/logo.png" alt="SecureVault Docs" className="h-20" />
          </Link>

          {/* Right: Try Demo, Pricing, Marketplace, Login, Get Started */}
          <div className="flex items-center gap-3">
            <Link
              href="/demo"
              className="px-4 py-2 text-sm font-medium rounded-full transition text-gray-600 hover:text-blue-600"
            >
              Try Demo
            </Link>
            <Link
              href="/pricing"
              className="px-4 py-2 text-sm font-medium rounded-full transition text-gray-600 hover:text-blue-600"
            >
              Pricing
            </Link>
            <Link
              href="/marketplace"
              className="px-4 py-2 text-sm font-medium rounded-full transition text-gray-600 hover:text-blue-600"
            >
              Marketplace
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium rounded-full transition text-gray-600 hover:text-blue-600"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <TestBadge />

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2 text-gray-900">Marketplace</h1>
          <p className="text-sm text-gray-600">
            Install ready-made vault structures, request templates, and workflows.
          </p>
        </div>

        {/* Hero */}
        <section className="mt-8 grid gap-6 md:grid-cols-5">
          <div className="md:col-span-3 rounded-3xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-semibold text-gray-900">Jump‑start your vault with ready‑made structures</h2>
            <p className="mt-2 text-sm text-gray-600">
              Install folder trees, labels, quick‑actions, and starter checklists in one click. Works for Business and Personal workspaces.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <button
                onClick={handleQuickDryRun}
                disabled={!!busy || templates.length === 0}
                className="rounded-2xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 hover:bg-gray-50 disabled:opacity-50"
              >
                {busy?.startsWith("dry:") ? "Running…" : "Dry‑run"}
              </button>
              <button
                onClick={handleQuickInstallBusiness}
                disabled={!!busy || templates.length === 0}
                className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {busy?.startsWith("inst:") ? "Installing…" : "Install to Business"}
              </button>
              <button
                onClick={handleQuickInstallPersonal}
                disabled={!!busy || templates.length === 0}
                className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {busy?.startsWith("inst:") ? "Installing…" : "Install to Personal"}
              </button>
            </div>
            {toast && <div className="mt-3 text-xs text-blue-600">{toast}</div>}
          </div>

          <aside className="md:col-span-2 rounded-3xl border border-gray-200 bg-white p-6">
            <h3 className="font-medium text-gray-900">What gets installed</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>Folder scaffolds (e.g., Taxes, Receipts, Contracts)</li>
              <li>Labels & saved searches</li>
              <li>Quick actions & intake links</li>
              <li>Starter checklists</li>
            </ul>
            <div className="mt-4 rounded-xl bg-blue-50 p-3 text-xs text-gray-700">
              Tip: Use <span className="text-blue-600 font-medium">Dry‑run</span> to preview the changes before installing.
            </div>
          </aside>
        </section>

        {/* Gallery (public viewable) */}
        <section className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900">Featured templates</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {templates.length > 0 ? (
              templates.map((tpl) => (
                <div key={tpl.id} className="rounded-2xl border border-gray-200 bg-white p-4 hover:border-gray-300 transition">
                  <TemplateCardPreview templateId={tpl.id} />
                  <div className="mt-3 text-sm font-medium text-gray-900">{tpl.title}</div>
                  <div className="mt-1 text-xs text-gray-600">{tpl.summary}</div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => onPreview(tpl.id, tpl.title, tpl.vertical)}
                      disabled={!!busy}
                      className="flex-1 rounded-xl border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-900 hover:bg-gray-50 disabled:opacity-50 transition"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => onDryRun(tpl.id, tpl.vertical)}
                      disabled={!!busy}
                      className="flex-1 rounded-xl border border-blue-300 bg-blue-50 px-3 py-1.5 text-xs text-blue-600 hover:bg-blue-100 disabled:opacity-50 transition"
                    >
                      Dry Run
                    </button>
                    <button
                      onClick={() => onInstall(tpl.id, tpl.vertical)}
                      disabled={!!busy}
                      className="flex-1 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition"
                    >
                      Install
                    </button>
                  </div>
                </div>
              ))
            ) : (
              ["Starter Vault","Receipts & Expenses","Client Intake Basics"].map((name, i) => (
                <div key={i} className="rounded-2xl border border-gray-200 bg-white p-4">
                  <div className="h-28 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50" />
                  <div className="mt-3 text-sm font-medium text-gray-900">{name}</div>
                  <div className="mt-1 text-xs text-gray-600">Includes folders, labels, and a checklist.</div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 flex items-center justify-between border-t border-gray-200 pt-6 text-xs text-gray-600">
          <span>Powered by OMGsystems • 2025</span>
          <a href="/" className="text-blue-600 hover:text-blue-700">Back to home</a>
        </footer>
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <TemplatePreviewModal
          templateId={previewTemplate.id}
          templateTitle={previewTemplate.title}
          templateVertical={previewTemplate.vertical}
          onClose={() => setPreviewTemplate(null)}
          onInstall={handleInstallFromPreview}
        />
      )}
    </main>
  );
}
