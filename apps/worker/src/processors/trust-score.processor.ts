import { computeTrustScore } from "../services/trust-score.service.js";

export async function processTrustScoreJob(reviewId: string) {
  const trustScore = computeTrustScore("photo_verified", 3);
  console.log(`[worker] trust-score ${reviewId}: ${trustScore}`);
}
