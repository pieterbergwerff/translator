'use server'

// import utils
import db from '@packages/database/knex'
import getSession from '@utils/server/getSession.util.ts'
import { revalidatePath } from 'next/cache'

// import validators
import { UserSchema } from '@packages/validators/user.validator.ts'

// import types
import { User } from '@packages/validators/user.validator'

export const updateUserAction = async (user: Pick<User, 'userName'>): Promise<User | null> => {
  const session = await getSession()
  if (!session?.user?.id) return null

  const { success } = UserSchema.pick({ userName: true }).safeParse(user)

  if (!success) {
    throw new Error('Invalid user data')
  }

  const result = await db('users')
    .where({ userId: session.user.userId })
    .update(user)
    .returning('*')
    .then((rows) => rows[0] as User)

  // Trigger session refresh by revalidating the current path
  // This forces Next.js to refetch the session on the next request
  revalidatePath('/', 'layout')

  return result ?? null
}

export default updateUserAction
