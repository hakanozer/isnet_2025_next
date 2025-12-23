// proxy.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/jwt';
import { getSession } from './lib/session';
import { limiter } from '@/lib/rate-limit';

// Buradaki fonksiyon adı kesinlikle "proxy" olmalı
export async function proxy(request: NextRequest) {

  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  // Sınır: 10 saniyede 5 istek
  const { isRateLimited, currentUsage, limit } = limiter.check(5, ip);
  if (isRateLimited) {
    return NextResponse.json(
      { error: 'Kullanım sınırını aştınız' },
      { 
        status: 429, 
        headers: { 'X-RateLimit-Limit': limit.toString(), 'X-RateLimit-Remaining': '0' } 
      }
    );
  }

  const mainPath = '/api/v1/';  
  const url = request.nextUrl.clone();

  // auth route public
  if (url.pathname.startsWith(mainPath + 'auth')) {
    return NextResponse.next();
  }

  // api routes protected
  if (url.pathname.startsWith(mainPath)) {
    const token = request.cookies.get('token')?.value;
    const currentUser = token ? verifyToken(token) : null;
    let status = false;

    if (currentUser) {
        const path = url.pathname;
        const subPath = path.replaceAll(mainPath, '');
        currentUser.role.forEach(role => {
            if (subPath === role.toLocaleLowerCase()) {
                status = true;
            }
        });

        if (status) {
            return NextResponse.next();
        }
        else {
            return new NextResponse('Forbidden', { status: 403 });
        }
    }
    
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // admin routes protected
  if (url.pathname.startsWith('/admin')) {
    
    const session = await getSession()
    if (session.id) {
      return NextResponse.next();
    }
    
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/admin/:path*', '/api/v1/:path*']
};
