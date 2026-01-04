// import actions
import createUserAction from '@packages/actions/user/create-user.action.ts'

// import hooks
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useSwrMutation from 'swr/mutation'

// import validators
import { UserSchema } from '@packages/validators/user.validator.ts'

// import types
import type { User } from '@packages/validators/user.validator.ts'

export const useUserCreateForm = () => {
  const router = useRouter()

  const { trigger } = useSwrMutation(
    'create-user',
    async (_key, { arg: user }: { arg: Pick<User, 'userEmail' | 'userPassword'> }) => {
      const createdUser = await createUserAction({
        userEmail: user.userEmail,
        userPassword: user.userPassword ?? '',
      })
      console.log('Created user:', createdUser)
    }
  )

  const [userEmail, setUserEmail] = useState<User['userEmail']>('')
  const [userPassword, setUserPassword] = useState<User['userPassword']>('')

  const validate = () => {
    const result = UserSchema.pick({ userEmail: true, userPassword: true }).safeParse({
      userEmail,
      userPassword,
    })
    return result.success ? result.data : null
  }

  const resetForm = () => {
    setUserEmail('')
    setUserPassword('')
  }

  const submitHandler = () => {
    const validData = validate()
    if (!validData) return
    trigger(validData).then(() => {
      resetForm()
      router.push('/admin/users')
    })
  }

  const cancelHandler = () => {
    resetForm()
    router.push('/admin/users')
  }

  const submitDisabled = !validate()

  return {
    submitHandler,
    cancelHandler,
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
    submitDisabled,
  }
}

export default useUserCreateForm
