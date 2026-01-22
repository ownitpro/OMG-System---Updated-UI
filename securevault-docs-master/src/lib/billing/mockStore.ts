// src/lib/billing/mockStore.ts
// LocalStorage-based mock store for org usage tracking

export type OrgUsage = {
  plan: 'starter' | 'growth' | 'pro';
  kind: 'business' | 'personal';
  seats: number;
  usage: { textract: number; storageGb: number; egressGb: number };
  caps: { textract: number; storageGb: number; egressGb: number; capCad: number };
  autobuyTopups: boolean;
};

const KEY = 'svd_mock_org_usage';

export function loadUsage(): OrgUsage | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveUsage(u: OrgUsage) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(u));
}

export function resetUsage() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEY);
}

export function ensureSeed(
  kind: 'business' | 'personal' = 'business',
  plan: 'starter' | 'growth' | 'pro' = 'growth'
): OrgUsage {
  const existing = loadUsage();
  if (existing) return existing;

  const { BUSINESS, PERSONAL } = require('./mockConfig');
  const cfg = kind === 'business' ? BUSINESS[plan] : PERSONAL[plan];

  const seed: OrgUsage = {
    plan,
    kind,
    seats: kind === 'business' ? 3 : 1,
    usage: {
      textract: Math.floor(cfg.textractPages * 0.35),
      storageGb: Math.floor(cfg.storageGb * 0.25),
      egressGb: Math.floor(cfg.egressGb * 0.2),
    },
    caps: {
      textract: cfg.textractPages,
      storageGb: cfg.storageGb,
      egressGb: cfg.egressGb,
      capCad: cfg.capCad,
    },
    autobuyTopups: false,
  };

  saveUsage(seed);
  return seed;
}

export function pct(n: number, d: number): number {
  return d <= 0 ? 0 : n / d;
}

