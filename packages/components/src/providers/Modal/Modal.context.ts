// import utils
import { createContext } from 'react'

export const ModalContext = createContext<{
  modalOpen: boolean
  openModal: (
    _contents: React.ReactNode,
    options?: { title?: string; description?: string }
  ) => void
  closeModal: () => void
  title: string
  description: string
  contents: React.ReactNode
} | null>(null)

export default ModalContext
