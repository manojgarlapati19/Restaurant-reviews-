import { Router } from "express";
import { createDishSchema, createRestaurantSchema } from "@dishcovery/types";
import slugify from "slugify";
import { requireAuth } from "../../middleware/auth.js";
import { validateBody } from "../../middleware/validate.js";
import { success } from "../../utils/api-response.js";
import { AppError } from "../../utils/app-error.js";
import { DishCatalogModel } from "../dishes/dish-catalog.model.js";
import { DishModel } from "../dishes/dish.model.js";
import { ReviewModel } from "../reviews/review.model.js";
import { RestaurantModel } from "./restaurant.model.js";

export const restaurantsRouter = Router();

restaurantsRouter.post("/", requireAuth, validateBody(createRestaurantSchema), async (req, res) => {
  const slug = slugify(req.body.name, { lower: true, strict: true });
  const restaurant = await RestaurantModel.create({
    ...req.body,
    slug
  });
  return res.status(201).json(success(restaurant));
});

restaurantsRouter.get("/:id/menu", async (req, res) => {
  const dishes = await DishModel.find({ restaurantId: req.params.id }).sort({ menuSection: 1, name: 1 }).lean();
  return res.json(success(dishes));
});

restaurantsRouter.post(
  "/:id/dishes",
  requireAuth,
  validateBody(createDishSchema.omit({ restaurantId: true })),
  async (req, res) => {
    let catalogId = req.body.dishCatalogId;

    if (!catalogId) {
      const catalog = await DishCatalogModel.findOneAndUpdate(
        { slug: slugify(req.body.name, { lower: true, strict: true }) },
        {
          canonicalName: req.body.name,
          slug: slugify(req.body.name, { lower: true, strict: true })
        },
        { upsert: true, new: true }
      );
      catalogId = catalog.id;
    }

    const dish = await DishModel.create({
      ...req.body,
      restaurantId: req.params.id,
      dishCatalogId: catalogId,
      slug: slugify(req.body.name, { lower: true, strict: true })
    });

    return res.status(201).json(success(dish));
  }
);

restaurantsRouter.patch("/:id", requireAuth, async (req, res) => {
  const restaurant = await RestaurantModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
  if (!restaurant) {
    throw new AppError("RESTAURANT_NOT_FOUND", "Restaurant not found.", 404);
  }
  return res.json(success(restaurant));
});

restaurantsRouter.get("/:slug", async (req, res, next) => {
  const restaurant = await RestaurantModel.findOne({ slug: req.params.slug }).lean();
  if (!restaurant) {
    return next(new AppError("RESTAURANT_NOT_FOUND", "Restaurant not found.", 404));
  }

  const [dishes, reviews] = await Promise.all([
    DishModel.find({ restaurantId: restaurant._id }).sort({ "aggregateRatings.overall": -1 }).limit(8).lean(),
    ReviewModel.find({ restaurantId: restaurant._id, status: "published" }).sort({ publishedAt: -1 }).limit(10).lean()
  ]);

  return res.json(
    success({
      restaurant,
      dishes,
      reviews
    })
  );
});
