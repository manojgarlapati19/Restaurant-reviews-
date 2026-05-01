import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "@dishcovery/types";
import { AppError } from "../utils/app-error.js";

export function requireRole(...roles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.authUser) {
      return next(new AppError("UNAUTHORIZED", "Authentication is required.", 401));
    }

    const allowed = req.authUser.roles.some((role) => roles.includes(role));
    if (!allowed) {
      return next(new AppError("FORBIDDEN", "You do not have access to this resource.", 403));
    }

    return next();
  };
}
