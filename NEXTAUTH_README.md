# Next-Auth Implementation

This project has been set up with NextAuth v4 for authentication, including support for multiple OAuth providers and a custom Knex database adapter.

## Features Implemented

### Authentication Providers

- ✅ Apple
- ✅ Credentials (email/password)
- ✅ Discord
- ✅ Dropbox
- ✅ DuendeIdentityServer6
- ✅ Email (Magic Links)
- ✅ Facebook
- ✅ GitHub
- ✅ Google
- ✅ Instagram
- ✅ LinkedIn
- ✅ Slack
- ✅ Spotify
- ✅ Twitter
- ✅ Zoho

### Database Integration

- ✅ Custom Knex adapter for NextAuth v4
- ✅ SQLite3 database (configurable for PostgreSQL/MySQL)
- ✅ Database migrations for auth tables
- ✅ Environment-based configuration

### Pages & Components

- ✅ Custom sign-in page with all providers
- ✅ Sign-out page
- ✅ Email verification page
- ✅ User navigation component
- ✅ Session provider setup
- ✅ TypeScript type extensions

## Setup Instructions

1. **Copy environment file:**

   ```bash
   cp .env.example .env.local
   ```

2. **Configure OAuth providers:**
   Edit `.env.local` and add your OAuth application credentials.

3. **Run database migrations:**

   ```bash
   cd packages/database
   npm run migrate migrate
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## Configuration

### Database

The database is configured via environment variables:

- `DB_CLIENT`: Database type (sqlite3, pg, mysql2)
- `DB_FILENAME`: SQLite file path
- `DB_CONNECTION`: Connection string for PostgreSQL/MySQL

### NextAuth

- `NEXTAUTH_URL`: Your app's URL
- `NEXTAUTH_SECRET`: Secret for JWT signing
- Provider-specific client IDs and secrets

## File Structure

```
apps/app/src/
├── lib/
│   └── auth-v4.ts         # NextAuth configuration
├── app/
│   ├── api/auth/[...nextauth]/route.ts  # NextAuth API route
│   ├── auth/              # Auth pages
│   └── page.tsx           # Home page with auth status
├── components/
│   ├── auth-provider.tsx  # Session provider wrapper
│   └── user-nav-client.tsx # User navigation component
└── types/
    └── next-auth.d.ts     # TypeScript type extensions

packages/database/
├── src/
│   ├── config.ts          # Database configuration
│   ├── knex.ts            # Knex instance
│   └── migrate.ts         # Migration runner
└── migrations/
    └── 20241229000001_create_auth_tables.ts
```

## Usage

### Protecting Pages

Use the middleware to protect pages:

```typescript
// middleware-v4.ts (example)
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Add custom logic
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)
```

### Getting Session Data

```typescript
// Server component
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-v4'

const session = await getServerSession(authOptions)

// Client component
import { useSession } from 'next-auth/react'

const { data: session, status } = useSession()
```

## Provider Setup

Each OAuth provider requires app registration and configuration:

1. **GitHub**: [GitHub Apps](https://github.com/settings/applications/new)
2. **Google**: [Google Console](https://console.developers.google.com)
3. **Discord**: [Discord Developer Portal](https://discord.com/developers/applications)
4. **Facebook**: [Facebook Developers](https://developers.facebook.com)
5. **And so on...**

Add the callback URL: `http://localhost:3000/api/auth/callback/[provider]`

## Database Tables

The migration creates these tables for NextAuth:

- `users`: User profile data
- `accounts`: OAuth account linkings
- `sessions`: Active user sessions
- `verificationTokens`: Email verification tokens

## Next Steps

1. Configure your preferred OAuth providers
2. Customize the sign-in page styling
3. Add role-based access control
4. Implement user profile management
5. Add password reset functionality for credentials provider
6. Set up email provider with SMTP configuration
