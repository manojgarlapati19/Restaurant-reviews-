import mongoose, { Schema } from "mongoose";

const mediaAssetSchema = new Schema(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    entityType: { type: String, required: true, index: true },
    entityId: { type: Schema.Types.ObjectId, required: true, index: true },
    reviewId: { type: Schema.Types.ObjectId, ref: "Review", index: true },
    type: { type: String, enum: ["photo", "video"], required: true },
    url: { type: String, required: true },
    thumbnailUrl: { type: String },
    durationSec: { type: Number },
    moderationStatus: { type: String, default: "pending", index: true },
    storageProvider: { type: String, default: "cloudinary" },
    metadata: { type: Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

mediaAssetSchema.index({ entityType: 1, entityId: 1 });

export const MediaAssetModel: any = mongoose.models.MediaAsset || mongoose.model("MediaAsset", mediaAssetSchema);
