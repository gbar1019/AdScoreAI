You are helping me build AdScoreAI.

Read all spec files first, especially:
- `FINAL_PRD.md` (repo root or `adscoreai_build_pack/`)
- `adscoreai_build_pack/CURSOR_BUILD_PLAN.md`
- `adscoreai_build_pack/SYSTEM_DESIGN.md`
- `adscoreai_build_pack/SCHEMA_BLUEPRINT.md`
- `adscoreai_build_pack/ROUTES_AND_PAGES.md`

Project requirements:
- Build the MVP only
- Stack: Next.js App Router, TypeScript, Tailwind, shadcn/ui, Clerk, Convex, Zod, PostHog, Resend, UploadThing or Convex Storage, pnpm
- AI providers: OpenAI and Anthropic via a provider abstraction layer
- Use async job architecture for scoring
- Do not overengineer enterprise features not needed for MVP
- Keep code clean, modular, and production-oriented

What I want you to do first:
1. Generate the app folder structure
2. Generate the initial Convex schema
3. Generate the key routes and placeholder pages
4. Generate reusable UI components for score input and result display
5. Generate a provider abstraction layer for AI scoring
6. Generate types and Zod schemas
7. Add TODO markers where worker implementation or provider-specific logic is needed

Constraints:
- MVP supports image ads and email first
- Comparison mode should exist in architecture, even if initially basic
- Keep styling clean and modern
- Use server-safe patterns
- Do not invent product requirements outside the docs

When uncertain, follow the PRD and build plan rather than guessing.
