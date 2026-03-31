import { mutation, query } from "./_generated/server";
import type { Doc } from "./_generated/dataModel";
import { v } from "convex/values";

export const byJob = query({
  args: { jobId: v.id("scoreJobs") },
  handler: async (ctx, args) => {
    return ctx.db
      .query("scoreResults")
      .withIndex("by_job", (q) => q.eq("jobId", args.jobId))
      .unique();
  },
});

export const listMine = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    return ctx.db
      .query("scoreResults")
      .withIndex("by_createdAt")
      .order("desc")
      .take(args.limit ?? 50);
  },
});

export const listForCompare = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const results = await ctx.db
      .query("scoreResults")
      .withIndex("by_createdAt")
      .order("desc")
      .take(args.limit ?? 40);

    const pairs: { job: Doc<"scoreJobs">; result: Doc<"scoreResults"> }[] = [];
    for (const result of results) {
      const job = await ctx.db.get(result.jobId);
      if (job && job.status === "completed") {
        pairs.push({ job, result });
      }
    }
    return pairs;
  },
});

export const save = mutation({
  args: {
    jobId: v.id("scoreJobs"),
    overallScore: v.number(),
    confidence: v.number(),
    dimensions: v.any(),
    personas: v.any(),
    recommendations: v.array(v.string()),
    rawResponse: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const job = await ctx.db.get(args.jobId);
    if (!job) throw new Error("Job not found");

    const existing = await ctx.db
      .query("scoreResults")
      .withIndex("by_job", (q) => q.eq("jobId", args.jobId))
      .unique();

    const payload = {
      jobId: args.jobId,
      overallScore: args.overallScore,
      confidence: args.confidence,
      dimensions: args.dimensions,
      personas: args.personas,
      recommendations: args.recommendations,
      rawResponse: args.rawResponse,
      createdAt: Date.now(),
    };

    if (existing) {
      await ctx.db.replace(existing._id, payload);
      return existing._id;
    }
    return ctx.db.insert("scoreResults", payload);
  },
});
