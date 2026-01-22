'use client';

import * as React from 'react';

export function TemplatePreview({ item, onClose, onInstall }: { item:any; onClose:()=>void; onInstall:(apply:boolean)=>void }){
  if(!item) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end">
      <div className="h-full w-full max-w-xl bg-background p-6 overflow-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <button className="text-sm" onClick={onClose}>Close</button>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Folders</h3>
            <ul className="space-y-1 text-sm">
              {item.vault.folders.map((f:any)=> <li key={f.path} className="rounded bg-muted/50 px-2 py-1">{f.path}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Labels</h3>
            <ul className="space-y-1 text-sm">
              {item.vault.labels.map((l:any)=> <li key={l.key} className="rounded bg-muted/50 px-2 py-1">{l.key}</li>)}
            </ul>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Request Templates</h3>
          <ul className="space-y-2 text-sm">
            {item.requests.map((r:any)=> (
              <li key={r.name} className="rounded border p-2">
                <div className="font-medium">{r.name}</div>
                <div className="text-xs text-muted-foreground">Items: {r.items.join(', ')}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex gap-2">
          <button className="rounded-xl px-3 py-2 bg-muted" onClick={()=>onInstall(false)}>Dry run</button>
          <button className="rounded-xl px-3 py-2 bg-foreground text-background" onClick={()=>onInstall(true)}>Install</button>
        </div>
      </div>
    </div>
  );
}

