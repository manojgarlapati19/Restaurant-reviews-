import mongoose, { Schema } from "mongoose";
import type { UserRole } from "@dishcovery/types";

const userSchema = new Schema(
  {
    firebaseUid: { type: String, required: true, unique: true, index: true },
    email: { type: String },
    username: { type: String, required: true, unique: true, index: true },
    displayName: { type: String, required: true },
    avatar: { type: String },
    bio: { type: String },
    roles: {
      type: [String],
      enum: ["user", "owner", "admin"] satisfies UserRole[],
      default: ["user"],
      index: true
    },
    trustScore: { type: Number, default: 50 },
    points: { type: Number, default: 0, index: true },
    level: { type: String, default: "Beginner" },
    badgeIds: { type: [String], default: [] },
    homeCity: { type: String, default: "Bengaluru" }
  },
  { timestamps: true }
);

export const UserModel: any = mongoose.models.User || mongoose.model("User", userSchema);
