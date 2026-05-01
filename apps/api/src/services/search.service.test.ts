import { describe, expect, it } from "vitest";
import { parseNaturalLanguageSearch } from "./search.service.js";

describe("parseNaturalLanguageSearch", () => {
  it("extracts structured search hints from natural language", () => {
    const result = parseNaturalLanguageSearch({
      prompt: "Best biryani under ₹200 near me open now"
    });

    expect(result.budgetMax).toBe(200);
    expect(result.openNow).toBe(true);
    expect(result.sortBy).toBe("distance");
  });
});
