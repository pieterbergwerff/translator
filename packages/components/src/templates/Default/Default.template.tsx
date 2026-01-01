// import components
import Box from '@packages/components/atoms/Box'
import AuthAvatar from '@packages/components/molecules/AuthAvatar'
import Modal from './components/Modal'

// import types
import type { FC, PropsWithChildren } from 'react'

export const DefaultTemplateComponent: FC<PropsWithChildren> = async ({ children }) => {
  return (
    <>
      <Box>
        {children}
        <div className="fixed top-4 right-4 z-50">
          <AuthAvatar />
        </div>
      </Box>
      <Modal />
    </>
  )
}

export default DefaultTemplateComponent
