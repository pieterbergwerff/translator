'use client'

// import hooks
import { useModalContext } from '@packages/components/providers/Modal'

// import components
import { MenubarItem } from '@packages/components/molecules/Menubar'
import { Settings } from 'lucide-react'
import SettingsModalContents from '@packages/components/molecules/SettingsModalContents'

// import types
import type { FC } from 'react'

export const MenuItemSettingsComponent: FC = () => {
  const { openModal } = useModalContext()

  return (
    <MenubarItem
      onClick={() =>
        openModal(<SettingsModalContents />, {
          title: 'Settings',
          description: 'Adjust your application settings',
        })
      }
    >
      <Settings className="mr-2 h-4 w-4" />
      Settings
    </MenubarItem>
  )
}

export default MenuItemSettingsComponent
