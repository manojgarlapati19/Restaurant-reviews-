export const appConfig = {
  name: "Dishcovery",
  tagline: "What should I eat, where, and why?",
  city: "Bengaluru",
  currencySymbol: "₹"
} as const;

export const cuisineOptions = [
  "North Indian",
  "South Indian",
  "Biryani",
  "Street Food",
  "Chinese",
  "Desserts",
  "Cafe",
  "Seafood",
  "Mughlai",
  "Healthy"
] as const;

export const tagSeeds = [
  { name: "Spicy", slug: "spicy", category: "flavor" },
  { name: "Sweet", slug: "sweet", category: "flavor" },
  { name: "Oily", slug: "oily", category: "texture" },
  { name: "Crispy", slug: "crispy", category: "texture" },
  { name: "Worth the wait", slug: "worth-the-wait", category: "experience" },
  { name: "Late night", slug: "late-night", category: "context" },
  { name: "Family spot", slug: "family-spot", category: "audience" }
] as const;

export const levelThresholds = [
  { level: "Beginner", minPoints: 0 },
  { level: "Explorer", minPoints: 150 },
  { level: "Expert", minPoints: 500 },
  { level: "Elite", minPoints: 1200 }
] as const;
