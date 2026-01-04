import { describe, it, expect } from 'vitest'
import TranslationValidator from '@packages/validators/translation.validator.ts'

describe('TranslationValidator', () => {
  it('validates a valid translation object', () => {
    const validTranslation = {
      translationId: 1,
      translationSourceText: 'Hello',
      translationTargetText: 'Hola',
      translationSourceLang: 'en',
      translationTargetLang: 'es',
      translationUserId: 2,
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = TranslationValidator.safeParse(validTranslation)
    expect(result.success).toBe(true)
  })

  it('rejects translation with empty sourceText', () => {
    const invalidTranslation = {
      translationId: 1,
      translationSourceText: '',
      translationTargetText: 'Hola',
      translationSourceLang: 'en',
      translationTargetLang: 'es',
      translationUserId: 2,
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = TranslationValidator.safeParse(invalidTranslation)
    expect(result.success).toBe(false)
  })

  it('rejects translation with empty targetText', () => {
    const invalidTranslation = {
      translationId: 1,
      translationSourceText: 'Hello',
      translationTargetText: '',
      translationSourceLang: 'en',
      translationTargetLang: 'es',
      translationUserId: 2,
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = TranslationValidator.safeParse(invalidTranslation)
    expect(result.success).toBe(false)
  })

  it('rejects translation with invalid language code format', () => {
    const invalidTranslation = {
      translationId: 1,
      translationSourceText: 'Hello',
      translationTargetText: 'Hola',
      translationSourceLang: 'english', // Should be 2 characters
      translationTargetLang: 'es',
      translationUserId: 2,
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = TranslationValidator.safeParse(invalidTranslation)
    expect(result.success).toBe(false)
  })

  it('rejects translation with invalid translation ID', () => {
    const invalidTranslation = {
      translationId: 'invalid-number',
      translationSourceText: 'Hello',
      translationTargetText: 'Hola',
      translationSourceLang: 'en',
      translationTargetLang: 'es',
      translationUserId: 2,
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = TranslationValidator.safeParse(invalidTranslation)
    expect(result.success).toBe(false)
  })

  it('rejects translation with invalid user ID', () => {
    const invalidTranslation = {
      translationId: 1,
      translationSourceText: 'Hello',
      translationTargetText: 'Hola',
      translationSourceLang: 'en',
      translationTargetLang: 'es',
      translationUserId: 'invalid-number',
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = TranslationValidator.safeParse(invalidTranslation)
    expect(result.success).toBe(false)
  })
})
