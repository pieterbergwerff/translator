'use server'

// import database
import db from '@packages/database/knex'

// import types
import { Settings } from '@packages/validators/settings.validator'

export const setSettingsAction = async (
  settingsName: string,
  settingsValue: string
): Promise<Settings | null> => {
  const result = await db('settings').where({ settingsName }).first()
  if (result) {
    // Update existing setting
    const updatedSetting = await db('settings')
      .where({ settingsName })
      .update({ settingsValue })
      .returning('*')
    return updatedSetting[0] ?? null
  } else {
    // Insert new setting
    const newSetting: Settings = {
      settingsId: crypto.randomUUID(),
      settingsName,
      settingsValue,
      created_at: new Date(),
      updated_at: new Date(),
    }
    await db('settings').insert(newSetting)
    return newSetting
  }
}

export default setSettingsAction
