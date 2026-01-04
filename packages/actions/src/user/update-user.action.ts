'use server'

// import libraries
import UserLibrary from '@utils/server/libraries/User.library.ts'

// import utils
import getSession from '@utils/server/getSession.util.ts'
import { revalidatePath } from 'next/cache'

// import validators
import { UserSchema } from '@packages/validators/user.validator.ts'

// import types
import { User } from '@packages/validators/user.validator.ts'

export const updateUserAction = async (user: Pick<User, 'userName'>): Promise<User | null> => {
  const session = await getSession()
  if (!session?.user?.id) return null

  const { success } = UserSchema.pick({ userName: true }).safeParse(user)

  if (!success) {
    throw new Error('Invalid user data')
  }

  const userLibrary = new UserLibrary()

  const result = await userLibrary.update(session.user.id, { userName: user.userName })

  revalidatePath('/', 'layout')

  return result ?? null
}

export default updateUserAction
