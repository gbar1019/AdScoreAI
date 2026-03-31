import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecommendationsPanel({
  recommendations,
}: {
  recommendations: string[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="list-inside list-decimal space-y-2 text-sm">
          {recommendations.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
