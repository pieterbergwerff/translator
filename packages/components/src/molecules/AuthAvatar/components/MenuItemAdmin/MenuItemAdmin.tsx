'use client'

// import hooks
import useIsRoot from '@packages/hooks/useIsRoot.hook.ts'
import { useRouter } from 'next/navigation'

// import components
import { MenubarItem } from '@packages/components/molecules/Menubar'
import { KeyRound } from 'lucide-react'

// import types
import type { FC } from 'react'

export const MenuItemAdminComponent: FC = () => {
  const { isRoot, isLoading } = useIsRoot()
  const router = useRouter()

  if (!isLoading && !isRoot) return null

  return (
    <MenubarItem
      onClick={() => {
        router.push('/admin')
      }}
    >
      <KeyRound className="mr-2 h-4 w-4" />
      Admin
    </MenubarItem>
  )
}

export default MenuItemAdminComponent
