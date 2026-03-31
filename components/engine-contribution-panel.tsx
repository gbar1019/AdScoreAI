import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EngineContribution } from "@/types/score";

export function EngineContributionPanel({
  contributions,
}: {
  contributions: EngineContribution[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Engine contributions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {contributions.map((c) => (
          <div key={c.engine} className="rounded-md border border-border px-3 py-2 text-sm">
            <p className="font-medium">{c.engine}</p>
            <p className="text-muted-foreground">Weight {Math.round(c.weight * 100)}%</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
