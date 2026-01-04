// import actions
import getSettingsAction from '@packages/actions/settings/get-settings.action.ts'
import setSettingsAction from '@packages/actions/settings/set-settings.action.ts'

// import utils
import isThemeModeSystemDark from '@utils/client/isThemeModeSystemDark.util.ts'

// import hooks
import useSwr from 'swr'
import useSwrMutation from 'swr/mutation'

// import types
import type { ThemeMode } from '@packages/validators/theme-mode.validator.ts'

export const useSettingsModalContents = () => {
  // getter
  const {
    data: themeMode,
    isLoading: themeModeIsLoading,
    mutate: themeModeMutate,
  } = useSwr('settings-get-theme-mode', async () => {
    const setting = await getSettingsAction('theme-mode')
    return setting?.settingsValue ? setting.settingsValue : 'system'
  })

  // setter
  const { trigger } = useSwrMutation(
    'settings-set-theme-mode',
    async (_key, { arg: newThemeMode }: { arg: ThemeMode }) => {
      await setSettingsAction('theme-mode', newThemeMode || 'system')
      await themeModeMutate()
    }
  )

  const clickThemeModeHandler = (newThemeMode: ThemeMode) => {
    trigger(newThemeMode)

    if (newThemeMode === 'system') {
      const isSystemDark = isThemeModeSystemDark()
      if (isSystemDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return
    }
    if (newThemeMode === 'light') {
      document.documentElement.classList.remove('dark')
      return
    }
    if (newThemeMode === 'dark') {
      document.documentElement.classList.add('dark')
      return
    }
  }

  return { themeMode, clickThemeModeHandler, loading: themeModeIsLoading }
}

export default useSettingsModalContents
