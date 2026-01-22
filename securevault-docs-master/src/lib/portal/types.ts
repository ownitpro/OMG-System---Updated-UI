// Shared types for portal system

export type PortalType = 'personal' | 'business';

export type PortalAuthMode = 'pin' | 'password';

export type PortalRecord = {
  id: string;
  type: PortalType;
  orgId?: string; // business only
  ownerUserId?: string; // personal owner
  title: string;
  clientName: string;
  clientEmail?: string;
  authMode: PortalAuthMode;
  pinHash?: string;
  passwordHash?: string;
  linkedBusinesses?: { id: string; name: string }[]; // personal pro
  seatsAllowed?: number; // personal pro
  uploads: { id: string; name: string; size: number; ts: string; label?: string }[];
  createdAt: string;
};

