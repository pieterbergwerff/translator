import { z } from 'zod'

export const AccountSchema = z.object({
  accountId: z.string().uuid(),
  accountUserId: z.string().uuid(),
  accountType: z.string(),
  accountProvider: z.string(),
  accountProviderAccountId: z.string(),
  accountRefreshToken: z.string().nullable().optional(),
  accountAccessToken: z.string().nullable().optional(),
  accountExpiresAt: z.number().nullable().optional(),
  accountTokenType: z.string().nullable().optional(),
  accountScope: z.string().nullable().optional(),
  accountIdToken: z.string().nullable().optional(),
  accountSessionState: z.string().nullable().optional(),
  created_at: z.date(),
  updated_at: z.date(),
})

export type Account = z.infer<typeof AccountSchema>

export default AccountSchema
