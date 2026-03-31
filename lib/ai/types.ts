import type { AiProviderId } from "@/types/score";
import type { ScoringResultPayload } from "@/types/score";

export type ScoreCreativeInput =
  | { kind: "image"; imageUrl: string; captionHint?: string }
  | { kind: "email"; subject: string; body: string; previewText?: string };

export type ScoreAudienceContext = {
  description: string;
  structuredFields?: Record<string, unknown>;
};

export type ScoreRequest = {
  creative: ScoreCreativeInput;
  audience: ScoreAudienceContext;
  provider: AiProviderId;
};

export type ScoreResponse =
  | { ok: true; result: ScoringResultPayload; rawText?: string }
  | { ok: false; error: string };
