// src/app/api/mock/checkout/route.ts
// Mock checkout handler (records selection, redirects to signup)

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const plan = formData.get('plan')?.toString() || '';
  const track = formData.get('track')?.toString() || 'business';
  const cycle = formData.get('cycle')?.toString() || 'monthly';

  // Store selection in localStorage (client-side) or session
  // For now, just redirect to signup with plan info
  const url = new URL('/signup', req.url);
  url.searchParams.set('plan', plan);
  url.searchParams.set('track', track);
  url.searchParams.set('cycle', cycle);

  return NextResponse.redirect(url);
}

