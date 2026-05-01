import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { success } from "../../utils/api-response.js";
import { UserModel } from "../users/user.model.js";

export const authRouter = Router();

authRouter.post("/sync", requireAuth, async (req, res) => {
  const user = await UserModel.findById(req.authUser!.id).lean();
  return res.json(
    success({
      user
    })
  );
});
