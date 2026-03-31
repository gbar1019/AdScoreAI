import type { SimulationAdapter } from "@/lib/simulation/types";

export const personaHubAdapter: SimulationAdapter = {
  engine: "Persona Hub",
  async analyze() {
    return {
      engine: "Persona Hub",
      quality: 66,
      confidence: 62,
      ctrLikeProbability: 0.032,
      dimensions: { audienceRelevance: 73, brandAlignment: 65 },
      personas: [
        {
          name: "Time-constrained professional",
          sentiment: "positive",
          engagement: 69,
          conversionIntent: 60,
          reactionSummary: "Prefers concise and utility-first messaging.",
          recommendations: ["Lead with concrete time savings."],
        },
      ],
      hints: ["persona_distribution"],
      raw: {},
    };
  },
};
