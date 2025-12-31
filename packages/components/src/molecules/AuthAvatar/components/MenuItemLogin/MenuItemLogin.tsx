'use client'

// import hooks
import { useAuthContext } from '@packages/components/providers/AuthClient'

// import components
import { MenubarItem } from '@packages/components/molecules/Menubar'
import { LogIn } from 'lucide-react'

// import types
import type { FC } from 'react'

export const MenuItemLoginComponent: FC = () => {
  const { setLoginModalOpen } = useAuthContext()

  return (
    <MenubarItem onClick={() => setLoginModalOpen(true)}>
      <LogIn className="mr-2 h-4 w-4" />
      Login
    </MenubarItem>
  )
}

export default MenuItemLoginComponent
