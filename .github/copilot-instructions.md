# GitHub Copilot Instructions

## Project Architecture

**Turborepo monorepo** with TypeScript ESM, React 19, Next.js 15, using **direct imports instead of barrel exports**. Architecture follows atomic design with environment-split utilities.

### Critical Import Pattern

**NEVER use barrel exports** - import directly from source files:

```typescript
import Button from '@packages/components/atoms/Button' // ✅ Correct
import { LoginForm } from '@packages/components/organisms' // ❌ Wrong - no index.ts exports
```

Path mappings in `package.json` exports field enable this: `"./atoms/*": "./src/atoms/*/index.tsx"`

### Package Structure

- `@packages/*` - Shared libraries (components/hooks/validators/types/constants/theme/translate/database)
- `@utils/*` - **Environment-split** utilities (common/client/server) - respect execution context
- `@apps/*` - Next.js app (:3000), Storybook (:4000), Test UI (:5000)
- `@config/*` - Shared configs (ESLint 9 flat `.mjs`, TypeScript, Prettier)
- `tests/*` - Vitest unit tests, Playwright E2E tests

### Atomic Design Structure

Components organized by complexity level with **strict naming conventions**:

```
packages/components/src/
  ├── atoms/Button/
  │   ├── Button.atom.tsx          # Component implementation
  │   ├── Button.cva.ts            # Class variance authority variants
  │   └── index.ts                 # Re-exports (NOT index.tsx)
  ├── molecules/Dialog/
  │   ├── Dialog.molecule.tsx      # Component implementation
  │   └── index.ts
  ├── organisms/LoginForm/
  │   ├── LoginForm.organism.tsx   # Component implementation
  │   ├── LoginForm.hook.ts        # Component-specific hook
  │   └── index.ts
  └── providers/Auth/
      ├── Auth.provider.tsx        # Provider implementation
      └── index.ts
```

**Component File Naming Rules**:

- Atoms: `ComponentName.atom.tsx` + `ComponentName.cva.ts` (for variants)
- Molecules: `ComponentName.molecule.tsx`
- Organisms: `ComponentName.organism.tsx` + `ComponentName.hook.ts` (if stateful)
- Templates: `ComponentName.template.tsx`
- Providers: `ComponentName.provider.tsx`
- Index files: Always `index.ts` (NOT `.tsx`) - only re-exports, no implementation

**Example index.ts pattern**:

```typescript
// atoms/Button/index.ts
export { default, ButtonAtomComponent } from './Button.atom'
export { buttonVariantsCva as buttonVariants } from './Button.cva'
```

## Essential Workflows

**Start Development**: `npm run dev` - Starts all apps concurrently

- Next.js on http://localhost:3000
- Storybook on http://localhost:4000
- Vitest UI on http://localhost:5000

**Testing**:

- `npm run test` - Run all unit tests via Vitest
- `npm run test:ui` - Interactive test UI with coverage
- Unit tests: `tests/unit/src/` mirror `packages/` structure
- E2E tests: `tests/end-to-end/tests/` use Playwright

**Turbo Caching**: `npm run build` uses Turbo's dependency graph

- Outputs cached in `.turbo/`
- Tasks defined in `turbo.json` with `dependsOn` chains

**Nuclear Reset**: `npm run clean` - Removes all `node_modules/`, lock files, and `.turbo/` cache

## Critical Technology Patterns

### React 19 Specific

**Use React 19 hooks** - `useActionState` is available:

```typescript
// packages/components/src/organisms/LoginForm/LoginForm.hook.ts
import { useActionState } from 'react' // ✅ React 19 feature

const [state, dispatch, isPending] = useActionState(serverAction, initialState)
```

**Version enforcement** via `package.json` overrides ensures React 19 everywhere (fixes multiple version conflicts)

### Styling System

**Tailwind + OKLCH colors** with CSS custom properties (NOT media queries for dark mode):

```typescript
// Design tokens: packages/theme/src/globals.css
:root { --primary: oklch(65% 0.2 220); }
.dark { --primary: oklch(80% 0.15 220); }  // Class-based, not @media

// Component styling with cva
const buttonVariants = cva('base-classes', {
  variants: { variant: { default: 'bg-primary', destructive: 'bg-destructive' } }
})

// Merge utilities with cn()
import { cn } from '@utils/common/cn'  // clsx + tailwind-merge
className={cn(buttonVariants({ variant }), className)}
```

