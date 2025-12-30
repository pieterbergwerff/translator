'use client'

// import context
import { AuthContext } from './Auth.context'

// import hooks
import useAuth from './Auth.hook'

// import types
import type { FC, PropsWithChildren } from 'react'

export const AuthProviderComponent: FC<PropsWithChildren> = ({ children }) => {
  const ctx = useAuth()
  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>
}

export default AuthProviderComponent
