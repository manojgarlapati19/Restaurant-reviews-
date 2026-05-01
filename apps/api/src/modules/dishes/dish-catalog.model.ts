import mongoose, { Schema } from "mongoose";

const dishCatalogSchema = new Schema(
  {
    canonicalName: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    aliases: { type: [String], default: [] },
    cuisineHints: { type: [String], default: [] },
    defaultTags: { type: [String], default: [] }
  },
  { timestamps: true }
);

export const DishCatalogModel: any = mongoose.models.DishCatalog || mongoose.model("DishCatalog", dishCatalogSchema);
