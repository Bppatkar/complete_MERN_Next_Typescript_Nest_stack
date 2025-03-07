import express from "express";
import userRouter from "./routes/user.js";
import dotenv from "dotenv";
import connectDB from "./database/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Enable credentials in CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Update based on frontend
    credentials: true, // This allows cookies in requests
  })
);

connectDB();
const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
