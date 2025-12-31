'use server'

// import database
import db from '@packages/database/knex'

// import types
import { Settings } from '@packages/validators/settings.validator'

export const getSettingsAction = async (settingName: string): Promise<Settings | null> => {
  const result = await db('settings').where({ settingsName: settingName }).first()
  return result ?? null
}

export default getSettingsAction
