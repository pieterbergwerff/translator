'use client'

// @ts-nocheck - React 19 type conflicts with components
// import hooks
import { useAuthContext } from '@packages/components/providers/AuthClient'

// import components
import Dialog from '@packages/components/molecules/Dialog'
import LoginForm from '@packages/components/organisms/LoginForm'

// import types
import type { FC } from 'react'

export const LoginModalOrganismComponent: FC = () => {
  const { loginModalOpen, setLoginModalOpen } = useAuthContext()

  return (
    <Dialog open={loginModalOpen} onClose={setLoginModalOpen}>
      <LoginForm onSubmit={() => setLoginModalOpen(false)} />
    </Dialog>
  )
}

export default LoginModalOrganismComponent
