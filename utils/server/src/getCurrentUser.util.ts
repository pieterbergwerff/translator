// import database
import db from '@packages/database/knex'

// import utils
import getSession from '@utils/server/getSession.util.ts'

// import types
import type { User } from '@packages/validators/user.validator'

export const getCurrentUserUtil = async (): Promise<User | null> => {
  const session = await getSession()

  if (!session?.user?.id) {
    return null
  }

  try {
    const user = await db('users').where({ userId: session.user.id }).first()

    return user ?? null
  } catch (error) {
    console.error('Error fetching current user:', error)
    return null
  }
}

export default getCurrentUserUtil
