// import utils
import { z } from 'zod'

export const SettingSchema = z.object({
  settingsId: z.number(),
  settingsUserId: z.number(),
  settingsName: z.string(),
  settingsValue: z.any(),
  created_at: z.date(),
  updated_at: z.date(),
})

export type Settings = z.infer<typeof SettingSchema>

export default SettingSchema
