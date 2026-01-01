// import actions
import updateUserAction from '@packages/actions/user/update-user.action.ts'

// import hooks
import { useState } from 'react'
import { useModalContext } from '@packages/components/providers/Modal'
import { useSession } from 'next-auth/react'

export const useAccountModalContents = () => {
  const session = useSession()
  const { closeModal } = useModalContext()
  const [nickNameValue, setNickNameValue] = useState(session?.data?.user?.userName || '')

  const submitHandler = async () => {
    try {
      await updateUserAction({ userName: nickNameValue })
      await session.update()
      closeModal()
    } catch (error) {
      console.error('Failed to update user:', error)
    }
  }

  const cancelHandler = () => {
    closeModal()
    setNickNameValue('')
  }

  return { nickNameValue, setNickNameValue, submitHandler, cancelHandler }
}

export default useAccountModalContents
