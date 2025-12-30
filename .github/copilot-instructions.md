# GitHub Copilot Instructions

## Project Architecture

**Turborepo monorepo** with TypeScript ESM, React 19, Next.js 15, using **direct imports instead of barrel exports**. Architecture follows atomic design with environment-split utilities.

### Critical Import Pattern

**NO package-level barrel exports** - Each component/util/hook has its own index.ts, but NO package-wide barrel files:

```typescript
// ✅ CORRECT - Import from component folder (uses index.ts)
import Button from '@packages/components/atoms/Button'
import { LoginForm } from '@packages/components/organisms/LoginForm'
import { UserSchema } from '@packages/validators/user.validator'

// ❌ WRONG - Package-level barrel exports
import { Button, LoginForm } from '@packages/components'
import { UserSchema, AccountSchema } from '@packages/validators'
```

**Critical Rules**:

- Each component/util/hook folder HAS an `index.ts` that exports its own content
- NEVER create package-level barrel files (e.g., `@packages/components/src/index.ts` that exports all components)
- Import from the component folder path, not the package root
- Component index.ts files export: `{ default, ComponentName }` and related items

Path mappings in `package.json` exports field enable direct imports: `"./atoms/*": "./src/atoms/*/index.tsx"`

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

## Project Analysis Workflow

**When asked to "analyse project"**, execute the following comprehensive analysis and fix all errors:

1. **Type Check**: Run `npm run typecheck`
   - Fix all TypeScript errors
   - Ensure all types are properly defined
   - Check for missing type imports

2. **Lint Check**: Run `npm run lint`
   - Fix all ESLint errors and warnings
   - Apply auto-fixes where possible
   - Ensure code style consistency

3. **Test Suite**: Run `npm run test`
   - Fix all failing tests
   - Ensure all tests pass with proper coverage

4. **Test Coverage Analysis**: Check for missing tests
   - **Components**: Every component in `packages/components/src/` must have a test in `tests/unit/src/components/`
   - **Utils**: Every utility in `utils/*/src/` must have a test in `tests/unit/src/utils/`
   - **Hooks**: Every hook in `packages/hooks/src/` must have a test in `tests/unit/src/hooks/`
   - **Database**: Database functions in `packages/database/src/` must have tests
   - **Translate**: Translation utilities in `packages/translate/src/` must have tests
   - **Validators**: Every validator in `packages/validators/src/` must have a test in `tests/unit/src/validators/`
   - Create missing tests following existing test patterns

5. **E2E Test Extension**: Review and extend end-to-end tests
   - Check `tests/end-to-end/tests/` for coverage gaps
   - Add new E2E tests for uncovered user flows
   - Update existing tests if features have changed

6. **Storybook Coverage Check**: Verify all components have Storybook stories
   - Check `packages/components/src/` for all atoms, molecules, organisms, and templates
   - Verify corresponding `.stories.tsx` files exist in `apps/storybook/src/`
   - Create missing stories following existing story patterns (see [Button.stories.tsx](apps/storybook/src/Button.stories.tsx), [Input.stories.tsx](apps/storybook/src/Input.stories.tsx), [Label.stories.tsx](apps/storybook/src/Label.stories.tsx))
   - Stories should demonstrate all component variants and states
   - Exclude providers and complex organisms that require auth context

7. **Format**: Run `npm run format`
   - Apply Prettier formatting to all files
   - Ensure consistent code formatting

8. **Build Verification**: Run `npm run build`
   - Fix all build errors
   - Ensure all packages build successfully
   - Verify Turbo cache integrity

9. **Re-verify Type and Lint**: After making changes, run validation again
   - Run `npm run typecheck` to ensure no new type errors were introduced
   - Run `npm run lint` to ensure code style compliance
   - Fix any new errors before proceeding

10. **Update Documentation**: Improve copilot-instructions.md based on findings

- Document any new patterns discovered during analysis
- Add common pitfalls encountered and their solutions
- Update technology patterns section if new best practices emerged
- Record any regressions found and their root causes
- Add troubleshooting steps for recurring issues
- Update version requirements if dependencies changed

**Continue iterating through steps 1-10 until all errors are resolved and the project is in a healthy state.**

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

**Database Field Naming Convention**: All fields follow `[tableName]FieldName` pattern:

