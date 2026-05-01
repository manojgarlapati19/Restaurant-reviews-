import mongoose, { Schema } from "mongoose";

const reviewLikeSchema = new Schema(
  {
    reviewId: { type: Schema.Types.ObjectId, ref: "Review", required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true }
  },
  { timestamps: true }
);

reviewLikeSchema.index({ reviewId: 1, userId: 1 }, { unique: true });

export const ReviewLikeModel: any = mongoose.models.ReviewLike || mongoose.model("ReviewLike", reviewLikeSchema);
