import mongoose, { Schema } from "mongoose";

const aggregateSchema = new Schema(
  {
    overall: { type: Number, default: 0 },
    taste: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
    value: { type: Number, default: 0 },
    presentation: { type: Number, default: 0 }
  },
  { _id: false }
);

const dishSchema = new Schema(
  {
    restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true, index: true },
    dishCatalogId: { type: Schema.Types.ObjectId, ref: "DishCatalog", index: true },
    name: { type: String, required: true, index: true },
    slug: { type: String, required: true, index: true },
    description: { type: String },
    category: { type: String, required: true },
    menuSection: { type: String, required: true },
    price: { type: Number, required: true, index: true },
    isVeg: { type: Boolean, required: true, index: true },
    spiceLevel: { type: Number, default: 0 },
    tagIds: { type: [String], default: [], index: true },
    aggregateRatings: { type: aggregateSchema, default: () => ({}) },
    availability: { type: String, default: "available" }
  },
  { timestamps: true }
);

dishSchema.index({ restaurantId: 1, slug: 1 }, { unique: true });

export const DishModel: any = mongoose.models.Dish || mongoose.model("Dish", dishSchema);
