import { NextResponse } from 'next/server';

const DEMO_GATE = process.env.DEMO_GATE || 'open'; // open|soft|closed

function handleDemoLogin(orgId: string, redirect: string, req: Request) {
  // In dev/staging with DEMO_GATE=open: create/load a demo session and set cookies.
  // Replace with your real session creation that binds to demo user + org.
  if (DEMO_GATE === 'open') {
    const res = NextResponse.redirect(new URL(redirect, req.url));
    res.cookies.set('svd_demo', '1', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    res.cookies.set('svd_org', orgId, {
      httpOnly: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return res;
  }

  if (DEMO_GATE === 'soft') {
    // Soft-gated: require quick form capture before redirect
    return NextResponse.redirect(
      new URL(
        `/demo/request?orgId=${encodeURIComponent(orgId)}&redirect=${encodeURIComponent(redirect)}`,
        req.url
      )
    );
  }

  // closed → send to sales
  return NextResponse.redirect(new URL('/sales', req.url));
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const orgId = url.searchParams.get('org') || '';
  const redirect = `/org/${orgId}/overview`;
  return handleDemoLogin(orgId, redirect, req);
}

export async function POST(req: Request) {
  const form = await req.formData();
  const orgId = String(form.get('orgId') || '');
  const redirect = String(form.get('redirect') || `/org/${orgId}/overview`);

  return handleDemoLogin(orgId, redirect, req);
}

