'use client';

import * as React from 'react';

export function UploadsDropzone({ portalId }: { portalId: string }) {
  const [files, setFiles] = React.useState<{ name: string; size: number }[]>([]);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;

    setFiles(prev => [...prev, { name: f.name, size: f.size }]);

    // mock presign → submit
    const urlRes = await fetch(`/api/portal/${portalId}/presign`, { method: 'POST' });
    if (!urlRes.ok) return;

    await fetch(`/api/portal/${portalId}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName: f.name, bytes: f.size })
    });
  }

  return (
    <div className="p-4 rounded-2xl border border-dashed">
      <p className="text-sm mb-2">Upload files (mock)</p>
      <input type="file" onChange={onPick} />
      <ul className="mt-3 text-xs opacity-70">
        {files.map((f, i) => (
          <li key={i}>
            {f.name} – {f.size} bytes
          </li>
        ))}
      </ul>
    </div>
  );
}

