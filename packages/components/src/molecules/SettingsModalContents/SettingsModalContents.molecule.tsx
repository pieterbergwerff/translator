// import components
import Box from '@packages/components/atoms/Box'
import SwitchThemeMode from '@packages/components/molecules/SwitchThemeMode'
import Label from '@packages/components/atoms/Label'

// import types
import type { FC } from 'react'

export const SettingsModalContentsMoleculeComponent: FC = () => {
  return (
    <>
      <Box className="flex flex-col items-start space-y-4">
        <Label className="block">Theme Mode</Label>
        <SwitchThemeMode />
      </Box>
    </>
  )
}

export default SettingsModalContentsMoleculeComponent
