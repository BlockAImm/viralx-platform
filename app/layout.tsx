import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import './globals.css'
import WalletContextProvider from '@/contexts/WalletProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ErrorBoundary from '@/components/ErrorBoundary'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const manrope = Manrope({ 
  subsets: ['latin'],
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  title: 'Viral X - Go Viral With AI',
  description: 'Cutting edge AI tools for Twitter/X growth. Get likes, views, retweets, and followers with advanced AI technology.',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable} font-inter bg-obsidian text-titanium min-h-screen flex flex-col`}>
        <ErrorBoundary>
          <WalletContextProvider>
            <Navbar />
            <main className="flex-1 pt-20">
              {children}
            </main>
            <Footer />
          </WalletContextProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}