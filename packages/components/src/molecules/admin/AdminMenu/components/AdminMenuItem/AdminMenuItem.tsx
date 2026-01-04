'use client'

// import hooks
import { useRouter } from 'next/navigation'

// import components
import { MenubarItem } from '@packages/components/molecules/Menubar'

// import types
import type { ComponentPropsWithoutRef, FC } from 'react'

type MenubarItemProps = Omit<ComponentPropsWithoutRef<typeof MenubarItem>, 'onClick'> & {
  href?: string
}

export const AdminMenuItemComponent: FC<MenubarItemProps> = ({ href, ...props }) => {
  const router = useRouter()

  const onClick = href?.trim()
    ? () => {
        router.push(href)
      }
    : undefined

  return <MenubarItem {...props} onClick={onClick} />
}

export default AdminMenuItemComponent
