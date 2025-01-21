import mongoose from 'mongoose';

const DB_URL = process.env.MONGODB_URI as string;

export const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};