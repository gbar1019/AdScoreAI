/** Matches SYSTEM_DESIGN suggested result shape */
export type ScoreDimensions = {
  engagementPotential: number;
  emotionalResonance: number;
  ctaEffectiveness: number;
  brandAlignment: number;
  audienceRelevance: number;
  conversionIntent: number;
};

export type PersonaFeedback = {
  name: string;
  background: string;
  individualScore: number;
  emotionalResponse: string[];
  engagementLikelihood: number;
  conversionIntent: number;
  feedback: string;
};

export type ScoringResultPayload = {
  score: number;
  confidence: number;
  dimensions: ScoreDimensions;
  personas: PersonaFeedback[];
  recommendations: string[];
};

export type KpiBand = {
  p10: number;
  p50: number;
  p90: number;
};

export type KpiForecast = {
  views: KpiBand;
  likes: KpiBand;
  comments: KpiBand;
  shares: KpiBand;
  engagementRate: KpiBand;
  ctr: KpiBand;
  conversionIntent: KpiBand;
};

export type EngineContribution = {
  engine: string;
  weight: number;
  byKpi: Record<keyof KpiForecast, number>;
};

export type ContentType =
  | "image"
  | "email"
  | "sms"
  | "paidAds"
  | "push"
  | "fileAsset";

export type AiProviderId = "anthropic";

export type JobStatus = "queued" | "processing" | "completed" | "failed";

/** Use Convex `Id<"scoreJobs">` etc. server-side after codegen */
export type ScoreJobId = string;
export type ScoreResultId = string;
