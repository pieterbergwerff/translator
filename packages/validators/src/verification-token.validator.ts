import { z } from 'zod'

export const VerificationTokenSchema = z.object({
  verificationTokenIdentifier: z.string(),
  verificationTokenToken: z.string(),
  verificationTokenExpires: z.date(),
  created_at: z.date(),
  updated_at: z.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

export default VerificationTokenSchema
