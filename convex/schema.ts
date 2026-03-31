import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  audiences: defineTable({
    name: v.string(),
    description: v.string(),
    structuredFields: v.optional(v.any()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),

  scoreJobs: defineTable({
    contentType: v.union(v.literal("image"), v.literal("email")),
    inputReference: v.string(),
    audienceId: v.optional(v.id("audiences")),
    audienceSummary: v.optional(v.string()),
    status: v.union(
      v.literal("queued"),
      v.literal("processing"),
      v.literal("completed"),
      v.literal("failed"),
    ),
    provider: v.literal("anthropic"),
    errorMessage: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_createdAt", ["createdAt"]),

  scoreResults: defineTable({
    jobId: v.id("scoreJobs"),
    overallScore: v.number(),
    confidence: v.number(),
    dimensions: v.any(),
    personas: v.any(),
    recommendations: v.array(v.string()),
    rawResponse: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_job", ["jobId"])
    .index("by_createdAt", ["createdAt"]),

  comparisonRuns: defineTable({
    contentType: v.union(v.literal("image"), v.literal("email")),
    jobIds: v.array(v.id("scoreJobs")),
    rankedResults: v.any(),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),

  uploads: defineTable({
    fileName: v.string(),
    fileType: v.string(),
    storageUrl: v.string(),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
});
