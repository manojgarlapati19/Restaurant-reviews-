import mongoose, { Schema } from "mongoose";

const ratingAggregateSchema = new Schema(
  {
    entityType: { type: String, enum: ["restaurant", "dish"], required: true },
    entityId: { type: Schema.Types.ObjectId, required: true },
    reviewCount: { type: Number, default: 0 },
    verifiedReviewCount: { type: Number, default: 0 },
    averages: { type: Schema.Types.Mixed, default: {} },
    worthItAverage: { type: Number, default: 0 },
    lastComputedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

ratingAggregateSchema.index({ entityType: 1, entityId: 1 }, { unique: true });

export const RatingAggregateModel: any =
  mongoose.models.RatingAggregate || mongoose.model("RatingAggregate", ratingAggregateSchema);
