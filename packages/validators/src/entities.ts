import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  createdAt: z.date(),
})

export const TranslationSchema = z.object({
  id: z.string().uuid(),
  sourceText: z.string().min(1),
  targetText: z.string().min(1),
  sourceLang: z.string().length(2),
  targetLang: z.string().length(2),
  userId: z.string().uuid(),
  createdAt: z.date(),
})

export type User = z.infer<typeof UserSchema>
export type Translation = z.infer<typeof TranslationSchema>
