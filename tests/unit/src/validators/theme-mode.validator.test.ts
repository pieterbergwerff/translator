import { describe, it, expect } from 'vitest'
import ThemeModeValidator from '@packages/validators/theme-mode.validator'

describe('ThemeModeValidator', () => {
  it('validates "light" theme mode', () => {
    const result = ThemeModeValidator.safeParse('light')
    expect(result.success).toBe(true)
  })

  it('validates "dark" theme mode', () => {
    const result = ThemeModeValidator.safeParse('dark')
    expect(result.success).toBe(true)
  })

  it('validates "system" theme mode', () => {
    const result = ThemeModeValidator.safeParse('system')
    expect(result.success).toBe(true)
  })

  it('rejects invalid theme mode string', () => {
    const result = ThemeModeValidator.safeParse('invalid')
    expect(result.success).toBe(false)
  })

  it('rejects null value', () => {
    const result = ThemeModeValidator.safeParse(null)
    expect(result.success).toBe(false)
  })

  it('rejects undefined value', () => {
    const result = ThemeModeValidator.safeParse(undefined)
    expect(result.success).toBe(false)
  })

  it('rejects number value', () => {
    const result = ThemeModeValidator.safeParse(123)
    expect(result.success).toBe(false)
  })

  it('rejects object value', () => {
    const result = ThemeModeValidator.safeParse({ mode: 'light' })
    expect(result.success).toBe(false)
  })

  it('rejects empty string', () => {
    const result = ThemeModeValidator.safeParse('')
    expect(result.success).toBe(false)
  })
})
