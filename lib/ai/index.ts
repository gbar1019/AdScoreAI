import type { AiProviderId } from "@/types/score";
import { createAnthropicScoringProvider } from "./anthropic-provider";
import { createOpenAiScoringProvider } from "./openai-provider";
import type { ScoringProvider } from "./provider";

export function getScoringProvider(id: AiProviderId): ScoringProvider {
  if (id === "anthropic") return createAnthropicScoringProvider();
  return createOpenAiScoringProvider();
}

export * from "./provider";
export * from "./types";
