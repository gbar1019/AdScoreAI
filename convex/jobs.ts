import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    contentType: v.union(v.literal("image"), v.literal("email")),
    inputReference: v.string(),
    audienceId: v.optional(v.id("audiences")),
    audienceSummary: v.optional(v.string()),
    provider: v.union(v.literal("openai"), v.literal("anthropic")),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return ctx.db.insert("scoreJobs", {
      contentType: args.contentType,
      inputReference: args.inputReference,
      audienceId: args.audienceId,
      audienceSummary: args.audienceSummary,
      status: "queued",
      provider: args.provider,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const listRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    return ctx.db
      .query("scoreJobs")
      .withIndex("by_createdAt")
      .order("desc")
      .take(args.limit ?? 20);
  },
});

export const get = query({
  args: { jobId: v.id("scoreJobs") },
  handler: async (ctx, args) => {
    return ctx.db.get(args.jobId);
  },
});

export const setStatus = mutation({
  args: {
    jobId: v.id("scoreJobs"),
    status: v.union(
      v.literal("queued"),
      v.literal("processing"),
      v.literal("completed"),
      v.literal("failed"),
    ),
    errorMessage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const job = await ctx.db.get(args.jobId);
    if (!job) throw new Error("Not found");
    await ctx.db.patch(args.jobId, {
      status: args.status,
      errorMessage: args.errorMessage,
      updatedAt: Date.now(),
    });
  },
});
