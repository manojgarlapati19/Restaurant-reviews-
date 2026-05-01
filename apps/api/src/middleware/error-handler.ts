import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { failure } from "../utils/api-response.js";
import { AppError } from "../utils/app-error.js";

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json(failure({ code: error.code, message: error.message, details: error.details }));
  }

  if (error instanceof ZodError) {
    return res.status(400).json(
      failure({
        code: "VALIDATION_ERROR",
        message: "One or more inputs were invalid.",
        details: error.flatten()
      })
    );
  }

  const unexpected = error instanceof Error ? error : new Error("Unexpected error");
  return res.status(500).json(
    failure({
      code: "INTERNAL_SERVER_ERROR",
      message: unexpected.message
    })
  );
}
