import { Router } from "express";
import { createReviewSchema, mediaTypeSchema } from "@dishcovery/types";
import { z } from "zod";
import { requireAuth } from "../../middleware/auth.js";
import { validateBody } from "../../middleware/validate.js";
import { enqueueJob } from "../../services/queue.service.js";
import { recomputeAggregate, trustScoreForVerification } from "../../services/review-aggregate.service.js";
import { createSignedUploadPayload } from "../../services/media.service.js";
import { success } from "../../utils/api-response.js";
import { AppError } from "../../utils/app-error.js";
import { BillModel } from "../bills/bill.model.js";
import { ReviewCommentModel } from "./review-comment.model.js";
import { ReviewLikeModel } from "./review-like.model.js";
import { ReviewModel } from "./review.model.js";

const mediaSignSchema = z.object({
  type: mediaTypeSchema
});

const reviewCommentSchema = z.object({
  body: z.string().min(2).max(400)
});

export const reviewsRouter = Router();

reviewsRouter.post("/", requireAuth, validateBody(createReviewSchema), async (req, res) => {
  const trustScore = trustScoreForVerification(req.body.verificationLevel);

  const review = await ReviewModel.create({
    ...req.body,
    authorId: req.authUser!.id,
    trustScore
  });

  await Promise.all([
    recomputeAggregate("restaurant", review.restaurantId.toString()),
    review.dishId ? recomputeAggregate("dish", review.dishId.toString()) : Promise.resolve(),
    enqueueJob("review-summary", { reviewId: review.id })
  ]);

  return res.status(201).json(success(review));
});

reviewsRouter.get("/:id", async (req, res, next) => {
  const review = await ReviewModel.findById(req.params.id).lean();
  if (!review) {
    return next(new AppError("REVIEW_NOT_FOUND", "Review not found.", 404));
  }
  return res.json(success(review));
});

reviewsRouter.patch("/:id", requireAuth, async (req, res, next) => {
  const review = await ReviewModel.findOneAndUpdate(
    { _id: req.params.id, authorId: req.authUser!.id },
    req.body,
    { new: true }
  ).lean();

  if (!review) {
    return next(new AppError("REVIEW_NOT_FOUND", "Review not found or not editable.", 404));
  }

  await Promise.all([
    recomputeAggregate("restaurant", review.restaurantId.toString()),
    review.dishId ? recomputeAggregate("dish", review.dishId.toString()) : Promise.resolve()
  ]);

  return res.json(success(review));
});

reviewsRouter.post("/:id/media/sign", requireAuth, validateBody(mediaSignSchema), async (req, res) => {
  return res.json(success(createSignedUploadPayload(req.body.type)));
});

reviewsRouter.post("/:id/like", requireAuth, async (req, res) => {
  await ReviewLikeModel.findOneAndUpdate(
    { reviewId: req.params.id, userId: req.authUser!.id },
    { reviewId: req.params.id, userId: req.authUser!.id },
    { upsert: true, new: true }
  );
  return res.json(success({ liked: true }));
});

reviewsRouter.delete("/:id/like", requireAuth, async (req, res) => {
  await ReviewLikeModel.findOneAndDelete({ reviewId: req.params.id, userId: req.authUser!.id });
  return res.json(success({ liked: false }));
});

reviewsRouter.post("/:id/comments", requireAuth, validateBody(reviewCommentSchema), async (req, res) => {
  const comment = await ReviewCommentModel.create({
    reviewId: req.params.id,
    authorId: req.authUser!.id,
    body: req.body.body
  });
  return res.status(201).json(success(comment));
});

reviewsRouter.post("/:id/verify", requireAuth, async (req, res, next) => {
  const bill = await BillModel.findOne({ reviewId: req.params.id }).lean();
  if (!bill) {
    return next(new AppError("BILL_REQUIRED", "A bill upload is required before bill verification.", 400));
  }

  const review = await ReviewModel.findByIdAndUpdate(
    req.params.id,
    {
      verificationLevel: bill.verificationStatus === "approved" ? "bill_verified" : "photo_verified",
      trustScore: bill.verificationStatus === "approved" ? 92 : 76
    },
    { new: true }
  ).lean();

  return res.json(success(review));
});
