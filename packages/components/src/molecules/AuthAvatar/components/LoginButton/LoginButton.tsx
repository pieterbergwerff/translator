'use client'

// import hooks
import { useAuthContext } from '@packages/components/providers/AuthClient'

// import components
import Button from '@packages/components/atoms/Button'

export const LoginButton = () => {
  const { setLoginModalOpen } = useAuthContext()

  return (
    <Button variant="outline" onClick={() => setLoginModalOpen(true)}>
      login
    </Button>
  )
}

export default LoginButton
