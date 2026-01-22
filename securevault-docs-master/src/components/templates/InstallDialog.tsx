'use client';

import * as React from 'react';

export function InstallDialog({ open, result, onClose }:{ open:boolean; result:any; onClose:()=>void }){
  if(!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-background rounded-2xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold">{result?.installId? 'Installed' : 'Dry run'}</h3>
        {!result?.installId ? (
          <div className="text-sm mt-2">
            <div className="font-medium mb-1">Collisions</div>
            <div className="text-xs text-muted-foreground">Folders: {result?.collisions?.folders?.join(', ') || 'None'}</div>
            <div className="text-xs text-muted-foreground">Labels: {result?.collisions?.labels?.join(', ') || 'None'}</div>
          </div>
        ):(
          <div className="text-sm mt-2">Install ID: {result.installId}</div>
        )}
        <div className="mt-4 flex justify-end"><button className="rounded-xl px-3 py-2 bg-foreground text-background" onClick={onClose}>Close</button></div>
      </div>
    </div>
  );
}

