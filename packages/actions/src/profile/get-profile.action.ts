'use server'

// import libraries
import ProfileLibrary from '@utils/server/libraries/Profile.library.ts'

// import utils
import getSession from '@utils/server/getSession.util.ts'

// import types
import { Profile } from '@packages/validators/profile.validator.ts'

export const getProfileAction = async (
  profileId: Profile['profileId']
): Promise<Profile | null> => {
  const session = await getSession()
  if (!session?.user?.id) return null

  const profileLibrary = new ProfileLibrary()
  const profile = await profileLibrary.getById(profileId)

  return profile ?? null
}

export default getProfileAction
