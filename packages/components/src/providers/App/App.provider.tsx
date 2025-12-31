// @ts-nocheck - React 19 type conflicts with provider
// import components
import AuthProvider from '@packages/components/providers/Auth'
import AuthClientProvider from '@packages/components/providers/AuthClient'

// import types
import type { FC, PropsWithChildren } from 'react'

export const AppProviderComponent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <AuthClientProvider>{children}</AuthClientProvider>
    </AuthProvider>
  )
}

export default AppProviderComponent
