import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { requireRole } from "../../middleware/require-role.js";
import { success } from "../../utils/api-response.js";
import { ReviewModel } from "../reviews/review.model.js";
import { RestaurantModel } from "../restaurants/restaurant.model.js";

export const ownerRouter = Router();

ownerRouter.use(requireAuth);

ownerRouter.post("/claims", async (req, res) => {
  const restaurant = await RestaurantModel.findByIdAndUpdate(
    req.body.restaurantId,
    { claimStatus: "pending", claimedByUserId: req.authUser!.id },
    { new: true }
  ).lean();
  return res.json(success(restaurant));
});

ownerRouter.get("/restaurants/:id/dashboard", requireRole("owner", "admin"), async (req, res) => {
  const [restaurant, reviews] = await Promise.all([
    RestaurantModel.findById(req.params.id).lean(),
    ReviewModel.find({ restaurantId: req.params.id }).sort({ publishedAt: -1 }).limit(12).lean()
  ]);

  return res.json(
    success({
      restaurant,
      analytics: {
        reviewCount: reviews.length,
        averageTrustScore:
          reviews.length > 0
            ? Math.round(reviews.reduce((total: number, review: any) => total + review.trustScore, 0) / reviews.length)
            : 0
      },
      reviews
    })
  );
});

ownerRouter.patch("/restaurants/:id/menu", requireRole("owner", "admin"), async (req, res) => {
  const restaurant = await RestaurantModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
  return res.json(success(restaurant));
});

ownerRouter.post("/restaurants/:id/replies", requireRole("owner", "admin"), async (req, res) => {
  const review = await ReviewModel.findByIdAndUpdate(
    req.body.reviewId,
    { ownerReply: { body: req.body.body, createdAt: new Date() } },
    { new: true }
  ).lean();
  return res.json(success(review));
});
