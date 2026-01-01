'use client'

// import hooks
import { useModalContext } from '@packages/components/providers/Modal'

// import components
import { MenubarItem } from '@packages/components/molecules/Menubar'
import { LogIn } from 'lucide-react'
import LoginModalContents from '@packages/components/molecules/LoginModalContents'

// import types
import type { FC } from 'react'

export const MenuItemLoginComponent: FC = () => {
  const { openModal } = useModalContext()

  return (
    <MenubarItem
      onClick={() =>
        openModal(<LoginModalContents />, {
          title: 'Login',
          description: 'Enter your credentials to access your account',
        })
      }
    >
      <LogIn className="mr-2 h-4 w-4" />
      Login
    </MenubarItem>
  )
}

export default MenuItemLoginComponent
