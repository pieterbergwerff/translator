// import libraries
import AuthLibrary from '@utils/server/libraries/Auth.library.ts'

// import components
import {
  Menubar,
  MenubarContent,
  MenubarTrigger,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from '@packages/components/molecules/Menubar'
import AdminMenuItem from './components/AdminMenuItem'

// import types
import type { FC } from 'react'

export const AdminMenuMoleculeComponent: FC = async () => {
  const authLibrary = new AuthLibrary()
  const isRoot = await authLibrary.isRootUser()

  if (!isRoot) {
    return null
  }

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Users</MenubarTrigger>
        <MenubarContent>
          <AdminMenuItem href="/admin/users">Overview</AdminMenuItem>
          <AdminMenuItem href="/admin/users/create">Create user</AdminMenuItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Profiles</MenubarSubTrigger>
            <MenubarSubContent>
              <AdminMenuItem href="/admin/profiles">Overview</AdminMenuItem>
              <AdminMenuItem href="/admin/profiles/create">Create profile</AdminMenuItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSub>
            <MenubarSubTrigger>Permissions</MenubarSubTrigger>
            <MenubarSubContent>
              <AdminMenuItem href="/admin/permissions">Overview</AdminMenuItem>
              <AdminMenuItem href="/admin/permissions/create">Create permission</AdminMenuItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export default AdminMenuMoleculeComponent
