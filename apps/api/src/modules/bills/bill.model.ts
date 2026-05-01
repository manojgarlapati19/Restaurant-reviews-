import mongoose, { Schema } from "mongoose";

const billSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    reviewId: { type: Schema.Types.ObjectId, ref: "Review", required: true, index: true },
    restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true, index: true },
    amount: { type: Number, required: true },
    visitDate: { type: Date, required: true },
    imageUrl: { type: String, required: true },
    ocrText: { type: String },
    verificationStatus: { type: String, default: "pending", index: true },
    verifiedBy: { type: Schema.Types.ObjectId, ref: "User" },
    verifiedAt: { type: Date }
  },
  { timestamps: true }
);

billSchema.index({ reviewId: 1 }, { unique: true });
billSchema.index({ restaurantId: 1, visitDate: -1 });

export const BillModel: any = mongoose.models.Bill || mongoose.model("Bill", billSchema);
