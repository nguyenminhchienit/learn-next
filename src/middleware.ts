import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
const privatePaths = ['/account']
const authPaths = ['/login', '/register']

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const sessionToken = request?.cookies.get('sessionToken');
    //Chua dang nhap thi khong duoc vao trang profile
    if (privatePaths.some((path) => pathname.startsWith(path)) && !sessionToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    //Neu da dang nhap thi khong vao duoc dang ky va dang nhap
    if (authPaths.some((path) => path.startsWith(pathname)) && sessionToken) {
        return NextResponse.redirect(new URL('/account', request.url))
    }
    return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [...privatePaths,...authPaths],
}