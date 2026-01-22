// src/app/p/[portalId]/page.tsx

"use client";

import * as React from "react";

async function fetchPortal(portalId: string) {
  const res = await fetch(`/api/portals/${portalId}`);
  return res.json();
}

async function presignUpload(portalId: string, file: File) {
  const res = await fetch(`/api/portals/${portalId}/presign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: file.name,
      type: file.type,
      size: file.size,
    }),
  });
  return res.json();
}

async function putToS3(
  url: string,
  file: File,
  headers: Record<string, string> = {}
) {
  return fetch(url, { method: "PUT", body: file, headers });
}

async function fetchRequests(portalId: string) {
  const res = await fetch(`/api/portals/${portalId}/requests`);
  return res.json();
}

type Props = {
  params: Promise<{ portalId: string }>;
};

export default function ClientPortalPage({ params }: Props) {
  const [portalId, setPortalId] = React.useState<string>("");
  const [portal, setPortal] = React.useState<any>(null);
  const [files, setFiles] = React.useState<File[]>([]);
  const [msgs, setMsgs] = React.useState<string[]>([]);
  const [requests, setRequests] = React.useState<any[]>([]);

  React.useEffect(() => {
    params.then((p) => setPortalId(p.portalId));
  }, [params]);

  React.useEffect(() => {
    if (!portalId) return;
    (async () => {
      const p = await fetchPortal(portalId);
      setPortal(p);
      const r = await fetchRequests(portalId);
      setRequests(r.requests || []);
    })();
  }, [portalId]);

  async function onUpload() {
    for (const f of files) {
      const p = await presignUpload(portalId, f);
      if (p.mock) {
        setMsgs((m) => [`Uploaded (mock): ${f.name}`, ...m]);
        continue;
      }
      await putToS3(p.url, f, p.headers ?? {});
      setMsgs((m) => [`Uploaded: ${f.name}`, ...m]);
    }
  }

  if (!portal || portal.error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-xl font-semibold">Client portal</h1>
        <p className="text-sm opacity-80">
          This portal link is not valid or has expired.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">
          {portal.title || "Client portal"}
        </h1>
        <p className="text-sm opacity-80">
          Organization: {portal.orgId} • Vertical: {portal.vertical}
        </p>
        <p className="text-xs opacity-70">
          For: {portal.client?.name} ({portal.client?.email})
        </p>
      </div>

      {requests.length > 0 && (
        <div className="rounded-2xl border p-4 space-y-2">
          <h2 className="text-sm font-semibold">Requested items</h2>
          {requests.map((r: any) => (
            <div
              key={r.id}
              className="rounded-xl bg-muted/40 p-3 space-y-1"
            >
              <div className="text-xs opacity-70">
                Request: {r.templateKey} • Status: {r.status}
              </div>
              <ul className="list-disc pl-4 text-xs">
                {r.items
                  .filter((i: any) => !i.uploaded)
                  .map((i: any) => (
                    <li key={i.key}>{i.label}</li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-2xl border p-4 space-y-3">
        <div className="text-sm font-semibold">Upload files</div>
        <input
          type="file"
          multiple
          className="text-sm"
          onChange={(e) =>
            setFiles(Array.from(e.target.files ?? []) as File[])
          }
        />
        <button
          type="button"
          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm"
          onClick={onUpload}
        >
          Upload
        </button>
      </div>

      <div className="grid gap-2">
        {msgs.map((m, i) => (
          <div
            key={i}
            className="rounded-xl border p-2 text-xs opacity-80"
          >
            {m}
          </div>
        ))}
      </div>
    </div>
  );
}

