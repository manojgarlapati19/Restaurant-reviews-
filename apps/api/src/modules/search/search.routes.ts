import { Router } from "express";
import { parseSearchPromptSchema, searchQuerySchema } from "@dishcovery/types";
import { validateBody, validateQuery } from "../../middleware/validate.js";
import { parseNaturalLanguageSearch } from "../../services/search.service.js";
import { summarizeReviewThemes } from "../../services/ai.service.js";
import { success } from "../../utils/api-response.js";
import { DishModel } from "../dishes/dish.model.js";
import { FollowModel } from "../follows/follow.model.js";
import { ReviewModel } from "../reviews/review.model.js";
import { RestaurantModel } from "../restaurants/restaurant.model.js";
import { PreferenceModel } from "../users/preference.model.js";

export const searchRouter = Router();

searchRouter.get("/search", validateQuery(searchQuerySchema), async (req, res) => {
  const query = req.query as unknown as ReturnType<typeof searchQuerySchema.parse>;
  const dishFilters: Record<string, unknown> = {};
  const restaurantFilters: Record<string, unknown> = {};

  if (query.q) {
    dishFilters.name = new RegExp(query.q, "i");
    restaurantFilters.name = new RegExp(query.q, "i");
  }

  if (query.budgetMax) {
    dishFilters.price = { $lte: query.budgetMax };
  }

  if (query.isVeg !== undefined) {
    dishFilters.isVeg = query.isVeg;
  }

  if (query.cuisine) {
    restaurantFilters.cuisines = new RegExp(query.cuisine, "i");
  }

  if (query.familyFriendly !== undefined) {
    restaurantFilters.familyFriendly = query.familyFriendly;
  }

  if (query.diningStyle) {
    restaurantFilters.diningStyle = query.diningStyle;
  }

  const [dishes, restaurants] = await Promise.all([
    DishModel.find(dishFilters).sort({ "aggregateRatings.overall": -1 }).limit(query.limit).lean(),
    RestaurantModel.find(restaurantFilters).sort({ "aggregateRatings.overall": -1 }).limit(query.limit).lean()
  ]);

  return res.json(success({ dishes, restaurants }));
});

searchRouter.post("/search/parse", validateBody(parseSearchPromptSchema), async (req, res) => {
  return res.json(success(parseNaturalLanguageSearch(req.body)));
});

searchRouter.get("/discovery/feed", async (req, res) => {
  const reviews = await ReviewModel.find({ status: "published" })
    .sort({ trustScore: -1, createdAt: -1 })
    .limit(20)
    .lean();

  return res.json(success(reviews, { nextCursor: reviews.at(-1)?._id.toString() }));
});

searchRouter.get("/discovery/map", async (req, res) => {
  const restaurants = await RestaurantModel.find({})
    .select("name slug location aggregateRatings qualitySignals priceRange cuisines")
    .sort({ "aggregateRatings.overall": -1 })
    .limit(50)
    .lean();

  return res.json(success(restaurants));
});

searchRouter.get("/recommendations", async (req, res) => {
  const userId = req.header("x-user-id");
  const prefs = userId ? await PreferenceModel.findOne({ userId }).lean() : null;
  const query = prefs?.favoriteCuisines?.length ? { cuisines: { $in: prefs.favoriteCuisines } } : {};
  const restaurants = await RestaurantModel.find(query)
    .sort({ "aggregateRatings.overall": -1 })
    .limit(8)
    .lean();
  return res.json(success(restaurants));
});

searchRouter.get("/restaurants/:id/insights", async (req, res) => {
  const reviews = await ReviewModel.find({ restaurantId: req.params.id, status: "published" })
    .select("body ratings")
    .limit(12)
    .lean();
  const summary = await summarizeReviewThemes(reviews as Array<{ body: string; ratings: Record<string, number> }>);
  return res.json(success({ summary, reviewCount: reviews.length }));
});

searchRouter.get("/dishes/:id/insights", async (req, res) => {
  const reviews = await ReviewModel.find({ dishId: req.params.id, status: "published" })
    .select("body ratings")
    .limit(12)
    .lean();
  const summary = await summarizeReviewThemes(reviews as Array<{ body: string; ratings: Record<string, number> }>);
  return res.json(success({ summary, reviewCount: reviews.length }));
});

searchRouter.get("/social/follows/:id", async (req, res) => {
  const followers = await FollowModel.find({ followeeId: req.params.id }).lean();
  return res.json(success(followers));
});
