// import utils
import { signIn } from 'next-auth/react'

// import hooks
import { useState, startTransition, useActionState } from 'react'
import { useRouter } from 'next/navigation'

// import types
import type { FormEvent } from 'react'

type LoginFormDataType = {
  email: string
  password: string
}

export const useLoginFormHook = ({ onSubmit }: { onSubmit?: () => void }) => {
  const router = useRouter()

  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [, dispatch, isPending] = useActionState(
    async (_: LoginFormDataType, authData: LoginFormDataType) => {
      const result = await signIn('credentials', {
        ...authData,
        redirect: false,
      })

      if (!result?.error) {
        router.refresh()
        onSubmit && onSubmit()
      } else {
        setError('Invalid credentials')
      }
      return authData
    },
    {
      email: email,
      password: password,
    }
  )

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    startTransition(() => {
      dispatch({
        email,
        password,
      })
    })
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    submitHandler,
    submitDisabled: isPending,
  }
}

export default useLoginFormHook
