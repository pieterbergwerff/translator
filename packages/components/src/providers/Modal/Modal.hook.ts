// import hooks
import { useState } from 'react'

// import types
import type { ReactNode } from 'react'

export const useModal = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [contents, setContents] = useState<ReactNode>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = (_contents: ReactNode, options?: { title?: string; description?: string }) => {
    setContents(_contents)
    const _title = options?.title ?? ''
    const _description = options?.description ?? ''
    setTitle(_title)
    setDescription(_description)
    setTimeout(() => {
      if (!modalOpen) setModalOpen(true)
    }, 100)
  }

  const closeModal = () => {
    setModalOpen(false)
    setTimeout(() => {
      setContents(null)
      setTitle('')
      setDescription('')
    }, 300)
  }

  return {
    modalOpen,
    openModal,
    closeModal,
    title,
    description,
    contents,
  }
}

export default useModal
