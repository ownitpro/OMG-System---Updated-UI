'use client';

export function RevokeButton({ portalId }: { portalId: string }) {
  async function revoke() {
    await fetch(`/api/org/portals/${portalId}/revoke`, { method: 'POST' });
    alert('Portal closed (mock).');
    window.location.reload();
  }

  return (
    <button className="btn btn-danger" onClick={revoke}>
      Close Portal
    </button>
  );
}

