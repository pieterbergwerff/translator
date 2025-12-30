# @packages/database

Database package using Knex.js with support for SQLite3, PostgreSQL, and MySQL.

## Configuration

The database configuration is managed through environment variables. Copy `.env.example` to `.env` and configure your database settings.

### SQLite3 (Default)

```env
DB_CLIENT=sqlite3
DB_FILENAME=./dev.sqlite3
```

### PostgreSQL

```env
DB_CLIENT=pg
DB_CONNECTION=postgresql://username:password@localhost:5432/database_name
```

### MySQL

```env
DB_CLIENT=mysql2
DB_CONNECTION=mysql://username:password@localhost:3306/database_name
```

## Usage

### Running Migrations

```bash
cd packages/database
npm run migrate
```

### Rolling Back Migrations

```bash
npm run migrate -- rollback
```

### Seeding Database

```bash
npm run migrate -- seed
```

### Using in Code

```typescript
import { db } from '@packages/database/knex'

// Use the database connection
const users = await db('users').select('*')
```

## Migration Files

Migration files are stored in `migrations/` directory and follow the naming pattern:
`YYYYMMDDHHMMSS_description.ts`

The package includes a migration for Next-Auth tables:

- `users`
- `accounts`
- `sessions`
- `verificationTokens`
