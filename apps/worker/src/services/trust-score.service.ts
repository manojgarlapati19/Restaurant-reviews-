import type { ReviewVerificationLevel } from "@dishcovery/types";

export function computeTrustScore(level: ReviewVerificationLevel, mediaCount = 0) {
  const base = level === "bill_verified" ? 88 : level === "photo_verified" ? 72 : 55;
  return Math.min(100, base + Math.min(mediaCount * 2, 10));
}
