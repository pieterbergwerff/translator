// @ts-nocheck - React 19 type conflicts
// import utils
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/components/auth-provider'

// import components
import AppProvider from '@packages/components/providers/App'

// import styles
import '@packages/theme/globals.css'

// import types
// @ts-nocheck - React 19 type conflicts
import type { Metadata } from 'next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Translator App',
  description: 'Translation application',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <AppProvider>
          <AuthProvider>{children}</AuthProvider>
        </AppProvider>
      </body>
    </html>
  )
}
