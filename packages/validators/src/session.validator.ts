// import utils
import { z } from 'zod'

export const SessionSchema = z.object({
  sessionId: z.number(),
  sessionToken: z.string(),
  sessionUserId: z.number(),
  sessionExpires: z.date(),
  created_at: z.date(),
  updated_at: z.date(),
})

export type Session = z.infer<typeof SessionSchema>

export default SessionSchema
