import { describe, it, expect } from 'vitest'
import VerificationTokenValidator from '@packages/validators/verification-token.validator'

describe('VerificationTokenValidator', () => {
  it('validates a valid verification token object', () => {
    const validToken = {
      verificationTokenIdentifier: 'user@example.com',
      verificationTokenToken: 'token-abc-123-xyz',
      verificationTokenExpires: new Date(Date.now() + 3600000), // 1 hour from now
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = VerificationTokenValidator.safeParse(validToken)
    expect(result.success).toBe(true)
  })

  it('rejects token with empty identifier', () => {
    const invalidToken = {
      verificationTokenIdentifier: '',
      verificationTokenToken: 'token-abc-123-xyz',
      verificationTokenExpires: new Date(),
    }

    const result = VerificationTokenValidator.safeParse(invalidToken)
    expect(result.success).toBe(false)
  })

  it('rejects token with empty token string', () => {
    const invalidToken = {
      verificationTokenIdentifier: 'user@example.com',
      verificationTokenToken: '',
      verificationTokenExpires: new Date(),
    }

    const result = VerificationTokenValidator.safeParse(invalidToken)
    expect(result.success).toBe(false)
  })

  it('rejects token with invalid date', () => {
    const invalidToken = {
      verificationTokenIdentifier: 'user@example.com',
      verificationTokenToken: 'token-abc-123-xyz',
      verificationTokenExpires: 'not-a-date',
    }

    const result = VerificationTokenValidator.safeParse(invalidToken)
    expect(result.success).toBe(false)
  })

  it('rejects token with missing required fields', () => {
    const invalidToken = {
      verificationTokenIdentifier: 'user@example.com',
    }

    const result = VerificationTokenValidator.safeParse(invalidToken)
    expect(result.success).toBe(false)
  })
})
