'use client'

// import hooks
import { signOut } from 'next-auth/react'

// import components
import { MenubarItem } from '@packages/components/molecules/Menubar'
import { LogOut } from 'lucide-react'

// import types
import type { FC } from 'react'

export const MenuItemSignOutComponent: FC = () => {
  return (
    <MenubarItem onClick={async () => await signOut()}>
      <LogOut className="mr-2 h-4 w-4" />
      Sign out
    </MenubarItem>
  )
}

export default MenuItemSignOutComponent
