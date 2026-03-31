import type { SimulationAdapter } from "@/lib/simulation/types";

export const metaAdsKitAdapter: SimulationAdapter = {
  engine: "meta-ads-kit",
  async analyze(input) {
    const paidBoost = input.contentType === "paidAds" ? 8 : 0;
    return {
      engine: "meta-ads-kit",
      quality: 61 + paidBoost,
      confidence: 60,
      ctrLikeProbability: 0.038 + paidBoost / 1000,
      dimensions: { ctaEffectiveness: 66 + paidBoost, engagementPotential: 63 },
      personas: [],
      hints: ["creative_fatigue", "auction_hint"],
      raw: { paidBoost },
    };
  },
};
