// import hooks
import { useSession } from 'next-auth/react'

// import types
import type { AuthUser } from '@packages/types/auth'

export const useLogged = (): AuthUser | null => {
  const session = useSession()
  const user = session.status === 'authenticated' ? session.data.user : null

  if (user && 'id' in user) {
    return user as AuthUser
  }

  return null
}

export default useLogged
