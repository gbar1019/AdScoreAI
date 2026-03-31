import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ScoreDimensions } from "@/types/score";

const labels: { key: keyof ScoreDimensions; label: string }[] = [
  { key: "engagementPotential", label: "Engagement potential" },
  { key: "emotionalResonance", label: "Emotional resonance" },
  { key: "ctaEffectiveness", label: "CTA effectiveness" },
  { key: "brandAlignment", label: "Brand alignment" },
  { key: "audienceRelevance", label: "Audience relevance" },
  { key: "conversionIntent", label: "Conversion intent" },
];

export function DimensionScorePanel({ dimensions }: { dimensions: ScoreDimensions }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Dimensions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2">
        {labels.map(({ key, label }) => (
          <div
            key={key}
            className="flex items-center justify-between rounded-md border border-border px-3 py-2"
          >
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="font-medium tabular-nums">{dimensions[key]}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
