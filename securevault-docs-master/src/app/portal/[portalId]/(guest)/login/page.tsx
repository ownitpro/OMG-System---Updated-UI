'use client';

import * as React from 'react';
import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function PortalLoginContent({ params }: { params: { portalId: string } }) {
  const [token, setToken] = React.useState('');
  const [pin, setPin] = React.useState('');
  const sp = useSearchParams();
  const router = useRouter();

  React.useEffect(() => {
    const t = sp.get('token');
    if (t) setToken(t);
  }, [sp]);

  async function submit() {
    // mock: accept any token; in real use POST /api/portal/:id/session
    router.push(`/portal/${params.portalId}/requests`);
  }

  return (
    <main className="container max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-xl font-semibold">Secure Access</h1>
      <input
        className="w-full border rounded p-2"
        placeholder="Token"
        value={token}
        onChange={e => setToken(e.target.value)}
      />
      <input
        className="w-full border rounded p-2"
        placeholder="PIN (if provided)"
        value={pin}
        onChange={e => setPin(e.target.value)}
      />
      <button className="btn btn-primary w-full" onClick={submit}>
        Continue
      </button>
    </main>
  );
}

export default function PortalLogin({ params }: { params: { portalId: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-gray-400">Loading...</div></div>}>
      <PortalLoginContent params={params} />
    </Suspense>
  );
}

