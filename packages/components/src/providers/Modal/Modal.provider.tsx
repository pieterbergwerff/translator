'use client'

// import context
import { ModalContext } from './Modal.context'

// import hooks
import useModal from './Modal.hook'
import { useContext } from 'react'

// import types
import type { FC, PropsWithChildren } from 'react'

export const useModalContext = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModalContext must be used within ModalProvider')
  }
  return context
}

export const ModalProviderComponent: FC<PropsWithChildren> = ({ children }) => {
  const ctx = useModal()

  return <ModalContext.Provider value={ctx}>{children}</ModalContext.Provider>
}

export default ModalProviderComponent