```typescript
// ✅ Correct - users table
await knex.schema.createTable('users', (table) => {
  table.string('userId').primary()
  table.string('userName')
  table.string('userEmail').unique()
  table.timestamp('userEmailVerified')
})

// ✅ Correct - sessions table
await knex.schema.createTable('sessions', (table) => {
  table.string('sessionId').primary()
  table.string('sessionToken').unique()
  table.string('sessionUserId').references('userId').inTable('users')
  table.timestamp('sessionExpires')
})

// ❌ Wrong - generic field names
table.string('id') // Use 'userId', 'sessionId', etc.
table.string('name') // Use 'userName', 'accountName', etc.
table.string('email') // Use 'userEmail', etc.
```

Run migrations: `cd packages/database && npm run migrate`

## Validation Layer

**Zod schemas** with one schema per file following `[entity].validator.ts` naming:

```typescript
// packages/validators/src/user.validator.ts
import { z } from 'zod'

export const UserSchema = z.object({
  userId: z.string().uuid(),
  userName: z.string().min(1),
  userEmail: z.string().email(),
  // ... following [tableName]FieldName convention
})

export type User = z.infer<typeof UserSchema>

export default UserSchema // ✅ Always default export the schema
```

**Import patterns**:

```typescript
// Direct import from specific validator
import UserValidator from '@packages/validators/user.validator'
import { UserSchema, type User } from '@packages/validators/user.validator'
```

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

1. **No package-level barrel exports** - Never create package-wide `index.ts` files (e.g., `@packages/components/src/index.ts`), but DO create folder-level index.ts for each component
2. **PostCSS must be `.cjs`** - ESM projects need CommonJS extension for PostCSS config
3. **JWT session required** - NextAuth Credentials provider fails without `session: { strategy: 'jwt' }`
4. **React 19 only** - Project uses `useActionState` - ensure React 19 in test environments
5. **Environment splitting** - Respect `@utils/client` vs `@utils/server` boundaries
6. **Turbo outputs** - Empty builds need `outputs: []` in `turbo.json` (e.g., `@packages/database`)
7. **Validator schemas have timestamps** - All database entity validators include `created_at` and `updated_at` Date fields - tests must include these
8. **Validator exports configuration** - Packages with direct file imports (like validators) need both `exports` and `typesVersions` fields in package.json for TypeScript resolution
9. **cn utility behavior** - The `cn()` function (clsx + twMerge) only deduplicates Tailwind class conflicts, NOT generic duplicate class names
10. **useLocalStorage undefined handling** - Hook JSON.stringifies all values including undefined (becomes string "undefined"), doesn't remove items
11. **Test imports require explicit package exports** - For packages without barrel exports, add `exports` field mapping each file (e.g., `"./user.validator": "./src/user.validator.ts"`)
12. **Playwright test selectors** - Use `page.getByLabel()` instead of `page.getByLabelText()` - the latter doesn't exist in Playwright's API
13. **Storybook story patterns** - Stories for atoms like Box and Form should include multiple variants demonstrating different use cases and props
14. **E2E test structure** - Group related tests in `test.describe()` blocks for better organization and setup/teardown management
15. **Template test complexity** - Template components that render conditional content based on auth context require careful mocking of both NextAuth session and Auth provider state

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

4. Usage - Import from component folder:
   ```typescript
   import Card from '@packages/components/atoms/Card'
   import { cardVariants } from '@packages/components/atoms/Card'
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

- Component pattern: `packages/components/src/atoms/Button/Button.atom.tsx`
- Auth setup: `apps/app/src/lib/auth.ts`
- Theme tokens: `packages/theme/src/globals.css`
- Turbo config: `turbo.json`
- Test config: `tests/unit/vitest.config.ts`
- ESLint flat config: `config/eslint/base.mjs`

## Test Coverage Status

### Unit Tests (111 tests passing)

**Components** (18 test files):

- ✅ All atoms: Button, Label, Input, Box, Form
- ✅ All molecules: Dialog, AuthClick
- ✅ All organisms: LoginModal, LoginForm
- ✅ All templates: Default

**Hooks**:

- ✅ useLocalStorage

**Utils**:

- ✅ cn (common)
- ✅ isString (common)

**Validators**:

- ✅ All validators: user, session, account, verification-token, translation

### E2E Tests (Playwright)

**Coverage**:

- ✅ Homepage functionality
- ✅ Authentication flow (login/logout)
- ✅ Login modal interactions
- ✅ Form validation

### Storybook Stories

**Coverage**:

- ✅ Atoms: Button, Label, Input, Box, Form
- ❌ Molecules: Dialog (complex), AuthClick (needs auth context)
- ❌ Organisms: LoginModal, LoginForm (provider dependent)
- ❌ Templates: Default (provider dependent)

Note: Complex components requiring auth context or providers are intentionally excluded from Storybook as they cannot be properly demonstrated in isolation.
