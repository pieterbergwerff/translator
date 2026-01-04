import { describe, it, expect } from 'vitest'
import SettingsValidator from '@packages/validators/setting.validator'

describe('SettingsValidator', () => {
  it('validates a valid settings object', () => {
    const validSettings = {
      settingsId: 1,
      settingsUserId: 1,
      settingsName: 'theme-mode',
      settingsValue: 'dark',
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = SettingsValidator.safeParse(validSettings)
    expect(result.success).toBe(true)
  })

  it('validates settings with different value types', () => {
    const validSettings = {
      settingsId: 1,
      settingsUserId: 1,
      settingsName: 'notifications',
      settingsValue: { email: true, push: false },
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = SettingsValidator.safeParse(validSettings)
    expect(result.success).toBe(true)
  })

  it('rejects settings with invalid settingsId format', () => {
    const invalidSettings = {
      settingsId: 'invalid-number',
      settingsUserId: '660e8400-e29b-41d4-a716-446655440000',
      settingsName: 'theme',
      settingsValue: 'light',
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = SettingsValidator.safeParse(invalidSettings)
    expect(result.success).toBe(false)
  })

  it('rejects settings with missing settingsName', () => {
    const invalidSettings = {
      settingsId: 1,
      settingsUserId: '660e8400-e29b-41d4-a716-446655440000',
      settingsValue: 'value',
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = SettingsValidator.safeParse(invalidSettings)
    expect(result.success).toBe(false)
  })

  it('rejects settings with missing required timestamps', () => {
    const invalidSettings = {
      settingsId: 1,
      settingsUserId: 1,
      settingsName: 'theme',
      settingsValue: 'dark',
    }

    const result = SettingsValidator.safeParse(invalidSettings)
    expect(result.success).toBe(false)
  })

  it('accepts any value type for settingsValue', () => {
    const testValues = ['string-value', 123, true, null, { nested: 'object' }, ['array', 'values']]

    testValues.forEach((value) => {
      const settings = {
        settingsId: 1,
        settingsUserId: 1,
        settingsName: 'test-setting',
        settingsValue: value,
        created_at: new Date(),
        updated_at: new Date(),
      }

      const result = SettingsValidator.safeParse(settings)
      expect(result.success).toBe(true)
    })
  })
})
