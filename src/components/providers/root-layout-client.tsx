'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { AuthProvider } from '@/components/providers/session-provider'
import { SessionProvider } from 'next-auth/react'
import { CartProvider } from '@/contexts/cart-context'

interface RootLayoutClientProps {
    children: React.ReactNode
}

export function RootLayoutClient({ children }: RootLayoutClientProps) {
    return (
        <SessionProvider>
            <CartProvider>
                <AuthProvider>
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </AuthProvider>
            </CartProvider>
        </SessionProvider>
    )
} 