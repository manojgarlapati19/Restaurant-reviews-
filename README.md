# Dishcovery Platform

Dishcovery is a dish-based food review and discovery platform built as a TypeScript monorepo with:

- `apps/web`: Next.js consumer, owner, and admin experience
- `apps/api`: Express REST API and MongoDB data layer
- `apps/worker`: background jobs for summaries, moderation, and analytics
- `packages/types`: shared domain models and validation schemas
- `packages/ui`: shared UI primitives
- `packages/config`: shared product constants and taxonomies

## Quick start

1. Copy `.env.example` to `.env`.
2. Install dependencies:

```bash
npm install
```

3. Start the apps:

```bash
npm run dev
```

## Workspace scripts

- `npm run dev:web`
- `npm run dev:api`
- `npm run dev:worker`
- `npm run build`
- `npm run typecheck`
- `npm run test`
