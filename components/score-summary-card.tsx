import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ScoreSummaryCard({
  overallScore,
  confidence,
}: {
  overallScore: number;
  confidence: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">AdScore</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-3">
        <span className="text-4xl font-semibold tabular-nums">{overallScore}</span>
        <Badge variant="outline">/ 100</Badge>
        <Badge variant="secondary">Confidence {confidence}%</Badge>
      </CardContent>
    </Card>
  );
}
