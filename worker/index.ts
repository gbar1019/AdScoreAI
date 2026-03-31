/**
 * Async scoring worker entrypoint (outside Convex).
 *
 * TODO: Poll Convex for `scoreJobs` in `queued` state (or subscribe via Convex
 * streaming), call the same scoring pipeline as `app/actions/run-score-job.ts`,
 * and write results back using a Convex deploy key / internal HTTP actions.
 *
 * For MVP scaffolding, scoring is triggered from the Next.js server action
 * `runScoreJobAction` after job creation.
 */

export {};
