'use server'

import knex from '@packages/database/knex'

export async function isRootUserAction(userId: string): Promise<boolean> {
  if (!userId) return false

  const rootEmail = process.env.ROOT_USER
  if (!rootEmail) return false

  const user = await knex('users').where({ userId }).first()

  return user?.userEmail?.toLowerCase() === rootEmail.toLowerCase()
}

export default isRootUserAction
