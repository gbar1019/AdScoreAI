import { z } from "zod";
import { dimensionsSchema } from "./dimensions";
import { personaFeedbackSchema } from "./persona";

export const scoringResultPayloadSchema = z.object({
  score: z.number().min(1).max(100),
  confidence: z.number().min(0).max(100),
  dimensions: dimensionsSchema,
  personas: z.array(personaFeedbackSchema).min(1),
  recommendations: z.array(z.string()),
});

export type ScoringResultPayloadInput = z.infer<typeof scoringResultPayloadSchema>;
