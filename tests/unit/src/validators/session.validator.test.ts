import { describe, it, expect } from 'vitest'
import SessionValidator from '@packages/validators/session.validator'

describe('SessionValidator', () => {
  it('validates a valid session object', () => {
    const validSession = {
      sessionId: 1,
      sessionToken: 'token-123-abc',
      sessionUserId: 2,
      sessionExpires: new Date(Date.now() + 86400000), // 24 hours from now
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = SessionValidator.safeParse(validSession)
    expect(result.success).toBe(true)
  })

  it('rejects session with invalid session ID', () => {
    const invalidSession = {
      sessionId: 'invalid-number',
      sessionToken: 'token-123-abc',
      sessionUserId: 2,
      sessionExpires: new Date(),
    }

    const result = SessionValidator.safeParse(invalidSession)
    expect(result.success).toBe(false)
  })

  it('rejects session with empty sessionToken', () => {
    const invalidSession = {
      sessionId: 1,
      sessionToken: '',
      sessionUserId: 2,
      sessionExpires: new Date(),
    }

    const result = SessionValidator.safeParse(invalidSession)
    expect(result.success).toBe(false)
  })

  it('rejects session with invalid sessionUserId', () => {
    const invalidSession = {
      sessionId: 1,
      sessionToken: 'token-123-abc',
      sessionUserId: 'not-a-uuid',
      sessionExpires: new Date(),
    }

    const result = SessionValidator.safeParse(invalidSession)
    expect(result.success).toBe(false)
  })

  it('rejects session with missing required fields', () => {
    const invalidSession = {
      sessionId: 1,
      sessionToken: 'token-123-abc',
    }

    const result = SessionValidator.safeParse(invalidSession)
    expect(result.success).toBe(false)
  })
})
