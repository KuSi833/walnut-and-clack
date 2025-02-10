import { SITE_CONFIG } from '@/lib/constants/config'

export function Footer() {
    return (
        <footer className="border-t border-walnut-200 bg-cream-50">
            <div className="container flex flex-col items-center py-4 md:flex-row md:justify-end">
                <div className="mt-2 font-mono text-xs text-walnut-600 md:mt-0">
                    <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name.toLowerCase()}</p>
                </div>
            </div>
        </footer>
    )
}