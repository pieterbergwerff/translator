'use client'

// import components
import ModalProvider from '@packages/components/providers/Modal'
import { SessionProvider } from 'next-auth/react'

// import types
import type { FC, PropsWithChildren } from 'react'

export const AppProviderComponent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <ModalProvider>{children}</ModalProvider>
    </SessionProvider>
  )
}

export default AppProviderComponent
