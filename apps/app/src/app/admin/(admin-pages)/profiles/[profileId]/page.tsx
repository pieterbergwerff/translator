// import actions
import getProfileAction from '@packages/actions/profile/get-profile.action.ts'

// import types
import type { FC } from 'react'

const AdminProfilePage: FC<{ params: Promise<{ profileId: string }> }> = async ({ params }) => {
  const { profileId } = await params
  const user = await getProfileAction(Number(profileId))

  return <pre>{JSON.stringify(user, null, 2)}</pre>
}

export default AdminProfilePage
