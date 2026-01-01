'use client'

// import hooks
import { useModalContext } from '@packages/components/providers/Modal'

// import components
import Dialog from '@packages/components/molecules/Dialog'

// import types
import type { FC } from 'react'

export const DefaultTemplateModalComponent: FC = () => {
  const { modalOpen, closeModal, title, description, contents } = useModalContext()

  return (
    <Dialog open={modalOpen} title={title} description={description} onClose={closeModal}>
      {contents}
    </Dialog>
  )
}

export default DefaultTemplateModalComponent
