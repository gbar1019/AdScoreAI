import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PersonaFeedback } from "@/types/score";
import { Badge } from "@/components/ui/badge";

export function PersonaFeedbackList({ personas }: { personas: PersonaFeedback[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Persona feedback</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {personas.map((p, idx) => (
          <div
            key={`${p.name}-${idx}`}
            className="rounded-lg border border-border bg-muted/40 p-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium">{p.name}</p>
              <Badge variant="outline">Score {p.individualScore}</Badge>
              <Badge variant="secondary">
                Engage {p.engagementLikelihood}% / Conv {p.conversionIntent}%
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{p.background}</p>
            <ul className="mt-2 list-inside list-disc text-sm">
              {p.emotionalResponse.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            <p className="mt-2 text-sm">{p.feedback}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
