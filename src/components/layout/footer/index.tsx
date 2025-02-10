import { Terminal } from "lucide-react"
import { SITE_CONFIG } from '@/lib/constants/config'

export function Footer() {
    return (
        <footer className="border-t border-walnut-200 bg-cream-50">
            <div className="container flex flex-col items-center py-4 md:flex-row md:justify-between">
                <div className="flex items-center space-x-2">
                    <Terminal className="h-4 w-4 text-walnut-800" />
                    <span className="font-mono text-xs text-walnut-900">{SITE_CONFIG.name.toLowerCase()}</span>
                </div>

                <div className="mt-2 text-center font-mono text-xs text-walnut-600 md:mt-0">
                    <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name.toLowerCase()}</p>
                </div>
            </div>
        </footer>
    )
} 