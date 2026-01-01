// import hooks
import { useState } from 'react'

// import types
import type { ReactNode } from 'react'

export const useModal = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [contents, setContents] = useState<ReactNode>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [withAutoClose, setWithAutoClose] = useState(true)

  const openModal = (
    _contents: ReactNode,
    options?: { title?: string; description?: string; autoClose?: boolean }
  ) => {
    setContents(_contents)
    const _title = options?.title ?? ''
    const _description = options?.description ?? ''
    setTitle(_title)
    setDescription(_description)

    if (typeof options?.autoClose === 'boolean' && !options?.autoClose) {
      setWithAutoClose(false)
    }

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
      setWithAutoClose(true)
    }, 300)
  }

  return {
    modalOpen,
    openModal,
    closeModal,
    title,
    description,
    contents,
    withAutoClose,
  }
}

export default useModal
