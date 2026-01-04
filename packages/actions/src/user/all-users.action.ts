'use server'

// import libraries
import UserLibrary from '@utils/server/libraries/User.library.ts'

// import utils
import getSession from '@utils/server/getSession.util.ts'

// import types
import type { DatabaseAll } from '@packages/validators/database.validator.ts'
import type { User } from '@packages/validators/user.validator.ts'

export const allUsersAction = async (props: DatabaseAll<User> = {}) => {
  const session = await getSession()
  if (!session?.user?.id) return null

  const userLibrary = new UserLibrary()
  const users = await userLibrary.getAll(props)

  return users ?? null
}

export default allUsersAction
