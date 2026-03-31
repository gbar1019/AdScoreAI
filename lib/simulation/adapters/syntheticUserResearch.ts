import type { SimulationAdapter } from "@/lib/simulation/types";

export const syntheticUserResearchAdapter: SimulationAdapter = {
  engine: "Synthetic User Research",
  async analyze() {
    return {
      engine: "Synthetic User Research",
      quality: 64,
      confidence: 64,
      ctrLikeProbability: 0.03,
      dimensions: { emotionalResonance: 70, conversionIntent: 62 },
      personas: [
        {
          name: "Skeptical evaluator",
          sentiment: "neutral",
          engagement: 55,
          conversionIntent: 52,
          reactionSummary: "Needs stronger evidence and differentiation.",
          recommendations: ["Add one credibility proof point."],
        },
      ],
      hints: ["dialog_research"],
      raw: {},
    };
  },
};
