"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type RankedRow = {
  rank: number;
  jobId: string;
  overallScore: number;
  confidence?: number;
  contentType?: string;
  simulationVersion?: string;
};

export function CompareDetailClient({
  comparisonId,
}: {
  comparisonId: Id<"comparisonRuns">;
}) {
  const run = useQuery(api.comparisons.get, { comparisonId });

  if (run === undefined) {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }

  if (!run) {
    return (
      <p className="text-sm text-muted-foreground">
        Comparison not found or access denied.
      </p>
    );
  }

  const rows = Array.isArray(run.rankedResults)
    ? (run.rankedResults as RankedRow[])
    : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Comparison</h1>
          <p className="text-muted-foreground">
            <span className="capitalize">{run.contentType}</span>
            {" · "}
            {run.jobIds.length} variants ·{" "}
            {new Date(run.createdAt).toLocaleString()}
            {run.simulationMetadata ? " · Unified simulation metadata attached" : ""}
          </p>
        </div>
        <Link href="/compare">
          <Button type="button" variant="outline">
            New comparison
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ranking</CardTitle>
          <CardDescription>
            Ordered by overall AdScore (highest first).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {rows.length === 0 ? (
            <p className="text-sm text-muted-foreground">No rank data stored.</p>
          ) : (
            rows.map((row) => (
              <div
                key={row.jobId}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-semibold tabular-nums">
                    {row.rank}
                  </span>
                  <div>
                    <p className="font-medium tabular-nums">
                      {row.overallScore}/100
                    </p>
                    {row.confidence != null ? (
                      <p className="text-xs text-muted-foreground">
                        Confidence {row.confidence}%{row.simulationVersion ? ` · ${row.simulationVersion}` : ""}
                      </p>
                    ) : null}
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {row.contentType ?? run.contentType}
                  </Badge>
                </div>
                <Link href={`/results/${row.jobId}`}>
                  <Button type="button" size="sm" variant="secondary">
                    View result
                  </Button>
                </Link>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
