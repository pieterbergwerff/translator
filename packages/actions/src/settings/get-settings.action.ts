'use server'

// import libraries
import SettingLibrary from '@utils/server/libraries/Setting.library.ts'

// import utils
import getSession from '@utils/server/getSession.util.ts'

// import types
import { Settings } from '@packages/validators/setting.validator.ts'

export const getSettingsAction = async (settingName: string): Promise<Settings | null> => {
  const session = await getSession()
  if (!session?.user?.userId) return null

  const settingLibrary = new SettingLibrary()
  const result = await settingLibrary.getSetting(settingName)

  return result ?? null
}

export default getSettingsAction
