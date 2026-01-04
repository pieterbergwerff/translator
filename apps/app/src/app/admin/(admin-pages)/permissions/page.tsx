// import actions
import allPermissionsAction from '@packages/actions/permission/all-permissions.ts'

// import components
import AdminList from '@packages/components/organisms/AdminList'

// import types
import type { FC } from 'react'
import type { Permission } from '@packages/validators/permission.validator.ts'

const AdminPermissionsPage: FC = async () => (
  <AdminList<Permission>
    type="permissions"
    getData={allPermissionsAction}
    fields={{ id: 'permissionId', title: 'permissionRight' }}
  />
)

export default AdminPermissionsPage
