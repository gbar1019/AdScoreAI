import type { SimulationAdapter } from "@/lib/simulation/types";

export const openAdServerAdapter: SimulationAdapter = {
  engine: "OpenAdServer",
  async analyze() {
    return {
      engine: "OpenAdServer",
      quality: 59,
      confidence: 67,
      ctrLikeProbability: 0.029,
      dimensions: { brandAlignment: 60, audienceRelevance: 64 },
      personas: [],
      hints: ["ctr_model"],
      raw: {},
    };
  },
};
