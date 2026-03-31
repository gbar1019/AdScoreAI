import { scoringResultPayloadSchema } from "@/lib/validators/scoring-result";
import type { ScoringResultPayload } from "@/types/score";

/**
 * TODO: Replace with provider-native structured outputs / tool calls where available.
 */
export function parseScoringJson(raw: string): ScoringResultPayload | null {
  try {
    const cleaned = raw.replace(/```json\s*/gi, "").replace(/```\s*$/g, "").trim();
    const data = JSON.parse(cleaned) as unknown;
    const parsed = scoringResultPayloadSchema.safeParse(data);
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}
