// import hooks
import useSwr from 'swr'
import useLogged from '@packages/hooks/useLogged.hook.ts'

// import storage
import { getSetting, upsertSetting } from '@packages/storage/tables/settings.store.ts'

export const useSettings = <T>(settingName: string, defaultValue?: T) => {
  const user = useLogged()
  const saveMode = user ? 'server' : 'local'

  const {
    data: localSettingValue,
    isLoading: localSettingLoading,
    mutate: localSettingMutate,
  } = useSwr(saveMode === 'local' ? `settings-${settingName}` : null, async () => {
    const setting = await getSetting(settingName)
    return setting?.settingsValue ? setting.settingsValue : defaultValue
  })

  const isLoading = saveMode === 'local' ? localSettingLoading : false
  const value = saveMode === 'local' ? localSettingValue : defaultValue

  const setValue = async (newValue: T) => {
    if (saveMode === 'local') {
      const existingSetting = await getSetting(settingName)

      await upsertSetting({
        settingsId: existingSetting?.settingsId ?? crypto.randomUUID(),
        settingsName: settingName,
        settingsValue: newValue,
      })

      await localSettingMutate()
    }
  }

  return { isLoading, value, setValue }
}

export default useSettings
