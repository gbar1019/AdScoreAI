# AdScoreAI — Cursor Build Plan

## Goal
Build the MVP first, not the full roadmap.

## MVP Build Order

### Phase 1 — App Foundation
1. Initialize Next.js app with TypeScript, Tailwind, shadcn/ui, pnpm
2. Add Clerk authentication
3. Add Convex for app data
4. Set up UploadThing or Convex Storage
5. Create base app shell and dashboard layout

### Phase 2 — Core UX
6. Build pages:
   - `/sign-in`
   - `/dashboard`
   - `/score/new`
   - `/results/[id]`
   - `/compare`
   - `/history`
   - `/settings`
7. Build components:
   - content upload form
   - email input form
   - audience builder
   - job progress card
   - score summary card
   - dimension score panel
   - persona feedback list
   - recommendations panel

### Phase 3 — Backend Flows
8. Create Convex schema for:
   - users
   - audiences
   - scoreJobs
   - scoreResults
   - comparisonRuns
9. Build server actions / API routes for job creation
10. Build async scoring worker interface
11. Save job states: queued, processing, completed, failed

### Phase 4 — AI Layer
12. Create provider abstraction for OpenAI / Anthropic
13. Create creative analyzers:
   - image ad analyzer
   - email analyzer
14. Create persona simulation module
15. Create scoring aggregator
16. Create recommendations generator

### Phase 5 — Results
17. Render final result pages
18. Render comparison results
19. Save and display historical sessions
20. Add basic notification emails with Resend

## Ship Criteria
- User can sign in
- User can submit at least one image or email creative
- User can define audience
- System creates async job
- System returns score, dimensions, persona feedback, recommendations
- User can revisit saved results
- User can compare variants
