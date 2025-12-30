'use client'

// import hooks
import { useSession } from 'next-auth/react'

// import components
import Box from '@packages/components/atoms/Box'
import LoginModal from '@packages/components/organisms/LoginModal'

// import types
import type { FC, PropsWithChildren } from 'react'

export const DefaultTemplateComponent: FC<PropsWithChildren> = ({ children }) => {
  const { status } = useSession()

  return (
    <Box>
      {children}
      {status === 'unauthenticated' && <LoginModal />}
    </Box>
  )
}

export default DefaultTemplateComponent
