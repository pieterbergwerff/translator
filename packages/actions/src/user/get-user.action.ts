'use server'

// import utils
import db from '@packages/database/knex'
import getSession from '@utils/server/getSession.util.ts'

// import types
import { User } from '@packages/validators/user.validator'

export const getUserAction = async (userId: User['userId']): Promise<User | null> => {
  const session = await getSession()
  if (!session?.user?.id) return null

  const user = (await db('users').where({ userId }).first()) as User | undefined

  return user ?? null
}

export default getUserAction
