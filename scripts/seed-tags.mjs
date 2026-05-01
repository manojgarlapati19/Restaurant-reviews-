import mongoose from "mongoose";

const tagSeeds = [
  { name: "Spicy", slug: "spicy", category: "flavor" },
  { name: "Sweet", slug: "sweet", category: "flavor" },
  { name: "Oily", slug: "oily", category: "texture" },
  { name: "Crispy", slug: "crispy", category: "texture" },
  { name: "Worth the wait", slug: "worth-the-wait", category: "experience" },
  { name: "Late night", slug: "late-night", category: "context" },
  { name: "Family spot", slug: "family-spot", category: "audience" }
];

const mongoUri = process.env.MONGO_URI ?? "mongodb://localhost:27017/dishcovery";

const tagSchema = new mongoose.Schema(
  {
    name: String,
    slug: { type: String, unique: true },
    category: String
  },
  { timestamps: true }
);

const Tag = mongoose.models.Tag || mongoose.model("Tag", tagSchema);

async function seed() {
  await mongoose.connect(mongoUri);
  await Promise.all(tagSeeds.map((tag) => Tag.updateOne({ slug: tag.slug }, tag, { upsert: true })));
  console.log(`Seeded ${tagSeeds.length} tags`);
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
