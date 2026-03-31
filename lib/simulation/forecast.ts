import type { KpiBand, KpiForecast } from "@/types/score";

function band(mid: number, spread: number): KpiBand {
  return {
    p10: Math.max(0, Math.round(mid * (1 - spread))),
    p50: Math.max(0, Math.round(mid)),
    p90: Math.max(0, Math.round(mid * (1 + spread))),
  };
}

export function buildKpiForecast(baseScore: number, ctrLike: number): KpiForecast {
  const viewsMid = 600 + baseScore * 22;
  const likesMid = viewsMid * (0.03 + baseScore / 4000);
  const commentsMid = likesMid * 0.18;
  const sharesMid = likesMid * 0.13;
  const engagementRateMid = ((likesMid + commentsMid + sharesMid) / viewsMid) * 100;
  const ctrMid = ctrLike * 100;
  const conversionIntentMid = Math.min(100, 18 + baseScore * 0.52);
  return {
    views: band(viewsMid, 0.25),
    likes: band(likesMid, 0.3),
    comments: band(commentsMid, 0.35),
    shares: band(sharesMid, 0.35),
    engagementRate: band(engagementRateMid, 0.2),
    ctr: band(ctrMid, 0.22),
    conversionIntent: band(conversionIntentMid, 0.2),
  };
}
