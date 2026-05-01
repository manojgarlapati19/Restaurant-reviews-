import mongoose, { Schema } from "mongoose";

const reviewCommentSchema = new Schema(
  {
    reviewId: { type: Schema.Types.ObjectId, ref: "Review", required: true, index: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    body: { type: String, required: true },
    status: { type: String, default: "published" }
  },
  { timestamps: true }
);

reviewCommentSchema.index({ reviewId: 1, createdAt: -1 });

export const ReviewCommentModel: any =
  mongoose.models.ReviewComment || mongoose.model("ReviewComment", reviewCommentSchema);
