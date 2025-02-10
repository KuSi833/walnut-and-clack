import { Metadata } from 'next'
import { Fira_Code } from 'next/font/google'
import { SITE_CONFIG } from '@/lib/constants/config'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import './globals.css'

const firaCode = Fira_Code({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${firaCode.className} flex min-h-screen flex-col bg-cream-100 text-walnut-900`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
