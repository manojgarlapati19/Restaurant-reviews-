import mongoose, { Schema } from "mongoose";

const tagSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true, index: true }
  },
  { timestamps: true }
);

export const TagModel: any = mongoose.models.Tag || mongoose.model("Tag", tagSchema);
