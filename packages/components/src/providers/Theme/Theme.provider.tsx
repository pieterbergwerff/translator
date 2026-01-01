'use client'

// import utils
import isThemeModeSystemDark from '@utils/client/isThemeModeSystemDark.util.ts'

// import hooks
import useSettings from '@packages/hooks/useSettings.hook.ts'
import { useLayoutEffect } from 'react'

// import types
import type { FC, PropsWithChildren } from 'react'

export const ThemeProviderComponent: FC<PropsWithChildren> = ({ children }) => {
  const { data, isLoading } = useSettings('theme-mode', 'system')

  useLayoutEffect(() => {
    if (!isLoading && data === 'system') {
      if (isThemeModeSystemDark()) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [data, isLoading])

  if (isLoading) return null

  return <>{children}</>
}

export default ThemeProviderComponent
