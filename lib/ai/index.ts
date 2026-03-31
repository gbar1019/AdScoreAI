import { createAnthropicScoringProvider } from "./anthropic-provider";
import type { ScoringProvider } from "./provider";

export function getScoringProvider(): ScoringProvider {
  return createAnthropicScoringProvider();
}

export * from "./provider";
export * from "./types";
