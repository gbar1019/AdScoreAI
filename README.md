# AdScoreAI

## Unified Marketing Simulation

AdScoreAI now runs a **multi-engine simulation** for these channels:

- `image`
- `email`
- `sms`
- `paidAds`
- `push`
- `fileAsset`

Each run produces:

- **Unified scorecard**: KPI forecast for `views`, `likes`, `comments`, `shares`, `engagementRate`, `ctr`, `conversionIntent` with `p10/p50/p90` bands
- **Persona breakdown**: simulated segment reactions, engagement intent, conversion intent, and recommendations
- **Engine contribution**: per-engine contribution weights per KPI

Results are persisted in Convex and visible in `results`, `history`, and `compare`.

## Simulation Engine Controls

Use environment variables to enable/disable engines and tune timeout behavior.

### Global timeout

- `SIM_ENGINE_TIMEOUT_MS` (default: `5000`)

If an engine exceeds the timeout, the run continues without that engine.

### Per-engine flags

Set any of the following to `false` to disable that engine:

- `SIM_ENGINE_ADTESTPRO_ENABLED`
- `SIM_ENGINE_LLM_MARKETING_EXPERT_ENABLED`
- `SIM_ENGINE_PERSONA_HUB_ENABLED`
- `SIM_ENGINE_SYNTHETIC_USER_RESEARCH_ENABLED`
- `SIM_ENGINE_META_ADS_KIT_ENABLED`
- `SIM_ENGINE_OPENADSERVER_ENABLED`

Any unset flag defaults to enabled.

## Required Environment Variables

Core app/env requirements are in `.env.example`. For the current unified simulation pipeline, ensure at least:

- `NEXT_PUBLIC_CONVEX_URL`
- `CONVEX_DEPLOYMENT`
- `NEXT_PUBLIC_CONVEX_SITE_URL`
- `ANTHROPIC_API_KEY`
- `UPLOADTHING_TOKEN`

## Local Dev

```bash
pnpm install
pnpm exec convex dev --once
pnpm dev
```

## Verify Before Deploy

```bash
pnpm exec convex dev --once
pnpm build
```

## Notes

- Engine adapters currently provide a normalized integration surface with graceful fallbacks.
- Partial engine failures do not fail the full simulation; output shape remains deterministic.
