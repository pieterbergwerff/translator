// import components
import SwitchThemeMode from '@packages/components/molecules/SwitchThemeMode'
import Label from '@packages/components/atoms/Label'

// import types
import type { FC } from 'react'

export const SettingsModalContentsMoleculeComponent: FC = () => {
  return (
    <>
      <Label>Theme Mode</Label>
      <SwitchThemeMode />
    </>
  )
}

export default SettingsModalContentsMoleculeComponent
