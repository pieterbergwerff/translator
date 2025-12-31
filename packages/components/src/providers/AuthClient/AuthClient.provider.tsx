// @ts-nocheck - React 19 type conflicts with context provider
'use client'

// import context
import { AuthClientContext } from './AuthClient.context'

// import hooks
import useAuth from './AuthClient.hook'
import { useContext } from 'react'

// import components
import { SessionProvider } from 'next-auth/react'

// import types
import type { FC, PropsWithChildren } from 'react'

export const useAuthContext = () => {
  const context = useContext(AuthClientContext)
  if (!context) {
    throw new Error('useAuthContext must be used within AuthClientProvider')
  }
  return context
}

export const AuthProviderClientComponent: FC<PropsWithChildren> = ({ children }) => {
  const ctx = useAuth()

  return (
    <SessionProvider>
      <AuthClientContext.Provider value={ctx}>{children}</AuthClientContext.Provider>
    </SessionProvider>
  )
}

export default AuthProviderClientComponent
