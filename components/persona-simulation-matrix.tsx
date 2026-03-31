import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PersonaFeedback } from "@/types/score";

export function PersonaSimulationMatrix({
  personas,
}: {
  personas: PersonaFeedback[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Persona simulation matrix</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {personas.map((p) => (
          <div key={p.name} className="grid grid-cols-3 gap-2 rounded-md border border-border px-3 py-2 text-sm">
            <span>{p.name}</span>
            <span className="text-muted-foreground">Engage {p.engagementLikelihood}%</span>
            <span className="text-muted-foreground">Conv {p.conversionIntent}%</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
