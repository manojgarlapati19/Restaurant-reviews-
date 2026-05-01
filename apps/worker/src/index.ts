import { consumeDemoJobs } from "./consumers/job-consumer.js";

async function start() {
  console.log("[worker] starting Dishcovery worker loop");
  await consumeDemoJobs();
  console.log("[worker] demo queues processed");
}

start().catch((error) => {
  console.error("[worker] failed", error);
  process.exit(1);
});
