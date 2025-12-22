import { NextRequest, NextResponse } from 'next/server'
import { getSession } from './lib/session';

export async function middleware(request: NextRequest, response: NextResponse ) {
  const session = await getSession()
  if (session.id) {
    return NextResponse.next();
  }
  const mainURL = request.nextUrl.clone()
  mainURL.pathname = '/'
  return NextResponse.redirect(mainURL)
}

export const config = {
  matcher: '/admin/:path*',
}