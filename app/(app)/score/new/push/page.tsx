import { MultiChannelScoreClient } from "@/components/multi-channel-score-client";

export default function PushScorePage() {
  return (
    <MultiChannelScoreClient
      contentType="push"
      title="Push notification score"
      description="Score push title and body for engagement intent."
      fields={[
        { key: "title", label: "Push title", required: true },
        { key: "body", label: "Push body", multiline: true, required: true },
        { key: "deeplink", label: "Deep link (optional)" },
      ]}
    />
  );
}
