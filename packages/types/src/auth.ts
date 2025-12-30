// NextAuth database types
export interface AuthUser {
  id: string
  name?: string | null
  email?: string | null
  emailVerified?: Date | null
  image?: string | null
}

export interface Account {
  id: string
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refresh_token?: string | null
  access_token?: string | null
  expires_at?: number | null
  token_type?: string | null
  scope?: string | null
  id_token?: string | null
  session_state?: string | null
}

export interface Session {
  id: string
  sessionToken: string
  userId: string
  expires: Date
}

export interface VerificationToken {
  identifier: string
  token: string
  expires: Date
}

export interface CreateUserData {
  name?: string | null
  email?: string | null
  emailVerified?: Date | null
  image?: string | null
}

export interface AccountQuery {
  providerAccountId: string
  provider: string
}

export interface SessionWithUser {
  session: Session
  user: AuthUser
}

export interface CreateSessionData {
  sessionToken: string
  userId: string
  expires: Date
}

export interface UpdateSessionData {
  sessionToken: string
  [key: string]: unknown
}

export interface CreateVerificationTokenData {
  identifier: string
  expires: Date
  token: string
}

export interface UseVerificationTokenData {
  identifier: string
  token: string
}
