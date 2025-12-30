// import utils
import { z } from 'zod'

export const SettingsSchema = z.object({
  settingsId: z.string().uuid(),
  settingsName: z.string(),
  settingsValue: z.any(),
  created_at: z.date(),
  updated_at: z.date(),
})

export type Settings = z.infer<typeof SettingsSchema>

export default SettingsSchema
