'use client'

// import hooks
import { useModalContext } from '@packages/components/providers/Modal'

// import components
import Box from '@packages/components/atoms/Box'
import Dialog from '@packages/components/molecules/Dialog'

// import types
import type { FC } from 'react'

export const DefaultTemplateModalComponent: FC = () => {
  const { modalOpen, closeModal, title, description, contents, withAutoClose } = useModalContext()

  const dialogProps = {
    ...(title?.trim() && { title }),
    ...(description?.trim() && { description }),
    ...(withAutoClose && { onClose: closeModal }),
  }

  return (
    <Dialog open={modalOpen} {...dialogProps}>
      <Box className="mt-4 mb-4">{contents}</Box>
    </Dialog>
  )
}

export default DefaultTemplateModalComponent
