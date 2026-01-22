import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (!code) {
    // No code provided, redirect to login
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // For PKCE flow, we need to let the client-side handle the code exchange
  // because the code_verifier is stored in the client's session storage
  // Redirect to a client-side page that will handle the exchange
  const redirectUrl = new URL('/auth/exchange', request.url)
  redirectUrl.searchParams.set('code', code)

  return NextResponse.redirect(redirectUrl)
}
