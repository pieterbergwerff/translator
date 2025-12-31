// import utils
import getSession from '@utils/server/getSession.util.ts'

// import components
import Avatar, { AvatarFallback } from '@packages/components/atoms/Avatar'
import Menubar, {
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from '@packages/components/molecules/Menubar'
import MenuItemSignOut from './components/MenuItemSignOut'
import MenuItemSettings from './components/MenuItemSettings'
import { User } from 'lucide-react'

export const AuthAvatarMoleculeComponent = async () => {
  const session = await getSession()

  if (!session) return null

  return (
    <Menubar className="border-none bg-transparent p-0 h-auto">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer p-0">
          <Avatar>
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </MenubarTrigger>
        <MenubarContent align="end">
          <MenubarItem disabled className="font-medium">
            {session.user?.name || session.user?.email}
          </MenubarItem>
          <MenubarSeparator />
          <MenuItemSettings />
          <MenuItemSignOut />
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export default AuthAvatarMoleculeComponent
