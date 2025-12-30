'use client'

// import hooks
import useSettings from '@packages/hooks/useSettings.hook.ts'

// import components
import ToggleGroup, { ToggleGroupItem } from '@packages/components/molecules/ToggleGroup'

export const SwitchThemeModeMolecule = () => {
  const {
    isLoading,
    value: themeMode,
    setValue: setThemeMode,
  } = useSettings('theme-mode', 'system')

  return (
    <ToggleGroup
      type="single"
      value={themeMode || 'system'}
      onValueChange={(value: string) => setThemeMode(value || 'system')}
      variant="outline"
      size="sm"
      disabled={isLoading}
    >
      <ToggleGroupItem value="system">System</ToggleGroupItem>
      <ToggleGroupItem value="light">Light</ToggleGroupItem>
      <ToggleGroupItem value="dark">Dark</ToggleGroupItem>
    </ToggleGroup>
  )
}

export default SwitchThemeModeMolecule
