// import components
import UserCreateForm from '@packages/components/molecules/UserCreateForm'

// import actions
import allUsersAction from '@packages/actions/user/all-users.action.ts'

// import components
import AdminList from '@packages/components/organisms/AdminList'

// import types
import type { FC } from 'react'
import type { User } from '@packages/validators/user.validator.ts'

export const AdminUsersCreatePage: FC = async () => (
  <AdminList<User>
    type="users"
    getData={allUsersAction}
    createForm={UserCreateForm}
    fields={{
      id: 'userId',
      title: 'userName',
      description: 'userEmail',
      order: ['userName', 'userEmail'],
    }}
  />
)

export default AdminUsersCreatePage
