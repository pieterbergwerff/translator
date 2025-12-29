# GitHub Copilot Instructions

## Project Architecture

This is a **Turborepo monorepo** using TypeScript ESM throughout with **direct imports instead of barrel exports**. The architecture follows atomic design principles with clear separation of concerns.

### Key Architectural Patterns

**Direct Import Strategy**: No `index.ts` barrel exports. Import components directly:

```typescript
import Button from '@packages/components/atoms/Button' // ✅ Correct
import { Button } from '@packages/components' // ❌ Wrong
```

**Package Structure**:

- `@packages/*` - Shared libraries (components, hooks, validators, etc.)
- `@utils/*` - Utilities split by environment (common, client, server)
- `@apps/*` - Applications (Next.js app, Storybook)
- `@config/*` - Shared configurations (ESLint, TypeScript, Prettier)

**Atomic Design**: Components organized in `atoms/`, `molecules/`, `organisms/`, `pages/`, `templates/` with exports defined in individual package.json files using path mapping.

## Critical Workflows

**Development**: `npm run dev` starts all apps simultaneously (Next.js on :3000, Storybook on :4000, Test UI on :5000)

**Testing**:

- `npm run test:ui` for interactive Vitest UI
- Unit tests in `tests/unit/src/`
- E2E tests in `tests/end-to-end/tests/`

**Building**: `npm run build` builds all packages with Turbo's dependency graph

**Clean Slate**: `npm run clean` removes all node_modules, lock files, and turbo cache across workspace

## Technology Stack & Conventions

**Styling**:

- Tailwind CSS with CSS custom properties using OKLCH color space
- Design tokens in `packages/theme/src/globals.css`
- Component styling with class-variance-authority (`cva`)
- Utility function: `cn()` from `@utils/common/cn` (clsx + tailwind-merge)

**Components**:

- Built on shadcn/ui foundation
- Use `forwardRef` for DOM element exposure
- Variant-based styling with `buttonVariants = cva(...)`
- Example pattern in `packages/components/src/atoms/Button/index.tsx`

**ESLint**: Uses ESLint 9 with flat config format (`.mjs` files in `config/eslint/`)

**TypeScript**: Strict configuration with path mapping for all packages via workspace references

## Project-Specific Patterns

**Package Dependencies**: Each package declares dependencies on other workspace packages using `"*"` version in package.json

**Environment Splitting**: Utils are split by execution context:

- `@utils/common` - Universal utilities
- `@utils/client` - Browser-only code
- `@utils/server` - Server-only code

**Theme System**: Uses CSS custom properties with light/dark mode classes applied to `html` element, not CSS media queries

**Testing Strategy**:

- Vitest for unit tests with UI on port 5000
- Playwright for E2E testing
- No Jest configuration

## File Organization

```
packages/components/src/atoms/Button/
  ├── index.tsx          # Main component export
  └── (no index.ts)      # No barrel exports!
```

Components export directly from their folder's index.tsx, with package.json exports field mapping paths like `"./atoms/*": "./src/atoms/*/index.tsx"`

## Integration Points

**Storybook**: Uses Vite with custom Tailwind config and theme provider decorators. Stories use `Meta` and `Story` types from `@storybook/react`.

**Next.js**: Standard App Router with TypeScript. Imports components and utilities using absolute workspace paths.

**Monorepo**: Turborepo handles task orchestration with dependency caching. Tasks defined in root `turbo.json` with proper dependency graphs.
