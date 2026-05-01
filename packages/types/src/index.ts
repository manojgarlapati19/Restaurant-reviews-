import { z } from "zod";

export const userRoleSchema = z.enum(["user", "owner", "admin"]);
export type UserRole = z.infer<typeof userRoleSchema>;

export const reviewTargetTypeSchema = z.enum(["restaurant", "dish"]);
export type ReviewTargetType = z.infer<typeof reviewTargetTypeSchema>;

export const reviewVerificationLevelSchema = z.enum([
  "normal",
  "photo_verified",
  "bill_verified"
]);
export type ReviewVerificationLevel = z.infer<typeof reviewVerificationLevelSchema>;

export const reviewStatusSchema = z.enum(["draft", "published", "flagged", "removed"]);
export type ReviewStatus = z.infer<typeof reviewStatusSchema>;

export const mediaTypeSchema = z.enum(["photo", "video"]);
export type MediaType = z.infer<typeof mediaTypeSchema>;

export const claimStatusSchema = z.enum(["unclaimed", "pending", "approved", "rejected"]);
export type ClaimStatus = z.infer<typeof claimStatusSchema>;

export const diningStyleSchema = z.enum([
  "street_food",
  "casual_dining",
  "family_dining",
  "fine_dining",
  "cafe",
  "cloud_kitchen"
]);
export type DiningStyle = z.infer<typeof diningStyleSchema>;

export const budgetBandSchema = z.enum(["low", "medium", "high", "premium"]);
export type BudgetBand = z.infer<typeof budgetBandSchema>;

export const priceRangeSchema = z.enum(["$", "$$", "$$$", "$$$$"]);
export type PriceRange = z.infer<typeof priceRangeSchema>;

export const trustBadgeSchema = z.enum(["normal", "photo-verified", "bill-verified", "top-reviewer"]);
export type TrustBadge = z.infer<typeof trustBadgeSchema>;

export const pointGeometrySchema = z.object({
  type: z.literal("Point"),
  coordinates: z.tuple([z.number(), z.number()])
});
export type PointGeometry = z.infer<typeof pointGeometrySchema>;

export const weekdayHoursSchema = z.object({
  open: z.string(),
  close: z.string(),
  isClosed: z.boolean().default(false)
});

export const restaurantHoursSchema = z.object({
  monday: weekdayHoursSchema,
  tuesday: weekdayHoursSchema,
  wednesday: weekdayHoursSchema,
  thursday: weekdayHoursSchema,
  friday: weekdayHoursSchema,
  saturday: weekdayHoursSchema,
  sunday: weekdayHoursSchema
});
export type RestaurantHours = z.infer<typeof restaurantHoursSchema>;

export const aggregateRatingSchema = z.object({
  overall: z.number().min(0).max(5).default(0),
  taste: z.number().min(0).max(5).default(0),
  quantity: z.number().min(0).max(5).default(0),
  value: z.number().min(0).max(5).default(0),
  presentation: z.number().min(0).max(5).default(0),
  foodQuality: z.number().min(0).max(5).default(0),
  service: z.number().min(0).max(5).default(0),
  ambience: z.number().min(0).max(5).default(0),
  priceFairness: z.number().min(0).max(5).default(0)
});
export type AggregateRating = z.infer<typeof aggregateRatingSchema>;

export const reviewRatingsSchema = z.object({
  taste: z.number().min(1).max(5),
  quantity: z.number().min(1).max(5),
  value: z.number().min(1).max(5),
  presentation: z.number().min(1).max(5),
  foodQuality: z.number().min(1).max(5).optional(),
  service: z.number().min(1).max(5).optional(),
  ambience: z.number().min(1).max(5).optional(),
  priceFairness: z.number().min(1).max(5).optional()
});
export type ReviewRatings = z.infer<typeof reviewRatingsSchema>;

export const mediaAssetSchema = z.object({
  id: z.string(),
  type: mediaTypeSchema,
  url: z.string().url(),
  thumbnailUrl: z.string().url().optional(),
  durationSec: z.number().nonnegative().optional()
});
export type MediaAsset = z.infer<typeof mediaAssetSchema>;

