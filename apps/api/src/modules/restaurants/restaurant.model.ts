import mongoose, { Schema } from "mongoose";

const dayHoursSchema = new Schema(
  {
    open: { type: String, required: true },
    close: { type: String, required: true },
    isClosed: { type: Boolean, default: false }
  },
  { _id: false }
);

const aggregateSchema = new Schema(
  {
    overall: { type: Number, default: 0 },
    taste: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
    value: { type: Number, default: 0 },
    presentation: { type: Number, default: 0 },
    foodQuality: { type: Number, default: 0 },
    service: { type: Number, default: 0 },
    ambience: { type: Number, default: 0 },
    priceFairness: { type: Number, default: 0 }
  },
  { _id: false }
);

const restaurantSchema = new Schema(
  {
    name: { type: String, required: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    address: { type: String, required: true },
    city: { type: String, required: true, index: true },
    googlePlaceId: { type: String },
    hours: {
      monday: { type: dayHoursSchema, required: true },
      tuesday: { type: dayHoursSchema, required: true },
      wednesday: { type: dayHoursSchema, required: true },
      thursday: { type: dayHoursSchema, required: true },
      friday: { type: dayHoursSchema, required: true },
      saturday: { type: dayHoursSchema, required: true },
      sunday: { type: dayHoursSchema, required: true }
    },
    cuisines: { type: [String], default: [], index: true },
    priceRange: { type: String, required: true },
    diningStyle: { type: String, required: true, index: true },
    serviceModes: { type: [String], default: [] },
    familyFriendly: { type: Boolean, default: false, index: true },
    claimedByUserId: { type: Schema.Types.ObjectId, ref: "User" },
    claimStatus: { type: String, default: "unclaimed", index: true },
    aggregateRatings: { type: aggregateSchema, default: () => ({}) },
    popularDishIds: { type: [Schema.Types.ObjectId], ref: "Dish", default: [] },
    qualitySignals: {
      overpricedWarning: { type: Boolean, default: false },
      hygieneAlert: { type: Boolean, default: false },
      bestTimeToVisit: { type: String },
      peakHours: { type: [String], default: [] },
      crowdLevel: { type: String, default: "moderate" }
    },
    featuredAt: { type: Date }
  },
  { timestamps: true }
);

restaurantSchema.index({ location: "2dsphere" });
restaurantSchema.index({ "aggregateRatings.overall": -1 });

export const RestaurantModel: any = mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);
