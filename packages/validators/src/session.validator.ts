// import utils
import { z } from 'zod'

export const SessionSchema = z.object({
  sessionId: z.string().uuid(),
  sessionToken: z.string(),
  sessionUserId: z.string().uuid(),
  sessionExpires: z.date(),
  created_at: z.date(),
  updated_at: z.date(),
})

export type Session = z.infer<typeof SessionSchema>

export default SessionSchema
