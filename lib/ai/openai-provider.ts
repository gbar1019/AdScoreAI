import OpenAI from "openai";
import type { ScoringProvider } from "./provider";
import type { ScoreRequest, ScoreResponse } from "./types";
import { parseScoringJson } from "./parse-json-result";

function buildPrompt(req: ScoreRequest): string {
  const audience =
    req.audience.description +
    (req.audience.structuredFields
      ? `\nStructured hints: ${JSON.stringify(req.audience.structuredFields)}`
      : "");
  if (req.creative.kind === "image") {
    return `You are an ad creative analyst. Image URL: ${req.creative.imageUrl}. Audience: ${audience}. Return ONLY valid JSON matching schema: score 1-100, confidence 0-100, dimensions (six 0-100 numbers: engagementPotential, emotionalResonance, ctaEffectiveness, brandAlignment, audienceRelevance, conversionIntent), personas array (each with name, background, individualScore, emotionalResponse string array, engagementLikelihood, conversionIntent, feedback), recommendations string array.`;
  }
  return `You are an email marketing analyst. Subject: ${req.creative.subject}. Preview: ${req.creative.previewText ?? ""}. Body: ${req.creative.body}. Audience: ${audience}. Return ONLY valid JSON matching schema: score 1-100, confidence 0-100, dimensions (six 0-100 numbers), personas array, recommendations string array.`;
}

export function createOpenAiScoringProvider(): ScoringProvider {
  return {
    id: "openai",
    async scoreCreative(request: ScoreRequest): Promise<ScoreResponse> {
      // TODO: Use vision model + image fetch for image creatives; inject API key from env server-side only.
      const key = process.env.OPENAI_API_KEY;
      if (!key) {
        return { ok: false, error: "OPENAI_API_KEY is not set" };
      }
      const client = new OpenAI({ apiKey: key });
      const prompt = buildPrompt(request);
      try {
        const creative = request.creative;
        const useVision = creative.kind === "image";
        const completion = await client.chat.completions.create({
          model: "gpt-4o-mini",
          messages: useVision
            ? [
                {
                  role: "user",
                  content: [
                    { type: "text", text: prompt },
                    {
                      type: "image_url",
                      image_url: { url: creative.imageUrl },
                    },
                  ],
                },
              ]
            : [{ role: "user", content: prompt }],
          max_tokens: 2048,
        });
        const text = completion.choices[0]?.message?.content ?? "";
        const parsed = parseScoringJson(text);
        if (!parsed) {
          return {
            ok: false,
            error: "Failed to parse model JSON into scoring schema",
          };
        }
        return { ok: true, result: parsed, rawText: text };
      } catch (e) {
        const message = e instanceof Error ? e.message : "OpenAI request failed";
        return { ok: false, error: message };
      }
    },
  };
}
