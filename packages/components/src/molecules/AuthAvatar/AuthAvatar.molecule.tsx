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
import MenuItemLogin from './components/MenuItemLogin'
import MenuItemAccount from './components/MenuItemAccount'
import { User, MenuIcon } from 'lucide-react'

export const AuthAvatarMoleculeComponent = async () => {
  const session = await getSession()

  return (
    <Menubar className="border-none bg-transparent p-0 h-auto">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer p-0">
          <Avatar>
            <AvatarFallback>
              {session ? <User className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
            </AvatarFallback>
          </Avatar>
        </MenubarTrigger>
        <MenubarContent align="end">
          {session ? (
            <>
              <MenubarItem disabled className="font-medium">
                {session?.user?.userName || session?.user?.userEmail}
              </MenubarItem>
              <MenuItemAccount />
              <MenuItemSettings />
              <MenuItemSignOut />
            </>
          ) : (
            <>
              <MenubarItem disabled className="font-medium">
                Menu
              </MenubarItem>
              <MenubarSeparator />
              <MenuItemLogin />
              <MenuItemSettings />
            </>
          )}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export default AuthAvatarMoleculeComponent
