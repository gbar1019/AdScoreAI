"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import type { ContentType } from "@/types/score";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CompareClient() {
  const router = useRouter();
  const pairs = useQuery(api.results.listForCompare, { limit: 40 });
  const past = useQuery(api.comparisons.listMine);
  const createComparison = useMutation(api.comparisons.create);

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const toggle = (id: string) => {
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else if (next.size < 10) next.add(id);
      return next;
    });
  };

  const selectedPairs = useMemo(() => {
    if (!pairs) return [];
    return pairs.filter((p) => selected.has(p.job._id));
  }, [pairs, selected]);

  const contentType = useMemo(() => {
    const types = new Set(selectedPairs.map((p) => p.job.contentType));
    if (types.size === 0) return null;
    if (types.size > 1) return "mixed" as const;
    return [...types][0] as ContentType;
  }, [selectedPairs]);

  async function handleCompare() {
    if (selected.size < 2) {
      setError("Select at least two completed scores.");
      return;
    }
    if (contentType === "mixed" || !contentType) {
      setError("All selected items must be the same content type.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const sorted = [...selectedPairs].sort(
        (a, b) => b.result.overallScore - a.result.overallScore,
      );
      const rankedResults = sorted.map((p, i) => ({
        rank: i + 1,
        jobId: p.job._id,
        overallScore: p.result.overallScore,
        confidence: p.result.confidence,
        contentType: p.job.contentType,
        simulationVersion: p.result.simulationVersion,
      }));
      const jobIds = sorted.map((p) => p.job._id as Id<"scoreJobs">);
      const id = await createComparison({
        contentType,
        jobIds,
        rankedResults,
        simulationMetadata: {
          contentType,
          runCount: sorted.length,
          simulationVersions: Array.from(
            new Set(sorted.map((p) => p.result.simulationVersion)),
          ),
        },
      });
      router.push(`/compare/${id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not create comparison");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Compare variants</h1>
        <p className="text-muted-foreground">
          Select 2–10 completed scores of the same type. They will be ranked by
          overall AdScore.
        </p>
      </div>

      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          {error}
        </p>
      ) : null}

      <Card>
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Select scores</CardTitle>
            <CardDescription>
              {selected.size} selected ·{" "}
              {contentType === "mixed" ? (
                <span className="text-amber-600 dark:text-amber-400">
                  Mixed types — pick one channel type.
                </span>
              ) : contentType ? (
                <span className="capitalize">{contentType} only</span>
              ) : (
                "Same content type required"
              )}
            </CardDescription>
          </div>
          <Button
            type="button"
            disabled={
              submitting ||
              selected.size < 2 ||
              contentType === "mixed" ||
              !contentType
            }
            onClick={() => void handleCompare()}
          >
            {submitting ? "Saving…" : "Compare selected"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-2">
          {pairs === undefined ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : pairs.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No completed scores yet.{" "}
              <Link href="/score/new" className="underline">
                Run a score
              </Link>{" "}
              first.
            </p>
          ) : (
            pairs.map(({ job, result }) => (
              <label
                key={job._id}
                className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 hover:bg-muted/40"
              >
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={selected.has(job._id)}
                  onChange={() => toggle(job._id)}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium tabular-nums">
                      Score {result.overallScore}
                    </span>
                    <Badge variant="outline" className="capitalize">
                      {job.contentType}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(job.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {job.inputReference.slice(0, 120)}
                    {job.inputReference.length > 120 ? "…" : ""}
                  </p>
                </div>
                <Link href={`/results/${job._id}`}>
                  <Button type="button" size="sm" variant="outline">
                    Result
                  </Button>
                </Link>
              </label>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent comparisons</CardTitle>
          <CardDescription>Newest first</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {past === undefined ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : past.length === 0 ? (
            <p className="text-sm text-muted-foreground">None yet.</p>
          ) : (
            past.map((run) => (
              <div
                key={run._id}
                className="flex flex-wrap items-center justify-between gap-2 border-b border-border py-2 last:border-0"
              >
                <div className="text-sm">
                  <span className="capitalize text-muted-foreground">
                    {run.contentType}
                  </span>
                  <span className="text-muted-foreground">
                    {" "}
                    · {run.jobIds.length} variants ·{" "}
                    {new Date(run.createdAt).toLocaleString()}
                  </span>
                </div>
                <Link href={`/compare/${run._id}`}>
                  <Button type="button" size="sm" variant="secondary">
                    Open
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
