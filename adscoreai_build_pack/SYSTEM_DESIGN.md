# AdScoreAI — System Design

## Recommended App Structure

- `app/` — Next.js app router pages
- `components/` — UI components
- `lib/` — shared utilities
- `lib/ai/` — provider adapters and scoring logic
- `lib/validators/` — Zod schemas
- `convex/` — Convex schema, queries, mutations
- `worker/` — async scoring worker code
- `types/` — shared types

## Core Modules

### 1. Auth Module
Clerk authentication and protected layouts.

### 2. Upload Module
Accept image creatives and email input.

### 3. Audience Module
Collect audience definitions as either text or structured inputs.

### 4. Job Module
Creates and tracks scoring jobs.

### 5. AI Module
Contains:
- provider abstraction
- creative analysis
- persona generation
- scoring aggregation
- recommendations

### 6. Results Module
Stores and renders final outputs.

## Background Job Pattern

Recommended flow:
1. App creates score job in Convex
2. Worker picks up pending job
3. Worker performs analysis + persona simulation
4. Worker writes results back to Convex
5. UI updates based on job state

## Suggested Result Shape

```ts
{
  score: number,
  confidence: number,
  dimensions: {
    engagementPotential: number,
    emotionalResonance: number,
    ctaEffectiveness: number,
    brandAlignment: number,
    audienceRelevance: number,
    conversionIntent: number,
  },
  personas: [
    {
      name: string,
      background: string,
      individualScore: number,
      emotionalResponse: string[],
      engagementLikelihood: number,
      conversionIntent: number,
      feedback: string,
    }
  ],
  recommendations: string[]
}
```
