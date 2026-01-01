import NextAuth, { getServerSession } from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import { db } from '@packages/database/knex'
import '@packages/types/auth'
import bcrypt from 'bcryptjs'

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

// Initialize root user if ROOT_USER and ROOT_PASSWORD are set
async function initializeRootUser() {
  const rootEmail = process.env.ROOT_USER
  const rootPassword = process.env.ROOT_PASSWORD

  if (!rootEmail || !rootPassword) {
    console.log('ROOT_USER or ROOT_PASSWORD not set, skipping root user initialization')
    return
  }

  try {
    // Check if root user already exists
    const existingUser = await db('users').where({ userEmail: rootEmail }).first()

    if (existingUser) {
      console.log('Root user already exists:', rootEmail)
      return
    }

    // Create root user with hashed password
    const hashedPassword = await bcrypt.hash(rootPassword, 10)
    const userId = crypto.randomUUID()

    await db('users').insert({
      userId,
      userName: 'Root User',
      userEmail: rootEmail,
      userPassword: hashedPassword,
      userEmailVerified: new Date(),
    })

    console.log('Root user created successfully:', rootEmail)
  } catch (error) {
    console.error('Error initializing root user:', error)
  }
}

// Initialize root user on module load
initializeRootUser()

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
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing email or password')
          return null
        }

        try {
          // Find user in database
          const user = await db('users').where({ userEmail: credentials.email }).first()

          if (!user) {
            console.log('User not found:', credentials.email)
            return null
          }

          if (!user.userPassword) {
            console.log('User has no password set:', credentials.email)
            return null
          }

          // Verify password
          const isValidPassword = await bcrypt.compare(credentials.password, user.userPassword)

          if (!isValidPassword) {
            console.log('Invalid password for user:', credentials.email)
            return null
          }

          console.log('Login successful for user:', credentials.email)

          return {
            id: user.userId,
            email: user.userEmail,
            name: user.userName,
            image: user.userImage,
          }
        } catch (error) {
          console.error('Error during authorization:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        // Add all user data from token to session
        session.user.userId = token.userId
        session.user.userName = token.userName
        session.user.userEmail = token.userEmail
        session.user.userEmailVerified = token.userEmailVerified
        session.user.userImage = token.userImage
        // Legacy fields for NextAuth compatibility
        session.user.id = token.userId // Use userId instead of token.sub
        session.user.name = token.userName
        session.user.email = token.userEmail
        session.user.image = token.userImage
      }
      return session
    },
    async jwt({ token, user, trigger }) {
      // On sign in, store the full user data in the token
      if (user) {
        token.id = user.id
      }

      // Always fetch fresh user data from database
      if (token.sub) {
        try {
          const dbUser = await db('users').where({ userId: token.sub }).first()
          if (dbUser) {
            token.userId = dbUser.userId
            token.userName = dbUser.userName
            token.userEmail = dbUser.userEmail
            token.userEmailVerified = dbUser.userEmailVerified
            token.userImage = dbUser.userImage
          }
        } catch (error) {
          console.error('Error fetching user in JWT callback:', error)
        }
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
