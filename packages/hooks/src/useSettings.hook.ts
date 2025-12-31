// import actions
import getSettingsAction from '@packages/actions/settings/get-settings.action.ts'
import setSettingsAction from '@packages/actions/settings/set-settings.action.ts'

// import hooks
import useSwr from 'swr'
import useLogged from '@packages/hooks/useLogged.hook.ts'

// import storage
import {
  getSetting,
  upsertSetting,
  dropTableIfExists,
} from '@packages/storage/tables/settings.store.ts'

export const useSettings = (settingName: string, defaultValue?: string) => {
  const user = useLogged()
  const saveMode = user ? 'server' : 'local'

  const {
    data: serverSettingValue,
    isLoading: serverSettingLoading,
    mutate: serverSettingMutate,
  } = useSwr(saveMode === 'server' ? `settings-${settingName}-server` : null, async () => {
    const setting = await getSettingsAction(settingName)
    return setting?.settingsValue ? setting.settingsValue : defaultValue
  })

  const {
    data: localSettingValue,
    isLoading: localSettingLoading,
    mutate: localSettingMutate,
  } = useSwr(saveMode === 'local' ? `settings-${settingName}-local` : null, async () => {
    const setting = await getSetting(settingName)
    return setting?.settingsValue ? setting.settingsValue : defaultValue
  })

  const isLoading =
    saveMode === 'local'
      ? localSettingLoading
      : saveMode === 'server'
        ? serverSettingLoading
        : false
  const value =
    saveMode === 'local'
      ? localSettingValue
      : saveMode === 'server'
        ? serverSettingValue
        : defaultValue

  const setValue = async (newValue: string) => {
    if (saveMode === 'local') {
      const existingSetting = await getSetting(settingName)

      await upsertSetting({
        settingsId: existingSetting?.settingsId ?? crypto.randomUUID(),
        settingsName: settingName,
        settingsValue: newValue,
      })

      await localSettingMutate()
    } else if (saveMode === 'server') {
      await setSettingsAction(settingName, newValue)
      await serverSettingMutate()
      await dropTableIfExists()
    }
  }

  return { isLoading, value, setValue }
}

export default useSettings
