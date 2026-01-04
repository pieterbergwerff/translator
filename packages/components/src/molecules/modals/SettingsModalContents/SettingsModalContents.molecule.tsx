'use client'

// import hooks
import useSettingsModalContents from './SettingsModalContents.hook'

// import components
import Box from '@packages/components/atoms/Box'
import Label from '@packages/components/atoms/Label'
import ToggleGroup, { ToggleGroupItem } from '@packages/components/molecules/ToggleGroup'

// import types
import type { FC } from 'react'

export const SettingsModalContentsMoleculeComponent: FC = () => {
  const { themeMode, clickThemeModeHandler } = useSettingsModalContents()

  return (
    <>
      <Box className="flex flex-col items-start space-y-4">
        <Label className="block">Theme Mode</Label>
        <ToggleGroup
          type="single"
          value={themeMode}
          onValueChange={clickThemeModeHandler}
          variant="outline"
          size="sm"
          className="justify-start"
        >
          <ToggleGroupItem value="system">System</ToggleGroupItem>
          <ToggleGroupItem value="light">Light</ToggleGroupItem>
          <ToggleGroupItem value="dark">Dark</ToggleGroupItem>
        </ToggleGroup>
      </Box>
    </>
  )
}

export default SettingsModalContentsMoleculeComponent
