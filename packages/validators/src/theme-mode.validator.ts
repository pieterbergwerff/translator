// import utils
import { z } from 'zod'

export const ThemeModeSchema = z.enum(['light', 'dark', 'system'])

export type ThemeMode = z.infer<typeof ThemeModeSchema>

export default ThemeModeSchema
