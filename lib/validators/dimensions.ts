import { z } from "zod";

export const dimensionsSchema = z.object({
  engagementPotential: z.number().min(0).max(100),
  emotionalResonance: z.number().min(0).max(100),
  ctaEffectiveness: z.number().min(0).max(100),
  brandAlignment: z.number().min(0).max(100),
  audienceRelevance: z.number().min(0).max(100),
  conversionIntent: z.number().min(0).max(100),
});
