import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-8 p-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">AdScoreAI</h1>
        <p className="mt-2 text-muted-foreground">
          Public MVP mode: score image ads and email creatives before launch with
          structured dimensions, persona feedback, and recommendations.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Get started</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Link href="/dashboard">
            <Button type="button">Open dashboard</Button>
          </Link>
          <p className="text-sm text-muted-foreground">
            Public mode (no login): results and history are shared.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
