// import utils
import { z } from 'zod'

export const TranslationSchema = z.object({
  translationId: z.number(),
  translationSourceText: z.string().min(1),
  translationTargetText: z.string().min(1),
  translationSourceLang: z.string().length(2),
  translationTargetLang: z.string().length(2),
  translationUserId: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
})

export type Translation = z.infer<typeof TranslationSchema>

export default TranslationSchema
