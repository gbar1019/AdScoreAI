import { z } from "zod";

export const contentTypeSchema = z.enum([
  "image",
  "email",
  "sms",
  "paidAds",
  "push",
  "fileAsset",
]);
export const aiProviderSchema = z.enum(["anthropic"]);
export const jobStatusSchema = z.enum([
  "queued",
  "processing",
  "completed",
  "failed",
]);

export const createScoreJobSchema = z.object({
  contentType: contentTypeSchema,
  inputReference: z.string().min(1),
  audienceId: z.string().optional(),
  provider: aiProviderSchema.default("anthropic"),
});

export const normalizedContentInputSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("image"),
    imageUrl: z.string().url(),
  }),
  z.object({
    kind: z.literal("email"),
    subject: z.string().min(1),
    body: z.string().min(1),
    previewText: z.string().optional(),
  }),
  z.object({
    kind: z.literal("sms"),
    body: z.string().min(1),
    senderName: z.string().optional(),
  }),
  z.object({
    kind: z.literal("paidAds"),
    headline: z.string().min(1),
    primaryText: z.string().min(1),
    cta: z.string().optional(),
    destinationUrl: z.string().url().optional(),
  }),
  z.object({
    kind: z.literal("push"),
    title: z.string().min(1),
    body: z.string().min(1),
    deeplink: z.string().optional(),
  }),
  z.object({
    kind: z.literal("fileAsset"),
    fileUrl: z.string().url(),
    mimeType: z.string().optional(),
    notes: z.string().optional(),
  }),
]);

export type CreateScoreJobInput = z.infer<typeof createScoreJobSchema>;
export type NormalizedContentInput = z.infer<typeof normalizedContentInputSchema>;
