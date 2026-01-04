'use server'

// import libraries
import SettingLibrary from '@utils/server/libraries/Setting.library.ts'

// import utils
import getSession from '@utils/server/getSession.util.ts'

// import types
import { Settings } from '@packages/validators/setting.validator.ts'

export const setSettingsAction = async (
  settingsName: string,
  settingsValue: string
): Promise<Settings | null> => {
  const session = await getSession()
  if (!session?.user?.userId) return null

  const settingLibrary = new SettingLibrary()
  const result = await settingLibrary.setSetting(settingsName, settingsValue)
  return result ?? null
}

export default setSettingsAction
