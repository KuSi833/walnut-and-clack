'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants/config'
import { Store, ShoppingBag, LogIn, LogOut, User } from 'lucide-react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useCart } from '@/contexts/cart-context'
import { Logo } from '@/components/logo'

const navigationItems = [
    {
        name: 'store',
        href: '/products',
        icon: Store
    },
    {
        name: 'cart',
        href: '/cart',
        icon: ShoppingBag
    },
]

export function Header() {
    const { data: session } = useSession()
    const { itemCount } = useCart()

    const handleSignIn = async () => {
        try {
            console.log('Starting sign in from header...')
            const result = await signIn('google', {
                callbackUrl: '/',
                redirect: true,
            })
            console.log('Sign in attempt result:', result)
        } catch (error) {
            console.error('Sign in error:', error)
        }
    }

    const handleSignOut = async () => {
        try {
            console.log('Starting sign out...')
            const result = await signOut({ redirect: true, callbackUrl: '/' })
            console.log('Sign out result:', result)
        } catch (error) {
            console.error('Sign out error:', error)
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-walnut-200 bg-cream-50/95 backdrop-blur supports-[backdrop-filter]:bg-cream-50/60">
            <div className="container flex h-14 items-center justify-between">
                <Link href="/" className="flex items-center">
                    <Logo className="h-16 w-16" />
                    <span className="font-mono text-sm tracking-wider text-walnut-900">
                        {SITE_CONFIG.name.toLowerCase()}
                    </span>
                </Link>
                <nav className="flex items-center gap-6">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-2 font-mono text-sm text-walnut-800 transition-colors hover:text-walnut-900"
                        >
                            <item.icon className="h-5 w-5" />
                            <span className="hidden sm:inline-block">
                                {item.name}
                                {item.name === 'cart' && `_${itemCount}`}
                            </span>
                        </Link>
                    ))}
                    {session ? (
                        <div className="flex items-center gap-4">
                            <Link
                                href="/profile"
                                className="flex items-center gap-2 font-mono text-sm text-walnut-800 transition-colors hover:text-walnut-900"
                            >
                                <User className="h-5 w-5" />
                                <span className="hidden sm:inline-block">
                                    {session.user?.name}
                                </span>
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="flex items-center gap-2 font-mono text-sm text-walnut-800 transition-colors hover:text-walnut-900"
                            >
                                <LogOut className="h-5 w-5" />
                                <span className="hidden sm:inline-block">sign_out</span>
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleSignIn}
                            className="flex items-center gap-2 font-mono text-sm text-walnut-800 transition-colors hover:text-walnut-900"
                        >
                            <LogIn className="h-5 w-5" />
                            <span className="hidden sm:inline-block">sign_in</span>
                        </button>
                    )}
                </nav>
            </div>
        </header>
    )
} 