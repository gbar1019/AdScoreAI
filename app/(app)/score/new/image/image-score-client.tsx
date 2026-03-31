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
import { ContentUploadForm } from "@/components/content-upload-form";
import { runScoreJobAction } from "@/app/actions/run-score-job";
import type { AiProviderId } from "@/types/score";

export function ImageScoreClient() {
  const router = useRouter();
  const createJob = useMutation(api.jobs.create);
  const saveAudience = useMutation(api.audiences.create);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [audience, setAudience] = useState({ name: "", description: "" });
  const [provider, setProvider] = useState<AiProviderId>("openai");
  const [savingAudience, setSavingAudience] = useState(false);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSaveAudience() {
    setSavingAudience(true);
    setError(null);
    try {
      await saveAudience({
        name: audience.name || "Untitled audience",
        description: audience.description || "—",
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save audience");
    } finally {
      setSavingAudience(false);
    }
  }

  async function handleRun() {
    if (!imageUrl) {
      setError("Upload an image first.");
      return;
    }
    setRunning(true);
    setError(null);
    try {
      const summary =
        audience.description.trim() ||
        audience.name.trim() ||
        "General audience";

      const jobId = await createJob({
        contentType: "image",
        inputReference: imageUrl,
        provider,
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
        <h1 className="text-2xl font-semibold tracking-tight">Image ad score</h1>
        <p className="text-muted-foreground">
          Upload a creative, describe the audience, and run scoring.
        </p>
      </div>

      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          {error}
        </p>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Creative</CardTitle>
          <CardDescription>PNG or JPG up to 8MB (UploadThing).</CardDescription>
        </CardHeader>
        <CardContent>
          <ContentUploadForm onUploaded={setImageUrl} />
          {imageUrl ? (
            <p className="mt-2 truncate text-xs text-muted-foreground">
              {imageUrl}
            </p>
          ) : null}
        </CardContent>
      </Card>

      <AudienceBuilder
        value={audience}
        onChange={setAudience}
        onSave={handleSaveAudience}
        saving={savingAudience}
      />

      <Card>
        <CardHeader>
          <CardTitle>Model provider</CardTitle>
          <CardDescription>OpenAI or Anthropic via abstraction layer.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Label htmlFor="provider">Provider</Label>
          <select
            id="provider"
            className="flex h-9 w-full rounded-md border border-border bg-transparent px-3 py-1 text-sm shadow-sm"
            value={provider}
            onChange={(e) => setProvider(e.target.value as AiProviderId)}
          >
            <option value="openai">OpenAI</option>
            <option value="anthropic">Anthropic</option>
          </select>
        </CardContent>
      </Card>

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
