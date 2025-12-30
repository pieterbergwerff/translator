import { describe, it, expect } from 'vitest'
import SessionValidator from '@packages/validators/session.validator'

describe('SessionValidator', () => {
  it('validates a valid session object', () => {
    const validSession = {
      sessionId: '550e8400-e29b-41d4-a716-446655440000',
      sessionToken: 'token-123-abc',
      sessionUserId: '550e8400-e29b-41d4-a716-446655440001',
      sessionExpires: new Date(Date.now() + 86400000), // 24 hours from now
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = SessionValidator.safeParse(validSession)
    expect(result.success).toBe(true)
  })

  it('rejects session with invalid sessionId', () => {
    const invalidSession = {
      sessionId: 'invalid-uuid',
      sessionToken: 'token-123-abc',
      sessionUserId: '550e8400-e29b-41d4-a716-446655440001',
      sessionExpires: new Date(),
    }

    const result = SessionValidator.safeParse(invalidSession)
    expect(result.success).toBe(false)
  })

  it('rejects session with empty sessionToken', () => {
    const invalidSession = {
      sessionId: '550e8400-e29b-41d4-a716-446655440000',
      sessionToken: '',
      sessionUserId: '550e8400-e29b-41d4-a716-446655440001',
      sessionExpires: new Date(),
    }

    const result = SessionValidator.safeParse(invalidSession)
    expect(result.success).toBe(false)
  })

  it('rejects session with invalid sessionUserId', () => {
    const invalidSession = {
      sessionId: '550e8400-e29b-41d4-a716-446655440000',
      sessionToken: 'token-123-abc',
      sessionUserId: 'not-a-uuid',
      sessionExpires: new Date(),
    }

    const result = SessionValidator.safeParse(invalidSession)
    expect(result.success).toBe(false)
  })

  it('rejects session with missing required fields', () => {
    const invalidSession = {
      sessionId: '550e8400-e29b-41d4-a716-446655440000',
      sessionToken: 'token-123-abc',
    }

    const result = SessionValidator.safeParse(invalidSession)
    expect(result.success).toBe(false)
  })
})
