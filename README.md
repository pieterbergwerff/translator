# Translator

A modern monorepo built with Turborepo, TypeScript ESM, and React, featuring atomic design patterns and direct imports.

## Architecture

**Turborepo Monorepo**: TypeScript ESM throughout with **direct imports instead of barrel exports**

**Key Pattern**: Import components directly from their source:

```typescript
import Button from '@packages/components/atoms/Button' // ✅ Correct
import { Button } from '@packages/components' // ❌ Wrong
```

## Structure

- **Apps**
  - `apps/app` - Next.js 15 application (port 3000)
  - `apps/storybook` - Storybook for component development (port 4000)
  - `apps/test-ui` - Vitest UI for interactive testing (port 5000)

- **Packages** (Atomic Design)
  - `packages/components` - React components with shadcn/ui foundation
  - `packages/hooks` - React hooks
  - `packages/validators` - Zod validation schemas
  - `packages/types` - TypeScript type definitions
  - `packages/constants` - Application constants
  - `packages/theme` - CSS custom properties with OKLCH color space
  - `packages/translate` - i18n translations

- **Utils** (Environment-Split)
  - `utils/common` - Universal utilities (browser & server)
  - `utils/server` - Server-only utilities
  - `utils/client` - Client-only utilities

- **Config**
  - `config/typescript` - Shared TypeScript configurations
  - `config/eslint` - ESLint 9 flat configs
  - `config/prettier` - Prettier configuration

- **Tests**
  - `tests/unit` - Vitest unit tests
  - `tests/end-to-end` - Playwright e2e tests

## Getting Started

**Prerequisites**: Node.js 24 (see `.nvmrc`)

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start all development servers:

   ```bash
   npm run dev
   ```

3. Access applications:
   - **Next.js App**: http://localhost:3000
   - **Storybook**: http://localhost:4000
   - **Test UI**: http://localhost:5000

## Scripts

| Command             | Description                                  |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Start all development servers simultaneously |
| `npm run build`     | Build all packages and apps with Turbo cache |
| `npm run test`      | Run all unit tests                           |
| `npm run test:ui`   | Launch interactive Vitest UI                 |
| `npm run lint`      | Lint all packages with ESLint 9              |
| `npm run typecheck` | TypeScript validation across workspace       |
| `npm run format`    | Format code with Prettier                    |
| `npm run clean`     | Remove node_modules, locks, and Turbo cache  |

## Development Patterns

### Component Architecture

Components follow atomic design with class-variance-authority for variants:

```typescript
// packages/components/src/atoms/Button/index.tsx
const buttonVariants = cva('base-styles', {
  variants: { variant: { default: 'bg-primary' } },
})
```

### Styling System

- **Tailwind CSS** with CSS custom properties
- **OKLCH color space** for better color management
- **Design tokens** in `packages/theme/src/globals.css`
- **Utility function**: `cn()` from `@utils/common/cn` (clsx + tailwind-merge)

### Package Dependencies

Workspace packages use `"*"` version references:

```json
"dependencies": {
  "@packages/components": "*",
  "@utils/common": "*"
}
```

## Import Conventions

**Direct Imports Only** - No barrel exports:

```typescript
// ✅ Correct
import Button from '@packages/components/atoms/Button'
import isString from '@utils/common/string/isString'
import { UserSchema } from '@packages/validators/entities'

// ❌ Wrong - No barrel exports exist
import { Button } from '@packages/components'
```

## CI/CD

GitHub Actions pipeline validates:

- **Typecheck**: TypeScript validation
- **Lint**: ESLint 9 with flat config
- **Test**: Vitest unit tests
- **Build**: Production build verification

## Features

- ✅ Turborepo monorepo with dependency caching
- ✅ TypeScript ESM throughout
- ✅ Node.js 24 with strict engines
- ✅ Direct imports (no barrel exports)
- ✅ Atomic design component architecture
- ✅ shadcn/ui foundation with class-variance-authority
- ✅ Tailwind CSS with OKLCH color space
- ✅ CSS custom properties for theming
- ✅ Vitest with interactive UI
- ✅ Storybook for component development
- ✅ Playwright for e2e testing
- ✅ ESLint 9 with flat config
- ✅ Environment-split utilities
- ✅ GitHub Actions CI pipeline
