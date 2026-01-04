// import utils
import { z } from 'zod'

export const ProfileSchema = z.object({
  profileId: z.number(),
  profileName: z.string().min(2).max(100),
  profileStatus: z.enum(['active', 'inactive', 'banned']),
  created_at: z.date(),
  updated_at: z.date(),
})

export type Profile = z.infer<typeof ProfileSchema>

export default ProfileSchema
