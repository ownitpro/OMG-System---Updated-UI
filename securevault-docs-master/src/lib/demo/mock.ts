// src/lib/demo/mock.ts
// Demo seed data (neutral Business/Personal)

export const businessDemo = {
  org: { name: 'Acme Demo (Business)', track: 'business', industry: '' },
  quickActions: ['upload', 'new_share', 'request_files', 'install_app', 'try_ocr_review'],
  kpis: { uploads: 12, ocr_pages: 87, egress_gb: 0.2, active_users: 4 },
};

export const personalDemo = {
  org: { name: 'Jane Demo (Personal)', track: 'personal' },
  quickActions: ['upload', 'new_share', 'request_files', 'install_app'],
  kpis: { uploads: 3, ocr_pages: 10, egress_gb: 0.0, active_users: 1 },
};

export async function launchDemo(track: 'business' | 'personal' = 'business') {
  // In a real implementation, this would create a demo session
  // For now, it's handled by the demo-login API route
  const orgId = track === 'business' ? 'demo-business-001' : 'demo-personal-001';
  const redirect = track === 'business' ? `/org/${orgId}/overview` : '/personal/overview';
  
  if (typeof window !== 'undefined') {
    window.location.href = `/api/auth/demo-login?org=${orgId}&redirect=${encodeURIComponent(redirect)}`;
  }
}

