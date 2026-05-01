import { Router } from "express";
import { preferenceSchema } from "@dishcovery/types";
import { requireAuth } from "../../middleware/auth.js";
import { validateBody } from "../../middleware/validate.js";
import { success } from "../../utils/api-response.js";
import { AppError } from "../../utils/app-error.js";
import { FollowModel } from "../follows/follow.model.js";
import { PreferenceModel } from "./preference.model.js";
import { UserModel } from "./user.model.js";

export const usersRouter = Router();

usersRouter.get("/me", requireAuth, async (req, res) => {
  const user = await UserModel.findById(req.authUser!.id).lean();
  return res.json(success(user));
});

usersRouter.patch("/me", requireAuth, async (req, res) => {
  const update = {
    displayName: req.body.displayName,
    bio: req.body.bio,
    avatar: req.body.avatar,
    homeCity: req.body.homeCity
  };

  const user = await UserModel.findByIdAndUpdate(req.authUser!.id, update, { new: true }).lean();
  return res.json(success(user));
});

usersRouter.get("/me/preferences", requireAuth, async (req, res) => {
  const pref = await PreferenceModel.findOne({ userId: req.authUser!.id }).lean();
  return res.json(success(pref));
});

usersRouter.put("/me/preferences", requireAuth, validateBody(preferenceSchema), async (req, res) => {
  const pref = await PreferenceModel.findOneAndUpdate(
    { userId: req.authUser!.id },
    { ...req.body, userId: req.authUser!.id },
    { upsert: true, new: true }
  ).lean();
  return res.json(success(pref));
});

usersRouter.get("/users/:username", async (req, res, next) => {
  const user = await UserModel.findOne({ username: req.params.username }).lean();
  if (!user) {
    return next(new AppError("USER_NOT_FOUND", "User not found.", 404));
  }
  return res.json(success(user));
});

usersRouter.post("/users/:id/follow", requireAuth, async (req, res) => {
  await FollowModel.findOneAndUpdate(
    { followerId: req.authUser!.id, followeeId: req.params.id },
    { followerId: req.authUser!.id, followeeId: req.params.id },
    { upsert: true, new: true }
  );
  return res.json(success({ followed: true }));
});

usersRouter.delete("/users/:id/follow", requireAuth, async (req, res) => {
  await FollowModel.findOneAndDelete({ followerId: req.authUser!.id, followeeId: req.params.id });
  return res.json(success({ followed: false }));
});
