// import utils
import db from '../db'

// import validators
import SettingsSchema from '@packages/validators/settings.validator.ts'

// import types
import type { Settings } from '@packages/validators/settings.validator.ts'

export const settingsTable = db.table<Settings>('settings')

export default settingsTable

export const upsertSetting = async (
  setting: Omit<Settings, 'settingId' | 'created_at' | 'updated_at'>
) => {
  const existingSetting = await settingsTable.get({ settingsName: setting.settingsName })

  const { success, data } = SettingsSchema.omit({
    settingsId: true,
    created_at: true,
    updated_at: true,
  }).safeParse(setting)

  if (!success) {
    throw new Error('Invalid setting data')
  }

  if (existingSetting) {
    await settingsTable.update(existingSetting.settingsId, {
      settingsValue: data.settingsValue,
      updated_at: new Date(),
    })
    return
  }

  await settingsTable.add({
    settingsId: crypto.randomUUID(),
    ...data,
    created_at: new Date(),
    updated_at: new Date(),
  })
}

export const getSetting = async (settingsName: string) => {
  return await settingsTable.get({ settingsName })
}

export const dropTableIfExists = async () => {
  await db.table('settings').clear()
}
