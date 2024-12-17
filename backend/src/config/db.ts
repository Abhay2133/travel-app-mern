import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI)
      throw new Error(`'MONGO_URI' env variable is missing`);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
