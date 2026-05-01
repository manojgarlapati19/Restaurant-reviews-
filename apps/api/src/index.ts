import { createApp } from "./app.js";
import { connectToDatabase } from "./config/mongo.js";
import { env } from "./config/env.js";

async function start() {
  await connectToDatabase();
  const app = createApp();
  app.listen(env.API_PORT, () => {
    console.log(`Dishcovery API listening on http://localhost:${env.API_PORT}`);
  });
}

start().catch((error) => {
  console.error("Failed to start API", error);
  process.exit(1);
});
