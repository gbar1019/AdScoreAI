import type { ContentType, KpiForecast, ScoreDimensions } from "@/types/score";

export type SimulationInput = {
  contentType: ContentType;
  inputReference: string;
  audienceSummary: string;
};

export type PersonaSignal = {
  name: string;
  sentiment: "negative" | "neutral" | "positive";
  engagement: number;
  conversionIntent: number;
  reactionSummary: string;
  recommendations: string[];
};

export type EngineSignal = {
  engine: string;
  quality: number;
  confidence: number;
  ctrLikeProbability: number;
  dimensions: Partial<ScoreDimensions>;
  personas: PersonaSignal[];
  hints: string[];
  raw: Record<string, unknown>;
};

export type SimulationOutput = {
  overallScore: number;
  confidence: number;
  dimensions: ScoreDimensions;
  personas: {
    name: string;
    background: string;
    individualScore: number;
    emotionalResponse: string[];
    engagementLikelihood: number;
    conversionIntent: number;
    feedback: string;
  }[];
  recommendations: string[];
  kpiForecast: KpiForecast;
  engineOutputs: EngineSignal[];
  engineContributions: {
    engine: string;
    weight: number;
    byKpi: Record<keyof KpiForecast, number>;
  }[];
  normalizationMetadata: Record<string, unknown>;
  simulationVersion: string;
};

export interface SimulationAdapter {
  engine: string;
  analyze: (input: SimulationInput) => Promise<EngineSignal>;
}
