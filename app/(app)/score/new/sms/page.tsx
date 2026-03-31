import { MultiChannelScoreClient } from "@/components/multi-channel-score-client";

export default function SmsScorePage() {
  return (
    <MultiChannelScoreClient
      contentType="sms"
      title="SMS campaign score"
      description="Score SMS messaging with unified KPI simulation."
      fields={[
        { key: "senderName", label: "Sender name" },
        { key: "body", label: "Message body", multiline: true, required: true },
      ]}
    />
  );
}
