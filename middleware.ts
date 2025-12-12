import { NextRequest, NextResponse } from 'next/server'
import { getSession } from './lib/session';

export async function middleware(request: NextRequest, response: NextResponse ) {
  const session = await getSession()
  if (session.id) {
    return NextResponse.next();
  }
  return NextResponse.redirect('http://localhost:3000/')
}

export const config = {
  matcher: '/admin/:path*',
}