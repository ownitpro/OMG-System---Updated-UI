// Plan utility for Personal Pro gating

export function isPersonalPro(plan?: string) {
  return (plan || '').toLowerCase() === 'pro';
}

