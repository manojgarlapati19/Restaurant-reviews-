import mongoose from "mongoose";
import { DishModel } from "../modules/dishes/dish.model.js";
import { RatingAggregateModel } from "../modules/reviews/rating-aggregate.model.js";
import { ReviewModel } from "../modules/reviews/review.model.js";
import { RestaurantModel } from "../modules/restaurants/restaurant.model.js";

type EntityType = "restaurant" | "dish";

function round(value: number) {
  return Math.round(value * 10) / 10;
}

export async function recomputeAggregate(entityType: EntityType, entityId: string) {
  const objectId = new mongoose.Types.ObjectId(entityId);

  const reviews = await ReviewModel.find({
    status: "published",
    ...(entityType === "restaurant" ? { restaurantId: objectId } : { dishId: objectId })
  }).lean();

  const count = reviews.length;
  const verifiedReviewCount = reviews.filter((review: any) => review.verificationLevel !== "normal").length;

  const totals = {
    taste: 0,
    quantity: 0,
    value: 0,
    presentation: 0,
    foodQuality: 0,
    service: 0,
    ambience: 0,
    priceFairness: 0,
    worthItScore: 0
  };

  for (const review of reviews as any[]) {
    totals.taste += review.ratings.taste;
    totals.quantity += review.ratings.quantity;
    totals.value += review.ratings.value;
    totals.presentation += review.ratings.presentation;
    totals.foodQuality += review.ratings.foodQuality ?? 0;
    totals.service += review.ratings.service ?? 0;
    totals.ambience += review.ratings.ambience ?? 0;
    totals.priceFairness += review.ratings.priceFairness ?? 0;
    totals.worthItScore += review.worthItScore;
  }

  const denominator = count || 1;
  const averages = {
    overall: count
      ? round((totals.taste + totals.quantity + totals.value + totals.presentation) / (count * 4))
      : 0,
    taste: round(totals.taste / denominator),
    quantity: round(totals.quantity / denominator),
    value: round(totals.value / denominator),
    presentation: round(totals.presentation / denominator),
    foodQuality: round(totals.foodQuality / denominator),
    service: round(totals.service / denominator),
    ambience: round(totals.ambience / denominator),
    priceFairness: round(totals.priceFairness / denominator)
  };

  await RatingAggregateModel.findOneAndUpdate(
    { entityType, entityId: objectId },
    {
      entityType,
      entityId: objectId,
      reviewCount: count,
      verifiedReviewCount,
      averages,
      worthItAverage: round(totals.worthItScore / denominator),
      lastComputedAt: new Date()
    },
    { upsert: true, new: true }
  );

  if (entityType === "restaurant") {
    await RestaurantModel.findByIdAndUpdate(objectId, { aggregateRatings: averages });
  } else {
    await DishModel.findByIdAndUpdate(objectId, { aggregateRatings: averages });
  }

  return averages;
}

export function trustScoreForVerification(level: "normal" | "photo_verified" | "bill_verified") {
  if (level === "bill_verified") {
    return 92;
  }

  if (level === "photo_verified") {
    return 76;
  }

  return 58;
}
