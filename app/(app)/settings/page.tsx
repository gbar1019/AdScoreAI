import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Public launch mode. Configure integrations in{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">.env.local</code>.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Integrations checklist</CardTitle>
          <CardDescription>Required for a full MVP run</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <ul className="list-inside list-disc space-y-1">
            <li>
              <strong className="text-foreground">Convex</strong> — deployment and{" "}
              <code className="text-xs">NEXT_PUBLIC_CONVEX_URL</code>
            </li>
            <li>
              <strong className="text-foreground">OpenAI or Anthropic</strong> — at
              least one API key for scoring
            </li>
            <li>
              <strong className="text-foreground">UploadThing</strong> — image
              uploads
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
