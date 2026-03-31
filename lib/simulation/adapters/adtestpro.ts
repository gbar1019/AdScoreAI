import type { SimulationAdapter } from "@/lib/simulation/types";

export const adTestProAdapter: SimulationAdapter = {
  engine: "AdTestPro",
  async analyze(input) {
    const seed = input.inputReference.length % 17;
    return {
      engine: "AdTestPro",
      quality: 62 + seed,
      confidence: 72,
      ctrLikeProbability: 0.035 + seed / 1000,
      dimensions: { engagementPotential: 68, emotionalResonance: 64 },
      personas: [
        {
          name: "Value seeker",
          sentiment: "positive",
          engagement: 65,
          conversionIntent: 58,
          reactionSummary: "Responds well to clear value framing.",
          recommendations: ["Make offer and outcome explicit."],
        },
      ],
      hints: ["persona_judge", "clarity_bias"],
      raw: { channel: input.contentType },
    };
  },
};
