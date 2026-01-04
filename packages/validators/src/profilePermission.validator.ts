// import utils
import { z } from 'zod'

// import validators
import ProfileSchema from './profile.validator.ts'
import PermissionSchema from './permission.validator'

export const ProfilePermissionSchema = z.object({
  ppId: z.number(),
  ppProfileId: ProfileSchema.shape.profileId,
  ppPermissionId: PermissionSchema.shape.permissionId,
  created_at: z.date(),
  updated_at: z.date(),
})

export type ProfilePermission = z.infer<typeof ProfilePermissionSchema>

export default ProfilePermissionSchema
