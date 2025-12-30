'use client'

// import hooks
import { useAuthContext } from '@packages/components/providers/Auth'
import { useSession, signOut } from 'next-auth/react'

// import components
import Box from '@packages/components/atoms/Box'

// import types
import type { FC } from 'react'

export const AuthClickMoleculeComponent: FC = () => {
  const { status, data } = useSession()
  const { loginModalOpen, setLoginModalOpen } = useAuthContext()

  if (status === 'loading') {
    return null
  }

  return (
    <Box
      component="span"
      className="cursor-pointer"
      onClick={() => {
        if (status === 'authenticated') {
          void signOut()
        } else {
          if (!loginModalOpen) {
            setLoginModalOpen(true)
          }
        }
      }}
    >
      {status === 'unauthenticated' ? 'login' : `${data?.user?.name}: logout`}
    </Box>
  )
}

export default AuthClickMoleculeComponent
