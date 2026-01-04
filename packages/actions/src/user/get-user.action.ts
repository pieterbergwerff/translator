'use server'

// import libraries
import UserLibrary from '@utils/server/libraries/User.library.ts'

// import utils
import getSession from '@utils/server/getSession.util.ts'

// import types
import { User } from '@packages/validators/user.validator.ts'

export const getUserAction = async (userId: User['userId']): Promise<User | null> => {
  const session = await getSession()
  if (!session?.user?.id) return null

  const userLibrary = new UserLibrary()
  const user = await userLibrary.getById(userId)

  return user ?? null
}

export default getUserAction
