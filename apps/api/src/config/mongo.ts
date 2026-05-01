import mongoose from "mongoose";
import { env } from "./env.js";

let connected = false;

export async function connectToDatabase() {
  if (connected) {
    return mongoose.connection;
  }

  await mongoose.connect(env.MONGO_URI, {
    autoIndex: true
  });

  connected = true;
  return mongoose.connection;
}
