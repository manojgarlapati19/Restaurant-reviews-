import type { NextFunction, Request, Response } from "express";
import { verifyFirebaseToken } from "../config/firebase.js";
import { UserModel } from "../modules/users/user.model.js";
import { AppError } from "../utils/app-error.js";

export async function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.header("authorization");
  if (!header?.startsWith("Bearer ")) {
    return next();
  }

  try {
    const token = header.replace("Bearer ", "");
    const decoded = await verifyFirebaseToken(token);
    const user = await UserModel.findOne({ firebaseUid: decoded.uid });
    if (user) {
      req.authUser = {
        id: user.id,
        firebaseUid: user.firebaseUid,
        email: user.email,
        username: user.username,
        roles: user.roles
      };
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

export async function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.header("authorization");
  if (!header?.startsWith("Bearer ")) {
    return next(new AppError("UNAUTHORIZED", "Authorization token is required.", 401));
  }

  try {
    const token = header.replace("Bearer ", "");
    const decoded = await verifyFirebaseToken(token);

    let user = await UserModel.findOne({ firebaseUid: decoded.uid });
    if (!user) {
      user = await UserModel.create({
        firebaseUid: decoded.uid,
        email: decoded.email,
        username: `user-${decoded.uid.slice(0, 6)}`,
        displayName: decoded.email?.split("@")[0] ?? "New Foodie",
        roles: ["user"]
      });
    }

    req.authUser = {
      id: user.id,
      firebaseUid: user.firebaseUid,
      email: user.email,
      username: user.username,
      roles: user.roles
    };

    return next();
  } catch (error) {
    return next(new AppError("UNAUTHORIZED", "Token verification failed.", 401, error));
  }
}
