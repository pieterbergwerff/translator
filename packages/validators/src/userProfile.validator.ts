// import utils
import { z } from 'zod'

// import validators
import ProfileSchema from './profile.validator.ts'
import UserSchema from './user.validator.ts'

export const UserProfileSchema = z.object({
  upId: z.number(),
  upUserId: UserSchema.shape.userId,
  upProfileId: ProfileSchema.shape.profileId,
  created_at: z.date(),
  updated_at: z.date(),
})

export type UserProfile = z.infer<typeof UserProfileSchema>

export default UserProfileSchema
