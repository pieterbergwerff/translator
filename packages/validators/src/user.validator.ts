// import utils
import { z } from 'zod'

export const UserSchema = z.object({
  userId: z.string().uuid(),
  userName: z.string().min(1),
  userEmail: z.string().email(),
  userEmailVerified: z.date().nullable().optional(),
  userImage: z.string().url().nullable().optional(),
  created_at: z.date(),
  updated_at: z.date(),
})

export type User = z.infer<typeof UserSchema>

export default UserSchema
