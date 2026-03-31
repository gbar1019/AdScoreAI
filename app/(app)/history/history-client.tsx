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

export function HistoryClient() {
  const results = useQuery(api.results.listMine, { limit: 100 });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">History</h1>
        <p className="text-muted-foreground">Saved scoring sessions.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
          <CardDescription>Newest first</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {results === undefined ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : results.length === 0 ? (
            <p className="text-sm text-muted-foreground">No results yet.</p>
          ) : (
            results.map((r: Doc<"scoreResults">) => (
              <div
                key={r._id}
                className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium tabular-nums">Score {r.overallScore}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(r.createdAt).toLocaleString()}
                  </p>
                </div>
                <Link href={`/results/${r.jobId}`}>
                  <Button type="button" size="sm" variant="outline">
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
