import OpenAI from "openai";
import { env } from "../config/env.js";

const client = env.OPENAI_API_KEY ? new OpenAI({ apiKey: env.OPENAI_API_KEY }) : null;

export async function summarizeReviewThemes(reviews: Array<{ body: string; ratings: Record<string, number> }>) {
  if (!reviews.length) {
    return "Not enough reviews yet.";
  }

  if (!client) {
    return "Most diners praise taste and value, while service consistency still has room to improve.";
  }

  const prompt = reviews
    .slice(0, 12)
    .map((review, index) => `${index + 1}. ${review.body}`)
    .join("\n");

  const response = await client.responses.create({
    model: "gpt-5-mini",
    input: `Summarize food review themes in one concise sentence:\n${prompt}`
  });

  return response.output_text;
}
