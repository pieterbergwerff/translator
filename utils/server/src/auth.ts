import NextAuth, { getServerSession } from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import { db } from '@packages/database/knex'
import '@packages/types/auth'

import CredentialsProvider from 'next-auth/providers/credentials'

// Custom Knex adapter for NextAuth v4
/* eslint-disable @typescript-eslint/no-explicit-any */
function KnexAdapter(database: typeof db): any {
  return {
    async createUser(user: any) {
      const userId = crypto.randomUUID()
      await database('users').insert({
        userId,
        userName: user.name,
        userEmail: user.email,
        userEmailVerified: user.emailVerified,
        userImage: user.image,
      })
      return {
        id: userId,
        name: user.name,
        email: user.email!,
        emailVerified: user.emailVerified,
        image: user.image,
      }
    },
    async getUser(id: any) {
      const user = await database('users').where({ userId: id }).first()
      if (!user) return null
      return {
        id: user.userId,
        name: user.userName,
        email: user.userEmail,
        emailVerified: user.userEmailVerified,
        image: user.userImage,
      }
    },
    async getUserByEmail(email: any) {
      const user = await database('users').where({ userEmail: email }).first()
      if (!user) return null
      return {
        id: user.userId,
        name: user.userName,
        email: user.userEmail,
        emailVerified: user.userEmailVerified,
        image: user.userImage,
      }
    },
    async getUserByAccount({ providerAccountId, provider }: any) {
      const account = await database('accounts')
        .where({ accountProvider: provider, accountProviderAccountId: providerAccountId })
        .first()
      if (!account) return null
      const user = await database('users').where({ userId: account.accountUserId }).first()
      if (!user) return null
      return {
        id: user.userId,
        name: user.userName,
        email: user.userEmail,
        emailVerified: user.userEmailVerified,
        image: user.userImage,
      }
    },
    async updateUser(user: any) {
      await database('users').where({ userId: user.id }).update({
        userName: user.name,
        userEmail: user.email,
        userEmailVerified: user.emailVerified,
        userImage: user.image,
      })
      return user
    },
    async linkAccount(account: any) {
      const accountId = crypto.randomUUID()
      await database('accounts').insert({
        accountId,
        accountUserId: account.userId,
        accountType: account.type,
        accountProvider: account.provider,
        accountProviderAccountId: account.providerAccountId,
        accountRefreshToken: account.refresh_token,
        accountAccessToken: account.access_token,
        accountExpiresAt: account.expires_at,
        accountTokenType: account.token_type,
        accountScope: account.scope,
        accountIdToken: account.id_token,
        accountSessionState: account.session_state,
      })
    },
    async unlinkAccount({ providerAccountId, provider }: any) {
      await database('accounts')
        .where({ accountProvider: provider, accountProviderAccountId: providerAccountId })
        .delete()
    },
    async createSession({ sessionToken, userId, expires }: any) {
      const sessionId = crypto.randomUUID()
      await database('sessions').insert({
        sessionId,
        sessionToken,
        sessionUserId: userId,
        sessionExpires: expires,
      })
      return { id: sessionId, sessionToken, userId, expires }
    },
    async getSessionAndUser(sessionToken: any) {
      const session = await database('sessions').where({ sessionToken }).first()
      if (!session) return null
      const user = await database('users').where({ userId: session.sessionUserId }).first()
      if (!user) return null
      return {
        session: {
          id: session.sessionId,
          sessionToken: session.sessionToken,
          userId: session.sessionUserId,
          expires: session.sessionExpires,
        },
        user: {
          id: user.userId,
          name: user.userName,
          email: user.userEmail,
          emailVerified: user.userEmailVerified,
          image: user.userImage,
        },
      }
    },
    async updateSession(session: any) {
      const { sessionToken, ...updateData } = session
      await database('sessions').where({ sessionToken }).update({
        sessionUserId: updateData.userId,
        sessionExpires: updateData.expires,
      })
      // Get the updated session from the database
      const updatedSession = await database('sessions').where({ sessionToken }).first()
      if (!updatedSession) return null
      return {
        id: updatedSession.sessionId,
        sessionToken: updatedSession.sessionToken,
        userId: updatedSession.sessionUserId,
        expires: updatedSession.sessionExpires,
      }
    },
    async deleteSession(sessionToken: any) {
      await database('sessions').where({ sessionToken }).delete()
    },
    async createVerificationToken({ identifier, expires, token }: any) {
      await database('verificationTokens').insert({
        verificationTokenIdentifier: identifier,
        verificationTokenToken: token,
        verificationTokenExpires: expires,
      })
      return { identifier, expires, token }
    },
    async useVerificationToken({ identifier, token }: any) {
      const verificationToken = await database('verificationTokens')
        .where({ verificationTokenIdentifier: identifier, verificationTokenToken: token })
        .first()
      if (!verificationToken) return null
      await database('verificationTokens')
        .where({ verificationTokenIdentifier: identifier, verificationTokenToken: token })
        .delete()
      return {
        identifier: verificationToken.verificationTokenIdentifier,
        token: verificationToken.verificationTokenToken,
        expires: verificationToken.verificationTokenExpires,
      }
    },
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export const authOptions: NextAuthOptions = {
  adapter: KnexAdapter(db),
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Debug logging
        console.log('Authorize called with:', {
          email: credentials?.email,
          password: credentials?.password ? '[REDACTED]' : undefined,
          expectedEmail: process.env.ROOT_USER,
          hasPassword: !!credentials?.password,
          hasExpectedPassword: !!process.env.ROOT_PASSWORD,
          expectedPassword: process.env.ROOT_PASSWORD,
        })

        // Check against ROOT_USER and ROOT_PASSWORD from environment
        if (
          credentials?.email === process.env.ROOT_USER &&
          credentials?.password === process.env.ROOT_PASSWORD
        ) {
          console.log('Credentials match - allowing login')
          return {
            id: '1',
            email: process.env.ROOT_USER!,
            name: 'Root User',
          }
        }
        console.log('Credentials do not match - denying login')
        return null
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

// Export for NextAuth v4
export const auth = () => getServerSession(authOptions)

// Export alias for consistent imports
export const authConfig = authOptions

export { signOut } from 'next-auth/react'

export default handler
