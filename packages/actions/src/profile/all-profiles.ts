'use server'

// import libraries
import ProfileLibrary from '@utils/server/libraries/Profile.library.ts'

// import utils
import getSession from '@utils/server/getSession.util.ts'

// import types
import type { DatabaseAll } from '@packages/validators/database.validator.ts'
import type { Profile } from '@packages/validators/profile.validator.ts'

export const allProfilesAction = async (props: DatabaseAll<Profile> = {}) => {
  const session = await getSession()
  if (!session?.user?.id) return null

  const profileLibrary = new ProfileLibrary()
  const profiles = await profileLibrary.getAll(props)

  return profiles ?? null
}

export default allProfilesAction
