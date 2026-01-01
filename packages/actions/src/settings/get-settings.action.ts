'use server'

// import utils
import db from '@packages/database/knex'
import getSession from '@utils/server/getSession.util.ts'

// import types
import { Settings } from '@packages/validators/settings.validator'

export const getSettingsAction = async (settingName: string): Promise<Settings | null> => {
  const session = await getSession()
  if (!session?.user?.userId) return null

  const result = await db('settings')
    .where({ settingsName: settingName, settingsUserId: session.user.userId })
    .first()

  return result ?? null
}

export default getSettingsAction
