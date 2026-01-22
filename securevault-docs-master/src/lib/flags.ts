// src/lib/flags.ts
// Feature flags and environment configuration

export const flags = {
  dark: process.env.NEXT_PUBLIC_SVD_DARK === '1',
  showAwsCaps: process.env.NEXT_PUBLIC_SHOW_AWS_CAPS === '1',
  enableVerticals: process.env.NEXT_PUBLIC_ENABLE_VERTICALS === '1',
  demoEnabled: process.env.NEXT_PUBLIC_DEMO_ENABLED === '1',
  demoRequireForm: process.env.NEXT_PUBLIC_DEMO_REQUIRE_FORM === '1',
  demoNeutral: process.env.NEXT_PUBLIC_DEMO_NEUTRAL === '1',
  authStrategy: process.env.NEXT_PUBLIC_AUTH_STRATEGY || 'mock',
  pricingMode: process.env.NEXT_PUBLIC_PRICING_MODE || 'two_tracks',
};

