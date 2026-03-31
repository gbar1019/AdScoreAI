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

export type ContentType = "image" | "email";

export type AiProviderId = "anthropic";

export type JobStatus = "queued" | "processing" | "completed" | "failed";

/** Use Convex `Id<"scoreJobs">` etc. server-side after codegen */
export type ScoreJobId = string;
export type ScoreResultId = string;
