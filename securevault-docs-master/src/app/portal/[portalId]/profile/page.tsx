// app/portal/[portalId]/profile/page.tsx

"use client";

import React, { useEffect, useState } from "react";

type Props = {
  params: Promise<{ portalId: string }>;
};

export default function PortalProfile({ params }: Props) {
  const [portalId, setPortalId] = useState<string>("");
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    params.then(p => setPortalId(p.portalId));
  }, [params]);

  useEffect(() => {
    if (!portalId) return;
    fetch(`/api/mock/portal/${portalId}`)
      .then(r => r.json())
      .then(setProfile);
  }, [portalId]);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Profile</h1>
      <div className="rounded-2xl border p-4 space-y-2">
        <div className="text-sm">
          <span className="text-muted-foreground">Name:</span> {profile?.clientName}
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">Email:</span> {profile?.clientEmail}
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">Portal:</span> {portalId}
        </div>
      </div>
    </div>
  );
}

