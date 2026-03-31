"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { runScoreJobAction } from "@/app/actions/run-score-job";
import { AudienceBuilder } from "@/components/audience-builder";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ContentType } from "@/types/score";

type Props = {
  contentType: ContentType;
  title: string;
  description: string;
  fields: { key: string; label: string; multiline?: boolean; required?: boolean }[];
};

export function MultiChannelScoreClient(props: Props) {
  const router = useRouter();
  const createJob = useMutation(api.jobs.create);
  const [values, setValues] = useState<Record<string, string>>({});
  const [audience, setAudience] = useState({ name: "", description: "" });
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRun() {
    for (const field of props.fields) {
      if (field.required && !(values[field.key] ?? "").trim()) {
        setError(`${field.label} is required.`);
        return;
      }
    }
    setRunning(true);
    setError(null);
    try {
      const summary =
        audience.description.trim() || audience.name.trim() || "General audience";
      const inputReference = JSON.stringify({ kind: props.contentType, ...values });
      const jobId = await createJob({
        contentType: props.contentType,
        inputReference,
        audienceSummary: summary,
      });

      const outcome = await runScoreJobAction(jobId);
      if (!outcome.ok) {
        setError(outcome.error);
        setRunning(false);
        return;
      }
      router.push(`/results/${jobId}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Scoring failed");
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{props.title}</h1>
        <p className="text-muted-foreground">{props.description}</p>
      </div>

      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          {error}
        </p>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Creative input</CardTitle>
          <CardDescription>Provide channel-specific content.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {props.fields.map((field) => (
            <div key={field.key} className="space-y-2">
              <Label htmlFor={field.key}>{field.label}</Label>
              {field.multiline ? (
                <Textarea
                  id={field.key}
                  value={values[field.key] ?? ""}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, [field.key]: e.target.value }))
                  }
                />
              ) : (
                <Input
                  id={field.key}
                  value={values[field.key] ?? ""}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, [field.key]: e.target.value }))
                  }
                />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <AudienceBuilder value={audience} onChange={setAudience} />

      <Button type="button" className="w-full" disabled={running} onClick={handleRun}>
        {running ? "Scoring…" : "Create job & score"}
      </Button>
    </div>
  );
}
