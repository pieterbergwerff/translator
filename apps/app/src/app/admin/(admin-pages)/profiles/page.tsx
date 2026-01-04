// import actions
import allProfilesAction from '@packages/actions/profile/all-profiles.ts'

// import components
import AdminList from '@packages/components/organisms/AdminList'

// import types
import type { FC } from 'react'
import type { Profile } from '@packages/validators/profile.validator.ts'

const AdminProfilesPage: FC = async () => (
  <AdminList<Profile>
    type="profiles"
    getData={allProfilesAction}
    fields={{ id: 'profileId', title: 'profileName', description: 'profileStatus' }}
  />
)

export default AdminProfilesPage
