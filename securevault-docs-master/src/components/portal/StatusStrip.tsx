'use client';

import * as React from 'react';

export function StatusStrip({ portalId }: { portalId: string }) {
  const [data, setData] = React.useState<{ required: number; received: number }>({
    required: 0,
    received: 0
  });

  React.useEffect(() => {
    (async () => {
      const req = await fetch(`/api/portal/${portalId}/requests`).then(r => r.json());
      const sub = await fetch(`/api/portal/${portalId}/submissions`).then(r => r.json());
      setData({
        required: (req.items || []).filter((r: any) => r.required).length,
        received: (sub.items || []).length
      });
    })();
  }, [portalId]);

  return (
    <div className="rounded-2xl bg-black/10 p-3 text-sm flex gap-4">
      <span>
        Required: <b>{data.required}</b>
      </span>
      <span>
        Received: <b>{data.received}</b>
      </span>
      <span>
        Missing: <b>{Math.max(0, data.required - data.received)}</b>
      </span>
    </div>
  );
}

