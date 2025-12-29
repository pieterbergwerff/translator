# Translator

A modern monorepo built with Turborepo, TypeScript, and React.

## Structure

- **Apps**
  - `apps/app` - Next.js application (port 3000)
  - `apps/storybook` - Storybook instance (port 4000)
  - `apps/test-ui` - Vitest UI (port 5000)

- **Packages**
  - `packages/components` - React components with shadcn/ui
  - `packages/hooks` - React hooks
  - `packages/validators` - Zod schemas
  - `packages/types` - TypeScript types
  - `packages/constants` - Constants
  - `packages/theme` - Styling and fonts
  - `packages/translate` - i18n translations

- **Utils**
  - `utils/common` - Browser & server utilities
  - `utils/server` - Server-only utilities
  - `utils/client` - Client-only utilities

- **Config**
  - `config/typescript` - TypeScript configurations
  - `config/eslint` - ESLint configurations
  - `config/prettier` - Prettier configuration

- **Tests**
  - `tests/unit` - Vitest unit tests
  - `tests/end-to-end` - Playwright e2e tests

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development servers:

   ```bash
   npm run dev
   ```

3. Access applications:
   - App: http://localhost:3000
   - Storybook: http://localhost:4000
   - Test UI: http://localhost:5000

## Scripts

- `npm run dev` - Start all development servers
- `npm run build` - Build all packages and apps
- `npm test` - Run all tests
- `npm run test:ui` - Start test UI
- `npm run lint` - Lint all packages
- `npm run format` - Format code with Prettier

## Import Conventions

Import from packages using absolute paths:

```typescript
import Button from '@packages/components/atoms/Button'
import isString from '@utils/common/string/isString'
import { UserSchema } from '@packages/validators/user'
```

## Features

- ✅ Turborepo monorepo setup
- ✅ TypeScript ESM throughout
- ✅ shadcn/ui components
- ✅ Tailwind CSS
- ✅ Vitest for testing
- ✅ Storybook for component development
- ✅ Playwright for e2e testing
- ✅ ESLint + Prettier
- ✅ No index.ts barrel exports
