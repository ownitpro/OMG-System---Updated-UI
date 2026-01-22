'use client';

export function ShareLink({ portalId, token }: { portalId: string; token?: string }) {
  const href = token
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/portal/${portalId}?token=${token}`
    : '';

  async function copy() {
    if (!href) return;
    await navigator.clipboard.writeText(href);
    alert('Link copied');
  }

  return (
    <div className="text-sm flex items-center gap-2">
      <input readOnly className="w-full p-2 rounded border" value={href} />
      <button className="btn" onClick={copy}>
        Copy
      </button>
    </div>
  );
}

