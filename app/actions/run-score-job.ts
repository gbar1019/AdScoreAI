"use server";

import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { getScoringProvider } from "@/lib/ai";
import type { ScoreCreativeInput } from "@/lib/ai/types";

function parseCreative(job: {
  contentType: "image" | "email";
  inputReference: string;
}): ScoreCreativeInput {
  if (job.contentType === "image") {
    return { kind: "image", imageUrl: job.inputReference };
  }
  const data = JSON.parse(job.inputReference) as {
    subject: string;
    body: string;
    previewText?: string;
  };
  return {
    kind: "email",
    subject: data.subject,
    body: data.body,
    previewText: data.previewText,
  };
}

export async function runScoreJobAction(jobId: Id<"scoreJobs">) {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) throw new Error("NEXT_PUBLIC_CONVEX_URL is not set");

  const client = new ConvexHttpClient(url);

  const job = await client.query(api.jobs.get, { jobId });
  if (!job) throw new Error("Job not found");

  let audienceDescription = job.audienceSummary ?? "General audience";
  if (job.audienceId) {
    const audience = await client.query(api.audiences.get, {
      id: job.audienceId,
    });
    if (audience) {
      audienceDescription = `${audience.name}: ${audience.description}`;
    }
  }

  await client.mutation(api.jobs.setStatus, {
    jobId,
    status: "processing",
  });

  const provider = getScoringProvider();
  const creative = parseCreative(job);

  const outcome = await provider.scoreCreative({
    creative,
    audience: { description: audienceDescription },
    provider: "anthropic",
  });

  if (!outcome.ok) {
    await client.mutation(api.jobs.setStatus, {
      jobId,
      status: "failed",
      errorMessage: outcome.error,
    });
    return { ok: false as const, error: outcome.error };
  }

  const r = outcome.result;
  await client.mutation(api.results.save, {
    jobId,
    overallScore: r.score,
    confidence: r.confidence,
    dimensions: r.dimensions,
    personas: r.personas,
    recommendations: r.recommendations,
    rawResponse: outcome.rawText,
  });

  await client.mutation(api.jobs.setStatus, {
    jobId,
    status: "completed",
  });

  return { ok: true as const };
}
