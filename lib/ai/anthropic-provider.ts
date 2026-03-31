import Anthropic from "@anthropic-ai/sdk";
import type { ScoringProvider } from "./provider";
import type { ScoreRequest, ScoreResponse } from "./types";
import { parseScoringJson } from "./parse-json-result";

function buildUserText(req: ScoreRequest): string {
  const audience =
    req.audience.description +
    (req.audience.structuredFields
      ? `\nStructured hints: ${JSON.stringify(req.audience.structuredFields)}`
      : "");
  if (req.creative.kind === "image") {
    return `You are an ad creative analyst. The user provided this image URL (describe cues you would expect from a marketing still): ${req.creative.imageUrl}. Audience: ${audience}. Return ONLY valid JSON: score 1-100, confidence 0-100, dimensions (six 0-100: engagementPotential, emotionalResonance, ctaEffectiveness, brandAlignment, audienceRelevance, conversionIntent), personas array (each with name, background, individualScore, emotionalResponse string array, engagementLikelihood, conversionIntent, feedback), recommendations string array.
TODO: Wire Claude vision with fetched image bytes; URL-in-text is a placeholder for MVP scaffolding.`;
  }
  return `You are an email marketing analyst. Subject: ${req.creative.subject}. Preview: ${req.creative.previewText ?? ""}. Body: ${req.creative.body}. Audience: ${audience}. Return ONLY valid JSON with the same schema as the image task.`;
}

export function createAnthropicScoringProvider(): ScoringProvider {
  return {
    id: "anthropic",
    async scoreCreative(request: ScoreRequest): Promise<ScoreResponse> {
      const key = process.env.ANTHROPIC_API_KEY;
      if (!key) {
        return { ok: false, error: "ANTHROPIC_API_KEY is not set" };
      }
      const client = new Anthropic({ apiKey: key });
      try {
        const msg = await client.messages.create({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 2048,
          messages: [{ role: "user", content: buildUserText(request) }],
        });
        const block = msg.content.find((b) => b.type === "text");
        const text = block && block.type === "text" ? block.text : "";
        const parsed = parseScoringJson(text);
        if (!parsed) {
          return { ok: false, error: "Failed to parse Anthropic JSON" };
        }
        return { ok: true, result: parsed, rawText: text };
      } catch (e) {
        const message =
          e instanceof Error ? e.message : "Anthropic request failed";
        return { ok: false, error: message };
      }
    },
  };
}
