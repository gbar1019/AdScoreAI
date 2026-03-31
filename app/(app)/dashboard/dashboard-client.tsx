"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function DashboardClient() {
  const jobs = useQuery(api.jobs.listRecent, { limit: 8 });
  const results = useQuery(api.results.listMine, { limit: 50 });

  const avg =
    results && results.length > 0
      ? Math.round(
          results.reduce(
            (a: number, b: Doc<"scoreResults">) => a + b.overallScore,
            0,
          ) / results.length,
        )
      : null;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Recent jobs, scores, and quick actions.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/score/new">
            <Button type="button">New score</Button>
          </Link>
          <Link href="/compare">
            <Button type="button" variant="outline">
              Compare
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Average score</CardTitle>
            <CardDescription>Last {results?.length ?? 0} results</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tabular-nums">
              {avg != null ? avg : "—"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Latest jobs</CardTitle>
            <CardDescription>Short list</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tabular-nums">
              {jobs?.length ?? "—"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">History</CardTitle>
            <CardDescription>Saved results</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/history">
              <Button type="button" variant="secondary" className="w-full">
                Open history
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent jobs</CardTitle>
          <CardDescription>Status and links to results</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {jobs === undefined ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : jobs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No jobs yet.</p>
          ) : (
            jobs.map((j: Doc<"scoreJobs">) => (
              <div
                key={j._id}
                className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium capitalize">
                    {j.contentType}{" "}
                    <span className="text-muted-foreground font-normal">
                      · {new Date(j.createdAt).toLocaleString()}
                    </span>
                  </p>
                  <Badge variant="outline" className="mt-1">
                    {j.status}
                  </Badge>
                </div>
                <Link href={`/results/${j._id}`}>
                  <Button type="button" size="sm" variant="outline">
                    View
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
