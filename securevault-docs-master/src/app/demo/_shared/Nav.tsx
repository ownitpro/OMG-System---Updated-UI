'use client';

import Link from 'next/link';

export function Subnav({ kind }:{ kind: 'business'|'personal' }){
  const base = `/demo/${kind}`;

  const L = ({href, children}:{href:string; children:React.ReactNode})=> <Link href={href} className="px-3 py-1 rounded-xl hover:bg-white/10">{children}</Link>;

  return (
    <div className="mb-4 flex gap-2 text-sm text-white/80">
      <L href={`${base}`}>Overview</L>
      <L href={`${base}/upload`}>Upload</L>
      {kind === 'business' && <L href={`${base}/portals`}>Client Portals</L>}
      <L href={`${base}/requests`}>Requests</L>
      <L href={`${base}/shares/new`}>New Share</L>
      <L href={`${base}/analytics`}>Analytics</L>
      <L href={`${base}/billing`}>Billing</L>
      <L href={`${base}/settings`}>Settings</L>
    </div>
  );
}

