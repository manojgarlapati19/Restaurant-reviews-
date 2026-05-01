import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { requireRole } from "../../middleware/require-role.js";
import { success } from "../../utils/api-response.js";
import { BillModel } from "../bills/bill.model.js";
import { ReviewModel } from "../reviews/review.model.js";
import { RestaurantModel } from "../restaurants/restaurant.model.js";

export const adminRouter = Router();

adminRouter.use(requireAuth, requireRole("admin"));

adminRouter.get("/reviews", async (_req, res) => {
  const reviews = await ReviewModel.find({}).sort({ createdAt: -1 }).limit(50).lean();
  return res.json(success(reviews));
});

adminRouter.post("/reviews/:id/moderate", async (req, res) => {
  const review = await ReviewModel.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status ?? "flagged" },
    { new: true }
  ).lean();
  return res.json(success(review));
});

adminRouter.get("/bills", async (_req, res) => {
  const bills = await BillModel.find({}).sort({ createdAt: -1 }).limit(50).lean();
  return res.json(success(bills));
});

adminRouter.post("/bills/:id/verify", async (req, res) => {
  const bill = await BillModel.findByIdAndUpdate(
    req.params.id,
    {
      verificationStatus: req.body.verificationStatus ?? "approved",
      verifiedBy: req.authUser!.id,
      verifiedAt: new Date()
    },
    { new: true }
  ).lean();
  return res.json(success(bill));
});

adminRouter.get("/restaurants/trending", async (_req, res) => {
  const restaurants = await RestaurantModel.find({}).sort({ "aggregateRatings.overall": -1 }).limit(10).lean();
  return res.json(success(restaurants));
});

adminRouter.post("/restaurants/:id/feature", async (req, res) => {
  const restaurant = await RestaurantModel.findByIdAndUpdate(
    req.params.id,
    { featuredAt: req.body.featured === false ? null : new Date() },
    { new: true }
  ).lean();
  return res.json(success(restaurant));
});
