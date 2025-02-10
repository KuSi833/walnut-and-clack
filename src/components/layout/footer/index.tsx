import { Terminal } from "lucide-react"
import { SITE_CONFIG } from '@/lib/constants/config'

export function Footer() {
    return (
        <footer className="border-t border-walnut-200 bg-cream-50">
            <div className="container flex flex-col items-center py-8 md:flex-row md:justify-between">
                <div className="flex items-center space-x-2">
                    <Terminal className="h-5 w-5 text-walnut-800" />
                    <span className="font-mono text-sm text-walnut-900">{SITE_CONFIG.name}</span>
                </div>

                <div className="mt-4 text-center font-mono text-sm text-walnut-600 md:mt-0">
                    <p>Crafted with passion</p>
                    <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
} 