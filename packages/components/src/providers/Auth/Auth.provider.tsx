// @ts-nocheck - React 19 type conflicts with context provider
'use client'

// import context
import { AuthContext } from './Auth.context'

// import hooks
import useAuth from './Auth.hook'
import { useContext } from 'react'

// import types
import type { FC, PropsWithChildren } from 'react'

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }
  return context
}

export const AuthProviderComponent: FC<PropsWithChildren> = ({ children }) => {
  const ctx = useAuth()
  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>
}

export default AuthProviderComponent
