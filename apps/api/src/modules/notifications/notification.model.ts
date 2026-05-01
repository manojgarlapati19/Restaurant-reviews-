import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    type: { type: String, required: true },
    payload: { type: Schema.Types.Mixed, default: {} },
    readAt: { type: Date }
  },
  { timestamps: true }
);

notificationSchema.index({ userId: 1, readAt: 1 });

export const NotificationModel: any =
  mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
