import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: { comparisonId: v.id("comparisonRuns") },
  handler: async (ctx, args) => {
    return ctx.db.get(args.comparisonId);
  },
});

export const listMine = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db
      .query("comparisonRuns")
      .withIndex("by_createdAt")
      .order("desc")
      .take(20);
  },
});

export const create = mutation({
  args: {
    contentType: v.union(
      v.literal("image"),
      v.literal("email"),
      v.literal("sms"),
      v.literal("paidAds"),
      v.literal("push"),
      v.literal("fileAsset"),
    ),
    jobIds: v.array(v.id("scoreJobs")),
    rankedResults: v.any(),
    simulationMetadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    if (args.jobIds.length < 2) {
      throw new Error("Comparison requires at least two jobs");
    }
    if (args.jobIds.length > 10) {
      throw new Error("Comparison supports at most 10 variants");
    }

    for (const jid of args.jobIds) {
      const job = await ctx.db.get(jid);
      if (!job) {
        throw new Error("Invalid job in comparison");
      }
      if (job.contentType !== args.contentType) {
        throw new Error("All jobs must be the same content type");
      }
    }

    return ctx.db.insert("comparisonRuns", {
      contentType: args.contentType,
      jobIds: args.jobIds,
      rankedResults: args.rankedResults,
      simulationMetadata: args.simulationMetadata,
      createdAt: Date.now(),
    });
  },
});
