import { SITE_CONFIG } from '@/lib/constants/config'

export function Footer() {
    return (
        <footer className="border-t border-walnut/10 bg-cream">
            <div className="container py-8">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-sm text-soft-black/60">
                        © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
} 