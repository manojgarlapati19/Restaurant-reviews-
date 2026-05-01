import type { ParseSearchPromptInput, SearchQueryInput } from "@dishcovery/types";

export function parseNaturalLanguageSearch(input: ParseSearchPromptInput): SearchQueryInput {
  const prompt = input.prompt.toLowerCase();

  const budgetMatch = prompt.match(/under\s*₹?\s*(\d{2,5})/i);
  const parsed: SearchQueryInput = {
    q: prompt,
    budgetMax: budgetMatch ? Number(budgetMatch[1]) : undefined,
    openNow: /open now|late night/.test(prompt) ? true : undefined,
    familyFriendly: /family/.test(prompt) ? true : undefined,
    isVeg: /veg|vegetarian/.test(prompt) ? true : undefined,
    cuisine: inferCuisine(prompt),
    sortBy: /near me|nearby/.test(prompt) ? "distance" : /best|top/.test(prompt) ? "rating" : "relevance",
    limit: 12,
    radiusKm: 5
  };

  return parsed;
}

function inferCuisine(prompt: string) {
  const cuisines = ["biryani", "north indian", "south indian", "dessert", "street food", "chinese"];
  return cuisines.find((cuisine) => prompt.includes(cuisine));
}
