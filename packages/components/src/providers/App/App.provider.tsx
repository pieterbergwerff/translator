// @ts-nocheck - React 19 type conflicts with provider
// import components
import AuthProvider from '@packages/components/providers/Auth'

// import types
import type { FC, PropsWithChildren } from 'react'

export const AppProviderComponent: FC<PropsWithChildren> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>
}

export default AppProviderComponent