### PostCSS Configuration

**MUST use `.cjs` extension** for CommonJS in ESM context:

```javascript
// apps/app/postcss.config.cjs - NOT .js
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }
```

### ESLint 9 Flat Config

**Use `.mjs` files** with new flat config format (no `.eslintrc`):

```javascript
// config/eslint/base.mjs
import tseslint from 'typescript-eslint'
export default tseslint.config({ files: ['**/*.{ts,tsx}'], extends: [...] })
```

### TypeScript Project References

**Composite builds** with project references for fast incremental compilation:

```json
// packages/components/tsconfig.json
{ "references": [{ "path": "../types" }], "composite": true }
```

## Authentication Architecture

**NextAuth v4 with JWT strategy** (required for Credentials provider):

```typescript
// apps/app/src/lib/auth.ts
export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' }, // ✅ REQUIRED for credentials auth
  adapter: KnexAdapter(database), // Custom adapter
  providers: [
    CredentialsProvider({
      /* ... */
    }),
  ],
}
```

**Session access**:

- Client: `useSession()` from `next-auth/react`
- Server: `getServerSession(authOptions)` from `next-auth`

## Database Layer

**Knex.js with SQLite/PostgreSQL/MySQL** support via environment config:

```env
# apps/app/.env.local
DB_CLIENT=sqlite3
DB_FILENAME=../../packages/database/dev.sqlite3
ROOT_USER=admin@example.com
ROOT_PASSWORD=admin123
NEXTAUTH_SECRET=<generated>
```

Run migrations: `cd packages/database && npm run migrate`

## Testing Patterns

**Vitest with jsdom** for React component tests:

```typescript
// tests/unit/vitest.config.ts
environment: 'jsdom',
setupFiles: ['./vitest.setup.ts'],  // Imports @testing-library/jest-dom
alias: { '@packages/*': path.resolve(__dirname, '../../packages/*') }
```

**Mock Next.js/NextAuth** in tests:

```typescript
vi.mock('next-auth/react', () => ({ signIn: vi.fn() }))
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }))
```

## Common Pitfalls

1. **No barrel exports** - Never create `index.ts` files that re-export components
2. **PostCSS must be `.cjs`** - ESM projects need CommonJS extension for PostCSS config
3. **JWT session required** - NextAuth Credentials provider fails without `session: { strategy: 'jwt' }`
4. **React 19 only** - Project uses `useActionState` - ensure React 19 in test environments
5. **Environment splitting** - Respect `@utils/client` vs `@utils/server` boundaries
6. **Turbo outputs** - Empty builds need `outputs: []` in `turbo.json` (e.g., `@packages/database`)

## Component Creation Workflow

**Creating a new atom** (e.g., Card):

1. Create folder: `packages/components/src/atoms/Card/`
2. Create files:
   - `Card.atom.tsx` - Component implementation with `forwardRef`
   - `Card.cva.ts` - Variants using `cva()` if needed
   - `index.ts` - Re-export: `export { default, CardAtomComponent } from './Card.atom'`
3. Import structure in `.atom.tsx`:

   ```typescript
   // import utils
   import cn from '@utils/common/cn'
   import { forwardRef } from 'react'

   // import variants (if .cva.ts exists)
   import cardVariants from './Card.cva'

   // import types
   import type { VariantProps } from 'class-variance-authority'
   ```

**Creating an organism with state** (e.g., ProfileForm):

1. Create folder: `packages/components/src/organisms/ProfileForm/`
2. Create files:
   - `ProfileForm.organism.tsx` - Component implementation
   - `ProfileForm.hook.ts` - State management and logic
   - `index.ts` - Re-export: `export { default, ProfileFormOrganismComponent } from './ProfileForm.organism'`
3. Import structure in `.organism.tsx`:

   ```typescript
   'use client' // If uses hooks

   // import hooks
   import useProfileForm from './ProfileForm.hook'

   // import components
   import Button from '@packages/components/atoms/Button'

   // import types
   import type { FC } from 'react'
   ```

## Key Files Reference

- Component pattern: `packages/components/src/atoms/Button/index.tsx`
- Auth setup: `apps/app/src/lib/auth.ts`
- Theme tokens: `packages/theme/src/globals.css`
- Turbo config: `turbo.json`
- Test config: `tests/unit/vitest.config.ts`
- ESLint flat config: `config/eslint/base.mjs`
