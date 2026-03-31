import type { SimulationAdapter } from "@/lib/simulation/types";

export const llmMarketingExpertAdapter: SimulationAdapter = {
  engine: "LLM-Marketing-Expert",
  async analyze(input) {
    const isLong = input.inputReference.length > 260;
    return {
      engine: "LLM-Marketing-Expert",
      quality: isLong ? 70 : 63,
      confidence: 69,
      ctrLikeProbability: isLong ? 0.041 : 0.034,
      dimensions: { ctaEffectiveness: isLong ? 74 : 63, audienceRelevance: 67 },
      personas: [
        {
          name: "Pragmatic buyer",
          sentiment: "neutral",
          engagement: 61,
          conversionIntent: 64,
          reactionSummary: "Needs stronger CTA and proof.",
          recommendations: ["Add one social proof statement."],
        },
      ],
      hints: ["copy_quality", "cta_strength"],
      raw: { contentType: input.contentType },
    };
  },
};
