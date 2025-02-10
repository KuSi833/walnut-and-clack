import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants/config'
import { Store, Hammer, ShoppingCart } from 'lucide-react'

const navigationItems = [
    {
        name: 'Store',
        href: '/products',
        icon: Store
    },
    {
        name: 'Custom',
        href: '/custom',
        icon: Hammer
    },
    {
        name: 'Cart',
        href: '/cart',
        icon: ShoppingCart
    },
]

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-walnut/10 bg-cream/80 backdrop-blur">
            <div className="container flex h-16 items-center justify-between">
                <Link
                    href="/"
                    className="text-xl font-bold hover:text-walnut transition-colors"
                >
                    {SITE_CONFIG.name}
                </Link>
                <nav className="flex items-center gap-6">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-2 text-soft-black/80 hover:text-walnut transition-colors"
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    )
} 