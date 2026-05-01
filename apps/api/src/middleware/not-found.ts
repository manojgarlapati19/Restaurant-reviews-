import type { Request, Response } from "express";
import { failure } from "../utils/api-response.js";

export function notFoundHandler(_req: Request, res: Response) {
  return res.status(404).json(
    failure({
      code: "NOT_FOUND",
      message: "The requested resource was not found."
    })
  );
}
