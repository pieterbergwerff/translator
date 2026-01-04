// import actions
import createProfileAction from '@packages/actions/profile/create-profile.action.ts'

// import hooks
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useSwrMutation from 'swr/mutation'

// import validators
import { ProfileSchema } from '@packages/validators/profile.validator.ts'

// import types
import type { Profile } from '@packages/validators/profile.validator.ts'

export const useUserCreateForm = () => {
  const router = useRouter()

  const { trigger } = useSwrMutation(
    'create-profile',
    async (_key, { arg: user }: { arg: Pick<Profile, 'profileName' | 'profileStatus'> }) => {
      const createdProfile = await createProfileAction({
        profileName: user.profileName,
        profileStatus: user.profileStatus ?? 'inactive',
      })
      console.log('Created profile:', createdProfile)
    }
  )

  const [profileName, setProfileName] = useState<Profile['profileName']>('')
  const [profileStatus, setProfileStatus] = useState<Profile['profileStatus']>('inactive')

  const validate = () => {
    const result = ProfileSchema.pick({ profileName: true, profileStatus: true }).safeParse({
      profileName,
      profileStatus,
    })
    return result.success ? result.data : null
  }

  const resetForm = () => {
    setProfileName('')
    setProfileStatus('inactive')
  }

  const submitHandler = () => {
    const validData = validate()
    if (!validData) return
    trigger(validData).then(() => {
      resetForm()
      router.push('/admin/profiles')
    })
  }

  const cancelHandler = () => {
    resetForm()
    router.push('/admin/profiles')
  }

  const submitDisabled = !validate()

  return {
    submitHandler,
    cancelHandler,
    profileName,
    setProfileName,
    profileStatus,
    setProfileStatus,
    submitDisabled,
  }
}

export default useUserCreateForm
