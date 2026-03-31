import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { KpiForecast } from "@/types/score";

export function KpiForecastPanel({ forecast }: { forecast: KpiForecast }) {
  const rows = Object.entries(forecast) as [keyof KpiForecast, KpiForecast[keyof KpiForecast]][];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">KPI forecast</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {rows.map(([key, band]) => (
          <div key={key} className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm">
            <span className="capitalize text-muted-foreground">{key}</span>
            <span className="tabular-nums">
              {band.p10} / {band.p50} / {band.p90}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
