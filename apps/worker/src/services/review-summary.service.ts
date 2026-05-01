import OpenAI from "openai";
import { env } from "../config/env.js";

const client = env.OPENAI_API_KEY ? new OpenAI({ apiKey: env.OPENAI_API_KEY }) : null;

export async function generateReviewSummary(texts: string[]) {
  if (!texts.length) {
    return "Not enough content to summarize.";
  }

  if (!client) {
    return "Popular for flavor and value, with occasional complaints around service timing.";
  }

  const response = await client.responses.create({
    model: "gpt-5-mini",
    input: `Summarize these food reviews in one concise product sentence:\n${texts.join("\n")}`
  });

  return response.output_text;
}
