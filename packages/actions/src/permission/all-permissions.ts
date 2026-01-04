'use server'

// import libraries
import PermissionLibrary from '@utils/server/libraries/Permission.library.ts'

// import utils
import getSession from '@utils/server/getSession.util.ts'

// import types
import type { DatabaseAll } from '@packages/validators/database.validator.ts'
import type { Permission } from '@packages/validators/permission.validator.ts'

export const allPermissionsAction = async (props: DatabaseAll<Permission> = {}) => {
  const session = await getSession()
  if (!session?.user?.id) return null

  const permissionLibrary = new PermissionLibrary()
  const permissions = await permissionLibrary.getAll(props)

  return permissions ?? null
}

export default allPermissionsAction
