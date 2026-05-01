import mongoose, { Schema } from "mongoose";

const ratingsSchema = new Schema(
  {
    taste: { type: Number, required: true },
    quantity: { type: Number, required: true },
    value: { type: Number, required: true },
    presentation: { type: Number, required: true },
    foodQuality: { type: Number },
    service: { type: Number },
    ambience: { type: Number },
    priceFairness: { type: Number }
  },
  { _id: false }
);

const ownerReplySchema = new Schema(
  {
    body: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const reviewSchema = new Schema(
  {
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    targetType: { type: String, enum: ["restaurant", "dish"], required: true, index: true },
    restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true, index: true },
    dishId: { type: Schema.Types.ObjectId, ref: "Dish", index: true },
    dishCatalogId: { type: Schema.Types.ObjectId, ref: "DishCatalog" },
    title: { type: String, required: true },
    body: { type: String, required: true },
    ratings: { type: ratingsSchema, required: true },
    worthItScore: { type: Number, required: true },
    tagIds: { type: [String], default: [] },
    mediaIds: { type: [Schema.Types.ObjectId], ref: "MediaAsset", default: [] },
    visitContext: { type: Schema.Types.Mixed, default: {} },
    verificationLevel: {
      type: String,
      enum: ["normal", "photo_verified", "bill_verified"],
      default: "normal",
      index: true
    },
    trustScore: { type: Number, default: 50 },
    status: { type: String, enum: ["draft", "published", "flagged", "removed"], default: "published", index: true },
    ownerReply: { type: ownerReplySchema },
    publishedAt: { type: Date, default: Date.now, index: true }
  },
  { timestamps: true }
);

reviewSchema.index({ restaurantId: 1, publishedAt: -1 });
reviewSchema.index({ dishId: 1, publishedAt: -1 });
reviewSchema.index({ tagIds: 1 });

export const ReviewModel: any = mongoose.models.Review || mongoose.model("Review", reviewSchema);
