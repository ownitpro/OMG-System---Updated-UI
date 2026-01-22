'use client';

import * as React from 'react';
import Link from 'next/link';

export function QuickActions({ items }:{ items: any[] }){
  return (
    <div className="rounded-2xl bg-white/5 p-4 mb-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((it)=>{
          const isLink = it.action.startsWith('/');
          return isLink ? (
            <Link key={it.id} href={it.action} className="w-full rounded-2xl px-3 py-2 bg-white/10 hover:bg-white/15">
              {it.title}
            </Link>
          ) : (
            <button key={it.id} className="w-full rounded-2xl px-3 py-2 bg-white/10 hover:bg-white/15" onClick={async()=>{
              const [method, url] = it.action.split(':');
              await fetch(url, { method: method as any, body: method==='POST'? JSON.stringify({ from:'quick-action' }): undefined, headers:{'Content-Type':'application/json'} });
              alert('Mock action complete');
            }}>{it.title}</button>
          );
        })}
      </div>
    </div>
  );
}

