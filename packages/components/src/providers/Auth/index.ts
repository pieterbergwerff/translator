'use client'

// import hooks
import { useContext } from 'react'

// import context
import { AuthContext } from './Auth.context'

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

export { default, AuthProviderComponent } from './Auth.provider'