export const createRestaurantSchema = z.object({
  name: z.string().min(2).max(140),
  address: z.string().min(5).max(240),
  city: z.string().min(2).max(120),
  description: z.string().max(800).optional(),
  googlePlaceId: z.string().optional(),
  location: pointGeometrySchema,
  cuisines: z.array(z.string().min(2)).min(1).max(8),
  priceRange: priceRangeSchema,
  diningStyle: diningStyleSchema,
  serviceModes: z.array(z.enum(["dine_in", "takeaway", "delivery"])).min(1),
  familyFriendly: z.boolean().default(false),
  hours: restaurantHoursSchema
});
export type CreateRestaurantInput = z.infer<typeof createRestaurantSchema>;

export const createDishSchema = z.object({
  restaurantId: z.string(),
  dishCatalogId: z.string().optional(),
  name: z.string().min(2).max(140),
  description: z.string().max(500).optional(),
  category: z.string().min(2).max(80),
  menuSection: z.string().min(2).max(80),
  price: z.number().positive(),
  isVeg: z.boolean(),
  spiceLevel: z.number().min(0).max(5).default(0),
  tagIds: z.array(z.string()).max(12).default([])
});
export type CreateDishInput = z.infer<typeof createDishSchema>;

export const createReviewSchema = z.object({
  targetType: reviewTargetTypeSchema,
  restaurantId: z.string(),
  dishId: z.string().optional(),
  dishCatalogId: z.string().optional(),
  title: z.string().min(3).max(120),
  body: z.string().min(20).max(2500),
  ratings: reviewRatingsSchema,
  worthItScore: z.number().min(1).max(10),
  tagIds: z.array(z.string()).max(12).default([]),
  mediaIds: z.array(z.string()).max(8).default([]),
  visitContext: z.object({
    timeOfDay: z.enum(["breakfast", "lunch", "snack", "dinner", "late_night"]).optional(),
    mood: z.enum(["comfort", "celebration", "quick_bite", "date", "family", "solo"]).optional(),
    groupSize: z.number().int().min(1).max(20).optional(),
    spentAmount: z.number().positive().optional()
  }),
  verificationLevel: reviewVerificationLevelSchema.default("normal")
});
export type CreateReviewInput = z.infer<typeof createReviewSchema>;

export const searchQuerySchema = z.object({
  q: z.string().trim().optional(),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
  radiusKm: z.coerce.number().min(0.1).max(50).default(5),
  budgetMax: z.coerce.number().positive().optional(),
  cuisine: z.string().optional(),
  isVeg: z.coerce.boolean().optional(),
  openNow: z.coerce.boolean().optional(),
  familyFriendly: z.coerce.boolean().optional(),
  diningStyle: diningStyleSchema.optional(),
  sortBy: z.enum(["relevance", "distance", "rating", "value", "trending"]).default("relevance"),
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(30).default(12)
});
export type SearchQueryInput = z.infer<typeof searchQuerySchema>;

export const parseSearchPromptSchema = z.object({
  prompt: z.string().min(4).max(200)
});
export type ParseSearchPromptInput = z.infer<typeof parseSearchPromptSchema>;

export const preferenceSchema = z.object({
  favoriteCuisines: z.array(z.string()).default([]),
  dietaryPrefs: z.array(z.enum(["veg", "non_veg", "jain", "vegan", "eggitarian", "halal"])).default([]),
  spiceTolerance: z.number().min(0).max(5).default(2),
  budgetBand: budgetBandSchema.default("medium"),
  likedTags: z.array(z.string()).default([]),
  dislikedTags: z.array(z.string()).default([]),
  contexts: z.array(z.string()).default([])
});
export type PreferenceInput = z.infer<typeof preferenceSchema>;

export const pageMetaSchema = z.object({
  nextCursor: z.string().optional(),
  total: z.number().optional()
});
export type PageMeta = z.infer<typeof pageMetaSchema>;

export const apiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.unknown().optional()
});
export type ApiError = z.infer<typeof apiErrorSchema>;

export const apiEnvelopeSchema = <T extends z.ZodTypeAny>(inner: T) =>
  z.object({
    data: inner.nullable(),
    meta: pageMetaSchema.optional(),
    error: apiErrorSchema.nullable().default(null)
  });

export type ApiEnvelope<T> = {
  data: T | null;
  meta?: PageMeta;
  error: ApiError | null;
};
