import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.MONGO_URI as string;

if (!DB_URL) {
  console.error("DATABASE environment variable is not set.");
  process.exit(1);
}

async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

export default connectToDatabase;