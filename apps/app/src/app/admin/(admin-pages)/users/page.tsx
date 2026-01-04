// import actions
import allUsersAction from '@packages/actions/user/all-users.action.ts'

// import components
import AdminList from '@packages/components/organisms/AdminList'

// import types
import type { FC } from 'react'
import type { User } from '@packages/validators/user.validator.ts'

const AdminUsersPage: FC = async () => (
  <AdminList<User>
    type="users"
    getData={allUsersAction}
    fields={{
      id: 'userId',
      title: 'userName',
      description: 'userEmail',
      order: ['userName', 'userEmail'],
    }}
  />
)

export default AdminUsersPage
