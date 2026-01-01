// import utils
import { createContext } from 'react'

export const ModalContext = createContext<{
  modalOpen: boolean
  openModal: (
    _contents: React.ReactNode,
    options?: { title?: string; description?: string; autoClose?: boolean }
  ) => void
  closeModal: () => void
  title: string
  description: string
  contents: React.ReactNode
  withAutoClose: boolean
} | null>(null)

export default ModalContext
