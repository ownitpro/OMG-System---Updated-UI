'use client';

import * as React from 'react';

export function TemplateCard({ item, onPreview }: { item: any; onPreview: (item:any)=>void }){
  return (
    <button
      onClick={() => onPreview(item)}
      className="w-full text-left rounded-2xl border p-4 hover:border-foreground/30 hover:bg-muted/40 transition"
    >
      <div className="text-sm text-muted-foreground">{item.scope.toUpperCase()}</div>
      <div className="text-lg font-semibold">{item.name}</div>
      <div className="text-sm mt-1 line-clamp-2">{item.description}</div>
      <div className="text-xs mt-3 text-muted-foreground">Folders: {item.preview.folders.slice(0,3).join(', ')}{item.preview.folders.length>3?'…':''}</div>
    </button>
  );
}

