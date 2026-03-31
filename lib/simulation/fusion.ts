import { buildKpiForecast } from "@/lib/simulation/forecast";
import { adTestProAdapter } from "@/lib/simulation/adapters/adtestpro";
import { llmMarketingExpertAdapter } from "@/lib/simulation/adapters/llmMarketingExpert";
import { metaAdsKitAdapter } from "@/lib/simulation/adapters/metaAdsKit";
import { openAdServerAdapter } from "@/lib/simulation/adapters/openAdServer";
import { personaHubAdapter } from "@/lib/simulation/adapters/personaHub";
import { syntheticUserResearchAdapter } from "@/lib/simulation/adapters/syntheticUserResearch";
import type {
  EngineSignal,
  SimulationAdapter,
  SimulationInput,
  SimulationOutput,
} from "@/lib/simulation/types";
import type { KpiForecast, ScoreDimensions } from "@/types/score";

const adapters: SimulationAdapter[] = [
  adTestProAdapter,
  llmMarketingExpertAdapter,
  personaHubAdapter,
  syntheticUserResearchAdapter,
  metaAdsKitAdapter,
  openAdServerAdapter,
];

const ENGINE_TIMEOUT_MS = Number(process.env.SIM_ENGINE_TIMEOUT_MS ?? "5000");

function isEnabled(engine: string) {
  const key =
    "SIM_ENGINE_" + engine.toUpperCase().replace(/[^A-Z0-9]/g, "_") + "_ENABLED";
  const raw = process.env[key];
  return raw == null ? true : raw.toLowerCase() !== "false";
}

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("Engine timeout")), ms);
    promise
      .then((v) => {
        clearTimeout(t);
        resolve(v);
      })
      .catch((e) => {
        clearTimeout(t);
        reject(e);
      });
  });
}

const defaultDimensions: ScoreDimensions = {
  engagementPotential: 0,
  emotionalResonance: 0,
  ctaEffectiveness: 0,
  brandAlignment: 0,
  audienceRelevance: 0,
  conversionIntent: 0,
};

function avg(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export async function runUnifiedSimulation(
  input: SimulationInput,
): Promise<SimulationOutput> {
  const engineOutputs: EngineSignal[] = [];
  for (const adapter of adapters.filter((a) => isEnabled(a.engine))) {
    try {
      const signal = await withTimeout(adapter.analyze(input), ENGINE_TIMEOUT_MS);
      engineOutputs.push(signal);
    } catch {
      // Per-engine fallback by design: preserve deterministic output shape.
    }
  }

  const qualityAvg = avg(engineOutputs.map((e) => e.quality));
  const confidenceAvg = avg(engineOutputs.map((e) => e.confidence));
  const ctrLike = avg(engineOutputs.map((e) => e.ctrLikeProbability));
  const overallScore = Math.round(Math.max(1, Math.min(100, qualityAvg)));
  const confidence = Math.round(Math.max(1, Math.min(100, confidenceAvg)));

  const dimensions: ScoreDimensions = { ...defaultDimensions };
  const keys = Object.keys(defaultDimensions) as (keyof ScoreDimensions)[];
  for (const key of keys) {
    dimensions[key] = Math.round(
      avg(
        engineOutputs
          .map((e) => e.dimensions[key])
          .filter((v): v is number => typeof v === "number"),
      ) || overallScore,
    );
  }

  const personaMap = new Map<string, SimulationOutput["personas"][number]>();
  for (const signal of engineOutputs) {
    for (const p of signal.personas) {
      const prior = personaMap.get(p.name);
      if (!prior) {
        personaMap.set(p.name, {
          name: p.name,
          background: `Simulated by ${signal.engine}`,
          individualScore: Math.round((p.engagement + p.conversionIntent) / 2),
          emotionalResponse: [p.sentiment, p.reactionSummary],
          engagementLikelihood: p.engagement,
          conversionIntent: p.conversionIntent,
          feedback: `${p.reactionSummary} ${p.recommendations.join(" ")}`.trim(),
        });
      }
    }
  }
  const personas = [...personaMap.values()];

  const recommendations = Array.from(
    new Set(engineOutputs.flatMap((e) => e.personas.flatMap((p) => p.recommendations))),
  ).slice(0, 8);

  const kpiForecast = buildKpiForecast(overallScore, ctrLike);
  const kpiKeys = Object.keys(kpiForecast) as (keyof KpiForecast)[];
  const weight = engineOutputs.length > 0 ? 1 / engineOutputs.length : 0;
  const engineContributions = engineOutputs.map((e) => ({
    engine: e.engine,
    weight: Number(weight.toFixed(3)),
    byKpi: Object.fromEntries(kpiKeys.map((k) => [k, Number(weight.toFixed(3))])) as Record<
      keyof KpiForecast,
      number
    >,
  }));

  return {
    overallScore,
    confidence,
    dimensions,
    personas,
    recommendations,
    kpiForecast,
    engineOutputs,
    engineContributions,
    normalizationMetadata: {
      contentType: input.contentType,
      adaptersAttempted: adapters.length,
      adaptersSucceeded: engineOutputs.length,
    },
    simulationVersion: "unified-v1",
  };
}
