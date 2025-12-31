// import utils
import getSession from '@utils/server/getSession.util.ts'

// import components
import Box from '@packages/components/atoms/Box'
import LoginModal from '@packages/components/organisms/LoginModal'
import SettingsModal from '@packages/components/organisms/SettingsModal'
import AuthAvatar from '@packages/components/molecules/AuthAvatar'

// import types
import type { FC, PropsWithChildren } from 'react'

export const DefaultTemplateComponent: FC<PropsWithChildren> = async ({ children }) => {
  const session = await getSession()

  return (
    <Box>
      {children}
      {!session && <LoginModal />}
      <SettingsModal />
      <div className="fixed top-4 right-4 z-50">
        <AuthAvatar />
      </div>
    </Box>
  )
}

export default DefaultTemplateComponent
