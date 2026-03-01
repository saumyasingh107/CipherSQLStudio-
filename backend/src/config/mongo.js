import mongoose from "mongoose";
import { env } from "./env.js";

export const connectMongo = async () => {
  if (!env.mongodbUri) {
    throw new Error("MongoDB URI is missing. Set MONGODB_URI (or MONGO_URI) in backend/.env");
  }

  await mongoose.connect(env.mongodbUri, {
    serverSelectionTimeoutMS: 10000
  });
};
