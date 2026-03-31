import type { AiProviderId } from "@/types/score";
import type { ScoreRequest, ScoreResponse } from "./types";

/**
 * Abstraction over LLM vendors. Implementations live in provider-specific modules.
 * TODO: Wire retries, token budgets, and structured-output parsing per provider.
 */
export interface ScoringProvider {
  readonly id: AiProviderId;
  scoreCreative(request: ScoreRequest): Promise<ScoreResponse>;
}

export type ProviderFactory = (id: AiProviderId) => ScoringProvider;
