"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export function ContentUploadForm({
  onUploaded,
}: {
  onUploaded: (url: string) => void;
}) {
  return (
    <div className="space-y-2">
      <UploadButton<OurFileRouter, "imageUploader">
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          const first = res?.[0] as
            | { url?: string; ufsUrl?: string; serverData?: { url?: string } }
            | undefined;
          const url = first?.url ?? first?.serverData?.url ?? first?.ufsUrl;
          if (url) onUploaded(url);
        }}
        onUploadError={(e) => {
          console.error(e);
        }}
        appearance={{
          button: "bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium",
          allowedContent: "text-muted-foreground text-xs mt-2",
        }}
      />
      <p className="text-xs text-muted-foreground">
        TODO: Link upload completion to Convex `uploads` table and optional
        cleanup.
      </p>
    </div>
  );
}
