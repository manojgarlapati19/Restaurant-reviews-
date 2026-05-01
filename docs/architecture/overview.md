# Architecture Overview

## Apps

- `apps/web`: Next.js App Router application for consumer, owner, and admin experiences
- `apps/api`: Express REST API with MongoDB-backed domain modules
- `apps/worker`: background job runner for AI summaries, trust scoring, and later moderation/media tasks

## Key design choices

- Modular monolith first, with clean domain boundaries for later service extraction
- MongoDB documents plus denormalized aggregates for restaurant and dish ranking
- Firebase Auth token verification with API-managed user profile persistence
- Shared cross-app contracts through `@dishcovery/types`
- Mobile-first consumer UX with dish-first discovery surfaces and owner/admin extensions
