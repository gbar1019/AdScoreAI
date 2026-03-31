import { z } from "zod";

export const contentTypeSchema = z.enum(["image", "email"]);
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

export type CreateScoreJobInput = z.infer<typeof createScoreJobSchema>;
