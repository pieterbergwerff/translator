// import actions
import allPermissionsAction from '@packages/actions/permission/all-permissions.ts'

// import components
import AdminList from '@packages/components/organisms/admin/AdminList'

// import types
import type { FC } from 'react'
import type { Permission } from '@packages/validators/permission.validator.ts'

export const AdminPermissionsOverviewPage: FC = async () => (
  <AdminList<Permission>
    type="permissions"
    getData={allPermissionsAction}
    fields={{ id: 'permissionId', title: 'permissionRight' }}
  />
)

export default AdminPermissionsOverviewPage
