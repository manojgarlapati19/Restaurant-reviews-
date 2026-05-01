import mongoose, { Schema } from "mongoose";

const followSchema = new Schema(
  {
    followerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    followeeId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true }
  },
  { timestamps: true }
);

followSchema.index({ followerId: 1, followeeId: 1 }, { unique: true });

export const FollowModel: any = mongoose.models.Follow || mongoose.model("Follow", followSchema);
