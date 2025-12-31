'use client'

// import utils
import dispatchSettingsEvent from '@utils/client/dispatchSettingsEvent.util.ts'

// import components
import { MenubarItem } from '@packages/components/molecules/Menubar'
import { Settings } from 'lucide-react'

// import types
import type { FC } from 'react'

export const MenuItemSettingsComponent: FC = () => {
  return (
    <MenubarItem onClick={dispatchSettingsEvent}>
      <Settings className="mr-2 h-4 w-4" />
      Settings
    </MenubarItem>
  )
}

export default MenuItemSettingsComponent
