// import hooks
import { useSession } from 'next-auth/react'

// import types
import type { AuthUser } from '@packages/types/auth'

export const useLogged = (): { user: AuthUser | null; update: () => Promise<void> } => {
  const session = useSession()
  const user = session.status === 'authenticated' ? session.data.user : null

  const updateSession = async () => {
    await session.update()
  }

  if (user && 'id' in user) {
    return { user: user as AuthUser, update: updateSession }
  }

  return { user: null, update: updateSession }
}

export default useLogged
