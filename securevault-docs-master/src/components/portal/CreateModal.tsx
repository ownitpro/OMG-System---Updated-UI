'use client';

import * as React from 'react';
import { useState } from 'react';

export function CreatePortalModal({ orgId, personalId }: { orgId?: string; personalId?: string }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [days, setDays] = useState(14);

  async function create() {
    const res = await fetch(
      orgId ? `/api/org/${orgId}/portals` : `/api/personal/portals`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ externalName: name, email, pin, expiresInDays: days })
      }
    );
    
    if (res.ok) {
      setOpen(false);
      setName('');
      setEmail('');
      setPin('');
      window.location.reload(); // Refresh to show new portal
    }
  }

  return (
    <div>
      <button className="btn" onClick={() => setOpen(true)}>
        Create Client Portal
      </button>
      
      {open && (
        <div className="fixed inset-0 bg-black/50 grid place-items-center z-50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-black">
            <h3 className="text-xl font-semibold mb-4">New Client Portal</h3>
            
            <label className="block text-sm mb-1">Name</label>
            <input
              className="w-full mb-3 border rounded p-2"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="2025 Tax Pack – John & Mary"
            />
            
            <label className="block text-sm mb-1">Client Email (optional)</label>
            <input
              className="w-full mb-3 border rounded p-2"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="client@example.com"
            />
            
            <label className="block text-sm mb-1">PIN (optional)</label>
            <input
              className="w-full mb-3 border rounded p-2"
              value={pin}
              onChange={e => setPin(e.target.value)}
              placeholder="4–6 digits"
            />
            
            <label className="block text-sm mb-1">Expires in (days)</label>
            <input
              type="number"
              className="w-full mb-4 border rounded p-2"
              value={days}
              onChange={e => setDays(parseInt(e.target.value || '0'))}
            />
            
            <div className="flex gap-2 justify-end">
              <button className="btn" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={create}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

