import type { NextFunction, Request, Response } from "express";
import type { ZodTypeAny } from "zod";

export function validateBody<T extends ZodTypeAny>(schema: T) {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.body = schema.parse(req.body) as never;
    next();
  };
}

export function validateQuery<T extends ZodTypeAny>(schema: T) {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.query = schema.parse(req.query) as never;
    next();
  };
}
