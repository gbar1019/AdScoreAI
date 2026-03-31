"use server";

import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import type { ContentType } from "@/types/score";
import { runUnifiedSimulation } from "@/lib/simulation/fusion";

function parseInput(job: {
  contentType: ContentType;
  inputReference: string;
}): string {
  if (job.contentType === "image") {
    return job.inputReference;
  }
  return job.inputReference;
}

export async function runScoreJobAction(jobId: Id<"scoreJobs">) {
  try {
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

    const simulation = await runUnifiedSimulation({
      contentType: job.contentType,
      inputReference: parseInput(job),
      audienceSummary: audienceDescription,
    });
    await client.mutation(api.results.save, {
      jobId,
      overallScore: simulation.overallScore,
      confidence: simulation.confidence,
      dimensions: simulation.dimensions,
      personas: simulation.personas,
      recommendations: simulation.recommendations,
      kpiForecast: simulation.kpiForecast,
      engineOutputs: simulation.engineOutputs,
      engineContributions: simulation.engineContributions,
      simulationVersion: simulation.simulationVersion,
      normalizationMetadata: simulation.normalizationMetadata,
      rawResponse: JSON.stringify(simulation.engineOutputs),
    });

    await client.mutation(api.jobs.setStatus, {
      jobId,
      status: "completed",
    });

    return { ok: true as const };
  } catch (error) {
    return {
      ok: false as const,
      error: error instanceof Error ? error.message : "Simulation failed",
    };
  }
}
