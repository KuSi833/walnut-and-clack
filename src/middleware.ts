import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
    function middleware(req) {
        const isAuth = !!req.nextauth.token
        if (!isAuth) {
            const signInUrl = new URL('/auth/signin', req.url)
            signInUrl.searchParams.set('callbackUrl', req.url)
            return NextResponse.redirect(signInUrl)
        }
        return NextResponse.next()
    },
    {
        pages: {
            signIn: '/auth/signin',
        }
    }
)

export const config = {
    matcher: ['/cart/:path*']
} 