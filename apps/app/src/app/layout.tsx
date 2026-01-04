// @ts-nocheck - React 19 type conflicts
// import utils
import { Inter } from 'next/font/google'

// import actions
import getSettingsAction from '@packages/actions/settings/get-settings.action'

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const userSettings = await getSettingsAction('theme-mode')
  const themeMode = userSettings?.settingsValue || 'system'

  return (
    <html
      lang="en"
      className={[inter.variable, ...(themeMode === 'dark' ? ['dark'] : [])].join(' ')}
    >
      <body className={`${inter.className} overflow-x-hidden`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
