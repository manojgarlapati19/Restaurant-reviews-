import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { searchQuerySchema } from "@dishcovery/types";
import { validateQuery } from "../../middleware/validate.js";
import { success } from "../../utils/api-response.js";
import { DishModel } from "./dish.model.js";
import { RestaurantModel } from "../restaurants/restaurant.model.js";
import { ReviewModel } from "../reviews/review.model.js";

export const dishesRouter = Router();

dishesRouter.patch("/:id", requireAuth, async (req, res) => {
  const dish = await DishModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
  return res.json(success(dish));
});

dishesRouter.get("/compare", validateQuery(searchQuerySchema), async (req, res) => {
  const query = req.query as unknown as ReturnType<typeof searchQuerySchema.parse>;
  const filters: Record<string, unknown> = {};

  if (query.budgetMax) {
    filters.price = { $lte: query.budgetMax };
  }

  if (query.isVeg !== undefined) {
    filters.isVeg = query.isVeg;
  }

  if (query.q) {
    filters.name = new RegExp(query.q, "i");
  }

  const dishes = await DishModel.find(filters)
    .sort({ "aggregateRatings.overall": -1, price: 1 })
    .limit(query.limit)
    .lean();

  const restaurantIds = dishes.map((dish: any) => dish.restaurantId);
  const restaurants = await RestaurantModel.find({ _id: { $in: restaurantIds } }).lean();
  const byRestaurantId = new Map(
    restaurants.map((restaurant: any) => [restaurant._id.toString(), restaurant])
  );

  return res.json(
    success(
      dishes.map((dish: any) => ({
        ...dish,
        restaurant: byRestaurantId.get(dish.restaurantId.toString())
      }))
    )
  );
});

dishesRouter.get("/:id/insights", async (req, res) => {
  const reviews = await ReviewModel.find({ dishId: req.params.id, status: "published" }).limit(12).lean();
  return res.json(
    success({
      highlight:
        reviews.length > 0
          ? "People consistently praise the flavor balance and portion size."
          : "Insights will appear once this dish has enough reviews.",
      reviewCount: reviews.length
    })
  );
});

dishesRouter.get("/:id", async (req, res) => {
  const dish = await DishModel.findById(req.params.id).lean();
  const reviews = await ReviewModel.find({ dishId: req.params.id, status: "published" }).sort({ publishedAt: -1 }).lean();
  return res.json(success({ dish, reviews }));
});
