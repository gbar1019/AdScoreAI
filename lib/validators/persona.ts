import { z } from "zod";

export const personaFeedbackSchema = z.object({
  name: z.string(),
  background: z.string(),
  individualScore: z.number().min(0).max(100),
  emotionalResponse: z.array(z.string()),
  engagementLikelihood: z.number().min(0).max(100),
  conversionIntent: z.number().min(0).max(100),
  feedback: z.string(),
});
