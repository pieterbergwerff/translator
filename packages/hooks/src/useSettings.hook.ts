// import actions
import getSettingsAction from '@packages/actions/settings/get-settings.action.ts'

// import hooks
import useSwr from 'swr'
import useLogged from '@packages/hooks/useLogged.hook.ts'

export const useSettings = (settingName: string, defaultValue?: string) => {
  const user = useLogged()

  // getter
  const { data, isLoading } = useSwr(!!user ? `settings-get-${settingName}` : null, async () => {
    const setting = await getSettingsAction(settingName)
    return setting?.settingsValue ? setting.settingsValue : defaultValue
  })

  return { data, isLoading }
}

export default useSettings
