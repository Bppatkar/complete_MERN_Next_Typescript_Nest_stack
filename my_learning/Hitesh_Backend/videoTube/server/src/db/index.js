import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log(" Database Connect Successfully ");
  } catch (error) {
    console.error("Error in Database Connection", error);
    process.exit(1);
  }
};

export default connectDB;
