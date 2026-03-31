import { ResultsClient } from "./results-client";
import type { Id } from "@/convex/_generated/dataModel";

export default async function ResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ResultsClient jobId={id as Id<"scoreJobs">} />;
}
