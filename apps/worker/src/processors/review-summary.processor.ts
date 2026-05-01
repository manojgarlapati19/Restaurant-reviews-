import { generateReviewSummary } from "../services/review-summary.service.js";

export async function processReviewSummaryJob(reviewId: string) {
  const summary = await generateReviewSummary([
    "Rich spice and excellent value for the portion.",
    "Service slowed down at peak time but the dish stayed memorable."
  ]);

  console.log(`[worker] review-summary ${reviewId}: ${summary}`);
}
