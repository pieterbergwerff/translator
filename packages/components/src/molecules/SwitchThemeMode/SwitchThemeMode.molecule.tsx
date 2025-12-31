'use client'

// import hooks
import { useLayoutEffect } from 'react'
import useSettings from '@packages/hooks/useSettings.hook.ts'

// import components
import ToggleGroup, { ToggleGroupItem } from '@packages/components/molecules/ToggleGroup'

export const SwitchThemeModeMolecule = () => {
  const {
    isLoading,
    value: themeMode,
    setValue: setThemeMode,
  } = useSettings('theme-mode', 'system')

  useLayoutEffect(() => {
    if (themeMode === 'system') {
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (isSystemDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return
    }
    if (themeMode === 'light') {
      document.documentElement.classList.remove('dark')
      return
    }
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark')
      return
    }
  }, [themeMode])

  if (isLoading) return null

  return (
    <ToggleGroup
      type="single"
      value={themeMode || 'system'}
      onValueChange={(value: string) => setThemeMode(value || 'system')}
      variant="outline"
      size="sm"
    >
      <ToggleGroupItem value="system">System</ToggleGroupItem>
      <ToggleGroupItem value="light">Light</ToggleGroupItem>
      <ToggleGroupItem value="dark">Dark</ToggleGroupItem>
    </ToggleGroup>
  )
}

export default SwitchThemeModeMolecule
