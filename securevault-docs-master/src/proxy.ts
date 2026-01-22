import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(req: NextRequest) {
  const url = new URL(req.url)
  const devOpen = process.env.SVD_TEST_OPEN === '1'

  if (devOpen) {
    // Allow portal test route without email
    if (url.pathname.startsWith('/portal/test')) return NextResponse.next()
    // In DEV, let everything flow. You can add more test-only behaviors here.
    return NextResponse.next()
  }

  // For now, we'll skip auth checks in middleware since Supabase uses localStorage
  // which isn't accessible in middleware. Auth protection happens client-side in AuthContext
  // and we can add server-side checks in API routes and page components as needed.
  // TODO: Add real auth/session checks for STAGING/PROD

  return NextResponse.next()
}

