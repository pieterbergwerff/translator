import NextAuth, { getServerSession } from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import { db } from '@packages/database/knex'

import CredentialsProvider from 'next-auth/providers/credentials'

// Custom Knex adapter for NextAuth v4
/* eslint-disable @typescript-eslint/no-explicit-any */
function KnexAdapter(database: typeof db): any {
  return {
    async createUser(user: any) {
      const id = crypto.randomUUID()
      await database('users').insert({
        id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        image: user.image,
      })
      return {
        id,
        name: user.name,
        email: user.email!,
        emailVerified: user.emailVerified,
        image: user.image,
      }
    },
    async getUser(id: any) {
      const user = await database('users').where({ id }).first()
      return user || null
    },
    async getUserByEmail(email: any) {
      const user = await database('users').where({ email }).first()
      return user || null
    },
    async getUserByAccount({ providerAccountId, provider }: any) {
      const account = await database('accounts').where({ provider, providerAccountId }).first()
      if (!account) return null
      const user = await database('users').where({ id: account.userId }).first()
      return user || null
    },
    async updateUser(user: any) {
      await database('users').where({ id: user.id }).update(user)
      return user
    },
    async linkAccount(account: any) {
      const id = crypto.randomUUID()
      await database('accounts').insert({ id, ...account })
    },
    async unlinkAccount({ providerAccountId, provider }: any) {
      await database('accounts').where({ provider, providerAccountId }).delete()
    },
    async createSession({ sessionToken, userId, expires }: any) {
      const id = crypto.randomUUID()
      await database('sessions').insert({
        id,
        sessionToken,
        userId,
        expires,
      })
      return { id, sessionToken, userId, expires }
    },
    async getSessionAndUser(sessionToken: any) {
      const session = await database('sessions').where({ sessionToken }).first()
      if (!session) return null
      const user = await database('users').where({ id: session.userId }).first()
      if (!user) return null
      return { session, user }
    },
    async updateSession(session: any) {
      const { sessionToken, ...updateData } = session
      await database('sessions').where({ sessionToken }).update(updateData)
      // Get the updated session from the database
      const updatedSession = await database('sessions').where({ sessionToken }).first()
      return updatedSession
    },
    async deleteSession(sessionToken: any) {
      await database('sessions').where({ sessionToken }).delete()
    },
    async createVerificationToken({ identifier, expires, token }: any) {
      await database('verificationTokens').insert({
        identifier,
        token,
        expires,
      })
      return { identifier, expires, token }
    },
    async useVerificationToken({ identifier, token }: any) {
      const verificationToken = await database('verificationTokens')
        .where({ identifier, token })
        .first()
      if (!verificationToken) return null
      await database('verificationTokens').where({ identifier, token }).delete()
      return verificationToken
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
