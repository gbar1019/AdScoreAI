"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { JobProgressCard } from "@/components/job-progress-card";
import { ScoreSummaryCard } from "@/components/score-summary-card";
import { DimensionScorePanel } from "@/components/dimension-score-panel";
import { PersonaFeedbackList } from "@/components/persona-feedback-list";
import { RecommendationsPanel } from "@/components/recommendations-panel";
import { KpiForecastPanel } from "@/components/kpi-forecast-panel";
import { EngineContributionPanel } from "@/components/engine-contribution-panel";
import { PersonaSimulationMatrix } from "@/components/persona-simulation-matrix";
import type {
  EngineContribution,
  KpiForecast,
  PersonaFeedback,
  ScoreDimensions,
} from "@/types/score";

export function ResultsClient({ jobId }: { jobId: Id<"scoreJobs"> }) {
  const job = useQuery(api.jobs.get, { jobId });
  const result = useQuery(api.results.byJob, { jobId });

  if (job === undefined || result === undefined) {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }

  if (!job) {
    return (
      <p className="text-sm text-muted-foreground">
        Job not found or you do not have access.
      </p>
    );
  }

  const dimensions = result?.dimensions as ScoreDimensions | undefined;
  const personas = result?.personas as PersonaFeedback[] | undefined;
  const kpiForecast = result?.kpiForecast as KpiForecast | undefined;
  const engineContributions =
    result?.engineContributions as EngineContribution[] | undefined;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Results</h1>
          <p className="text-muted-foreground capitalize">
            {job.contentType} ·{" "}
            <span className="lowercase text-muted-foreground">
              {new Date(job.createdAt).toLocaleString()}
            </span>
          </p>
        </div>
        <Link href="/history">
          <Button type="button" variant="outline">
            History
          </Button>
        </Link>
      </div>

      <JobProgressCard status={job.status} errorMessage={job.errorMessage} />

      {result && dimensions && personas ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <ScoreSummaryCard
            overallScore={result.overallScore}
            confidence={result.confidence}
          />
          <DimensionScorePanel dimensions={dimensions} />
          {kpiForecast ? <KpiForecastPanel forecast={kpiForecast} /> : null}
          {engineContributions ? (
            <EngineContributionPanel contributions={engineContributions} />
          ) : null}
          <div className="lg:col-span-2">
            <PersonaFeedbackList personas={personas} />
          </div>
          <div className="lg:col-span-2">
            <PersonaSimulationMatrix personas={personas} />
          </div>
          <div className="lg:col-span-2">
            <RecommendationsPanel recommendations={result.recommendations} />
          </div>
        </div>
      ) : job.status === "failed" ? null : (
        <p className="text-sm text-muted-foreground">
          {job.status === "completed"
            ? "No stored result yet."
            : "Scoring still running or not started. Refresh after a few seconds."}
        </p>
      )}

      <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Input reference</p>
        <p className="mt-1 break-all">{job.inputReference}</p>
      </div>
    </div>
  );
}
