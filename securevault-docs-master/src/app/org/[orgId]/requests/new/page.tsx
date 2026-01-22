// src/app/org/[orgId]/requests/new/page.tsx

"use client";

import * as React from "react";
import type { Vertical } from "@/lib/orgContext";
import type {
  RequestTemplate,
  RequestTemplateItem,
} from "@/data/request-templates";
import { useSearchParams } from "next/navigation";
import DateTimePicker from "@/components/shared/DateTimePicker";

type Props = {
  params: Promise<{ orgId: string }>;
  searchParams: Promise<{ v?: Vertical }>;
};

async function fetchPortals(orgId: string) {
  const res = await fetch(`/api/org/${orgId}/portals-list`);
  return res.json();
}

async function fetchTemplates(orgId: string) {
  const res = await fetch(`/api/org/${orgId}/request-templates`);
  return res.json();
}

async function createRequest(orgId: string, payload: any) {
  const res = await fetch(`/api/org/${orgId}/requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export default function NewRequestPage({ params, searchParams }: Props) {
  const [orgId, setOrgId] = React.useState<string>("");
  const [vertical, setVertical] = React.useState<Vertical>("accounting");
  const [portals, setPortals] = React.useState<any[]>([]);
  const [templates, setTemplates] = React.useState<RequestTemplate[]>([]);
  const [selectedPortalId, setSelectedPortalId] = React.useState("");
  const [selectedTemplateKey, setSelectedTemplateKey] = React.useState("");
  const [items, setItems] = React.useState<RequestTemplateItem[]>([]);
  const [dueAt, setDueAt] = React.useState("");
  const [createdId, setCreatedId] = React.useState<string | null>(null);

  React.useEffect(() => {
    params.then((p) => setOrgId(p.orgId));
    searchParams.then((s) => {
      if (s.v) setVertical(s.v);
    });
  }, [params, searchParams]);

  React.useEffect(() => {
    if (!orgId) return;
    (async () => {
      const p = await fetchPortals(orgId);
      setPortals(p.portals || []);
      const t = await fetchTemplates(orgId);
      setTemplates(t.templates || []);
    })();
  }, [orgId]);

  React.useEffect(() => {
    const t = templates.find((x) => x.key === selectedTemplateKey);
    if (t) setItems(t.items);
  }, [selectedTemplateKey, templates]);

  async function onCreate() {
    if (!selectedPortalId) {
      alert("Pick a client portal first.");
      return;
    }
    const out = await createRequest(orgId, {
      portalId: selectedPortalId,
      templateKey: selectedTemplateKey || "custom",
      items,
      dueAt: dueAt || null,
      vertical,
    });
    setCreatedId(out.id);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-xl font-semibold">Send request for documents</h1>

      <div className="space-y-4">
        <div className="rounded-2xl border p-4 space-y-3">
          <h2 className="text-sm font-semibold">1. Select client portal</h2>
          <select
            className="w-full rounded-xl border p-2 text-sm"
            value={selectedPortalId}
            onChange={(e) => setSelectedPortalId(e.target.value)}
          >
            <option value="">Choose a portal…</option>
            {portals.map((p) => (
              <option key={p.id} value={p.id}>
                {p.client?.name || p.title} ({p.client?.email})
              </option>
            ))}
          </select>
          {!portals.length && (
            <p className="text-xs opacity-70">
              No portals yet. Create one from Quick Actions first.
            </p>
          )}
        </div>

        <div className="rounded-2xl border p-4 space-y-3">
          <h2 className="text-sm font-semibold">
            2. Pick template (optional)
          </h2>
          <select
            className="w-full rounded-xl border p-2 text-sm"
            value={selectedTemplateKey}
            onChange={(e) => setSelectedTemplateKey(e.target.value)}
          >
            <option value="">Custom request…</option>
            {templates.map((t) => (
              <option key={t.key} value={t.key}>
                {t.title}
              </option>
            ))}
          </select>
          {selectedTemplateKey && (
            <p className="text-xs opacity-70">
              {templates.find((t) => t.key === selectedTemplateKey)
                ?.description || ""}
            </p>
          )}
        </div>

        <div className="rounded-2xl border p-4 space-y-3">
          <h2 className="text-sm font-semibold">3. Checklist</h2>
          <ul className="space-y-2 text-sm">
            {items.map((it, idx) => (
              <li
                key={it.key + idx}
                className="flex items-center justify-between gap-2"
              >
                <span>
                  {it.label}
                  {it.required && (
                    <span className="text-[11px] ml-1 text-red-500">
                      *
                    </span>
                  )}
                </span>
                <button
                  type="button"
                  className="text-[11px] px-2 py-1 rounded-lg border"
                  onClick={() =>
                    setItems((prev) =>
                      prev.filter((_, i) => i !== idx)
                    )
                  }
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mt-2 text-xs px-2 py-1 rounded-lg bg-muted"
            onClick={() =>
              setItems((prev) => [
                ...prev,
                {
                  key: "custom_" + (prev.length + 1),
                  label: "Custom item",
                },
              ])
            }
          >
            + Add item
          </button>
        </div>

        <div className="rounded-2xl border p-4 space-y-3">
          <h2 className="text-sm font-semibold">4. Due date</h2>
          <DateTimePicker
            value={dueAt}
            onChange={setDueAt}
            min={new Date().toISOString().slice(0, 16)}
            placeholder="Select due date and time"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm"
          onClick={onCreate}
        >
          Create request
        </button>
        <a
          href={`/org/${orgId}/overview`}
          className="px-4 py-2 rounded-xl border text-sm"
        >
          Cancel
        </a>
      </div>

      {createdId && (
        <div className="rounded-xl border p-3 text-sm">
          Request created with ID{" "}
          <code className="text-xs">{createdId}</code>. It will show up
          on the client&apos;s portal under &quot;Requested items&quot;.
        </div>
      )}
    </div>
  );
}

