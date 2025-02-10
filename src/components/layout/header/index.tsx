import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants/config'

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-walnut/10 bg-cream/80 backdrop-blur">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="text-xl font-bold">
                    {SITE_CONFIG.name}
                </Link>
                <nav className="flex items-center gap-6">
                    {/* Navigation items will go here */}
                </nav>
            </div>
        </header>
    )
} 