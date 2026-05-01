import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../../middleware/auth.js";
import { validateBody } from "../../middleware/validate.js";
import { success } from "../../utils/api-response.js";
import { BillModel } from "./bill.model.js";

const billSchema = z.object({
  reviewId: z.string(),
  restaurantId: z.string(),
  amount: z.number().positive(),
  visitDate: z.string(),
  imageUrl: z.string().url()
});

export const billsRouter = Router();

billsRouter.post("/", requireAuth, validateBody(billSchema), async (req, res) => {
  const bill = await BillModel.findOneAndUpdate(
    { reviewId: req.body.reviewId },
    {
      userId: req.authUser!.id,
      reviewId: req.body.reviewId,
      restaurantId: req.body.restaurantId,
      amount: req.body.amount,
      visitDate: new Date(req.body.visitDate),
      imageUrl: req.body.imageUrl,
      verificationStatus: "pending"
    },
    { upsert: true, new: true }
  ).lean();

  return res.status(201).json(success(bill));
});
