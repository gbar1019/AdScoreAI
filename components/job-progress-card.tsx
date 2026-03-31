import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const progressForStatus: Record<string, number> = {
  queued: 15,
  processing: 55,
  completed: 100,
  failed: 100,
};

export function JobProgressCard({
  status,
  errorMessage,
}: {
  status: string;
  errorMessage?: string | null;
}) {
  const pct = progressForStatus[status] ?? 0;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Job status</CardTitle>
        <Badge
          variant={
            status === "completed"
              ? "success"
              : status === "failed"
                ? "destructive"
                : "secondary"
          }
        >
          {status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-2">
        <Progress value={pct} />
        {errorMessage ? (
          <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
        ) : null}
        <p className="text-xs text-muted-foreground">
          TODO: Subscribe to Convex job updates for live progress once workers stream
          intermediate states.
        </p>
      </CardContent>
    </Card>
  );
}
