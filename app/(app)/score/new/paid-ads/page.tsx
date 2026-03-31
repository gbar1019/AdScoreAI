import { MultiChannelScoreClient } from "@/components/multi-channel-score-client";

export default function PaidAdsScorePage() {
  return (
    <MultiChannelScoreClient
      contentType="paidAds"
      title="Paid ads score"
      description="Score paid ad creative and CTA quality."
      fields={[
        { key: "headline", label: "Headline", required: true },
        { key: "primaryText", label: "Primary text", multiline: true, required: true },
        { key: "cta", label: "CTA label" },
        { key: "destinationUrl", label: "Destination URL" },
      ]}
    />
  );
}
