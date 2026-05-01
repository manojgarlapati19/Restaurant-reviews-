import { processReviewSummaryJob } from "../processors/review-summary.processor.js";
import { processTrustScoreJob } from "../processors/trust-score.processor.js";

export async function consumeDemoJobs() {
  await processReviewSummaryJob("demo-review-1");
  await processTrustScoreJob("demo-review-1");
}
