import "dotenv/config";
import { z } from "zod";

export const env = z
  .object({
    MONGO_URI: z.string().default("mongodb://localhost:27017/dishcovery"),
    OPENAI_API_KEY: z.string().optional()
  })
  .parse(process.env);
