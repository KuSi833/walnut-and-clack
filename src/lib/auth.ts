import NextAuth from 'next-auth'
import NextAuthConfig from 'next-auth'
import type { Session } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from './db'

interface CustomSession extends Session {
    user?: {
        id?: string
        name?: string | null
        email?: string | null
        image?: string | null
    }
}

export const authConfig = {
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
        async signIn({ user }) {
            if (!user.email) return false

            // Create or update user in database
            const dbUser = await prisma.user.upsert({
                where: { email: user.email },
                create: {
                    email: user.email,
                    name: user.name || '',
                    image: user.image || null,
                },
                update: {
                    name: user.name || '',
                    image: user.image || null,
                },
            })

            // Add the database ID to the user object
            user.id = dbUser.id
            
            return true
        },
        async session({ session, token }): Promise<CustomSession> {
            if (session.user) {
                session.user.id = token.sub as string
                session.user.email = token.email as string
                session.user.name = token.name as string
                session.user.image = token.picture as string
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id
                token.email = user.email
                token.name = user.name
                token.picture = user.image
            }
            return token
        }
    },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig) 