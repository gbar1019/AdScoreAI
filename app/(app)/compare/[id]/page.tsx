import { CompareDetailClient } from "./compare-detail-client";
import type { Id } from "@/convex/_generated/dataModel";

export default async function CompareDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CompareDetailClient comparisonId={id as Id<"comparisonRuns">} />;
}
