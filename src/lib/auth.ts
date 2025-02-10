import type { AuthConfig } from '@auth/core'
import type { User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import type { Session } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

interface CustomSession extends Session {
    user?: {
        name?: string | null
        email?: string | null
        image?: string | null
    }
}

export const authConfig: AuthConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }: { auth: { user: User } | null; request: { nextUrl: URL } }) {
            const isLoggedIn = !!auth?.user
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
            
            if (isOnDashboard) {
                if (isLoggedIn) return true
                return false
            } else if (isLoggedIn) {
                return true
            }
            return true
        },
        session({ session, token }: { session: CustomSession; token: JWT }) {
            if (session.user) {
                session.user.email = token.email as string
                session.user.name = token.name as string
                session.user.image = token.picture as string
            }
            return session
        },
        jwt({ token, user }: { token: JWT; user: User | null }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
                token.picture = user.image
            }
            return token
        }
    },
} 