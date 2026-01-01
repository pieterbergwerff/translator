'use client'

// import components
import ModalProvider from '@packages/components/providers/Modal'
import { SessionProvider } from 'next-auth/react'
import ThemeProvider from '@packages/components/providers/Theme'

// import types
import type { FC, PropsWithChildren } from 'react'

export const AppProviderComponent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <ThemeProvider>
        <ModalProvider>{children}</ModalProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default AppProviderComponent
