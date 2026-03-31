"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AudienceBuilder } from "@/components/audience-builder";
import { EmailInputForm } from "@/components/email-input-form";
import { runScoreJobAction } from "@/app/actions/run-score-job";

export function EmailScoreClient() {
  const router = useRouter();
  const createJob = useMutation(api.jobs.create);

  const [email, setEmail] = useState({
    subject: "",
    previewText: "",
    body: "",
  });
  const [audience, setAudience] = useState({ name: "", description: "" });
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRun() {
    if (!email.subject.trim() || !email.body.trim()) {
      setError("Subject and body are required.");
      return;
    }
    setRunning(true);
    setError(null);
    try {
      const inputReference = JSON.stringify({
        subject: email.subject,
        previewText: email.previewText,
        body: email.body,
      });
      const summary =
        audience.description.trim() ||
        audience.name.trim() ||
        "General audience";

      const jobId = await createJob({
        contentType: "email",
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
        <h1 className="text-2xl font-semibold tracking-tight">Email score</h1>
        <p className="text-muted-foreground">
          Paste campaign copy, define the audience, and score.
        </p>
      </div>

      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          {error}
        </p>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Email creative</CardTitle>
          <CardDescription>Subject, preview, and body.</CardDescription>
        </CardHeader>
        <CardContent>
          <EmailInputForm value={email} onChange={setEmail} />
        </CardContent>
      </Card>

      <AudienceBuilder value={audience} onChange={setAudience} />

      <Button
        type="button"
        className="w-full"
        disabled={running}
        onClick={() => void handleRun()}
      >
        {running ? "Scoring…" : "Create job & score"}
      </Button>
    </div>
  );
}
