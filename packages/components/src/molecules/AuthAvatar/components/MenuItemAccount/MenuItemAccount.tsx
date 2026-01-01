'use client'

// import hooks
import { useModalContext } from '@packages/components/providers/Modal'

// import components
import { MenubarItem } from '@packages/components/molecules/Menubar'
import { UserCircle2 } from 'lucide-react'
import AccountModalContents from '@packages/components/molecules/AccountModalContents'

// import types
import type { FC } from 'react'

export const MenuItemAccountComponent: FC = () => {
  const { openModal } = useModalContext()

  return (
    <MenubarItem
      onClick={() =>
        openModal(<AccountModalContents />, {
          title: 'Account',
          description: 'Manage your account settings and preferences.',
          autoClose: false,
        })
      }
    >
      <UserCircle2 className="mr-2 h-4 w-4" />
      Account
    </MenubarItem>
  )
}

export default MenuItemAccountComponent
