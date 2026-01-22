// src/app/demo/business/requests/page.tsx
// Interactive requests page with templates

'use client';

import * as React from 'react';
import { Plus, UploadCloud } from 'lucide-react';

const KEY = 'svd_demo_requests_v1';
const TPL_KEY = 'svd_demo_templates_v1';

const DEFAULT_TEMPLATES = [
  {
    id: 'tpl_tax_2025',
    title: 'Tax Year Docs (Business)',
    items: ['T2 return', 'NOA', 'GST/HST', 'Bank statements (3m)', 'Payroll summary'],
  },
  {
    id: 'tpl_real_estate',
    title: 'Real Estate Deal Pack',
    items: ['ID (2)', 'Purchase & Sale', 'Mortgage docs', 'Inspection', 'Appraisal'],
  },
  {
    id: 'tpl_contractor',
    title: 'Contractor Job Start',
    items: ['Insurance cert', 'WSIB', 'Quote', 'Materials list', 'Schedule'],
  },
  {
    id: 'tpl_pm',
    title: 'Project Kickoff',
    items: ['SOW', 'PO', 'Change control', 'Milestone plan'],
  },
];

function load() {
  if (typeof window === 'undefined') return [];
  return JSON.parse(sessionStorage.getItem(KEY) || '[]');
}

function save(v: any[]) {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(KEY, JSON.stringify(v));
}

function loadTpl() {
  if (typeof window === 'undefined') return DEFAULT_TEMPLATES;
  return JSON.parse(sessionStorage.getItem(TPL_KEY) || JSON.stringify(DEFAULT_TEMPLATES));
}

function saveTpl(v: any[]) {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(TPL_KEY, JSON.stringify(v));
}

export default function RequestsPage() {
  const [rows, setRows] = React.useState<any[]>([]);
  const [templates, setTemplates] = React.useState<any[]>([]);
  const [showNew, setShowNew] = React.useState(false);
  const [form, setForm] = React.useState({ forClient: '', title: '', items: '' });
  const [showTpl, setShowTpl] = React.useState(false);
  const [tplForm, setTplForm] = React.useState({ title: '', items: '' });

  React.useEffect(() => {
    setRows(load());
    setTemplates(loadTpl());
  }, []);

  function addReq() {
    const id = 'req_' + Math.random().toString(36).slice(2);
    const now = new Date().toISOString();
    const items = form.items
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const rec = {
      id,
      forClient: form.forClient || 'Unassigned',
      title: form.title || 'Request',
      items,
      createdAt: now,
      status: 'Open',
    };
    const next = [rec, ...rows];
    setRows(next);
    save(next);
    setShowNew(false);
    setForm({ forClient: '', title: '', items: '' });
    alert('Mock request created.');
  }

  function useTemplate(t: any) {
    setShowNew(true);
    setForm({ forClient: '', title: t.title, items: t.items.join(', ') });
  }

  function addTemplate() {
    const id = 'tpl_' + Math.random().toString(36).slice(2);
    const items = tplForm.items
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const next = [{ id, title: tplForm.title, items }, ...templates];
    setTemplates(next);
    saveTpl(next);
    setTplForm({ title: '', items: '' });
    setShowTpl(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-zinc-100">Requests</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowTpl((s) => !s)}
            className="px-3 py-2 rounded-2xl bg-zinc-800 text-zinc-100 inline-flex items-center gap-2 hover:bg-zinc-700"
          >
            <UploadCloud className="h-4 w-4" />
            Templates
          </button>
          <button
            onClick={() => setShowNew((s) => !s)}
            className="px-4 py-2 rounded-2xl bg-blue-600 text-white inline-flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New request
          </button>
        </div>
      </div>
      {showTpl && (
        <div className="rounded-2xl border p-4 space-y-3 bg-muted/40">
          <div className="text-sm font-medium text-zinc-100">Templates</div>
          <div className="grid md:grid-cols-2 gap-3">
            {templates.map((t) => (
              <div key={t.id} className="rounded-xl border border-zinc-800 p-3 bg-zinc-950">
                <div className="font-medium text-zinc-100">{t.title}</div>
                <div className="text-xs text-zinc-400">{t.items.join(', ')}</div>
                <div className="mt-2">
                  <button onClick={() => useTemplate(t)} className="px-3 py-1 rounded-xl bg-blue-600 text-white">
                    Use template
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-zinc-800 pt-3">
            <div className="text-sm font-medium mb-2 text-zinc-100">Create template</div>
            <div className="grid md:grid-cols-2 gap-2">
              <input
                className="rounded-xl px-3 py-2 bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500"
                placeholder="Title"
                value={tplForm.title}
                onChange={(e) => setTplForm({ ...tplForm, title: e.target.value })}
              />
              <input
                className="rounded-xl px-3 py-2 bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500"
                placeholder="Items (comma-separated)"
                value={tplForm.items}
                onChange={(e) => setTplForm({ ...tplForm, items: e.target.value })}
              />
            </div>
            <div className="mt-2">
              <button onClick={addTemplate} className="px-3 py-1 rounded-xl bg-zinc-800 text-zinc-100 hover:bg-zinc-700">
                Save template
              </button>
            </div>
          </div>
        </div>
      )}
      {showNew && (
        <div className="rounded-2xl border p-4 grid md:grid-cols-2 gap-3 bg-muted/40">
          <input
            className="rounded-xl px-3 py-2 bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500"
            placeholder="For client (portal id or name)"
            value={form.forClient}
            onChange={(e) => setForm({ ...form, forClient: e.target.value })}
          />
          <input
            className="rounded-xl px-3 py-2 bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="rounded-xl px-3 py-2 bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 md:col-span-2"
            placeholder="Requested items (comma-separated)"
            value={form.items}
            onChange={(e) => setForm({ ...form, items: e.target.value })}
          />
          <div className="col-span-full flex gap-2">
            <button onClick={addReq} className="px-4 py-2 rounded-xl bg-blue-600 text-white">
              Create
            </button>
            <button onClick={() => setShowNew(false)} className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-100 hover:bg-zinc-700">
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="rounded-2xl border border-zinc-800 divide-y divide-zinc-800">
        <div className="grid grid-cols-5 gap-2 px-4 py-2 text-xs text-zinc-400">
          <div>Title</div>
          <div>For</div>
          <div>Items</div>
          <div>Created</div>
          <div className="text-right">Status</div>
        </div>
        {rows.map((r) => (
          <div key={r.id} className="grid grid-cols-5 gap-2 px-4 py-3 items-center">
            <div className="font-medium text-zinc-100">{r.title}</div>
            <div className="text-zinc-200">{r.forClient}</div>
            <div className="text-xs text-zinc-400 truncate">{r.items.join(', ')}</div>
            <div className="text-xs text-zinc-400">{new Date(r.createdAt).toLocaleString()}</div>
            <div className="text-right text-sm text-zinc-200">{r.status}</div>
          </div>
        ))}
        {rows.length === 0 && (
          <div className="px-4 py-8 text-sm text-zinc-400">No requests yet. Click "New request".</div>
        )}
      </div>
    </div>
  );
}
