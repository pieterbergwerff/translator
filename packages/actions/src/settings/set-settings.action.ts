'use server'

// import utils
import db from '@packages/database/knex'
import getSession from '@utils/server/getSession.util.ts'

// import types
import { Settings } from '@packages/validators/settings.validator'

export const setSettingsAction = async (
  settingsName: string,
  settingsValue: string
): Promise<Settings | null> => {
  const session = await getSession()
  if (!session?.user?.userId) return null

  const result = await db('settings')
    .where({ settingsName, settingsUserId: session.user.userId })
    .first()
  if (result) {
    // Update existing setting
    const updatedSetting = await db('settings')
      .where({ settingsName, settingsUserId: session.user.userId })
      .update({ settingsValue })
      .returning('*')
    return updatedSetting[0] ?? null
  } else {
    // Insert new setting
    const newSetting: Settings = {
      settingsId: crypto.randomUUID(),
      settingsUserId: session.user.userId,
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
