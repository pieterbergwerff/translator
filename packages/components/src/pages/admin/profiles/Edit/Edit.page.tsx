// import actions
import getProfileAction from '@packages/actions/profile/get-profile.action.ts'

// import types
import type { FC } from 'react'
import type { Profile } from '@packages/validators/profile.validator.ts'

export const AdminProfilesEditPage: FC<Pick<Profile, 'profileId'>> = async ({ profileId }) => {
  const profile = await getProfileAction(Number(profileId))

  return <pre>{JSON.stringify(profile, null, 2)}</pre>
}

export default AdminProfilesEditPage
