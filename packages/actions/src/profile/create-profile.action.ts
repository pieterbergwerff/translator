'use server'

// import libraries
import ProfileLibrary from '@utils/server/libraries/Profile.library.ts'

// import validators
import { ProfileSchema } from '@packages/validators/profile.validator.ts'

// import types
import type { Profile } from '@packages/validators/profile.validator.ts'

export const createProfileAction = async ({
  profileName,
  profileStatus = 'inactive',
}: Pick<Profile, 'profileName'> &
  Partial<Pick<Profile, 'profileStatus'>>): Promise<Profile | null> => {
  const validate = () => {
    const result = ProfileSchema.pick({
      profileName: true,
      profileStatus: true,
    }).safeParse({
      profileName,
      profileStatus,
    })
    return result.success ? result.data : null
  }

  const validatedData = validate()

  if (!validatedData) return null

  const profileLibrary = new ProfileLibrary()
  const newProfile = await profileLibrary.create(
    validatedData.profileName,
    validatedData.profileStatus
  )

  if (newProfile) {
    console.log('Profile created successfully:', newProfile)
    return newProfile
  }

  return null
}

export default createProfileAction
