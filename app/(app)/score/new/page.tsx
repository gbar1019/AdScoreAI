import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NewScorePage() {
  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">New score</h1>
        <p className="text-muted-foreground">
          Choose a channel to run the multi-engine simulation.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Content type</CardTitle>
          <CardDescription>Where should we start?</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <Link href="/score/new/image" className="flex-1">
            <Button type="button" className="w-full">
              Image ad
            </Button>
          </Link>
          <Link href="/score/new/email" className="flex-1">
            <Button type="button" variant="secondary" className="w-full">
              Email
            </Button>
          </Link>
          <Link href="/score/new/sms" className="flex-1">
            <Button type="button" variant="secondary" className="w-full">
              SMS
            </Button>
          </Link>
          <Link href="/score/new/paid-ads" className="flex-1">
            <Button type="button" variant="secondary" className="w-full">
              Paid Ads
            </Button>
          </Link>
          <Link href="/score/new/push" className="flex-1">
            <Button type="button" variant="secondary" className="w-full">
              Push
            </Button>
          </Link>
          <Link href="/score/new/file" className="flex-1">
            <Button type="button" variant="secondary" className="w-full">
              File Asset
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
