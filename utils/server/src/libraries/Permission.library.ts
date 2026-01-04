// import extends
import Library from '@utils/server/extends/Library.extends.ts'

// import types
import type { Permission } from '@packages/validators/permission.validator.ts'
import type { DatabaseAll } from '@packages/validators/database.validator.ts'

export class PermissionLibrary extends Library<Permission> {
  constructor() {
    super()
    this.tableName = 'permissions'
    this.primaryKey = 'permissionId'
  }

  public async getAll(props: DatabaseAll<Permission> = {}) {
    return this._all(props)
  }
}

export default PermissionLibrary
