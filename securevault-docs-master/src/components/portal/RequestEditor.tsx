'use client';

import * as React from 'react';

export function RequestEditor({ portalId }: { portalId: string }) {
  const [rows, setRows] = React.useState<{ label: string; required: boolean; notes?: string }[]>([]);
  
  React.useEffect(() => {
    fetch(`/api/portal/${portalId}/requests`)
      .then(r => r.json())
      .then(d => setRows(d.items || []));
  }, [portalId]);

  function add() {
    setRows(prev => [...prev, { label: 'New item', required: true }]);
  }

  async function save() {
    await fetch(`/api/org/portals/${portalId}/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: rows })
    });
    alert('Saved!');
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <h4 className="font-medium">Requested Items</h4>
        <button className="btn" onClick={add}>
          Add
        </button>
      </div>
      
      {rows.map((r, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2 rounded bg-black/5">
          <input
            className="border rounded p-2"
            value={r.label}
            onChange={e => {
              const v = [...rows];
              v[i].label = e.target.value;
              setRows(v);
            }}
          />
          <input
            className="border rounded p-2"
            placeholder="notes (optional)"
            value={r.notes || ''}
            onChange={e => {
              const v = [...rows];
              v[i].notes = e.target.value;
              setRows(v);
            }}
          />
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={r.required}
              onChange={e => {
                const v = [...rows];
                v[i].required = e.target.checked;
                setRows(v);
              }}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Required
          </label>
        </div>
      ))}
      
      <div className="flex justify-end">
        <button className="btn btn-primary" onClick={save}>
          Save
        </button>
      </div>
    </div>
  );
}

