# Atlas Content

Atlas Content is an owner-controlled social content workspace for local small businesses, built by Atlas Industries.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/atlas-content/src/App.tsx` — app shell, routes, typed mock data, and owner workflows
- `artifacts/atlas-content/src/index.css` — Atlas Content theme, responsive layout, and interaction states
- `artifacts/atlas-content` — the runnable React/Vite web artifact
- `artifacts/api-server` — shared API service scaffold reserved for future server-backed integrations

## Architecture decisions

- The first prototype is frontend-only with local typed sample data so the core owner workflow is usable without paid services or external API credentials.
- Content is always framed as source-first: drafts are based on the business profile and include explicit guardrails against invented claims.
- Operating modes are modeled as a three-option enum (`Approval Required`, `Pre-Publish Confirmation`, `Full Auto`) even though live publishing is not connected yet.
- Social connections and subscription plans are intentionally represented as placeholders so official OAuth publishing and billing can be added without changing the owner-facing workflow.

## Product

Business owners can switch between sample businesses, maintain their profile and content guardrails, review and edit draft posts, regenerate copy, approve or reject posts, approve all pending posts, inspect upcoming scheduling, view published history, manage connection placeholders, and compare future subscription tiers. Approval Required is the default mode.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- The current app uses mock data and browser state; a future persistence/API layer should preserve the same owner-controlled state transitions.
- Live social publishing must use official OAuth APIs and remain behind the owner’s selected operating mode.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
