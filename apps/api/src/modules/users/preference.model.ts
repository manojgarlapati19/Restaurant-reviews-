import mongoose, { Schema } from "mongoose";

const preferenceSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
    favoriteCuisines: { type: [String], default: [] },
    dietaryPrefs: { type: [String], default: [] },
    spiceTolerance: { type: Number, default: 2 },
    budgetBand: { type: String, default: "medium" },
    likedTags: { type: [String], default: [] },
    dislikedTags: { type: [String], default: [] },
    contexts: { type: [String], default: [] },
    embeddingRef: { type: String }
  },
  { timestamps: true }
);

export const PreferenceModel: any = mongoose.models.Preference || mongoose.model("Preference", preferenceSchema);
