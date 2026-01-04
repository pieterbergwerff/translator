// import utils
import { z } from 'zod'

// import validators
import ProfileSchema from './profile.validator.ts'

export const PermissionRightSchema = z.enum(['read', 'write', 'update', 'delete'])

export const PermissionSchema = z.object({
  permissionId: z.number(),
  permissionProfileId: ProfileSchema.shape.profileId,
  permissionRight: PermissionRightSchema,
  created_at: z.date(),
  updated_at: z.date(),
})

export type Permission = z.infer<typeof PermissionSchema>
export type PermissionRight = z.infer<typeof PermissionRightSchema>

export default PermissionSchema
