// import validators
import { PermissionRight } from '@packages/validators/permission.validator.ts'

type PermissionRightsCategories = 'users' | 'projects' | 'translations'

type PermissionRightsConsts = {
  [K in PermissionRightsCategories]: readonly PermissionRight[]
}

export const PERMISSION_RIGHTS: PermissionRightsConsts = {
  users: ['write', 'read', 'update', 'delete'] as const,
  projects: ['write', 'read', 'update', 'delete'] as const,
  translations: ['write', 'read', 'update', 'delete'] as const,
}

export default PERMISSION_RIGHTS
