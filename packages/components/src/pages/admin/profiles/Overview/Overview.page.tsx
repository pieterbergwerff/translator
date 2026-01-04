// import actions
import allProfilesAction from '@packages/actions/profile/all-profiles.ts'
import totalProfilesAction from '@packages/actions/profile/total-profiles.action.ts'

// import components
import AdminList from '@packages/components/organisms/admin/AdminList'

// import types
import type { FC } from 'react'
import type { Profile } from '@packages/validators/profile.validator.ts'

export const AdminProfilesOverviewPage: FC = async () => (
  <AdminList<Profile>
    type="profiles"
    getData={allProfilesAction}
    getCount={totalProfilesAction}
    fields={{ id: 'profileId', title: 'profileName', description: 'profileStatus' }}
  />
)

export default AdminProfilesOverviewPage
