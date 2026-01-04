// import actions
import allProfilesAction from '@packages/actions/profile/all-profiles.ts'

// import components
import AdminList from '@packages/components/organisms/AdminList'
import CreateProfileForm from '@packages/components/molecules/ProfileCreateForm'

// import types
import type { FC } from 'react'
import type { Profile } from '@packages/validators/profile.validator.ts'

const AdminCreateProfilesPage: FC = async () => (
  <AdminList<Profile>
    type="profiles"
    getData={allProfilesAction}
    createForm={CreateProfileForm}
    fields={{ id: 'profileId', title: 'profileName', description: 'profileStatus' }}
  />
)

export default AdminCreateProfilesPage
