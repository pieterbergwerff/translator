'use client'

// import hooks
import { useSession } from 'next-auth/react'
import useIsRoot from '@packages/hooks/useIsRoot.hook.ts'

// import components
import { MenubarItem } from '@packages/components/molecules/Menubar'

// import types
import type { FC } from 'react'

export const MenuItemUserNameComponent: FC = () => {
  const session = useSession()
  const { isRoot, isLoading } = useIsRoot()

  return (
    <MenubarItem disabled className="font-medium">
      {session?.data?.user?.userName || session?.data?.user?.userEmail}
      {!isLoading && isRoot ? ' (root)' : ''}
    </MenubarItem>
  )
}

export default MenuItemUserNameComponent
