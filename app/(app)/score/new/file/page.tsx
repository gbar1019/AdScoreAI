import { MultiChannelScoreClient } from "@/components/multi-channel-score-client";

export default function FileAssetScorePage() {
  return (
    <MultiChannelScoreClient
      contentType="fileAsset"
      title="File asset score"
      description="Score uploaded/hosted marketing assets with notes."
      fields={[
        { key: "fileUrl", label: "File URL", required: true },
        { key: "mimeType", label: "MIME type" },
        { key: "notes", label: "Context notes", multiline: true },
      ]}
    />
  );
}
