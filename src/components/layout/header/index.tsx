import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants/config'

const navigationItems = [
    { name: 'Products', href: '/products' },
    { name: 'Custom', href: '/custom' },
    { name: 'Cart', href: '/cart' },
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
                            className="text-soft-black/80 hover:text-walnut transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    )
} 