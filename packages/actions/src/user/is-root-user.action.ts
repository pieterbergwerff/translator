'use server'

// import libraries
import UserLibrary from '@utils/server/libraries/User.library.ts'

export async function isRootUserAction(userId: number): Promise<boolean> {
  if (!userId) return false

  const userLibrary = new UserLibrary()
  const isRootUser = await userLibrary.isRootUser(userId)

  return isRootUser
}

export default isRootUserAction
