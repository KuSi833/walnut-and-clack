'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants/config'
import { Store, Terminal, ShoppingBag, Code } from 'lucide-react'
import { useEffect, useState } from 'react'

const navigationItems = [
    {
        name: 'store',
        href: '/products',
        icon: Store
    },
    {
        name: 'custom_build',
        href: '/custom',
        icon: Code
    },
    {
        name: 'cart',
        href: '/cart',
        icon: ShoppingBag
    },
]

export function Header() {
    const [itemCount, setItemCount] = useState(0)

    // Update this effect to use your actual cart management system
    useEffect(() => {
        // Example: Get cart items from localStorage
        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
        setItemCount(cartItems.length)
    }, [])

    return (
        <header className="sticky top-0 z-50 w-full border-b border-walnut-200 bg-cream-50/95 backdrop-blur supports-[backdrop-filter]:bg-cream-50/60">
            <div className="container flex h-14 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <Terminal className="h-5 w-5 text-walnut-800" />
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
                </nav>
            </div>
        </header>
    )
} 