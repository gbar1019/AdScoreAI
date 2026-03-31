"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useEffect } from "react";
import posthog from "posthog-js";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

function PostHogInit() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
    if (!key || !host) return;
    posthog.init(key, { api_host: host });
  }, []);
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  if (!convex) {
    return (
      <>
        <div className="p-6 text-sm text-muted-foreground">
          Set NEXT_PUBLIC_CONVEX_URL in .env.local to enable Convex.
        </div>
        {children}
      </>
    );
  }

  return (
    <ConvexProvider client={convex}>
      <PostHogInit />
      {children}
    </ConvexProvider>
  );
}
