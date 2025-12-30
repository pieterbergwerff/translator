import { describe, it, expect } from 'vitest'
import TranslationValidator from '@packages/validators/translation.validator'

describe('TranslationValidator', () => {
  it('validates a valid translation object', () => {
    const validTranslation = {
      translationId: '550e8400-e29b-41d4-a716-446655440000',
      translationSourceText: 'Hello',
      translationTargetText: 'Hola',
      translationSourceLang: 'en',
      translationTargetLang: 'es',
      translationUserId: '550e8400-e29b-41d4-a716-446655440001',
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = TranslationValidator.safeParse(validTranslation)
    expect(result.success).toBe(true)
  })

  it('rejects translation with empty sourceText', () => {
    const invalidTranslation = {
      translationId: '550e8400-e29b-41d4-a716-446655440000',
      translationSourceText: '',
      translationTargetText: 'Hola',
      translationSourceLang: 'en',
      translationTargetLang: 'es',
      translationUserId: '550e8400-e29b-41d4-a716-446655440001',
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = TranslationValidator.safeParse(invalidTranslation)
    expect(result.success).toBe(false)
  })

  it('rejects translation with empty targetText', () => {
    const invalidTranslation = {
      translationId: '550e8400-e29b-41d4-a716-446655440000',
      translationSourceText: 'Hello',
      translationTargetText: '',
      translationSourceLang: 'en',
      translationTargetLang: 'es',
      translationUserId: '550e8400-e29b-41d4-a716-446655440001',
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = TranslationValidator.safeParse(invalidTranslation)
    expect(result.success).toBe(false)
  })

  it('rejects translation with invalid language code format', () => {
    const invalidTranslation = {
      translationId: '550e8400-e29b-41d4-a716-446655440000',
      translationSourceText: 'Hello',
      translationTargetText: 'Hola',
      translationSourceLang: 'english', // Should be 2 characters
      translationTargetLang: 'es',
      translationUserId: '550e8400-e29b-41d4-a716-446655440001',
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = TranslationValidator.safeParse(invalidTranslation)
    expect(result.success).toBe(false)
  })

  it('rejects translation with invalid translationId', () => {
    const invalidTranslation = {
      translationId: 'invalid-uuid',
      translationSourceText: 'Hello',
      translationTargetText: 'Hola',
      translationSourceLang: 'en',
      translationTargetLang: 'es',
      translationUserId: '550e8400-e29b-41d4-a716-446655440001',
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = TranslationValidator.safeParse(invalidTranslation)
    expect(result.success).toBe(false)
  })

  it('rejects translation with invalid userId', () => {
    const invalidTranslation = {
      translationId: '550e8400-e29b-41d4-a716-446655440000',
      translationSourceText: 'Hello',
      translationTargetText: 'Hola',
      translationSourceLang: 'en',
      translationTargetLang: 'es',
      translationUserId: 'invalid-uuid',
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = TranslationValidator.safeParse(invalidTranslation)
    expect(result.success).toBe(false)
  })
})
