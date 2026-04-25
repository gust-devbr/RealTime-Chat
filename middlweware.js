import { NextResponse } from 'next/server';

export async function middleware(req) {
    const { pathname } = req.nextUrl;

    const publicPaths = ['/api/auth/login', '/api/auth/register'];
    if (publicPaths.some(path => pathname.startsWith(path))) {
        return NextResponse.next()
    }
}

export const config = {
    matcher: ['/api/:path*'],
};